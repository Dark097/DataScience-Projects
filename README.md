# Loud Filter: Spam SMS Detection

A small machine-learning web app that reads an SMS or WhatsApp message (English or Hinglish) and classifies it as **legit**, **spam** or **scam**, with a confidence score for each class.

*Designed with Intent. Engineered with Precision.*

## Features

- Three-way classification: `legit`, `spam`, `scam`
- Supports **English** and **Hinglish** (Hindi written in English letters)
- Returns the predicted label plus the probability of every class
- Animated single-page UI with one-click example messages for spam, scam and legit
- REST API built with FastAPI, with automatic Swagger docs at `/docs`

## Project structure

```
.
├── app.py                    # FastAPI backend (loads the model, serves /predict)
├── SpamSMS.pkl               # Trained scikit-learn pipeline (saved with joblib)
├── spamSMSClassfier.ipynb    # Notebook: cleaning, training and saving the model
├── index.html                # Frontend UI (single file, no build step)
└── README.md
```

## How it works

1. **Training (notebook):** messages from `india_scam_sms_50k.csv` (see [Dataset](#dataset)) are cleaned (lowercased, with URLs, emails, phone numbers and currency symbols replaced by tokens). The pipeline combines a `CountVectorizer` on the cleaned text with a `OneHotEncoder` on the categorical columns (`language`, `source`), feeding a `LogisticRegression` classifier (`class_weight='balanced'`). The trained pipeline is saved to `SpamSMS.pkl`.
2. **API (`app.py`):** FastAPI loads `SpamSMS.pkl` once at start-up. `POST /predict` builds a one-row DataFrame from the request and returns the prediction and class probabilities.
3. **UI (`index.html`):** the page posts the message, language and source to `/predict` and shows the verdict with a bar for each class.

## Requirements

- Python 3.9+
- `fastapi`, `uvicorn`, `pandas`, `scikit-learn`, `joblib`

```bash
pip install fastapi uvicorn pandas scikit-learn joblib
```

Use the same scikit-learn version that was used to train the model, otherwise loading `SpamSMS.pkl` may fail or warn.

## Run locally

1. Put `app.py`, `SpamSMS.pkl` and `index.html` in the same folder.
2. Make the home route serve the UI, so the page and API share one origin. In `app.py`:

   ```python
   from fastapi.responses import FileResponse

   @app.get('/')
   def home():
       return FileResponse('index.html')
   ```

3. Start the server:

   ```bash
   uvicorn app:app --reload
   ```

4. Open <http://127.0.0.1:8000> for the UI, or <http://127.0.0.1:8000/docs> for the API docs.

If you open `index.html` directly from disk instead, the page falls back to `http://127.0.0.1:8000`, and you must enable CORS in `app.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## API

### `POST /predict`

Request body:

```json
{
  "clean_message": "Congratulations! You have won Rs 50,000. Click the link to claim.",
  "language": "english",
  "source": "real"
}
```

| Field           | Type   | Values                    |
| --------------- | ------ | ------------------------- |
| `clean_message` | string | the message text          |
| `language`      | string | `english` or `hinglish`   |
| `source`        | string | `real` or `synthetic` (the values in the training data; the UI sends `real`) |

Response (example; the values depend on the model):

```json
{
  "prediction": "scam",
  "probabilities": {
    "legit": 0.01,
    "scam": 0.97,
    "spam": 0.02
  }
}
```

Quick test with curl:

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"clean_message":"Your KYC has expired, update now: bit.ly/kyc","language":"english","source":"real"}'
```

## Dataset

`india_scam_sms_50k.csv` has 50,000 rows and 5 columns: `text`, `label`, `binary_label`, `language` and `source`. The model is trained on `binary_label`.

| Column         | Breakdown |
| -------------- | --------- |
| `binary_label` | scam 29,882 · legit 13,960 · spam 6,158 |
| `label`        | legit 13,960 · scam_kyc 6,365 · spam_promo 6,158 · scam_upi 6,115 · scam_job 4,719 · scam_loan 4,709 · scam_courier 4,663 · scam_electricity 3,311 |
| `language`     | english 28,306 · hinglish 21,694 |
| `source`       | synthetic 47,959 · real 2,041 |

About 96% of the messages are synthetic (generated), so accuracy on real-world messages may differ from the test score in the notebook. The notebook also removes rows with duplicate cleaned messages before the train/test split.

## Classes

| Label   | Meaning                                                                 |
| ------- | ----------------------------------------------------------------------- |
| `legit` | A normal message from a friend, bank or service                         |
| `spam`  | Unwanted promotion or bulk offers                                       |
| `scam`  | An attempt to trick you out of money or personal details (OTP, KYC, prizes) |

## Notes and limitations

- The `source` field in the dataset is `synthetic` or `real`, **not** SMS or WhatsApp. Any other value (such as `sms`) is ignored by the encoder, so it has no effect on the prediction. The UI therefore sends `real` and has no source dropdown.
- The model was trained on **cleaned** text (see `clean_text` in the notebook). `app.py` currently passes the message to the model as received, so for best results apply the same cleaning before prediction, or add the `clean_text` function to `app.py` and call it on `message.clean_message`.
- No model is perfect. Treat the verdict as a strong hint, and never share an OTP or tap a suspicious link because a message was labelled `legit`.
- The API does not store messages; it only returns a prediction.

## Built with

Python, scikit-learn, FastAPI, Uvicorn, pandas, joblib, and an HTML/CSS/JavaScript frontend based on the free Loud Kettle template by [8B](https://8b.com/templates/loud-kettle/) (MIT licensed code; fonts from Google Fonts).

## Author

Crafted by **Riju Jain**

- LinkedIn: <https://www.linkedin.com/in/rijujain>
- GitHub: <https://github.com/Dark097>
- Instagram: <https://www.instagram.com/riju__jain>
