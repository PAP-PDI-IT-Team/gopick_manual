import os
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
    summary_rows = []
    classification_counts = {
        "Critical": 0,
        "Warning": 0,
        "Exempt — dataFiller.js": 0,
        "Sweet spot": 0,
        "No size warning": 0,
    }

    for file_name in file_names:
        line_count = count_physical_lines(file_name)

        if Path(file_name).name == "dataFiller.js":
            classification = "Exempt — dataFiller.js"
            print(f"::notice file={file_name}::{file_name}: {line_count} lines; {classification}")
        elif line_count > 800:
            classification = "Critical"
            print(
                f"::error file={file_name}::{file_name}: {line_count} lines; "
                "critical files must be decomposed before extension"
            )
            critical_count += 1
        elif line_count > 500:
            classification = "Warning"
            print(
                f"::warning file={file_name}::{file_name}: {line_count} lines; "
                "identify cohesive responsibilities to extract"
            )
        elif line_count > 200:
            classification = "Sweet spot"
            print(f"::notice file={file_name}::{file_name}: {line_count} lines; {classification}")
        else:
            classification = "No size warning"
            print(f"::notice file={file_name}::{file_name}: {line_count} lines; {classification}")

        summary_rows.append((file_name, line_count, classification))
        classification_counts[classification] += 1

    summary_lines = [
        "## Error Summary",
        "",
    ]

    error_rows = [
        summary_row
        for summary_row in summary_rows
        if summary_row[2] in {"Critical", "Warning"}
    ]
    error_rows.sort(key=lambda summary_row: summary_row[1], reverse=True)

    if error_rows:
        summary_lines.extend(
            [
                f"- Critical: {classification_counts['Critical']}",
                f"- Warning: {classification_counts['Warning']}",
                "",
                "| File | Lines | Standing | Required action |",
                "|---|---:|---|---|",
            ]
        )

        for file_name, line_count, classification in error_rows:
            escaped_file_name = file_name.replace("|", "\\|")
            if classification == "Critical":
                required_action = "Decompose by responsibility before extending the file."
            else:
                required_action = "Identify cohesive responsibilities to extract."
            summary_lines.append(
                f"| `{escaped_file_name}` | {line_count} | {classification} | {required_action} |"
            )
    else:
        summary_lines.append("No critical or warning line-count findings.")

    summary_lines.extend(
        [
            "",
            "## Success Summary",
            "",
            f"- Successful files: {len(summary_rows) - len(error_rows)}",
            f"- Sweet spot: {classification_counts['Sweet spot']}",
            f"- No size warning: {classification_counts['No size warning']}",
            f"- Exempt — dataFiller.js: {classification_counts['Exempt — dataFiller.js']}",
        ]
    )

    summary_text = "\n".join(summary_lines)
    print(f"\n{summary_text}")

    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with Path(summary_path).open("a", encoding="utf-8") as summary_file:
            summary_file.write(f"{summary_text}\n")

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
