/**
 * Modular AI Service — provides security analysis responses.
 *
 * Currently uses a mock implementation with predefined responses.
 * To connect a real AI provider, replace the generateResponse function
 * with an API call to your provider (OpenAI, Anthropic, etc.) while
 * keeping the same interface.
 */

export interface AIMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface AIResponse {
  content: string;
  safe: boolean;
  mode: 'analysis' | 'remediation' | 'report';
}

type ResponseHandler = (query: string) => string | null;

const responseHandlers: ResponseHandler[] = [
  (q) => {
    if (!q.match(/latest|findings|recent/)) return null;
    return `Based on the latest assessment data, here is a summary of your current findings:

• 4 Critical vulnerabilities (WM-005: IDOR, WM-009: Insecure Deserialization, WM-010: SQL Injection, WM-001: Broken Access Control)
• 7 High severity issues (WM-004, WM-006, WM-016, WM-019, WM-021, WM-027)
• 11 Medium severity findings
• 8 Low severity findings
• 3 Resolved issues (WM-008, WM-020, WM-025)

Priority recommendation: Address WM-010 (SQL Injection) immediately — it has a CVSS of 9.8 and allows full database compromise via crafted query parameters.

Your overall security score is 82/100 (Good Posture). The weakest area is Authorization at 76%.`;
  },
  (q) => {
    if (!q.match(/explain.*vuln|idor|wm-005|wm-010/)) return null;
    if (q.includes('wm-010') || q.includes('sql')) {
      return `WM-010 — SQL Injection (Critical, CVSS 9.8):

This vulnerability occurs when user input is concatenated directly into SQL queries without parameterization. In your case, the /api/analytics endpoint accepts a filter parameter that is inserted raw into the query string.

Why it matters: An attacker can manipulate the query to extract, modify, or delete the entire database. This requires only a valid API call — no special privileges needed.

The fix: Use parameterized queries exclusively. Never concatenate user input into SQL strings. Implement an ORM or query builder that enforces parameterization. Add input validation as defense-in-depth.`;
    }
    return `WM-005 — Insecure Direct Object Reference (IDOR):

This vulnerability occurs when an application uses user-supplied input to access objects directly without verifying authorization. In your case, the endpoint /api/reports/:id accepts any report ID from any authenticated user without checking ownership.

Why it matters: An attacker with a basic account can enumerate report IDs and access confidential security findings belonging to other users. This is a Critical severity issue (CVSS 9.1).

The fix: Implement server-side ownership validation. Before returning a report, the server must verify that the requesting user's ID matches the report's owner ID, or that the user has an admin role.`;
  },
  (q) => {
    if (!q.match(/summar.*event|summar.*today|summar.*security/)) return null;
    return `Today's Security Events Summary:

• 4 new vulnerabilities detected by AI analysis
• 143 failed login attempts recorded (elevated from yesterday's 127)
• 1 account auto-locked due to brute-force detection
• 5 session anomalies flagged for review
• 2 vulnerability retests passed (WM-008, WM-025 — now Resolved)
• AI generated 7 security alerts, 2 critical

Top concern: The spike in failed logins combined with the IDOR finding suggests an active probing attempt. Recommend reviewing access logs for the Auth Service.

Security score trend: 82 → stable over the past 3 days, up from 74 at the start of the month.`;
  },
  (q) => {
    if (!q.match(/evidence|collect/)) return null;
    return `Evidence Collection Guide for Security Findings:

For each vulnerability, collect the following:

1. Request/Response Capture: Save the full HTTP request and response that demonstrates the issue.

2. Screenshots: Capture the vulnerability in action — error messages, exposed data, or unexpected behavior.

3. Environment Details: Record the target URL, application version, test date, and tester identity.

4. Reproduction Steps: Document exact, numbered steps that another tester can follow.

5. Impact Evidence: Show what data or functionality is exposed.

6. AI Analysis Output: Include the AI analyzer's confidence score and classification.

Remember: All evidence collection must be performed only against explicitly authorized test targets.`;
  },
  (q) => {
    if (!q.match(/remediation|recommend|fix/)) return null;
    return `Remediation Recommendations (Prioritized):

1. CRITICAL — WM-010 (SQL Injection): Use parameterized queries. Estimated effort: 4 hours.
2. CRITICAL — WM-005 (IDOR): Add ownership checks to /api/reports/:id. Estimated effort: 4 hours.
3. CRITICAL — WM-009 (Deserialization): Schema validation before deserialization. Estimated effort: 6 hours.
4. HIGH — WM-001 (Broken Access Control): RBAC middleware for admin endpoints. Estimated effort: 6 hours.
5. HIGH — WM-004 (Sensitive Data Exposure): Response DTOs with field allowlists. Estimated effort: 8 hours.
6. HIGH — WM-016 (JWT Algorithm Confusion): Pin expected algorithm to RS256. Estimated effort: 1 hour.

Timeline: Items 1-3 within 24 hours. Items 4-6 within 48 hours.`;
  },
  (q) => {
    if (!q.match(/report|create|generate/)) return null;
    return `Security Assessment Report — Summary:

Executive Summary:
The World Monitor platform underwent authorized security testing across 12 applications. The overall security score is 82/100, indicating a Good Security Posture with areas for improvement.

Key Findings:
• 30 total vulnerabilities identified (4 Critical, 7 High, 11 Medium, 8 Low)
• Authorization is the weakest security domain (76%)
• Communication Security is the strongest (91%)

Risk Assessment:
SQL Injection (WM-010) and IDOR (WM-005) represent the highest immediate risks. Combined with Broken Access Control (WM-001), the authorization layer requires urgent attention.

Positive Indicators:
• 3 vulnerabilities resolved and verified
• Security score improved 8 points over 30 days
• MFA adoption at 78% and increasing

Projected post-remediation score: 91/100.`;
  },
  (q) => {
    if (!q.match(/api.*response|api.*explain/)) return null;
    return `API Response Analysis:

Based on your API security data:

• 12 total endpoints monitored
• 8 require authentication
• 4 at-risk endpoints identified
• 3 under review

The highest-risk endpoints are:
1. /api/reports/:id — IDOR vulnerability (Critical)
2. /api/admin/users — Missing authorization (High)
3. /api/admin/settings — Missing authorization (High)

Recommendation: Implement centralized authorization middleware that validates roles and ownership for every request.`;
  },
];

export function generateResponse(query: string): AIResponse {
  const q = query.toLowerCase();

  for (const handler of responseHandlers) {
    const result = handler(q);
    if (result) {
      return { content: result, safe: true, mode: 'analysis' };
    }
  }

  return {
    content: `I can help you with security analysis in the following areas:

• Analyze latest vulnerability findings and patterns
• Explain specific vulnerabilities and their impact
• Summarize security events and trends
• Guide evidence collection for findings
• Generate prioritized remediation recommendations
• Create executive security reports
• Analyze API responses and endpoint security

Note: I operate in Safe Assessment Mode. I can only analyze data you provide — I do not perform live testing, exploitation, or attacks against any system.

Try asking: "Analyze my latest findings" or "Explain the SQL injection vulnerability"`,
    safe: true,
    mode: 'analysis',
  };
}

export const aiSuggestions = [
  'Analyze my latest findings',
  'Explain this vulnerability',
  "Summarize today's security events",
  'What evidence should I collect?',
  'Generate remediation recommendations',
  'Create a security report',
  'Explain this API response',
];
