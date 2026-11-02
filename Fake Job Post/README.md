# Fake Job Post Detector

A small web app that reads a job posting and predicts how likely it is to be fake.

I built it to practise the full path of an ML project: clean the data, build an NLP model, wrap it in an API, give it a simple UI, and package it with Docker.

![App screenshot](screenshot.png)

## The problem

Fake job posts ask for registration fees, ID documents or bank details. Freshers get targeted the most. The goal is a model that flags suspicious posts from their text and basic details.

## Dataset

[Real or Fake: Fake Job Posting Prediction](https://www.kaggle.com/datasets/shivamb/real-or-fake-fake-jobposting-prediction) from Kaggle.

- 17,880 job posts
- Only about 5% are fake, so the data is heavily imbalanced
- Mix of long text (description, requirements) and short columns (employment type, experience, education, and 0/1 flags like "has company logo")

## How it works

1. Join title, company profile, description and requirements into one `text` column.
2. Split into train and test sets (80/20, stratified).
3. `ColumnTransformer` prepares each type of column differently:
   - text: `CountVectorizer` (Bag of Words, top 5,000 words, English stop words removed)
   - categories: `SimpleImputer` ("Unknown" for missing) then `OneHotEncoder`
   - 0/1 flags: passed through unchanged
4. Everything sits in one scikit-learn `Pipeline` with an `XGBClassifier` at the end.
5. Hyperparameters tuned with `RandomizedSearchCV`, scored on F1 for the fake class.
6. The trained pipeline is saved with `joblib`. FastAPI loads it and serves `/predict`.
7. `index.html` (plain HTML, CSS and JavaScript) sends the form data to the API and shows the result.

## Results

Test set, fake class (class 1):

| Model | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|
| Logistic Regression (baseline) | TODO | TODO | TODO | TODO |
| XGBoost (tuned) | TODO | TODO | TODO | TODO |

Accuracy is high for any model here because 95% of the posts are real. A model that always says "real" would already score about 95%. So I judged the models on precision, recall and F1 for the fake class.

## Decisions I made, and why

- **F1 instead of accuracy.** With 5% fake posts, accuracy hides the problem.
- **Stratified split.** Both train and test keep the same fake ratio.
- **`scale_pos_weight` in XGBoost.** Fake posts are rare, so each one is weighted more during training.
- **Pipeline and ColumnTransformer.** Training and prediction use exactly the same preprocessing, so there is no mismatch and no leakage from the test set.
- **Missing categories filled with "Unknown" inside the pipeline.** Many posts leave these fields empty, and that can itself be a signal, so I kept those rows.
- **Dropped columns:** `job_id` (just a row number), and `location`, `department`, `salary_range`, `industry`, `function`, `benefits`. Most are mostly empty or have thousands of unique values, and I wanted a simple form a user can actually fill in.
- **Required fields in the API.** The three 0/1 flags have no default value. The training data never had them missing, so I do not want the API to guess.

## Run it with Docker

```
git clone [YOUR-REPO-URL]
cd [YOUR-REPO-FOLDER]
docker build -t fake-job-detector .
docker run -p 8000:8000 fake-job-detector
```

Open http://127.0.0.1:8000

## Run it without Docker

```
pip install -r requirements.txt
uvicorn app:app --reload
```

## Project structure

```
app.py                              FastAPI app (serves the page and /predict)
index.html                          Frontend (HTML, CSS, JavaScript)
Fake Job Post Detector.ipynb        Data cleaning, training, tuning, evaluation
fake_job_post_detector_model.pkl    Saved pipeline
requirements.txt                    Python packages
Dockerfile                          Container setup
```

## Problems I hit

- The API returned a 500 error because a column name in `app.py` had a typo. The model expects the exact training column names, and scikit-learn reported `columns are missing`.
- Docker's `0.0.0.0` address does not open in a browser on Windows. I had to use `127.0.0.1`.
- XGBoost needs an extra system library (`libgomp1`) inside the slim Python image.

## Limitations

- The model uses Bag of Words, so it ignores word order and context.
- The dataset is older and mostly English. Newer scam wording, for example messages that ask for ID numbers over WhatsApp, may not be recognised well.
- The result is a probability, not proof. A high score only means the post looks like known fake posts.

## What I would do next

- Try TF-IDF and word pairs (n-grams) and compare the results.
- Show the words that pushed a post towards "fake", so the prediction can be explained.
- Collect newer, India-specific job posts and retrain.
- Deploy it online so it can be tried without installing anything.
