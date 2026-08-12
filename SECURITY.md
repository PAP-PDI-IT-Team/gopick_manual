# Security Policy

## Supported versions

This repository deploys a static documentation website from the `main` branch through GitHub Pages. Security fixes are applied only to the current version on `main`.

| Version | Supported |
| --- | --- |
| Current `main` branch | Yes |
| Older commits, branches, forks, and downloaded copies | No |

## Reporting a vulnerability

Do not report suspected vulnerabilities through a public GitHub issue, pull request, discussion, or social-media post.

1. Open the repository's **Security** tab.
2. If **Report a vulnerability** is available, use it to submit a private report.
3. If private vulnerability reporting is not available, contact the repository maintainers through the organization's approved private communication channel and include a link to this repository.

No public security email address or fixed response-time commitment is currently defined in this repository. Maintainers should provide acknowledgment and coordination details through the private channel used for the report.

## Information to include

Provide enough information for maintainers to reproduce and assess the issue:

- A clear description of the vulnerability and its potential impact
- The affected page, file, URL, branch, or commit
- Reproduction steps or a minimal proof of concept
- Required browser, operating system, account state, or configuration
- Relevant console output, request details, or screenshots with sensitive values removed
- Whether the issue affects the deployed GitHub Pages site, repository content, or deployment workflow
- Any proposed remediation, if known

Do not include passwords, access tokens, private keys, personal information, candidate information, production records, or other confidential data in the report. Revoke any exposed credential immediately through its owning system before continuing the report.

## Security scope

Security reports for this repository may include:

- Cross-site scripting or unsafe HTML injection in rendered documentation
- Unsafe URL, hash, or search-result handling
- Exposure of credentials, tokens, private records, or internal-only information
- Malicious or compromised third-party browser resources
- GitHub Pages deployment-workflow permission or supply-chain issues
- Repository changes that allow unauthorized modification of deployed content
- Browser behavior that creates a meaningful confidentiality, integrity, or availability risk

The GoPick application described by this manual is not implemented in this repository. Vulnerabilities in that application must be reported privately to the team that owns the affected GoPick environment. Documentation that exposes a real application vulnerability or confidential implementation detail remains in scope for private reporting here.

## Generally not security vulnerabilities

The following are normally handled as documentation or maintenance issues unless they create a concrete security impact:

- Typographical errors or outdated instructions
- Broken links, layout defects, or browser-compatibility problems
- Missing documentation or feature requests
- Public information already intentionally included in the manual
- Reports that require physical access to a user's already-unlocked device
- Automated scanner output without a reproducible impact

These issues may be submitted through the repository's normal issue process when doing so does not reveal sensitive information.

## Handling and disclosure

Maintainers should validate the report against the current `main` branch, assess its impact, and keep security-sensitive details within the private reporting channel. A fix should be limited to the affected ownership boundary and should not introduce hidden defaults, silent errors, or alternate legacy behavior.

Reporters should allow maintainers reasonable time to investigate and release a correction before public disclosure. Disclosure timing and attribution must be coordinated privately. Publishing exploit details before a correction is available may put users and connected systems at risk.

## Security considerations for contributors

- Never commit credentials, tokens, private keys, production data, candidate data, or personal information.
- Treat Markdown, JSON, URL parameters, hashes, and search-index content as untrusted when inserting values into the DOM.
- Prefer safe DOM text APIs for text content. Review every use of `innerHTML` or generated markup for injection risk.
- Keep page-specific changes in the page's local assets and shared security fixes in the actual shared owner.
- Preserve explicit loading errors; do not hide failed data requests or invalid content behind silent defaults.
- Review changes to CDN resources and GitHub Actions for supply-chain risk and minimum required permissions.
- Verify direct links, search results, and hash navigation after security-related changes.
