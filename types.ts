export enum MatrixColumn {
  SEGMENT = 0,
  LOCATION = 1,
  SPENDING = 2,
  COMPETITION = 3,
  STRATEGY = 4
}

export interface SpendingItem {
  item: string;
  priceRange: string;
}

export interface SpendingPattern {
  sensitivity: string;
  budgetRange: string;
  ticketItems: SpendingItem[];
}

export interface SchoolCompetition {
  name: string;
  reason: string;
  recommendationSource: string;
}

export interface CompetitionDetail {
  schools: SchoolCompetition[];
}

export interface LocationDetail {
  region: string;
  usedTo: string[];
  expecting: string[];
  emotionalDrivers: string;
  nuggets: string[];
}

export interface JourneyStep {
  id: string;
  stage: string;
  text: string;
  tactic: string;
}

export interface TargetCompany {
  name: string;
  jobs: string;
  likelihood: 'Very High' | 'High' | 'Medium-High' | 'Medium' | 'Low';
  reason: string;
  distanceMiles?: number;
  estimatedFamilies?: string;
  urgencyLevel?: number;
  urgencyLabel?: string;
  sector?: string;
  salaryRange?: string;
  remoteFriendly?: boolean;
  source?: string;
}

export interface ActiveHotZone {
  name: string;
  status: string;
  investment: string;
  jobs: string;
  timeline: string;
  impact: string;
  estimatedFamilies: string;
}

export interface TargetCompanies {
  tier1: TargetCompany[];
  tier2: TargetCompany[];
  activeHotZones?: ActiveHotZone[];
}

export interface KeyPartners {
  relocationManagement?: string[];
  luxuryRealEstate?: string[];
  schoolPlacement?: string[];
  microAreas?: string[];
  contentPlatforms?: string[];
  entrepreneurCommunities?: string[];
  localNGOs?: string[];
  venues?: string[];
}

export interface SuccessStory {
  family: string;
  origin: string;
  business: string;
  children: number | string;
  income: string;
  residence: string;
}

export interface TouchPointAction {
  id: string;
  text: string;
  priority: 'immediate' | 'short-term' | 'long-term';
}

export interface TouchPoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actions: TouchPointAction[];
  rightPanelType: 'companies' | 'partners' | 'digital' | 'communities' | 'validation' | 'social';
  rightPanelData: any;
}

// Source citation types
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unverified';

export interface DataSource {
  document: string;
  confidence: ConfidenceLevel;
  note?: string;
}

export interface SourcedValue<T> {
  value: T;
  source: DataSource;
}

// Priority segment type - now includes all 5 personas as options
export type PrioritySegmentType = 'corp' | 'life' | 'pivot' | 'bridge' | 'teen' | null;

export interface IMGTransferMetrics {
  totalTransfers: SourcedValue<{ min: number; max: number }>;
  timeframe: string;
  reasons: {
    financial: SourcedValue<number>;
    athletic: SourcedValue<number>;
    academic: SourcedValue<number>;
    relocation: SourcedValue<number>;
  };
  destinations: {
    publicSchool: SourcedValue<number>;
    privateSchool: SourcedValue<number>;
    outOfState: SourcedValue<number>;
    other: SourcedValue<number>;
  };
  ssesAdvantage: {
    tuitionSavings: SourcedValue<number>;
    imgTuition: SourcedValue<number>;
    ssesTuition: SourcedValue<number>;
  };
}

export interface K8TransitionMetrics {
  totalGraduates: SourcedValue<{ min: number; max: number }>;
  annualRange: string;
  schoolTypes: {
    montessori: SourcedValue<number>;
    religious: SourcedValue<number>;
    otherPrivate: SourcedValue<number>;
    public: SourcedValue<number>;
  };
  budgetSegments: {
    high: SourcedValue<number>;
    mid: SourcedValue<number>;
    low: SourcedValue<number>;
  };
  ssesCaptures: SourcedValue<{ min: number; max: number }>;
}

export interface TeenInfluenceMetrics {
  vetoPercentage: SourcedValue<number>;
  discoveryChannels: string[];
  keyFactors: string[];
}

export interface ExecutiveSummary {
  totalK8Pipeline: SourcedValue<{ min: number; max: number }>;
  imgOpportunity: SourcedValue<{ min: number; max: number }>;
  // Remove teenInfluence as unverified
  prioritySegments: PrioritySegmentType[];
}

export interface Persona {
  id: string;
  name: string;
  priorityType?: PrioritySegmentType;
  location: LocationDetail;
  spending: SpendingPattern;
  competition: CompetitionDetail;
  strategy: string;
  steps: JourneyStep[];
  targetCompanies?: TargetCompanies;
  keyPartners?: KeyPartners;
  successStories?: SuccessStory[];
  touchPoints?: TouchPoint[];
  imgTransferMetrics?: IMGTransferMetrics;
  k8TransitionMetrics?: K8TransitionMetrics;
  teenInfluenceMetrics?: TeenInfluenceMetrics;
}

export const COLUMNS = [
  "Segment",
  "Current Location",
  "Budget",
  "Competition",
  "Value Alignment"
];

// Helper to create sourced values
export function sourced<T>(value: T, document: string, confidence: ConfidenceLevel, note?: string): SourcedValue<T> {
  return { value, source: { document, confidence, note } };
}
