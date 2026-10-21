import re
import sys
from html.parser import HTMLParser
from pathlib import Path


DATA_SCRIPT_TYPES = {"application/json", "application/ld+json"}


class EmbeddedCodeParser(HTMLParser):
    def __init__(self, file_name):
        super().__init__(convert_charrefs=True)
        self.file_name = file_name
        self.script_line = None
        self.script_type = ""
        self.violations = []

    def handle_starttag(self, tag_name, attributes):
        normalized_tag = tag_name.lower()
        normalized_attributes = {
            name.lower(): value or "" for name, value in attributes
        }
        line_number = self.getpos()[0]

        if normalized_tag == "style":
            self.violations.append((line_number, "internal <style> element"))

        if normalized_tag == "script":
            self.script_line = line_number
            self.script_type = normalized_attributes.get("type", "").lower()

        for attribute_name, attribute_value in normalized_attributes.items():
            if attribute_name == "style":
                self.violations.append((line_number, "inline style attribute"))
            elif re.fullmatch(r"on[a-z]+", attribute_name):
                self.violations.append((line_number, f"inline {attribute_name} handler"))
            elif attribute_value.lstrip().lower().startswith("javascript:"):
                self.violations.append((line_number, "javascript: URL"))

    def handle_endtag(self, tag_name):
        if tag_name.lower() == "script":
            self.script_line = None
            self.script_type = ""

    def handle_data(self, content):
        if (
            self.script_line is not None
            and self.script_type not in DATA_SCRIPT_TYPES
            and content.strip()
        ):
            self.violations.append((self.script_line, "internal JavaScript"))


def check_embedded_code(file_names):
    violation_count = 0

    for file_name in file_names:
        code_parser = EmbeddedCodeParser(file_name)
        code_parser.feed(Path(file_name).read_text(encoding="utf-8"))

        for line_number, message in code_parser.violations:
            print(f"::error file={file_name},line={line_number}::{message} is not allowed")
            violation_count += 1

    return violation_count


def count_physical_lines(file_name):
    file_content = Path(file_name).read_text(encoding="utf-8")
    return len(file_content.splitlines())


def check_line_counts(file_names):
    critical_count = 0

    for file_name in file_names:
        line_count = count_physical_lines(file_name)

        if Path(file_name).name == "dataFiller.js":
            print(f"::notice file={file_name}::{line_count} lines; exempt dataFiller.js")
        elif line_count > 800:
            print(
                f"::error file={file_name}::{line_count} lines; "
                "critical files must be decomposed before extension"
            )
            critical_count += 1
        elif line_count > 500:
            print(
                f"::warning file={file_name}::{line_count} lines; "
                "identify cohesive responsibilities to extract"
            )
        elif line_count > 200:
            print(f"::notice file={file_name}::{line_count} lines; sweet spot")
        else:
            print(f"::notice file={file_name}::{line_count} lines; no size warning")

    return critical_count


def run_requested_check(arguments):
    if len(arguments) < 2:
        raise SystemExit("Usage: check-code-rules.py embedded|line-count FILE...")

    check_name = arguments[0]
    file_names = arguments[1:]

    if check_name == "embedded":
        failure_count = check_embedded_code(file_names)
    elif check_name == "line-count":
        failure_count = check_line_counts(file_names)
    else:
        raise SystemExit(f"Unknown check: {check_name}")

    if failure_count:
        raise SystemExit(1)


run_requested_check(sys.argv[1:])
