import { PatientData, PredictionResult, FeatureContribution } from '@/types';

// Exact scikit-learn Logistic Regression parameters & StandardScaler statistics from heart(02).ipynb
export const MODEL_META = {
  intercept: 0.27836358261363603,
  columns: [
    'Age',
    'RestingBP',
    'Cholesterol',
    'FastingBS',
    'MaxHR',
    'Oldpeak',
    'Sex_M',
    'ChestPainType_ATA',
    'ChestPainType_NAP',
    'ChestPainType_TA',
    'RestingECG_Normal',
    'RestingECG_ST',
    'ExerciseAngina_Y',
    'ST_Slope_Flat',
    'ST_Slope_Up',
  ],
  coef: [
    0.17037800756293214,
    0.012310600264155659,
    0.02950249724515101,
    0.5052876256714276,
    -0.1887396459605231,
    0.4488341983749124,
    0.6036046922639757,
    -0.6317065380010872,
    -0.5800753171917374,
    -0.24637359188987587,
    -0.007281462300566159,
    -0.0707274413558851,
    0.4983649401032515,
    0.5588547229373012,
    -0.6045028339964286,
  ],
  mean: [
    52.95108695652174,
    129.7336956521739,
    241.68478260869566,
    0.2554347826086957,
    139.32608695652175,
    0.6413043478260869,
    0.8532608695652174,
    0.18478260869565216,
    0.22282608695652173,
    0.07608695652173914,
    0.5869565217391305,
    0.20108695652173914,
    0.3695652173913043,
    0.44021739130434784,
    0.4782608695652174,
  ],
  scale: [
    9.679808596800838,
    18.573583257890952,
    63.28900745060847,
    0.43610532494151455,
    25.823021703617144,
    0.8978418779535645,
    0.3538456697969137,
    0.38812111024689405,
    0.4161425500092082,
    0.26513719386196666,
    0.4923805066480924,
    0.40081291451070206,
    0.48268702850379386,
    0.4964131743795107,
    0.4995271866554808,
  ],
};

const FEATURE_METADATA: Record<string, { label: string; unit?: string }> = {
  Age: { label: 'Patient Age', unit: 'yrs' },
  RestingBP: { label: 'Resting Blood Pressure', unit: 'mmHg' },
  Cholesterol: { label: 'Serum Cholesterol', unit: 'mg/dL' },
  FastingBS: { label: 'Fasting Blood Sugar > 120', unit: '' },
  MaxHR: { label: 'Max Heart Rate Achieved', unit: 'bpm' },
  Oldpeak: { label: 'ST Depression (Oldpeak)', unit: 'mm' },
  Sex_M: { label: 'Biological Sex (Male)', unit: '' },
  ChestPainType_ATA: { label: 'Atypical Angina (ATA)', unit: '' },
  ChestPainType_NAP: { label: 'Non-Anginal Pain (NAP)', unit: '' },
  ChestPainType_TA: { label: 'Typical Angina (TA)', unit: '' },
  RestingECG_Normal: { label: 'Normal Resting ECG', unit: '' },
  RestingECG_ST: { label: 'ST-T Wave Abnormality', unit: '' },
  ExerciseAngina_Y: { label: 'Exercise Induced Angina', unit: '' },
  ST_Slope_Flat: { label: 'Flat ST Slope', unit: '' },
  ST_Slope_Up: { label: 'Upsloping ST Segment', unit: '' },
};

export function encodePatientData(patient: PatientData): { values: number[]; rawMap: Record<string, string | number> } {
  const values: number[] = [
    patient.age,
    patient.restingBP,
    patient.cholesterol,
    patient.fastingBS,
    patient.maxHR,
    patient.oldpeak,
    patient.sex === 'M' ? 1 : 0,
    patient.chestPainType === 'ATA' ? 1 : 0,
    patient.chestPainType === 'NAP' ? 1 : 0,
    patient.chestPainType === 'TA' ? 1 : 0,
    patient.restingECG === 'Normal' ? 1 : 0,
    patient.restingECG === 'ST' ? 1 : 0,
    patient.exerciseAngina === 'Y' ? 1 : 0,
    patient.stSlope === 'Flat' ? 1 : 0,
    patient.stSlope === 'Up' ? 1 : 0,
  ];

  const rawMap: Record<string, string | number> = {
    Age: `${patient.age} yrs`,
    RestingBP: `${patient.restingBP} mmHg`,
    Cholesterol: `${patient.cholesterol} mg/dL`,
    FastingBS: patient.fastingBS === 1 ? '> 120 mg/dL' : '≤ 120 mg/dL',
    MaxHR: `${patient.maxHR} bpm`,
    Oldpeak: `${patient.oldpeak} mm`,
    Sex_M: patient.sex === 'M' ? 'Male' : 'Female',
    ChestPainType_ATA: patient.chestPainType === 'ATA' ? 'Active' : 'No',
    ChestPainType_NAP: patient.chestPainType === 'NAP' ? 'Active' : 'No',
    ChestPainType_TA: patient.chestPainType === 'TA' ? 'Active' : 'No',
    RestingECG_Normal: patient.restingECG === 'Normal' ? 'Normal' : 'No',
    RestingECG_ST: patient.restingECG === 'ST' ? 'ST-T wave abnormality' : 'No',
    ExerciseAngina_Y: patient.exerciseAngina === 'Y' ? 'Present' : 'Absent',
    ST_Slope_Flat: patient.stSlope === 'Flat' ? 'Flat' : 'No',
    ST_Slope_Up: patient.stSlope === 'Up' ? 'Upsloping' : 'No',
  };

  return { values, rawMap };
}

/**
 * Evaluates patient risk using exact scikit-learn standard scaling and logistic regression
 */
export function predictHeartDisease(patient: PatientData): PredictionResult {
  const { values, rawMap } = encodePatientData(patient);
  let logOdds = MODEL_META.intercept;

  const contributions: FeatureContribution[] = [];

  for (let i = 0; i < MODEL_META.columns.length; i++) {
    const col = MODEL_META.columns[i];
    const x = values[i];
    const mean = MODEL_META.mean[i];
    const scale = MODEL_META.scale[i];
    const weight = MODEL_META.coef[i];

    // StandardScaler: (x - mean) / scale
    const standardized = (x - mean) / scale;
    const contrib = weight * standardized;
    logOdds += contrib;

    const meta = FEATURE_METADATA[col] || { label: col };

    contributions.push({
      featureName: col,
      displayLabel: meta.label,
      rawValue: rawMap[col] ?? x,
      standardizedValue: standardized,
      weight: weight,
      contribution: contrib,
      direction: contrib > 0.05 ? 'risk' : contrib < -0.05 ? 'protective' : 'neutral',
      percentageEffect: 0, // calculated below relative to total absolute magnitude
    });
  }

  // Sigmoid activation: 1 / (1 + exp(-z))
  const probability = 1 / (1 + Math.exp(-logOdds));
  const percentage = Math.round(probability * 1000) / 10; // e.g. 84.5%
  const odds = Math.exp(logOdds);

  // Normalize contribution percentages for visual breakdown
  const totalMagnitude = contributions.reduce((acc, c) => acc + Math.abs(c.contribution), 0);
  contributions.forEach((c) => {
    c.percentageEffect = totalMagnitude > 0 ? Math.round((Math.abs(c.contribution) / totalMagnitude) * 100) : 0;
  });

  // Sort top drivers
  const sortedContributions = [...contributions].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  const topRiskDrivers = sortedContributions.filter((c) => c.contribution > 0).slice(0, 4);
  const topProtectiveFactors = sortedContributions.filter((c) => c.contribution < 0).slice(0, 4);

  // Risk categorization
  let riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';
  let riskColor: 'emerald' | 'amber' | 'rose' | 'red';

  if (probability < 0.25) {
    riskCategory = 'Low Risk';
    riskColor = 'emerald';
  } else if (probability < 0.5) {
    riskCategory = 'Moderate Risk';
    riskColor = 'amber';
  } else if (probability < 0.75) {
    riskCategory = 'High Risk';
    riskColor = 'rose';
  } else {
    riskCategory = 'Critical Risk';
    riskColor = 'red';
  }

  return {
    probability,
    percentage,
    logOdds,
    odds,
    riskCategory,
    riskColor,
    prediction: probability >= 0.5 ? 1 : 0,
    topRiskDrivers,
    topProtectiveFactors,
    allContributions: sortedContributions,
    calculatedAt: new Date().toISOString(),
  };
}

// Preset clinical cohorts for quick demonstration in UI
export const PRESET_PATIENTS: Record<string, { name: string; description: string; data: PatientData }> = {
  highRisk: {
    name: 'Critical Patient Profile (Row 2)',
    description: '49yo Male, Asymptomatic chest pain, Flat ST slope, High Fasting BS',
    data: {
      age: 49,
      sex: 'M',
      chestPainType: 'ASY',
      restingBP: 160,
      cholesterol: 180,
      fastingBS: 0,
      restingECG: 'Normal',
      maxHR: 156,
      exerciseAngina: 'N',
      oldpeak: 1.0,
      stSlope: 'Flat',
    },
  },
  healthyProfile: {
    name: 'Low Risk Profile (Row 1)',
    description: '54yo Female, Atypical Angina, Upsloping ST segment, High Max HR',
    data: {
      age: 54,
      sex: 'F',
      chestPainType: 'ATA',
      restingBP: 120,
      cholesterol: 288,
      fastingBS: 0,
      restingECG: 'Normal',
      maxHR: 162,
      exerciseAngina: 'N',
      oldpeak: 0.0,
      stSlope: 'Up',
    },
  },
  ischemicCase: {
    name: 'Severe Ischemia Profile (Row 38)',
    description: '60yo Male, Asymptomatic, Exercise Angina, 1.5mm ST depression',
    data: {
      age: 60,
      sex: 'M',
      chestPainType: 'ASY',
      restingBP: 142,
      cholesterol: 216,
      fastingBS: 0,
      restingECG: 'Normal',
      maxHR: 110,
      exerciseAngina: 'Y',
      oldpeak: 1.5,
      stSlope: 'Flat',
    },
  },
  elderlyAtypical: {
    name: 'Elderly Female Non-Anginal',
    description: '65yo Female, Non-Anginal pain, Normal ECG, Moderate HR',
    data: {
      age: 65,
      sex: 'F',
      chestPainType: 'NAP',
      restingBP: 130,
      cholesterol: 235,
      fastingBS: 0,
      restingECG: 'Normal',
      maxHR: 145,
      exerciseAngina: 'N',
      oldpeak: 0.5,
      stSlope: 'Up',
    },
  },
};
