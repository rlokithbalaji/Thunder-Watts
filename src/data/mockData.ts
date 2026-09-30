import type {
  User,
  Vulnerability,
  Application,
  Endpoint,
  LogEntry,
  SecurityCategory,
  TrendPoint,
  AuthzTestResult,
  ClientSecurityCheck,
  CommSecurityItem,
  DataProtectionCategory,
  SecurityAlert,
  ReportSection,
  ComplianceItem,
  ComplianceFramework,
  AuditEntry,
  ManagedUser,
  AppSettings,
} from '@/types';

export const demoUsers: User[] = [
  {
    id: 'u1',
    email: 'admin@worldmonitor.demo',
    name: 'Alex Security',
    role: 'admin',
    avatar: 'AS',
  },
  {
    id: 'u2',
    email: 'analyst@worldmonitor.demo',
    name: 'Jordan Analyst',
    role: 'analyst',
    avatar: 'JA',
  },
  {
    id: 'u3',
    email: 'viewer@worldmonitor.demo',
    name: 'Sam Viewer',
    role: 'viewer',
    avatar: 'SV',
  },
];

export const dashboardMetrics = {
  totalApplications: 12,
  activeAssessments: 4,
  openVulnerabilities: 18,
  criticalFindings: 2,
  securityScore: 82,
  apiRequests: 24800,
  failedLogins: 143,
  aiAlerts: 7,
};

export const securityCategories: SecurityCategory[] = [
  { name: 'Auth', score: 88, fullMark: 100 },
  { name: 'Authz', score: 76, fullMark: 100 },
  { name: 'API Sec', score: 81, fullMark: 100 },
  { name: 'Input', score: 84, fullMark: 100 },
  { name: 'Data Prot', score: 79, fullMark: 100 },
  { name: 'Comm Sec', score: 91, fullMark: 100 },
];

export const securityTrend: TrendPoint[] = [
  { date: 'Sep 1', score: 74, critical: 4, high: 8, medium: 12, low: 6 },
  { date: 'Sep 3', score: 76, critical: 3, high: 7, medium: 11, low: 5 },
  { date: 'Sep 5', score: 73, critical: 4, high: 9, medium: 10, low: 7 },
  { date: 'Sep 7', score: 78, critical: 2, high: 6, medium: 9, low: 5 },
  { date: 'Sep 9', score: 79, critical: 2, high: 5, medium: 8, low: 4 },
  { date: 'Sep 11', score: 77, critical: 3, high: 7, medium: 9, low: 6 },
  { date: 'Sep 13', score: 80, critical: 2, high: 5, medium: 7, low: 5 },
  { date: 'Sep 15', score: 81, critical: 2, high: 4, medium: 8, low: 4 },
  { date: 'Sep 17', score: 79, critical: 3, high: 6, medium: 7, low: 5 },
  { date: 'Sep 19', score: 83, critical: 1, high: 4, medium: 6, low: 4 },
  { date: 'Sep 21', score: 84, critical: 1, high: 3, medium: 6, low: 3 },
  { date: 'Sep 23', score: 82, critical: 2, high: 4, medium: 7, low: 5 },
  { date: 'Sep 25', score: 85, critical: 1, high: 3, medium: 5, low: 4 },
  { date: 'Sep 27', score: 83, critical: 2, high: 3, medium: 6, low: 4 },
  { date: 'Sep 30', score: 82, critical: 2, high: 5, medium: 6, low: 5 },
];

export const loginActivity = [
  { date: 'Sep 1', success: 240, failed: 12 },
  { date: 'Sep 3', success: 285, failed: 8 },
  { date: 'Sep 5', success: 310, failed: 15 },
  { date: 'Sep 7', success: 295, failed: 10 },
  { date: 'Sep 9', success: 320, failed: 22 },
  { date: 'Sep 11', success: 275, failed: 18 },
  { date: 'Sep 13', success: 340, failed: 9 },
  { date: 'Sep 15', success: 300, failed: 14 },
  { date: 'Sep 17', success: 325, failed: 20 },
  { date: 'Sep 19', success: 290, failed: 11 },
  { date: 'Sep 21', success: 350, failed: 7 },
  { date: 'Sep 23', success: 305, failed: 16 },
  { date: 'Sep 25', success: 330, failed: 13 },
  { date: 'Sep 27', success: 315, failed: 19 },
  { date: 'Sep 30', success: 340, failed: 14 },
];

export const sessionActivity = [
  { date: 'Sep 1', active: 45, anomalies: 2 },
  { date: 'Sep 3', active: 52, anomalies: 1 },
  { date: 'Sep 5', active: 48, anomalies: 3 },
  { date: 'Sep 7', active: 55, anomalies: 0 },
  { date: 'Sep 9', active: 61, anomalies: 2 },
  { date: 'Sep 11', active: 50, anomalies: 1 },
  { date: 'Sep 13', active: 58, anomalies: 0 },
  { date: 'Sep 15', active: 63, anomalies: 4 },
  { date: 'Sep 17', active: 47, anomalies: 1 },
  { date: 'Sep 19', active: 54, anomalies: 0 },
  { date: 'Sep 21', active: 67, anomalies: 2 },
  { date: 'Sep 23', active: 59, anomalies: 1 },
  { date: 'Sep 25', active: 64, anomalies: 0 },
  { date: 'Sep 27', active: 56, anomalies: 3 },
  { date: 'Sep 30', active: 62, anomalies: 5 },
];

export const authMetrics = {
  failedLogins: 143,
  successfulLogins: 2841,
  lockedAccounts: 12,
  mfaEnabled: 78,
  sessionAnomalies: 5,
};

export const applications: Application[] = [
  {
    id: 'app1',
    name: 'World Monitor Web',
    description: 'Primary web application frontend with dashboard and reporting interface.',
    environment: 'Production-like Demo',
    baseUrl: 'https://demo.worldmonitor.app',
    technology: 'React / TypeScript / Tailwind',
    owner: 'Alex Security',
    status: 'Online',
    securityScore: 82,
    lastAssessment: 'Today',
    risk: 'Medium',
  },
  {
    id: 'app2',
    name: 'Mobile Monitor',
    description: 'Mobile companion app for on-the-go security monitoring and alerts.',
    environment: 'Test Environment',
    baseUrl: 'https://mobile-demo.worldmonitor.app',
    technology: 'React Native / Expo',
    owner: 'Jordan Analyst',
    status: 'Online',
    securityScore: 91,
    lastAssessment: 'Yesterday',
    risk: 'Low',
  },
  {
    id: 'app3',
    name: 'Analytics API',
    description: 'RESTful API serving analytics data, metrics, and security event feeds.',
    environment: 'Staging',
    baseUrl: 'https://api-staging.worldmonitor.app',
    technology: 'Node.js / Express / PostgreSQL',
    owner: 'Alex Security',
    status: 'Online',
    securityScore: 74,
    lastAssessment: 'Today',
    risk: 'High',
  },
  {
    id: 'app4',
    name: 'Auth Service',
    description: 'Centralized authentication and session management service.',
    environment: 'Production-like Demo',
    baseUrl: 'https://auth-demo.worldmonitor.app',
    technology: 'Go / OAuth2 / JWT',
    owner: 'Alex Security',
    status: 'Online',
    securityScore: 87,
    lastAssessment: '2 days ago',
    risk: 'Low',
  },
  {
    id: 'app5',
    name: 'Report Generator',
    description: 'Automated security report generation and PDF export service.',
    environment: 'Staging',
    baseUrl: 'https://reports-staging.worldmonitor.app',
    technology: 'Python / FastAPI / WeasyPrint',
    owner: 'Sam Viewer',
    status: 'Maintenance',
    securityScore: 69,
    lastAssessment: '3 days ago',
    risk: 'High',
  },
  {
    id: 'app6',
    name: 'WebSocket Gateway',
    description: 'Real-time event streaming gateway for live security alerts.',
    environment: 'Test Environment',
    baseUrl: 'wss://ws-demo.worldmonitor.app',
    technology: 'Node.js / ws / Redis',
    owner: 'Jordan Analyst',
    status: 'Online',
    securityScore: 85,
    lastAssessment: 'Yesterday',
    risk: 'Medium',
  },
];

export const vulnerabilities: Vulnerability[] = [
  {
    id: 'WM-001',
    title: 'Broken Access Control',
    severity: 'High',
    component: 'API Authorization',
    status: 'Open',
    detected: 'Today',
    aiConfidence: 94,
    cvss: 7.5,
    cwe: 'CWE-862',
    description:
      'The API endpoint /api/admin/users does not enforce server-side authorization checks. An authenticated user with non-admin privileges can access admin-only resources by directly requesting the endpoint.',
    impact:
      'An attacker with any valid account could access administrative functions, view all user accounts, and potentially modify user roles, leading to privilege escalation.',
    evidence:
      'Request: GET /api/admin/users with standard user token returned HTTP 200 with full user list. Expected: HTTP 403 Forbidden. Response contained 247 user records including email addresses and role assignments.',
    stepsToReproduce:
      '1. Authenticate as a standard user (non-admin). 2. Obtain the JWT token from the session. 3. Send GET /api/admin/users with the bearer token. 4. Observe the response returns the full user list instead of a 403 error.',
    expectedBehavior:
      'The server should verify the user role before processing the request and return HTTP 403 Forbidden for non-admin users.',
    observedBehavior:
      'The server processes the request and returns the complete user list regardless of the caller role.',
    remediation:
      'Implement server-side authorization middleware that checks the user role for every protected resource. Apply role-based access control (RBAC) checks at the API gateway and controller level. Add automated tests for authorization bypass scenarios.',
    retestStatus: 'Pending — scheduled for next assessment cycle',
    history: [
      { date: 'Sep 30', action: 'Vulnerability detected by AI analyzer', user: 'AI Assistant' },
      { date: 'Sep 30', action: 'Triage assigned to Jordan Analyst', user: 'Alex Security' },
    ],
  },
  {
    id: 'WM-002',
    title: 'Missing Security Headers',
    severity: 'Medium',
    component: 'Web Server',
    status: 'Open',
    detected: 'Today',
    aiConfidence: 97,
    cvss: 5.3,
    cwe: 'CWE-693',
    description:
      'The web server response is missing critical security headers including Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Strict-Transport-Security.',
    impact:
      'Without these headers, the application is more vulnerable to clickjacking, MIME-type sniffing attacks, and cross-site scripting (XSS) vectors.',
    evidence:
      'HTTP response headers analyzed. Missing: Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Strict-Transport-Security: max-age=31536000.',
    stepsToReproduce:
      '1. Navigate to the application URL. 2. Open browser developer tools. 3. Inspect the Network tab response headers. 4. Note the absence of security headers.',
    expectedBehavior:
      'All responses should include Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Strict-Transport-Security headers.',
    observedBehavior:
      'Responses are missing all four critical security headers.',
    remediation:
      'Configure the web server or application framework to set security headers on all responses. Use a middleware or server configuration to add: CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, HSTS with at least 1 year max-age.',
    retestStatus: 'Pending',
    history: [
      { date: 'Sep 30', action: 'Detected during automated header scan', user: 'AI Assistant' },
    ],
  },
  {
    id: 'WM-003',
    title: 'Weak Session Timeout',
    severity: 'Medium',
    component: 'Authentication',
    status: 'Open',
    detected: 'Yesterday',
    aiConfidence: 89,
    cvss: 4.2,
    cwe: 'CWE-613',
    description:
      'Session tokens do not expire after a reasonable period of inactivity. The configured idle timeout is 8 hours, exceeding the recommended 15-30 minute window.',
    impact:
      'If a session token is stolen or a user walks away from their workstation, the attacker has an extended window to use the session for unauthorized actions.',
    evidence:
      'Session token remained valid after 4 hours of inactivity. Configuration review shows idle_timeout: 28800 seconds (8 hours). Recommended maximum: 1800 seconds (30 minutes).',
    stepsToReproduce:
      '1. Log in to the application. 2. Record the session token. 3. Wait 2+ hours without activity. 4. Make a request with the original token. 5. Observe the session is still valid.',
    expectedBehavior:
      'Sessions should expire after 15-30 minutes of inactivity, requiring re-authentication.',
    observedBehavior:
      'Sessions remain valid for up to 8 hours of inactivity.',
    remediation:
      'Reduce the idle session timeout to 15-30 minutes. Implement sliding expiration with an absolute maximum session lifetime of 8 hours. Add server-side session invalidation on timeout.',
    retestStatus: 'Pending',
    history: [
      { date: 'Sep 29', action: 'Identified during authentication assessment', user: 'Jordan Analyst' },
    ],
  },
  {
    id: 'WM-004',
    title: 'Sensitive Data Exposure',
    severity: 'High',
    component: 'API Response',
    status: 'Investigating',
    detected: 'Yesterday',
    aiConfidence: 91,
    cvss: 7.4,
    cwe: 'CWE-200',
    description:
      'The API response from /api/users/:id includes sensitive fields (password_hash, security_question, mfa_secret) that should not be exposed to any client.',
    impact:
      'Exposure of password hashes and MFA secrets could allow offline attacks and bypass of multi-factor authentication, leading to account compromise.',
    evidence:
      'GET /api/users/42 returned JSON with fields: password_hash, security_question, mfa_secret, api_key. These fields should be excluded from all API responses.',
    stepsToReproduce:
      '1. Authenticate with a valid token. 2. Request GET /api/users/42. 3. Examine the JSON response body. 4. Note the presence of sensitive fields.',
    expectedBehavior:
      'The API response should only contain non-sensitive user profile fields (name, email, role, created_at).',
    observedBehavior:
      'The response includes password_hash, security_question, mfa_secret, and api_key fields.',
    remediation:
      'Implement response serialization with explicit allowlists for each endpoint. Never expose credential-related fields. Use DTOs (Data Transfer Objects) to control which fields are serialized. Add automated tests to verify sensitive fields are excluded.',
    retestStatus: 'In progress — fix being deployed to staging',
    history: [
      { date: 'Sep 29', action: 'Detected by AI response analysis', user: 'AI Assistant' },
      { date: 'Sep 29', action: 'Status changed to Investigating', user: 'Jordan Analyst' },
      { date: 'Sep 30', action: 'Fix in development', user: 'Alex Security' },
    ],
  },
  {
    id: 'WM-005',
    title: 'Insecure Direct Object Reference',
    severity: 'Critical',
    component: 'API Authorization',
    status: 'Open',
    detected: '2 days ago',
    aiConfidence: 96,
    cvss: 9.1,
    cwe: 'CWE-639',
    description:
      'The endpoint /api/reports/:id does not validate that the requesting user owns or has access to the requested report. Any authenticated user can access any report by incrementing the ID.',
    impact:
      'An attacker can access all reports in the system, including those belonging to other users, potentially exposing confidential security findings and assessment data.',
    evidence:
      'User A (ID: 15) requested GET /api/reports/3 (owned by User B, ID: 27). Response: HTTP 200 with full report content. This confirms IDOR vulnerability.',
    stepsToReproduce:
      '1. Authenticate as User A. 2. Identify a report ID belonging to another user. 3. Send GET /api/reports/:id with User A token. 4. Observe successful access to the report.',
    expectedBehavior:
      'The server should verify the requesting user owns or has been granted access to the report, returning 403 otherwise.',
    observedBehavior:
      'The server returns the report for any authenticated user regardless of ownership.',
    remediation:
      'Add ownership and access control checks for all object-level API endpoints. Implement indirect references (map IDs to user-scoped tokens). Add automated authorization tests for every object-access endpoint.',
    retestStatus: 'Pending — prioritized for immediate fix',
    history: [
      { date: 'Sep 28', action: 'Critical vulnerability detected', user: 'AI Assistant' },
      { date: 'Sep 28', action: 'Escalated to security admin', user: 'Jordan Analyst' },
      { date: 'Sep 29', action: 'Remediation plan created', user: 'Alex Security' },
    ],
  },
  {
    id: 'WM-006',
    title: 'Cross-Site Scripting (Reflected)',
    severity: 'High',
    component: 'Search Input',
    status: 'Retesting',
    detected: '3 days ago',
    aiConfidence: 88,
    cvss: 6.1,
    cwe: 'CWE-79',
    description:
      'The search endpoint reflects user input into the HTML response without proper output encoding, allowing reflected XSS attacks.',
    impact:
      'An attacker can craft a malicious URL that executes JavaScript in the victim browser, potentially stealing session tokens or performing actions on behalf of the user.',
    evidence:
      'Search query "test<script>alert(document.cookie)</script>" was reflected unencoded in the response HTML. The script tag was executed in the browser.',
    stepsToReproduce:
      '1. Navigate to the search page. 2. Enter: test<img src=x onerror=alert(1)>. 3. Submit the search. 4. Observe JavaScript execution.',
    expectedBehavior:
      'All user input reflected in HTML should be properly encoded to prevent script execution.',
    observedBehavior:
      'User input is reflected without encoding, allowing script injection.',
    remediation:
      'Apply context-aware output encoding for all user input reflected in HTML. Use a modern templating engine with auto-escaping. Implement Content-Security-Policy as defense-in-depth.',
    retestStatus: 'Retesting in progress — fix deployed to staging',
    history: [
      { date: 'Sep 27', action: 'XSS detected during web assessment', user: 'AI Assistant' },
      { date: 'Sep 28', action: 'Fix implemented', user: 'Jordan Analyst' },
      { date: 'Sep 30', action: 'Retest started on staging', user: 'AI Assistant' },
    ],
  },
  {
    id: 'WM-007',
    title: 'TLS Misconfiguration',
    severity: 'Medium',
    component: 'Communication Security',
    status: 'Open',
    detected: '4 days ago',
    aiConfidence: 95,
    cvss: 5.9,
    cwe: 'CWE-326',
    description:
      'The server supports deprecated TLS 1.0 and weak cipher suites, which do not meet modern security standards.',
    impact:
      'Use of weak TLS versions and cipher suites makes encrypted communications susceptible to interception and downgrade attacks.',
    evidence:
      'TLS scan results: Server supports TLS 1.0. Cipher suites include TLS_RSA_WITH_3DES_EDE_CBC_SHA (weak). Grade: C on SSL Labs test.',
    stepsToReproduce:
      '1. Run a TLS scan against the target host. 2. Observe support for TLS 1.0 and weak ciphers. 3. Verify the server accepts connections with deprecated protocols.',
    expectedBehavior:
      'Server should only support TLS 1.2+ with strong, forward-secret cipher suites.',
    observedBehavior:
      'Server accepts TLS 1.0 and weak cipher suites.',
    remediation:
      'Disable TLS 1.0 and 1.1. Enable only TLS 1.2 and 1.3. Remove weak cipher suites and prefer AEAD ciphers with forward secrecy. Target SSL Labs grade A or A+.',
    retestStatus: 'Pending',
    history: [
      { date: 'Sep 26', action: 'TLS scan completed', user: 'AI Assistant' },
    ],
  },
  {
    id: 'WM-008',
    title: 'Rate Limiting Absent',
    severity: 'Low',
    component: 'API Gateway',
    status: 'Resolved',
    detected: '5 days ago',
    aiConfidence: 92,
    cvss: 3.7,
    cwe: 'CWE-770',
    description:
      'The login endpoint did not implement rate limiting, allowing brute-force attacks against user credentials.',
    impact:
      'Without rate limiting, an attacker can attempt thousands of login attempts per second, increasing the risk of credential compromise.',
    evidence:
      '1000 login requests sent in 10 seconds, all processed without throttling or blocking. No 429 Too Many Requests responses observed.',
    stepsToReproduce:
      '1. Send rapid login requests to /api/auth/login. 2. Observe no rate limiting is applied. 3. All requests receive 200/401 responses.',
    expectedBehavior:
      'The login endpoint should enforce rate limiting (e.g., 5 attempts per minute per IP) and return 429 after the threshold.',
    observedBehavior:
      'No rate limiting was applied (now resolved).',
    remediation:
      'Implemented rate limiting middleware: 5 login attempts per minute per IP, exponential backoff, and temporary IP blocking after 20 failures. Verified with retest.',
    retestStatus: 'Resolved — verified on Sep 30',
    history: [
      { date: 'Sep 25', action: 'Detected during API assessment', user: 'AI Assistant' },
      { date: 'Sep 26', action: 'Rate limiting middleware added', user: 'Alex Security' },
      { date: 'Sep 30', action: 'Retest passed, marked Resolved', user: 'AI Assistant' },
    ],
  },
];

export const endpoints: Endpoint[] = [
  { id: 'e1', path: '/api/users', method: 'GET', auth: 'Required', authorization: 'Required', risk: 'Low', status: 'Secure' },
  { id: 'e2', path: '/api/users/:id', method: 'GET', auth: 'Required', authorization: 'Owner/Admin', risk: 'Medium', status: 'Review' },
  { id: 'e3', path: '/api/reports', method: 'GET', auth: 'Required', authorization: 'Required', risk: 'Medium', status: 'Review' },
  { id: 'e4', path: '/api/reports/:id', method: 'GET', auth: 'Required', authorization: 'Owner', risk: 'High', status: 'At Risk' },
  { id: 'e5', path: '/api/admin/users', method: 'GET', auth: 'Required', authorization: 'Admin', risk: 'High', status: 'At Risk' },
  { id: 'e6', path: '/api/auth/login', method: 'POST', auth: 'Public', authorization: 'N/A', risk: 'Low', status: 'Secure' },
  { id: 'e7', path: '/api/auth/refresh', method: 'POST', auth: 'Required', authorization: 'N/A', risk: 'Low', status: 'Secure' },
  { id: 'e8', path: '/api/auth/logout', method: 'POST', auth: 'Required', authorization: 'N/A', risk: 'Low', status: 'Secure' },
  { id: 'e9', path: '/api/settings', method: 'PUT', auth: 'Required', authorization: 'Owner', risk: 'Medium', status: 'Review' },
  { id: 'e10', path: '/api/admin/settings', method: 'PUT', auth: 'Required', authorization: 'Admin', risk: 'High', status: 'At Risk' },
  { id: 'e11', path: '/api/upload', method: 'POST', auth: 'Required', authorization: 'Required', risk: 'Medium', status: 'Review' },
  { id: 'e12', path: '/api/health', method: 'GET', auth: 'Public', authorization: 'N/A', risk: 'Low', status: 'Secure' },
];

export const logEntries: LogEntry[] = [
  { id: 'l1', timestamp: '14:32:01', level: 'ERROR', source: 'Auth Service', message: 'Failed login attempt for user admin@demo (attempt 5/5)', category: 'security' },
  { id: 'l2', timestamp: '14:31:58', level: 'WARN', source: 'Auth Service', message: 'Failed login attempt for user admin@demo (attempt 4/5)', category: 'suspicious' },
  { id: 'l3', timestamp: '14:31:55', level: 'WARN', source: 'Auth Service', message: 'Failed login attempt for user admin@demo (attempt 3/5)', category: 'suspicious' },
  { id: 'l4', timestamp: '14:31:52', level: 'INFO', source: 'Auth Service', message: 'Failed login attempt for user admin@demo (attempt 2/5)', category: 'normal' },
  { id: 'l5', timestamp: '14:31:49', level: 'INFO', source: 'Auth Service', message: 'Failed login attempt for user admin@demo (attempt 1/5)', category: 'normal' },
  { id: 'l6', timestamp: '14:28:30', level: 'INFO', source: 'API Gateway', message: 'GET /api/users 200 — 45ms', category: 'normal' },
  { id: 'l7', timestamp: '14:28:25', level: 'INFO', source: 'API Gateway', message: 'GET /api/reports 200 — 62ms', category: 'normal' },
  { id: 'l8', timestamp: '14:27:15', level: 'CRITICAL', source: 'Auth Service', message: 'Account locked: admin@demo — too many failed attempts', category: 'security' },
  { id: 'l9', timestamp: '14:25:00', level: 'INFO', source: 'API Gateway', message: 'POST /api/auth/login 200 — 120ms', category: 'normal' },
  { id: 'l10', timestamp: '14:24:10', level: 'WARN', source: 'API Gateway', message: 'Unusual request pattern: 150 requests/min from IP 10.0.0.42', category: 'suspicious' },
  { id: 'l11', timestamp: '14:23:05', level: 'ERROR', source: 'API Gateway', message: 'GET /api/admin/users 403 — Unauthorized access attempt', category: 'security' },
  { id: 'l12', timestamp: '14:22:30', level: 'INFO', source: 'WebSocket', message: 'New client connected — session: a8f3d2', category: 'normal' },
  { id: 'l13', timestamp: '14:21:15', level: 'WARN', source: 'API Gateway', message: 'Rate limit warning: /api/auth/login approaching threshold', category: 'suspicious' },
  { id: 'l14', timestamp: '14:20:00', level: 'INFO', source: 'Report Service', message: 'Report WM-001 generated successfully', category: 'normal' },
  { id: 'l15', timestamp: '14:18:45', level: 'ERROR', source: 'Auth Service', message: 'Token validation failed — expired JWT presented', category: 'security' },
  { id: 'l16', timestamp: '14:15:30', level: 'INFO', source: 'API Gateway', message: 'GET /api/health 200 — 12ms', category: 'normal' },
];

export const notifications = [
  { id: 'n1', title: 'Critical: IDOR vulnerability WM-005 detected', time: '5 min ago', type: 'critical' },
  { id: 'n2', title: 'AI Alert: Unusual login pattern on Auth Service', time: '12 min ago', type: 'warning' },
  { id: 'n3', title: 'Assessment completed: Analytics API', time: '1 hour ago', type: 'info' },
  { id: 'n4', title: 'Vulnerability WM-008 resolved', time: '2 hours ago', type: 'success' },
  { id: 'n5', title: 'New assessment scheduled for World Monitor Web', time: '3 hours ago', type: 'info' },
];

export const aiSuggestions = [
  'Analyze my latest findings',
  'Explain this vulnerability',
  'Summarize today\'s security events',
  'What evidence should I collect?',
  'Generate remediation recommendations',
  'Create a security report',
  'Explain this API response',
];

// AI response generator — produces contextual responses based on keywords
export function generateAIResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('latest') || q.includes('findings') || q.includes('recent')) {
    return `Based on the latest assessment data, here is a summary of your current findings:

• 2 Critical vulnerabilities (WM-005: IDOR, WM-001: Broken Access Control)
• 3 High severity issues (WM-004: Sensitive Data Exposure, WM-006: Reflected XSS)
• 3 Medium severity findings (WM-002, WM-003, WM-007)
• 1 Resolved issue (WM-008: Rate Limiting)

Priority recommendation: Address WM-005 (IDOR) immediately — it has a CVSS of 9.1 and allows any authenticated user to access other users' reports. The fix requires adding ownership checks to the /api/reports/:id endpoint.

Your overall security score is 82/100 (Good Posture). The weakest area is Authorization at 76%.`;
  }

  if (q.includes('explain') && (q.includes('vuln') || q.includes('idor') || q.includes('wm-005'))) {
    return `WM-005 — Insecure Direct Object Reference (IDOR):

This vulnerability occurs when an application uses user-supplied input to access objects directly without verifying authorization. In your case, the endpoint /api/reports/:id accepts any report ID from any authenticated user without checking ownership.

Why it matters: An attacker with a basic account can enumerate report IDs and access confidential security findings belonging to other users or the entire organization. This is a Critical severity issue (CVSS 9.1) because it requires only a valid login to exploit.

The fix: Implement server-side ownership validation. Before returning a report, the server must verify that the requesting user's ID matches the report's owner ID, or that the user has an admin role. Use indirect references (mapping user-scoped tokens to internal IDs) as additional defense.`;
  }

  if (q.includes('summar') && (q.includes('event') || q.includes('today') || q.includes('security'))) {
    return `Today's Security Events Summary:

• 2 new vulnerabilities detected by AI analysis
• 143 failed login attempts recorded (elevated from yesterday's 127)
• 1 account auto-locked due to brute-force detection (admin@demo)
• 5 session anomalies flagged for review
• 1 vulnerability retest passed (WM-008: Rate Limiting — now Resolved)
• AI generated 7 security alerts, 2 critical

Top concern: The spike in failed logins combined with the IDOR finding suggests an active probing attempt. Recommend reviewing access logs for the Auth Service and verifying that account lockout policies are functioning correctly.

Security score trend: 82 → stable over the past 3 days, up from 74 at the start of the month.`;
  }

  if (q.includes('evidence') || q.includes('collect')) {
    return `Evidence Collection Guide for Security Findings:

For each vulnerability, collect the following:

1. Request/Response Capture: Save the full HTTP request and response (headers + body) that demonstrates the issue. Use browser dev tools or a proxy tool.

2. Screenshots: Capture the vulnerability in action — error messages, exposed data, or unexpected behavior visible in the UI.

3. Environment Details: Record the target URL, application version, test date, and tester identity.

4. Reproduction Steps: Document exact, numbered steps that another tester can follow to reproduce the finding.

5. Impact Evidence: Show what data or functionality is exposed. For IDOR, demonstrate accessing another user's resource. For XSS, show script execution.

6. AI Analysis Output: Include the AI analyzer's confidence score and classification for corroboration.

Remember: All evidence collection must be performed only against explicitly authorized test targets.`;
  }

  if (q.includes('remediation') || q.includes('recommend') || q.includes('fix')) {
    return `Remediation Recommendations (Prioritized):

1. CRITICAL — WM-005 (IDOR): Add ownership checks to /api/reports/:id. Verify auth.uid() === report.owner_id on every object access. Estimated effort: 4 hours.

2. HIGH — WM-001 (Broken Access Control): Implement RBAC middleware for /api/admin/users. Add role-check decorator to all admin endpoints. Estimated effort: 6 hours.

3. HIGH — WM-004 (Sensitive Data Exposure): Create response DTOs with field allowlists. Remove password_hash, mfa_secret from serialization. Estimated effort: 8 hours.

4. HIGH — WM-006 (XSS): Enable context-aware output encoding in the search template. Add CSP header. Estimated effort: 3 hours (fix in progress).

5. MEDIUM — WM-002 (Security Headers): Add helmet middleware or equivalent. Estimated effort: 1 hour.

6. MEDIUM — WM-003 (Session Timeout): Reduce idle timeout to 30 minutes. Estimated effort: 1 hour.

7. MEDIUM — WM-007 (TLS): Disable TLS 1.0/1.1, update cipher suite config. Estimated effort: 2 hours.

Timeline recommendation: Address items 1-4 within 48 hours. Items 5-7 within 1 week.`;
  }

  if (q.includes('report') || q.includes('create') || q.includes('generate')) {
    return `Security Assessment Report — Summary:

Executive Summary:
The World Monitor platform underwent authorized security testing across 6 applications. The overall security score is 82/100, indicating a Good Security Posture with areas for improvement.

Key Findings:
• 8 total vulnerabilities identified (2 Critical, 2 High, 3 Medium, 1 Resolved)
• Authorization is the weakest security domain (76%)
• Communication Security is the strongest (91%)

Risk Assessment:
The IDOR vulnerability (WM-005) represents the highest immediate risk, potentially exposing all user reports to unauthorized access. Combined with the Broken Access Control finding (WM-001), the authorization layer requires urgent attention.

Positive Indicators:
• Rate limiting has been successfully implemented and verified
• MFA adoption at 78% and increasing
• Security score improved 8 points over 30 days

Recommendation: Prioritize authorization fixes, then address data exposure and input validation issues. Projected post-remediation score: 91/100.`;
  }

  if (q.includes('api') && (q.includes('response') || q.includes('explain'))) {
    return `API Response Analysis:

Based on your API security data:

• 128 total endpoints monitored
• 103 require authentication (80%)
• 25 are public endpoints
• 7 potential issues identified

The highest-risk endpoints are:
1. /api/reports/:id — IDOR vulnerability (Critical)
2. /api/admin/users — Missing authorization (High)
3. /api/admin/settings — Missing authorization (High)

Recommendation: Audit all endpoints with "Admin" or "Owner" authorization requirements. Implement a centralized authorization middleware that validates roles and ownership for every request. Add automated API security tests that verify each endpoint returns 403 for unauthorized users.`;
  }

  return `I can help you with security analysis in the following areas:

• Analyze latest vulnerability findings and patterns
• Explain specific vulnerabilities and their impact
• Summarize security events and trends
• Guide evidence collection for findings
• Generate prioritized remediation recommendations
• Create executive security reports
• Analyze API responses and endpoint security

Note: I operate in Safe Assessment Mode. I can only analyze data you provide — I do not perform live testing, exploitation, or attacks against any system.

Try asking: "Analyze my latest findings" or "Explain the IDOR vulnerability"`;
}

// ============================================================
// Access Control Tester — mock data
// ============================================================

export const authzTestUsers = [
  { id: 'tu1', name: 'Demo Analyst', role: 'analyst' },
  { id: 'tu2', name: 'Admin User', role: 'admin' },
  { id: 'tu3', name: 'Sam Viewer', role: 'viewer' },
];

export const authzTestResources = [
  'Admin User Management',
  'Report Viewer',
  'API Settings',
  'Security Logs',
  'Vulnerability Editor',
  'System Configuration',
];

export const authzTestResults: AuthzTestResult[] = [
  { id: 'az1', user: 'Demo Analyst', role: 'analyst', resource: 'Admin User Management', expectedPermission: 'DENY', observedPermission: 'DENY', result: 'PASS', timestamp: '08:31:22' },
  { id: 'az2', user: 'Demo Analyst', role: 'analyst', resource: 'Report Viewer', expectedPermission: 'ALLOW', observedPermission: 'ALLOW', result: 'PASS', timestamp: '08:31:28' },
  { id: 'az3', user: 'Sam Viewer', role: 'viewer', resource: 'Vulnerability Editor', expectedPermission: 'DENY', observedPermission: 'ALLOW', result: 'FAIL', timestamp: '08:31:35' },
  { id: 'az4', user: 'Admin User', role: 'admin', resource: 'System Configuration', expectedPermission: 'ALLOW', observedPermission: 'ALLOW', result: 'PASS', timestamp: '08:31:42' },
  { id: 'az5', user: 'Sam Viewer', role: 'viewer', resource: 'Security Logs', expectedPermission: 'ALLOW', observedPermission: 'ALLOW', result: 'PASS', timestamp: '08:31:48' },
  { id: 'az6', user: 'Demo Analyst', role: 'analyst', resource: 'API Settings', expectedPermission: 'DENY', observedPermission: 'DENY', result: 'PASS', timestamp: '08:31:55' },
];

// ============================================================
// Client-Side Security — mock data
// ============================================================

export const clientSecurityChecks: ClientSecurityCheck[] = [
  { id: 'cs1', category: 'Security Headers', item: 'HTTPS', status: 'pass', detail: 'Enabled — all traffic redirected to HTTPS' },
  { id: 'cs2', category: 'Security Headers', item: 'Content-Security-Policy', status: 'warn', detail: 'Needs Review — policy is too permissive' },
  { id: 'cs3', category: 'Security Headers', item: 'X-Frame-Options', status: 'pass', detail: 'DENY — clickjacking protection active' },
  { id: 'cs4', category: 'Security Headers', item: 'X-Content-Type-Options', status: 'pass', detail: 'nosniff — MIME sniffing disabled' },
  { id: 'cs5', category: 'Cookie Security', item: 'Secure Cookies', status: 'pass', detail: 'Enabled — cookies sent only over HTTPS' },
  { id: 'cs6', category: 'Cookie Security', item: 'HttpOnly', status: 'pass', detail: 'Enabled — cookies not accessible via JavaScript' },
  { id: 'cs7', category: 'Cookie Security', item: 'SameSite', status: 'pass', detail: 'Strict — CSRF protection active' },
  { id: 'cs8', category: 'Browser Storage', item: 'localStorage', status: 'warn', detail: 'Sensitive data detected in localStorage' },
  { id: 'cs9', category: 'Browser Storage', item: 'sessionStorage', status: 'pass', detail: 'No sensitive data stored' },
  { id: 'cs10', category: 'Browser Storage', item: 'IndexedDB', status: 'pass', detail: 'Encrypted at rest' },
  { id: 'cs11', category: 'JavaScript Configuration', item: 'Debug Mode', status: 'pass', detail: 'Disabled in production build' },
  { id: 'cs12', category: 'JavaScript Configuration', item: 'Source Maps', status: 'warn', detail: 'Source maps exposed on production server' },
  { id: 'cs13', category: 'JavaScript Configuration', item: 'Console Logging', status: 'pass', detail: 'Stripped in production build' },
  { id: 'cs14', category: 'Source Map Exposure', item: 'Source Map Files', status: 'warn', detail: '.map files accessible on public paths' },
  { id: 'cs15', category: 'Source Map Exposure', item: 'Webpack Devtools', status: 'pass', detail: 'Not exposed in production' },
];

// ============================================================
// Communication Security — mock data
// ============================================================

export const commSecurityItems: CommSecurityItem[] = [
  { id: 'com1', label: 'HTTPS', value: 'SECURE', status: 'secure', detail: 'All traffic encrypted via HTTPS with HSTS preload' },
  { id: 'com2', label: 'TLS Version', value: '1.3', status: 'secure', detail: 'Latest TLS protocol — TLS 1.2 also supported' },
  { id: 'com3', label: 'Certificate Status', value: 'VALID', status: 'secure', detail: 'Valid until Mar 2027 — issued by Let\'s Encrypt' },
  { id: 'com4', label: 'HSTS', value: 'ENABLED', status: 'secure', detail: 'max-age=31536000; includeSubDomains; preload' },
  { id: 'com5', label: 'Content-Security-Policy', value: 'WARN', status: 'warn', detail: 'Policy present but includes unsafe-inline directives' },
  { id: 'com6', label: 'X-Frame-Options', value: 'DENY', status: 'secure', detail: 'Clickjacking protection enforced' },
  { id: 'com7', label: 'X-Content-Type-Options', value: 'nosniff', status: 'secure', detail: 'MIME sniffing disabled' },
  { id: 'com8', label: 'Referrer-Policy', value: 'strict-origin', status: 'secure', detail: 'Only origin sent on cross-origin requests' },
  { id: 'com9', label: 'Permissions-Policy', value: 'ENABLED', status: 'secure', detail: 'Camera, microphone, geolocation restricted' },
];

// ============================================================
// Data Protection — mock data
// ============================================================

export const dataProtectionMetrics = {
  encryptedData: 94,
  sensitiveFieldsProtected: 98,
  piiExposureAlerts: 3,
  unprotectedStorage: 0,
};

export const dataProtectionCategories: DataProtectionCategory[] = [
  { name: 'Personal Data', encrypted: 96, total: 100, status: 'secure' },
  { name: 'Authentication Data', encrypted: 100, total: 100, status: 'secure' },
  { name: 'Application Data', encrypted: 88, total: 100, status: 'warn' },
  { name: 'Logs', encrypted: 92, total: 100, status: 'secure' },
  { name: 'Backups', encrypted: 90, total: 100, status: 'secure' },
];

// ============================================================
// Live Monitor — mock data
// ============================================================

export const liveEventTemplates = [
  { type: 'login' as const, message: 'Successful login', detail: 'Test User', severity: 'info' as const },
  { type: 'login' as const, message: 'Failed login attempt', detail: 'unknown@demo', severity: 'warn' as const },
  { type: 'api' as const, message: 'API request', detail: '/api/reports', severity: 'info' as const },
  { type: 'api' as const, message: 'API request', detail: '/api/users/42', severity: 'info' as const },
  { type: 'authz' as const, message: 'Authorization check', detail: 'PASS', severity: 'info' as const },
  { type: 'authz' as const, message: 'Authorization check', detail: 'FAIL — access denied', severity: 'warn' as const },
  { type: 'anomaly' as const, message: 'AI anomaly detected', detail: 'Low', severity: 'info' as const },
  { type: 'anomaly' as const, message: 'AI anomaly detected', detail: 'Medium', severity: 'warn' as const },
  { type: 'anomaly' as const, message: 'AI anomaly detected', detail: 'High', severity: 'critical' as const },
  { type: 'info' as const, message: 'Session token refreshed', detail: 'user: jordan_a', severity: 'info' as const },
  { type: 'info' as const, message: 'Rate limit threshold reached', detail: '/api/auth/login', severity: 'warn' as const },
  { type: 'info' as const, message: 'Security scan completed', detail: 'Analytics API', severity: 'info' as const },
];

// ============================================================
// Alerts — mock data
// ============================================================

export const securityAlerts: SecurityAlert[] = [
  { id: 'al1', severity: 'Critical', title: 'Potential sensitive-data exposure detected', description: 'AI analysis detected password_hash and mfa_secret fields in the /api/users/:id response body. This data should never be exposed to any client.', status: 'New', assignedTo: null, time: '5 min ago' },
  { id: 'al2', severity: 'High', title: 'Authorization behavior requires review', description: 'The endpoint /api/admin/users returned HTTP 200 for a non-admin user during the latest access control test. Server-side authorization may be missing.', status: 'New', assignedTo: null, time: '12 min ago' },
  { id: 'al3', severity: 'Medium', title: 'Security header configuration needs improvement', description: 'Content-Security-Policy header contains unsafe-inline directives. Source maps are exposed on the production server.', status: 'Reviewed', assignedTo: null, time: '1 hour ago' },
  { id: 'al4', severity: 'Low', title: 'Session timeout exceeds recommended threshold', description: 'Idle session timeout is set to 8 hours. OWASP recommends 15-30 minutes for sensitive applications.', status: 'Assigned', assignedTo: 'Jordan Analyst', time: '2 hours ago' },
  { id: 'al5', severity: 'Informational', title: 'Rate limiting successfully implemented', description: 'The /api/auth/login endpoint now enforces 5 attempts per minute per IP with exponential backoff. Retest passed.', status: 'Resolved', assignedTo: 'Alex Security', time: '3 hours ago' },
  { id: 'al6', severity: 'High', title: 'IDOR vulnerability confirmed on /api/reports/:id', description: 'Any authenticated user can access any report by incrementing the ID parameter. Ownership validation is missing.', status: 'Investigating', assignedTo: 'Jordan Analyst', time: '4 hours ago' },
  { id: 'al7', severity: 'Medium', title: 'TLS configuration supports deprecated protocols', description: 'Server accepts TLS 1.0 connections and weak cipher suites. Upgrade to TLS 1.2+ required.', status: 'New', assignedTo: null, time: '5 hours ago' },
  { id: 'al8', severity: 'Informational', title: 'Security score improved by 8 points', description: 'Overall security score increased from 74 to 82 over the past 30 days. Authorization layer remains the weakest area.', status: 'Reviewed', assignedTo: null, time: '6 hours ago' },
];

// ============================================================
// Report Generator — mock data
// ============================================================

export const reportSections: ReportSection[] = [
  { id: 'rs1', title: 'Executive Summary', included: true },
  { id: 'rs2', title: 'Scope', included: true },
  { id: 'rs3', title: 'Methodology', included: true },
  { id: 'rs4', title: 'Applications Tested', included: true },
  { id: 'rs5', title: 'Findings', included: true },
  { id: 'rs6', title: 'Risk Assessment', included: true },
  { id: 'rs7', title: 'Evidence', included: true },
  { id: 'rs8', title: 'Business Impact', included: true },
  { id: 'rs9', title: 'Recommendations', included: true },
  { id: 'rs10', title: 'Retesting', included: true },
  { id: 'rs11', title: 'Conclusion', included: true },
];

export const reportOptions = [
  'Executive Summary',
  'Technical Findings',
  'Risk Assessment',
  'Evidence',
  'Remediation',
  'Retest Results',
];

export function generateReportContent(includedSections: string[]): string {
  const sections: Record<string, string> = {
    'Executive Summary': `EXECUTIVE SUMMARY

The World Monitor platform underwent authorized security testing across 6 applications in a production-like demo environment. The overall security score is 82/100, indicating a Good Security Posture with specific areas requiring immediate attention.

Key highlights:
- 8 total vulnerabilities identified (2 Critical, 2 High, 3 Medium, 1 Resolved)
- Authorization is the weakest security domain at 76%
- Communication Security is the strongest at 91%
- Security score improved 8 points over the 30-day assessment period

The most significant finding is an Insecure Direct Object Reference (IDOR) vulnerability (WM-005, CVSS 9.1) that allows any authenticated user to access other users' reports without authorization checks.`,

    'Technical Findings': `TECHNICAL FINDINGS

1. WM-005 — Insecure Direct Object Reference (Critical, CVSS 9.1)
   Component: API Authorization
   The endpoint /api/reports/:id does not validate resource ownership. Any authenticated user can access any report by incrementing the ID.
   Evidence: User A (ID: 15) successfully accessed Report #3 owned by User B (ID: 27) via GET /api/reports/3 — HTTP 200 returned.

2. WM-001 — Broken Access Control (High, CVSS 7.5)
   Component: API Authorization
   /api/admin/users lacks server-side role verification. Non-admin users receive HTTP 200 with full user list.
   Evidence: GET /api/admin/users with standard user token returned 247 user records including emails and role assignments.

3. WM-004 — Sensitive Data Exposure (High, CVSS 7.4)
   Component: API Response
   /api/users/:id returns password_hash, security_question, mfa_secret, and api_key fields.
   Evidence: GET /api/users/42 response contained all sensitive fields in plaintext JSON.

4. WM-006 — Cross-Site Scripting, Reflected (High, CVSS 6.1)
   Component: Search Input
   User input is reflected without encoding, allowing script injection.
   Evidence: Search query "test<img src=x onerror=alert(1)>" executed in browser.`,

    'Risk Assessment': `RISK ASSESSMENT

Overall Risk Level: HIGH

Risk by Category:
- Authorization: HIGH RISK — 2 critical findings in access control layer
- Data Protection: MEDIUM RISK — sensitive field exposure confirmed
- Input Validation: MEDIUM RISK — reflected XSS identified
- Communication: LOW RISK — TLS misconfiguration noted but not critical
- Authentication: LOW RISK — session timeout exceeds recommendation

Risk Matrix:
| Finding    | Severity | Likelihood | Impact | Risk Score |
| WM-005     | Critical | High       | High   | 9.1        |
| WM-001     | High     | High       | High   | 7.5        |
| WM-004     | High     | Medium     | High   | 7.4        |
| WM-006     | High     | Medium     | Medium | 6.1        |

The IDOR vulnerability represents the highest immediate risk due to its low exploitation barrier (any valid login) and high data sensitivity impact.`,

    'Evidence': `EVIDENCE

All evidence was collected during authorized testing sessions against the demo environment.

Evidence Package Contents:
1. HTTP request/response captures for each finding (sanitized)
2. Screenshots demonstrating vulnerability exploitation
3. Environment details: demo.worldmonitor.app, test date Sep 30, 2026
4. Step-by-step reproduction instructions for each finding
5. AI analyzer confidence scores and classification outputs
6. TLS scan results from SSL Labs
7. Security header analysis from browser developer tools

Chain of Custody: All evidence stored in encrypted, access-controlled repository. Access logged and audited.

Note: No live exploitation was performed. All testing was conducted in Safe Assessment Mode against explicitly authorized targets only.`,

    'Remediation': `RECOMMENDATIONS

Priority 1 — Immediate (within 48 hours):
- WM-005 (IDOR): Add ownership validation to /api/reports/:id. Verify auth.uid() === report.owner_id. Implement indirect references.
- WM-001 (Broken Access Control): Add RBAC middleware for /api/admin/*. Apply role-check to all admin endpoints.
- WM-004 (Sensitive Data Exposure): Create response DTOs with field allowlists. Remove all credential fields from serialization.

Priority 2 — Short-term (within 1 week):
- WM-006 (XSS): Enable context-aware output encoding. Add CSP header.
- WM-002 (Security Headers): Add helmet middleware or equivalent.
- WM-003 (Session Timeout): Reduce idle timeout to 30 minutes.
- WM-007 (TLS): Disable TLS 1.0/1.1, update cipher suite configuration.

Priority 3 — Ongoing:
- Implement automated authorization tests for every endpoint.
- Add security header validation to CI pipeline.
- Schedule regular retesting of all resolved findings.`,

    'Retest Results': `RETESTING

Retest Status Summary:
- WM-008 (Rate Limiting): RETEST PASSED — Sep 30. Rate limiting middleware verified: 5 attempts/min, exponential backoff, IP blocking after 20 failures. Status: Resolved.
- WM-006 (Reflected XSS): RETEST IN PROGRESS — Fix deployed to staging. Initial results show encoding applied. Awaiting full validation.
- WM-001 through WM-005: RETEST PENDING — Scheduled for next assessment cycle.

Retest Methodology:
1. Re-execute original reproduction steps against remediated endpoint
2. Verify the vulnerability is no longer exploitable
3. Confirm no regressions introduced by the fix
4. Document retest results with evidence captures
5. Update vulnerability status based on retest outcome`,
  };

  return includedSections
    .map((section) => sections[section] || '')
    .filter(Boolean)
    .join('\n\n---\n\n');
}

// ============================================================
// Compliance & Governance — mock data
// ============================================================

export const complianceItems: ComplianceItem[] = [
  { id: 'cp1', label: 'Authorized Testing', status: 'pass', detail: 'All testing conducted within explicitly authorized scope' },
  { id: 'cp2', label: 'Data Privacy', status: 'pass', detail: 'PII handling procedures verified and documented' },
  { id: 'cp3', label: 'Audit Logging', status: 'pass', detail: 'All security events logged with tamper-evident storage' },
  { id: 'cp4', label: 'Role-Based Access', status: 'pass', detail: 'RBAC enforced with 3 roles: admin, analyst, viewer' },
  { id: 'cp5', label: 'Evidence Tracking', status: 'pass', detail: 'Chain of custody maintained for all security findings' },
  { id: 'cp6', label: 'Secure Communication', status: 'pass', detail: 'TLS 1.3 enforced with HSTS preload' },
];

export const complianceFrameworks: ComplianceFramework[] = [
  { id: 'fw1', name: 'OWASP ASVS', description: 'Application Security Verification Standard — comprehensive web app security requirements', url: 'https://owasp.org/www-project-application-security-verification-standard/' },
  { id: 'fw2', name: 'OWASP Top 10', description: 'The ten most critical web application security risks', url: 'https://owasp.org/www-project-top-ten/' },
  { id: 'fw3', name: 'CWE', description: 'Common Weakness Enumeration — community-developed list of software weakness types', url: 'https://cwe.mitre.org/' },
  { id: 'fw4', name: 'CVSS', description: 'Common Vulnerability Scoring System — standardized severity scoring framework', url: 'https://www.first.org/cvss/' },
];

// ============================================================
// Expanded Applications (12 total)
// ============================================================

export const additionalApplications: Application[] = [
  { id: 'app7', name: 'Notification Service', description: 'Email and push notification delivery service for security alerts.', environment: 'Staging', baseUrl: 'https://notify-staging.worldmonitor.app', technology: 'Node.js / SendGrid / FCM', owner: 'Sam Viewer', status: 'Online', securityScore: 88, lastAssessment: '1 day ago', risk: 'Low' },
  { id: 'app8', name: 'File Storage Gateway', description: 'Secure file upload and download gateway with virus scanning.', environment: 'Test Environment', baseUrl: 'https://files-demo.worldmonitor.app', technology: 'Go / MinIO / ClamAV', owner: 'Alex Security', status: 'Online', securityScore: 79, lastAssessment: '2 days ago', risk: 'Medium' },
  { id: 'app9', name: 'Metrics Collector', description: 'Telemetry and metrics aggregation service for security monitoring.', environment: 'Production-like Demo', baseUrl: 'https://metrics-demo.worldmonitor.app', technology: 'Rust / Prometheus / Grafana', owner: 'Jordan Analyst', status: 'Online', securityScore: 92, lastAssessment: 'Today', risk: 'Low' },
  { id: 'app10', name: 'Admin Console', description: 'Internal admin management interface for user and role administration.', environment: 'Production-like Demo', baseUrl: 'https://admin-demo.worldmonitor.app', technology: 'React / TypeScript / Vite', owner: 'Alex Security', status: 'Online', securityScore: 71, lastAssessment: 'Today', risk: 'High' },
  { id: 'app11', name: 'Backup Service', description: 'Automated backup and disaster recovery orchestration service.', environment: 'Staging', baseUrl: 'https://backup-staging.worldmonitor.app', technology: 'Python / Borg / PostgreSQL', owner: 'Sam Viewer', status: 'Maintenance', securityScore: 83, lastAssessment: '4 days ago', risk: 'Medium' },
  { id: 'app12', name: 'Threat Intel Feed', description: 'External threat intelligence aggregation and correlation engine.', environment: 'Test Environment', baseUrl: 'https://threat-demo.worldmonitor.app', technology: 'Python / ElasticSearch / Kafka', owner: 'Jordan Analyst', status: 'Online', securityScore: 86, lastAssessment: 'Yesterday', risk: 'Low' },
];

export const allApplications: Application[] = [...applications, ...additionalApplications];

// ============================================================
// Expanded Vulnerabilities (30 total)
// ============================================================

export const additionalVulnerabilities: Vulnerability[] = [
  { id: 'WM-009', title: 'Insecure Deserialization', severity: 'Critical', component: 'Report Service', status: 'Open', detected: 'Today', aiConfidence: 93, cvss: 9.0, cwe: 'CWE-502', description: 'The report service deserializes untrusted JSON input without validation, allowing object injection attacks.', impact: 'An attacker could inject malicious serialized objects leading to remote code execution on the server.', evidence: 'POST /api/reports/import with crafted payload triggered server-side exception with stack trace.', stepsToReproduce: '1. Craft a malicious JSON payload. 2. POST to /api/reports/import. 3. Observe server exception.', expectedBehavior: 'All deserialized input should be validated against a strict schema.', observedBehavior: 'Server accepts and processes arbitrary JSON without validation.', remediation: 'Implement schema validation before deserialization. Use allowlisted types only. Reject unexpected fields.', retestStatus: 'Pending', history: [{ date: 'Sep 30', action: 'Detected by AI analyzer', user: 'AI Assistant' }] },
  { id: 'WM-010', title: 'SQL Injection', severity: 'Critical', component: 'Analytics API', status: 'Open', detected: 'Today', aiConfidence: 95, cvss: 9.8, cwe: 'CWE-89', description: 'The analytics query endpoint concatenates user input directly into SQL queries.', impact: 'Attackers can extract, modify, or delete the entire database through crafted query parameters.', evidence: 'GET /api/analytics?filter=1 OR 1=1-- returned all records instead of filtered results.', stepsToReproduce: '1. Send GET /api/analytics?filter=1 OR 1=1-- 2. Observe full dataset returned.', expectedBehavior: 'User input should be parameterized and never concatenated into SQL.', observedBehavior: 'Input is directly concatenated into SQL query string.', remediation: 'Use parameterized queries exclusively. Implement input validation and ORM query builders.', retestStatus: 'Pending — critical priority', history: [{ date: 'Sep 30', action: 'Detected during API assessment', user: 'AI Assistant' }] },
  { id: 'WM-011', title: 'CSRF Token Missing', severity: 'Medium', component: 'Admin Console', status: 'Open', detected: 'Yesterday', aiConfidence: 87, cvss: 5.4, cwe: 'CWE-352', description: 'State-changing POST requests lack CSRF token validation.', impact: 'An attacker can craft a malicious page that performs actions on behalf of an authenticated user.', evidence: 'POST /api/admin/settings accepted request without CSRF token from external origin.', stepsToReproduce: '1. Log in to admin console. 2. Visit external page with form posting to /api/admin/settings. 3. Setting changes successfully.', expectedBehavior: 'All state-changing requests must include and validate a CSRF token.', observedBehavior: 'CSRF tokens are not required or validated.', remediation: 'Implement CSRF token generation and validation for all state-changing operations.', retestStatus: 'Pending', history: [{ date: 'Sep 29', action: 'Detected during web assessment', user: 'AI Assistant' }] },
  { id: 'WM-012', title: 'Open Redirect', severity: 'Low', component: 'Auth Service', status: 'Open', detected: '2 days ago', aiConfidence: 91, cvss: 4.3, cwe: 'CWE-601', description: 'The redirect parameter in the login flow accepts arbitrary URLs without validation.', impact: 'Attackers can use the application to redirect users to phishing sites, leveraging the trusted domain.', evidence: 'GET /login?redirect=https://evil.com successfully redirected after login.', stepsToReproduce: '1. Navigate to /login?redirect=https://evil.com. 2. Log in. 3. Observe redirect to evil.com.', expectedBehavior: 'Redirect URLs should be validated against an allowlist of trusted domains.', observedBehavior: 'Any URL is accepted as a redirect target.', remediation: 'Implement redirect URL allowlist validation. Only permit same-origin redirects.', retestStatus: 'Pending', history: [{ date: 'Sep 28', action: 'Detected during auth assessment', user: 'Jordan Analyst' }] },
  { id: 'WM-013', title: 'Excessive Error Detail', severity: 'Low', component: 'File Storage Gateway', status: 'Open', detected: '2 days ago', aiConfidence: 88, cvss: 3.5, cwe: 'CWE-209', description: 'Server error responses include full stack traces and internal file paths.', impact: 'Attackers can use error details to understand internal architecture and plan targeted attacks.', evidence: 'GET /api/files/nonexistent returned 500 with full Python traceback including file paths.', stepsToReproduce: '1. Request a non-existent file. 2. Observe detailed error response.', expectedBehavior: 'Error responses should return generic messages without internal details.', observedBehavior: 'Full stack traces with file paths are returned to clients.', remediation: 'Implement global error handler that returns generic messages. Log details server-side only.', retestStatus: 'Pending', history: [{ date: 'Sep 28', action: 'Detected during API scan', user: 'AI Assistant' }] },
  { id: 'WM-014', title: 'Missing Input Length Validation', severity: 'Medium', component: 'Notification Service', status: 'Open', detected: '3 days ago', aiConfidence: 84, cvss: 4.8, cwe: 'CWE-20', description: 'Email and message fields accept inputs exceeding reasonable length limits.', impact: 'Excessively long inputs can cause denial of service or trigger buffer overflow in downstream systems.', evidence: 'POST /api/notify with 1MB email field was accepted and processed.', stepsToReproduce: '1. Send POST /api/notify with a 1MB email value. 2. Observe request is accepted.', expectedBehavior: 'Input fields should enforce maximum length limits.', observedBehavior: 'No length validation is performed on input fields.', remediation: 'Add input length validation at the API gateway. Reject inputs exceeding 1KB for text fields.', retestStatus: 'Pending', history: [{ date: 'Sep 27', action: 'Detected during API assessment', user: 'Jordan Analyst' }] },
  { id: 'WM-015', title: 'Weak Password Policy', severity: 'Medium', component: 'Authentication', status: 'Investigating', detected: '3 days ago', aiConfidence: 90, cvss: 5.1, cwe: 'CWE-521', description: 'Password policy allows passwords as short as 6 characters with no complexity requirements.', impact: 'Weak passwords are susceptible to brute-force and credential stuffing attacks.', evidence: 'Password "123456" was accepted during account creation.', stepsToReproduce: '1. Navigate to account creation. 2. Enter password "123456". 3. Observe acceptance.', expectedBehavior: 'Passwords should require minimum 12 characters with complexity rules.', observedBehavior: '6-character passwords with no complexity are accepted.', remediation: 'Enforce minimum 12 characters, require uppercase, lowercase, digits, and symbols. Check against breached password lists.', retestStatus: 'In progress — policy update being deployed', history: [{ date: 'Sep 27', action: 'Detected during auth assessment', user: 'AI Assistant' }, { date: 'Sep 28', action: 'Fix in development', user: 'Alex Security' }] },
  { id: 'WM-016', title: 'JWT Algorithm Confusion', severity: 'High', component: 'Auth Service', status: 'Open', detected: '4 days ago', aiConfidence: 92, cvss: 7.6, cwe: 'CWE-347', description: 'The JWT validator accepts both HS256 and RS256 algorithms, allowing algorithm confusion attacks.', impact: 'An attacker can forge tokens by switching the algorithm from RS256 to HS256 and signing with the public key.', evidence: 'Token with alg:HS256 signed with public key was accepted by the server.', stepsToReproduce: '1. Obtain the public RSA key. 2. Create a JWT with alg:HS256. 3. Sign with the public key. 4. Submit and observe acceptance.', expectedBehavior: 'The server should enforce a single expected algorithm (RS256).', observedBehavior: 'Multiple algorithms are accepted including HS256.', remediation: 'Pin the expected algorithm to RS256. Reject tokens with any other algorithm value.', retestStatus: 'Pending', history: [{ date: 'Sep 26', action: 'Detected by AI analyzer', user: 'AI Assistant' }] },
  { id: 'WM-017', title: 'Information Disclosure in Headers', severity: 'Low', component: 'Web Server', status: 'Open', detected: '4 days ago', aiConfidence: 96, cvss: 3.1, cwe: 'CWE-200', description: 'Server headers reveal framework version and technology stack details.', impact: 'Attackers can use version information to identify known vulnerabilities for the specific versions.', evidence: 'X-Powered-By: Express 4.17.3 header present in all responses.', stepsToReproduce: '1. Send any request. 2. Inspect response headers. 3. Note X-Powered-By and Server headers.', expectedBehavior: 'Server headers should not reveal framework or version information.', observedBehavior: 'Express version and technology stack are exposed in headers.', remediation: 'Disable X-Powered-By header. Set Server header to generic value. Remove version information.', retestStatus: 'Pending', history: [{ date: 'Sep 26', action: 'Detected during header scan', user: 'AI Assistant' }] },
  { id: 'WM-018', title: 'Race Condition in Rate Limiter', severity: 'Medium', component: 'API Gateway', status: 'Open', detected: '5 days ago', aiConfidence: 85, cvss: 5.3, cwe: 'CWE-362', description: 'The rate limiter uses non-atomic operations, allowing concurrent requests to bypass limits.', impact: 'Attackers sending concurrent requests can exceed rate limits, enabling brute-force attacks.', evidence: '50 concurrent requests to /api/auth/login all received 200/401 — none were rate-limited.', stepsToReproduce: '1. Send 50 concurrent login requests. 2. Observe all are processed without rate limiting.', expectedBehavior: 'Rate limiting should use atomic operations to count requests.', observedBehavior: 'Concurrent requests bypass the rate limiter due to race conditions.', remediation: 'Use Redis atomic operations (INCR) for rate limiting. Implement distributed locking.', retestStatus: 'Pending', history: [{ date: 'Sep 25', action: 'Detected during API assessment', user: 'Jordan Analyst' }] },
  { id: 'WM-019', title: 'Insecure File Upload', severity: 'High', component: 'File Storage Gateway', status: 'Open', detected: '5 days ago', aiConfidence: 89, cvss: 7.2, cwe: 'CWE-434', description: 'File upload accepts executable files without content-type validation.', impact: 'An attacker can upload malicious scripts that may be executed on the server.', evidence: 'Upload of .exe file with image/jpeg content-type was accepted and stored.', stepsToReproduce: '1. Create a malicious .exe file. 2. Set Content-Type to image/jpeg. 3. Upload via POST /api/upload. 4. Observe acceptance.', expectedBehavior: 'File uploads should validate actual file content, not just Content-Type headers.', observedBehavior: 'Only Content-Type header is checked, not actual file content.', remediation: 'Validate file content using magic bytes. Reject files that do not match their claimed type. Scan all uploads with antivirus.', retestStatus: 'Pending', history: [{ date: 'Sep 25', action: 'Detected during file upload test', user: 'AI Assistant' }] },
  { id: 'WM-020', title: 'Missing Account Lockout', severity: 'Medium', component: 'Authentication', status: 'Resolved', detected: '6 days ago', aiConfidence: 94, cvss: 5.0, cwe: 'CWE-307', description: 'Account lockout was not implemented for failed login attempts (now resolved).', impact: 'Without lockout, attackers can perform unlimited brute-force attacks.', evidence: '100 failed login attempts did not trigger account lockout (now fixed).', stepsToReproduce: '1. Send 100 failed login attempts. 2. Observe no lockout (now resolved).', expectedBehavior: 'Accounts should lock after 5 failed attempts for 15 minutes.', observedBehavior: 'No lockout was enforced (now resolved).', remediation: 'Implemented account lockout after 5 failed attempts with 15-minute lockout period. Verified with retest.', retestStatus: 'Resolved — verified on Sep 30', history: [{ date: 'Sep 24', action: 'Detected during auth assessment', user: 'AI Assistant' }, { date: 'Sep 25', action: 'Lockout implemented', user: 'Alex Security' }, { date: 'Sep 30', action: 'Retest passed', user: 'AI Assistant' }] },
  { id: 'WM-021', title: 'DOM-Based XSS', severity: 'High', component: 'Admin Console', status: 'Open', detected: '6 days ago', aiConfidence: 86, cvss: 6.8, cwe: 'CWE-79', description: 'Client-side JavaScript uses innerHTML with unsanitized URL fragment data.', impact: 'Attackers can craft URLs that execute JavaScript in the admin console context.', evidence: 'URL with fragment #<img src=x onerror=alert(document.cookie)> triggered script execution.', stepsToReproduce: '1. Navigate to /admin#<img src=x onerror=alert(1)>. 2. Observe script execution.', expectedBehavior: 'URL fragments should be sanitized before DOM manipulation.', observedBehavior: 'Fragment is inserted via innerHTML without sanitization.', remediation: 'Use textContent instead of innerHTML. Sanitize all dynamic DOM insertions.', retestStatus: 'Pending', history: [{ date: 'Sep 24', action: 'Detected during web assessment', user: 'AI Assistant' }] },
  { id: 'WM-022', title: 'Insufficient Logging', severity: 'Low', component: 'Threat Intel Feed', status: 'Open', detected: '1 week ago', aiConfidence: 82, cvss: 3.7, cwe: 'CWE-778', description: 'Security-relevant events are not logged with sufficient detail for audit trails.', impact: 'Without proper logging, security incidents cannot be investigated or traced.', evidence: 'Failed authentication attempts to threat intel API are not logged.', stepsToReproduce: '1. Send failed auth request to threat intel API. 2. Check audit logs. 3. Observe no entry.', expectedBehavior: 'All security-relevant events should be logged with timestamp, user, action, and result.', observedBehavior: 'Security events are not logged.', remediation: 'Implement comprehensive security event logging with structured format. Forward to SIEM.', retestStatus: 'Pending', history: [{ date: 'Sep 23', action: 'Detected during audit review', user: 'Jordan Analyst' }] },
  { id: 'WM-023', title: 'CORS Misconfiguration', severity: 'Medium', component: 'Analytics API', status: 'Open', detected: '1 week ago', aiConfidence: 93, cvss: 5.6, cwe: 'CWE-942', description: 'CORS policy allows credentials with a wildcard origin.', impact: 'Any website can make authenticated requests to the API, enabling data theft.', evidence: 'Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true in response headers.', stepsToReproduce: '1. Send request from external origin. 2. Observe wildcard CORS with credentials.', expectedBehavior: 'CORS should use an explicit origin allowlist, not wildcard.', observedBehavior: 'Wildcard origin is allowed with credentials.', remediation: 'Replace wildcard with explicit origin allowlist. Validate against trusted domains.', retestStatus: 'Pending', history: [{ date: 'Sep 23', action: 'Detected during API scan', user: 'AI Assistant' }] },
  { id: 'WM-024', title: 'Session Fixation', severity: 'Medium', component: 'Auth Service', status: 'Open', detected: '1 week ago', aiConfidence: 88, cvss: 5.8, cwe: 'CWE-384', description: 'Session ID is not rotated after login, allowing session fixation attacks.', impact: 'An attacker can set a known session ID before login and use it after the victim authenticates.', evidence: 'Session ID remained identical before and after successful login.', stepsToReproduce: '1. Note pre-login session ID. 2. Log in. 3. Observe same session ID is used.', expectedBehavior: 'Session ID should be regenerated after successful login.', observedBehavior: 'Session ID is not rotated on login.', remediation: 'Regenerate session ID immediately after successful authentication. Invalidate old session.', retestStatus: 'Pending', history: [{ date: 'Sep 23', action: 'Detected during auth assessment', user: 'Jordan Analyst' }] },
  { id: 'WM-025', title: 'Insecure Cookie Attributes', severity: 'Low', component: 'Web Server', status: 'Resolved', detected: '1 week ago', aiConfidence: 95, cvss: 3.5, cwe: 'CWE-614', description: 'Session cookies were missing the SameSite attribute (now resolved).', impact: 'Without SameSite, cookies can be sent in cross-site requests, enabling CSRF attacks.', evidence: 'Set-Cookie header lacked SameSite attribute (now fixed).', stepsToReproduce: '1. Log in. 2. Inspect Set-Cookie header. 3. Note missing SameSite (now resolved).', expectedBehavior: 'All cookies should have SameSite=Strict or SameSite=Lax.', observedBehavior: 'SameSite was missing (now resolved).', remediation: 'Added SameSite=Strict to all session cookies. Verified with retest.', retestStatus: 'Resolved — verified on Sep 29', history: [{ date: 'Sep 22', action: 'Detected during cookie analysis', user: 'AI Assistant' }, { date: 'Sep 23', action: 'SameSite added', user: 'Alex Security' }, { date: 'Sep 29', action: 'Retest passed', user: 'AI Assistant' }] },
  { id: 'WM-026', title: 'GraphQL Introspection Enabled', severity: 'Low', component: 'Analytics API', status: 'Open', detected: '8 days ago', aiConfidence: 91, cvss: 3.9, cwe: 'CWE-200', description: 'GraphQL introspection is enabled in production, exposing the full API schema.', impact: 'Attackers can discover all available queries, mutations, and data types.', evidence: 'POST /graphql with query: {__schema{types{name}}} returned full schema.', stepsToReproduce: '1. Send introspection query to /graphql. 2. Observe full schema returned.', expectedBehavior: 'Introspection should be disabled in production environments.', observedBehavior: 'Introspection is enabled and returns the full schema.', remediation: 'Disable introspection in production. Use schema persistence for production builds.', retestStatus: 'Pending', history: [{ date: 'Sep 22', action: 'Detected during API scan', user: 'AI Assistant' }] },
  { id: 'WM-027', title: 'Backup Encryption Missing', severity: 'High', component: 'Backup Service', status: 'Investigating', detected: '8 days ago', aiConfidence: 87, cvss: 7.1, cwe: 'CWE-312', description: 'Database backups are stored unencrypted on the backup server.', impact: 'If backups are accessed, all database contents including credentials are exposed.', evidence: 'Backup files in /backups/ directory are plain SQL dumps without encryption.', stepsToReproduce: '1. Access backup directory. 2. Observe .sql files are not encrypted.', expectedBehavior: 'All backups should be encrypted at rest using AES-256.', observedBehavior: 'Backups are stored as plain text SQL dumps.', remediation: 'Encrypt all backup files with AES-256-GCM. Implement key rotation. Verify encryption on every backup cycle.', retestStatus: 'In progress — encryption being deployed', history: [{ date: 'Sep 22', action: 'Detected during infrastructure audit', user: 'Jordan Analyst' }, { date: 'Sep 23', action: 'Fix in development', user: 'Alex Security' }] },
  { id: 'WM-028', title: 'API Key in URL', severity: 'Medium', component: 'Threat Intel Feed', status: 'Open', detected: '9 days ago', aiConfidence: 94, cvss: 5.2, cwe: 'CWE-598', description: 'API key is passed as a URL query parameter instead of in a header.', impact: 'API keys in URLs are logged in server logs, browser history, and referrer headers.', evidence: 'GET /api/threats?api_key=sk_test_1234 was accepted and key is visible in server logs.', stepsToReproduce: '1. Send request with api_key in query string. 2. Observe acceptance. 3. Check server logs.', expectedBehavior: 'API keys should be sent in Authorization headers, never in URLs.', observedBehavior: 'API key is accepted as a URL query parameter.', remediation: 'Move API key to Authorization header. Reject requests with API key in URL parameters.', retestStatus: 'Pending', history: [{ date: 'Sep 21', action: 'Detected during API review', user: 'AI Assistant' }] },
  { id: 'WM-029', title: 'Mass Assignment', severity: 'Medium', component: 'Admin Console', status: 'Open', detected: '9 days ago', aiConfidence: 85, cvss: 5.0, cwe: 'CWE-915', description: 'The user update endpoint accepts role field from client input without filtering.', impact: 'A regular user can escalate their role to admin by including role in the update payload.', evidence: 'PUT /api/users/me with body {"role":"admin"} changed user role to admin.', stepsToReproduce: '1. Authenticate as regular user. 2. Send PUT /api/users/me with {"role":"admin"}. 3. Observe role change.', expectedBehavior: 'Only specific fields should be updatable; role changes require admin authorization.', observedBehavior: 'All fields in the request body are accepted for update.', remediation: 'Implement field allowlists for each endpoint. Never accept role or permission fields from non-admin users.', retestStatus: 'Pending', history: [{ date: 'Sep 21', action: 'Detected during API assessment', user: 'Jordan Analyst' }] },
  { id: 'WM-030', title: 'Missing Rate Limit on Password Reset', severity: 'Low', component: 'Auth Service', status: 'Open', detected: '10 days ago', aiConfidence: 90, cvss: 4.3, cwe: 'CWE-770', description: 'The password reset endpoint does not rate limit requests per email address.', impact: 'Attackers can spam password reset emails, causing email flooding and user harassment.', evidence: '50 password reset requests for same email in 1 minute all sent emails.', stepsToReproduce: '1. Send 50 POST /api/auth/reset-password requests. 2. Observe all emails are sent.', expectedBehavior: 'Password reset should be rate-limited to 3 per hour per email.', observedBehavior: 'No rate limiting on password reset endpoint.', remediation: 'Add rate limiting: 3 reset requests per hour per email. Implement cooldown period.', retestStatus: 'Pending', history: [{ date: 'Sep 20', action: 'Detected during auth assessment', user: 'AI Assistant' }] },
];

export const allVulnerabilities: Vulnerability[] = [...vulnerabilities, ...additionalVulnerabilities];

// ============================================================
// Managed Users (for User Management page)
// ============================================================

export const managedUsers: ManagedUser[] = [
  { id: 'mu1', name: 'Alex Security', email: 'admin@worldmonitor.demo', role: 'admin', status: 'Active', lastActive: '2 min ago', avatar: 'AS' },
  { id: 'mu2', name: 'Jordan Analyst', email: 'analyst@worldmonitor.demo', role: 'analyst', status: 'Active', lastActive: '15 min ago', avatar: 'JA' },
  { id: 'mu3', name: 'Sam Viewer', email: 'viewer@worldmonitor.demo', role: 'viewer', status: 'Active', lastActive: '1 hour ago', avatar: 'SV' },
  { id: 'mu4', name: 'Riley Chen', email: 'rchen@worldmonitor.demo', role: 'analyst', status: 'Active', lastActive: '3 hours ago', avatar: 'RC' },
  { id: 'mu5', name: 'Morgan Park', email: 'mpark@worldmonitor.demo', role: 'viewer', status: 'Active', lastActive: '5 hours ago', avatar: 'MP' },
  { id: 'mu6', name: 'Casey Brooks', email: 'cbrooks@worldmonitor.demo', role: 'analyst', status: 'Disabled', lastActive: '2 days ago', avatar: 'CB' },
  { id: 'mu7', name: 'Dana Rivers', email: 'drivers@worldmonitor.demo', role: 'viewer', status: 'Active', lastActive: '1 day ago', avatar: 'DR' },
  { id: 'mu8', name: 'Taylor Quinn', email: 'tquinn@worldmonitor.demo', role: 'admin', status: 'Active', lastActive: '30 min ago', avatar: 'TQ' },
];

// ============================================================
// Audit Trail (50 entries)
// ============================================================

const auditActions = [
  { action: 'Started assessment', resource: 'World Monitor Demo', result: 'Success' as const },
  { action: 'Viewed finding', resource: 'WM-001', result: 'Success' as const },
  { action: 'Updated vulnerability status', resource: 'WM-004', result: 'Success' as const },
  { action: 'Generated report', resource: 'Security Report #42', result: 'Success' as const },
  { action: 'Exported report', resource: 'Security Report #42', result: 'Success' as const },
  { action: 'Ran AI analysis', resource: 'Log batch #128', result: 'Success' as const },
  { action: 'Attempted admin access', resource: 'User Management', result: 'Denied' as const },
  { action: 'Modified assessment scope', resource: 'Analytics API', result: 'Success' as const },
  { action: 'Resolved alert', resource: 'AL-005', result: 'Success' as const },
  { action: 'Assigned alert', resource: 'AL-006', result: 'Success' as const },
  { action: 'Ran access control test', resource: 'Admin User Management', result: 'Success' as const },
  { action: 'Changed user role', resource: 'mu4', result: 'Success' as const },
  { action: 'Disabled user', resource: 'mu6', result: 'Success' as const },
  { action: 'Login attempt', resource: 'Auth Service', result: 'Success' as const },
  { action: 'Login attempt', resource: 'Auth Service', result: 'Denied' as const },
  { action: 'Viewed audit trail', resource: 'Audit Logs', result: 'Success' as const },
  { action: 'Updated settings', resource: 'AI Configuration', result: 'Success' as const },
  { action: 'Created application', resource: 'Threat Intel Feed', result: 'Success' as const },
  { action: 'Deleted endpoint', resource: '/api/old/endpoint', result: 'Success' as const },
  { action: 'Retest initiated', resource: 'WM-006', result: 'Success' as const },
];

const auditUsers = ['Alex Security', 'Jordan Analyst', 'Sam Viewer', 'Riley Chen', 'Taylor Quinn', 'System'];
const auditIPs = ['10.0.0.1', '10.0.0.42', '10.0.1.15', '10.0.2.8', '10.0.0.7', '127.0.0.1'];

export const auditTrail: AuditEntry[] = Array.from({ length: 50 }, (_, i) => {
  const template = auditActions[i % auditActions.length];
  const user = auditUsers[i % auditUsers.length];
  const ip = auditIPs[i % auditIPs.length];
  const hour = 8 + Math.floor(i / 6);
  const minute = (i * 7) % 60;
  const ts = `Sep 30 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  return {
    id: `audit-${i + 1}`,
    timestamp: ts,
    user,
    action: template.action,
    resource: template.resource,
    result: template.result,
    ip,
    immutable: true,
  };
});

// ============================================================
// Settings
// ============================================================

export const defaultSettings: AppSettings = {
  profile: { name: 'Alex Security', email: 'admin@worldmonitor.demo', bio: 'Security Administrator responsible for authorized assessment oversight.' },
  security: { mfaEnabled: true, sessionTimeout: 30, passwordExpiry: 90 },
  notifications: { criticalAlerts: true, weeklyReport: true, anomalyDetection: true },
  ai: { aiAnalysis: true, safeAssessmentMode: true, automaticRemediation: false, externalActions: false, requireAuthorization: true },
  assessment: { defaultScope: 'Production-like Demo', autoRetest: false, evidenceCapture: true },
  appearance: { theme: 'dark' as const, density: 'comfortable' as const },
};

// ============================================================
// Expanded Security Events (100+)
// ============================================================

export const securityEvents: LogEntry[] = Array.from({ length: 100 }, (_, i) => {
  const templates = [
    { level: 'INFO' as const, source: 'API Gateway', message: `GET /api/users 200 — ${20 + Math.floor(Math.random() * 80)}ms`, category: 'normal' as const },
    { level: 'INFO' as const, source: 'Auth Service', message: 'Successful login for user jordan_a', category: 'normal' as const },
    { level: 'WARN' as const, source: 'Auth Service', message: `Failed login attempt ${i % 5 + 1}/5 for user admin@demo`, category: 'suspicious' as const },
    { level: 'ERROR' as const, source: 'API Gateway', message: 'GET /api/admin/users 403 — Unauthorized access attempt', category: 'security' as const },
    { level: 'CRITICAL' as const, source: 'Auth Service', message: 'Account locked: too many failed attempts', category: 'security' as const },
    { level: 'INFO' as const, source: 'WebSocket', message: `New client connected — session: ${Math.random().toString(36).substring(2, 8)}`, category: 'normal' as const },
    { level: 'WARN' as const, source: 'API Gateway', message: `Unusual request pattern: ${100 + i} requests/min from IP 10.0.0.42`, category: 'suspicious' as const },
    { level: 'INFO' as const, source: 'Report Service', message: `Report WM-${String(i % 30 + 1).padStart(3, '0')} generated successfully`, category: 'normal' as const },
    { level: 'ERROR' as const, source: 'Auth Service', message: 'Token validation failed — expired JWT presented', category: 'security' as const },
    { level: 'INFO' as const, source: 'API Gateway', message: 'GET /api/health 200 — 12ms', category: 'normal' as const },
  ];
  const t = templates[i % templates.length];
  const hour = 8 + Math.floor(i / 12);
  const minute = (i * 3) % 60;
  const second = (i * 7) % 60;
  return {
    id: `evt-${i + 1}`,
    timestamp: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
    level: t.level,
    source: t.source,
    message: t.message,
    category: t.category,
  };
});

// ============================================================
// Expanded AI Alerts
// ============================================================

export const aiAlertsExpanded = [
  { id: 'ai1', type: 'Anomaly', severity: 'High' as const, title: 'Unusual API access pattern detected', detail: 'User accessed 50+ endpoints in 2 minutes — potential enumeration', time: '5 min ago' },
  { id: 'ai2', type: 'Pattern', severity: 'Medium' as const, title: 'Login pattern deviation', detail: 'Login attempts from new geographic location: IP 10.0.0.42', time: '15 min ago' },
  { id: 'ai3', type: 'Anomaly', severity: 'Critical' as const, title: 'Potential data exfiltration', detail: 'Large response payload detected on /api/users — 247 records returned', time: '30 min ago' },
  { id: 'ai4', type: 'Pattern', severity: 'Low' as const, title: 'Session duration anomaly', detail: 'Session active for 8+ hours — exceeds typical 2-hour average', time: '1 hour ago' },
  { id: 'ai5', type: 'Anomaly', severity: 'Medium' as const, title: 'Unusual endpoint access', detail: 'First-time access to /api/admin/settings from non-admin user', time: '2 hours ago' },
  { id: 'ai6', type: 'Pattern', severity: 'Low' as const, title: 'API usage spike', detail: 'API requests increased 300% compared to 7-day average', time: '3 hours ago' },
  { id: 'ai7', type: 'Anomaly', severity: 'High' as const, title: 'Authorization bypass attempt', detail: 'Multiple 403 responses followed by successful 200 on admin endpoint', time: '4 hours ago' },
];
