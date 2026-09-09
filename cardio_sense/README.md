# CardioSense AI — Clinical Heart Disease Diagnostic Cockpit

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**CardioSense AI** is a real-time clinical heart disease diagnostic cockpit powered by a calibrated **scikit-learn Logistic Regression** inference engine. It offers instantaneous cardiovascular risk stratification, dynamic Lead II ECG rhythm synthesis, SHAP/log-odds factor attribution, and clinical report generation.

---

## ⚡ Key Features

- **Exact Scikit-Learn Inference Engine**: Uses calibrated weights ($\beta$) and `StandardScaler` statistics trained on the 918-patient Heart Disease dataset (`heart.csv`), achieving **89.1% test accuracy** and **0.914 ROC-AUC**.
- **Real-Time Dynamic ECG Rhythm Monitor**: Lead II visualizer dynamically scales heartbeat cycle duration to the patient's `MaxHR` and modulates ST-segment depression in SVG coordinates according to `Oldpeak` and `ST_Slope`.
- **Radial Risk Speedometer Gauge**: Displays $P(\text{Disease}=1)$, log-odds score ($z$), calculated Odds Ratio, and risk stratification badge (Low, Moderate, High, Critical).
- **SHAP / Log-Odds Feature Impact**: Waterfall attribution bars illustrating top positive risk drivers and negative protective factors.
- **Biometric Inputs**: Range sliders, selectors, and quick-toggles for all 11 patient features with normal/abnormal medical indicators.
- **Ground-Truth Benchmark Cohort**: Pre-loaded verified cases from `heart.csv` with instant comparison of model prediction vs. ground-truth.
- **Clinical Report Export**: Formatted printable/copyable diagnostic summary dossier.
- **Built-in REST API**: Endpoint at `/api/predict` for programmatic inference.

---

## 🚀 How to Deploy on Vercel

Deploying this project to **Vercel** takes less than 2 minutes:

### Option 1: Via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CardioSense AI Next.js web application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cardiosense.git
   git push -u origin main
   ```
   *(Make sure `.gitignore` is present so `node_modules` and `.next` are not uploaded)*

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** or **"Import Project"**.
   - Select your GitHub repository (`cardiosense`).
   - Leave the default settings:
     - **Framework Preset**: `Next.js`
     - **Root Directory**: `./`
     - **Build Command**: `next build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)
   - Click **"Deploy"**.

3. **Done!** Vercel will automatically build and assign a free production URL (e.g., `https://cardiosense.vercel.app`).

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cardiosense.git
   cd cardiosense
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Repository Structure

```
├── .gitignore                      # Standard Next.js gitignore
├── package.json                    # Project metadata & dependencies
├── package-lock.json               # Locked dependency tree
├── tsconfig.json                   # TypeScript configuration & path aliases
├── next.config.mjs                 # Next.js configuration
├── tailwind.config.js              # Custom cockpit dark palette, fonts, animations
├── postcss.config.mjs              # Tailwind & Autoprefixer post-processing
├── README.md                       # Project documentation
│
├── heart.csv                       # 918-patient clinical training dataset
├── Heart(02).ipynb                 # Model training & evaluation notebook
├── Logistic Regression_heart.pkl   # Trained scikit-learn model
├── scaler_heart.pkl                # Trained StandardScaler
├── columns_heart.pkl               # One-hot encoded feature column list
├── model_weights.json              # Extracted exact weights & scaler statistics
│
└── src/
    ├── types/
    │   └── index.ts                # TypeScript interfaces for patient data & predictions
    ├── lib/
    │   ├── model.ts                # Core prediction engine with exact coefficients
    │   └── dataset_samples.ts      # Ground-truth benchmark patients from heart.csv
    ├── components/
    │   ├── Logo.tsx                # SVG logo with glowing nodes
    │   ├── Header.tsx              # Cockpit navigation bar & model telemetry pill
    │   ├── HudStrip.tsx            # Telemetry status strip with presets
    │   ├── ClinicalInputs.tsx      # All 11 biometric inputs and sliders
    │   ├── ECGWaveform.tsx         # Real-time Lead II dynamic ECG SVG monitor
    │   ├── RiskGauge.tsx           # Radial circular speedometer risk gauge
    │   ├── FeatureImpact.tsx       # SHAP / log-odds attribution waterfall bars
    │   ├── ValidationCard.tsx      # ROC curve visualizer & benchmark stats
    │   ├── ExplainabilityView.tsx  # Full 15-dimensional matrix decomposition table
    │   ├── CohortValidationView.tsx# Ground-truth benchmark validation grid
    │   └── ClinicalReportModal.tsx # Formatted printable report modal
    └── app/
        ├── layout.tsx              # Root layout with Google Fonts
        ├── globals.css             # Glassmorphism, custom scrollbars, animations
        ├── page.tsx                # Main cockpit dashboard page
        └── api/
            └── predict/
                └── route.ts        # REST API endpoint for inference
```

---

## 🧮 Model Mathematics & Calibration

The prediction pipeline applies exact standard scaling followed by logistic regression log-odds calculation:

$$z = \beta_0 + \sum_{i=1}^{15} \beta_i \cdot \left(\frac{x_i - \mu_i}{\sigma_i}\right)$$

$$P(\text{Heart Disease} = 1) = \frac{1}{1 + e^{-z}}$$

$$\text{Odds Ratio} = e^z$$

### 15-Dimensional Feature Vector
| Feature Name | Clinical Predictor | Model Weight ($\beta$) | Scaling Mean ($\mu$) | Scaling Std ($\sigma$) |
| :--- | :--- | :---: | :---: | :---: |
| `Age` | Patient Age | +0.1704 | 52.95 | 9.68 |
| `RestingBP` | Resting Blood Pressure | +0.0123 | 129.73 | 18.57 |
| `Cholesterol` | Serum Cholesterol | +0.0295 | 241.68 | 63.29 |
| `FastingBS` | Fasting Glucose > 120 | +0.5053 | 0.255 | 0.436 |
| `MaxHR` | Max Heart Rate Achieved | -0.1887 | 139.33 | 25.82 |
| `Oldpeak` | ST Depression | +0.4488 | 0.641 | 0.898 |
| `Sex_M` | Biological Sex (Male) | +0.6036 | 0.853 | 0.354 |
| `ChestPainType_ATA` | Atypical Angina | -0.6317 | 0.185 | 0.388 |
| `ChestPainType_NAP` | Non-Anginal Pain | -0.5801 | 0.223 | 0.416 |
| `ChestPainType_TA` | Typical Angina | -0.2464 | 0.076 | 0.265 |
| `RestingECG_Normal` | Normal Sinus Rhythm | -0.0073 | 0.587 | 0.492 |
| `RestingECG_ST` | ST-T Wave Abnormality | -0.0707 | 0.201 | 0.401 |
| `ExerciseAngina_Y` | Exercise Induced Angina | +0.4984 | 0.370 | 0.483 |
| `ST_Slope_Flat` | Flat ST Slope | +0.5589 | 0.440 | 0.496 |
| `ST_Slope_Up` | Upsloping ST Segment | -0.6045 | 0.478 | 0.500 |
| **Intercept ($\beta_0$)** | Baseline Offset | **+0.2784** | — | — |

---

## ⚖️ License & Disclaimer

This project is created for educational and clinical research demonstration. Medical diagnosis must always be confirmed by a licensed medical practitioner.
