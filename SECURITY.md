# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**DO NOT open a public GitHub issue for security vulnerabilities.**

Please email us at: **security@kovo.app**

Include:
- Affected version(s)
- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- (Optional) Suggested fix

We will acknowledge your report within **48 hours** and aim to release a fix within **7 days** for critical issues.

## Security Measures

- JWT tokens with short expiry (15 minutes access, 7 days refresh)
- HTTPS enforced everywhere
- Rate limiting on all public endpoints
- Content Security Policy headers
- SQL injection prevention via ORM parameterization
- XSS prevention via output encoding
- CSRF protection
- Input validation via Pydantic v2
- Secrets managed via environment variables (never committed)
- Dependency vulnerability scanning via GitHub Dependabot

## Disclosure Policy

We follow responsible disclosure. Once a vulnerability is fixed, we will publish a security advisory.
