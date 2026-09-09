export type Sex = 'M' | 'F';
export type ChestPainType = 'ASY' | 'ATA' | 'NAP' | 'TA';
export type RestingECG = 'Normal' | 'ST' | 'LVH';
export type ExerciseAngina = 'Y' | 'N';
export type STSlope = 'Up' | 'Flat' | 'Down';
export type FastingBS = 0 | 1;

export interface PatientData {
  age: number;
  sex: Sex;
  chestPainType: ChestPainType;
  restingBP: number;
  cholesterol: number;
  fastingBS: FastingBS;
  restingECG: RestingECG;
  maxHR: number;
  exerciseAngina: ExerciseAngina;
  oldpeak: number;
  stSlope: STSlope;
}

export interface FeatureContribution {
  featureName: string;
  displayLabel: string;
  rawValue: string | number;
  standardizedValue: number;
  weight: number;
  contribution: number; // weight * standardizedValue
  direction: 'risk' | 'protective' | 'neutral';
  percentageEffect: number;
}

export interface PredictionResult {
  probability: number;
  percentage: number;
  logOdds: number;
  odds: number;
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';
  riskColor: 'emerald' | 'amber' | 'rose' | 'red';
  prediction: 0 | 1;
  topRiskDrivers: FeatureContribution[];
  topProtectiveFactors: FeatureContribution[];
  allContributions: FeatureContribution[];
  calculatedAt: string;
}
