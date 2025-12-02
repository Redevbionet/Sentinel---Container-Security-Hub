export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  VEX_TOOL = 'VEX_TOOL',
  BEST_PRACTICES = 'BEST_PRACTICES',
  FAQ = 'FAQ'
}

export interface CVEData {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  affectedPackage: string;
  status: 'active' | 'suppressed' | 'fixed';
}

export interface VexGenerationRequest {
  cveId: string;
  product: string;
  status: 'not_affected' | 'fixed';
  justification: string;
}

export interface VexResult {
  json: string;
  analysis: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
