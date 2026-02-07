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
}

export interface TargetCompanies {
  tier1: TargetCompany[];
  tier2: TargetCompany[];
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

export type PrioritySegmentType = 'img-switcher' | 'bridge-crosser' | 'teen-driver' | null;

export interface IMGTransferMetrics {
  totalTransfers: { min: number; max: number };
  timeframe: string;
  reasons: {
    financial: number;
    athletic: number;
    academic: number;
    relocation: number;
  };
  destinations: {
    publicSchool: number;
    privateSchool: number;
    outOfState: number;
    other: number;
  };
  ssesAdvantage: {
    tuitionSavings: number;
    imgTuition: number;
    ssesTuition: number;
  };
}

export interface K8TransitionMetrics {
  totalGraduates: { min: number; max: number };
  annualRange: string;
  schoolTypes: {
    montessori: number;
    religious: number;
    otherPrivate: number;
    public: number;
  };
  budgetSegments: {
    high: number;
    mid: number;
    low: number;
  };
  ssesCaptures: { min: number; max: number };
}

export interface TeenInfluenceMetrics {
  vetoPercentage: number;
  discoveryChannels: string[];
  keyFactors: string[];
}

export interface ExecutiveSummary {
  totalK8Pipeline: { min: number; max: number };
  imgOpportunity: { min: number; max: number };
  teenInfluence: number;
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
  "Spending Pattern",
  "Competition",
  "Strategic Value"
];
