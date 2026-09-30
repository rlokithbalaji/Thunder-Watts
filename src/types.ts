export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
export type VulnStatus = 'Open' | 'Investigating' | 'Retesting' | 'Resolved';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  component: string;
  status: VulnStatus;
  detected: string;
  aiConfidence: number;
  cvss: number;
  cwe: string;
  description: string;
  impact: string;
  evidence: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  observedBehavior: string;
  remediation: string;
  retestStatus: string;
  history: { date: string; action: string; user: string }[];
}

export interface Application {
  id: string;
  name: string;
  description: string;
  environment: string;
  baseUrl: string;
  technology: string;
  owner: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  securityScore: number;
  lastAssessment: string;
  risk: RiskLevel;
}

export interface Endpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  auth: string;
  authorization: string;
  risk: RiskLevel;
  status: 'Secure' | 'Review' | 'At Risk';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  source: string;
  message: string;
  category: 'normal' | 'suspicious' | 'security';
}

export interface SecurityCategory {
  name: string;
  score: number;
  fullMark: number;
}

export interface TrendPoint {
  date: string;
  score: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface AuthzTestResult {
  id: string;
  user: string;
  role: string;
  resource: string;
  expectedPermission: 'ALLOW' | 'DENY';
  observedPermission: 'ALLOW' | 'DENY';
  result: 'PASS' | 'FAIL';
  timestamp: string;
}

export interface ClientSecurityCheck {
  id: string;
  category: string;
  item: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface CommSecurityItem {
  id: string;
  label: string;
  value: string;
  status: 'secure' | 'warn' | 'fail';
  detail: string;
}

export interface DataProtectionCategory {
  name: string;
  encrypted: number;
  total: number;
  status: 'secure' | 'warn' | 'fail';
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  type: 'login' | 'api' | 'authz' | 'anomaly' | 'info';
  message: string;
  detail: string;
  severity: 'info' | 'warn' | 'critical';
}

export type AlertStatus = 'New' | 'Reviewed' | 'Assigned' | 'Investigating' | 'Resolved';

export interface SecurityAlert {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  status: AlertStatus;
  assignedTo: string | null;
  time: string;
}

export interface ReportSection {
  id: string;
  title: string;
  included: boolean;
}

export interface ComplianceItem {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  result: 'Success' | 'Denied' | 'Error';
  ip: string;
  immutable: boolean;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Disabled';
  lastActive: string;
  avatar: string;
}

export interface AISettings {
  aiAnalysis: boolean;
  safeAssessmentMode: boolean;
  automaticRemediation: boolean;
  externalActions: boolean;
  requireAuthorization: boolean;
}

export interface AppSettings {
  profile: { name: string; email: string; bio: string };
  security: { mfaEnabled: boolean; sessionTimeout: number; passwordExpiry: number };
  notifications: { criticalAlerts: boolean; weeklyReport: boolean; anomalyDetection: boolean };
  ai: AISettings;
  assessment: { defaultScope: string; autoRetest: boolean; evidenceCapture: boolean };
  appearance: { theme: 'dark' | 'light'; density: 'comfortable' | 'compact' };
}
