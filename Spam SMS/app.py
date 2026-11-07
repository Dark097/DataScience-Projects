import pandas as pd
import joblib 
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse

app= FastAPI()
model =joblib.load('SpamSMS.pkl')

class Message(BaseModel):

    clean_message : str ='write your message here'
    language :str = 'english or hinglish'
    source : str  = 'whatsapp or sms'


@app.get('/')
def home():
    return FileResponse('index.html')

@app.post('/predict')
def predict(message: Message):

    row = pd.DataFrame([{
        'clean_message': message.clean_message,
        'language': message.language,
        'source': message.source
    }])

    probabilities = model.predict_proba(row)[0]

    class_probabilities = {
        str(label): float(probability)
        for label, probability in zip(model.classes_, probabilities)
    }

    return {
        "prediction": str(model.predict(row)[0]),
        "probabilities": class_probabilities
    }