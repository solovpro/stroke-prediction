import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("../model/model.joblib")

THRESHOLD = 0.08

class StrokeRequest(BaseModel):
    age: float
    hypertension: int
    heart_disease: int
    avg_glucose_level: float
    bmi: float

    gender: str
    ever_married: str
    work_type: str
    Residence_type: str
    smoking_status: str

    is_male: int
    is_urban: int

@app.post("/predict")
def predict(data: StrokeRequest):

    X = pd.DataFrame([data.model_dump()])

    probability = model.predict_proba(X)[0, 1]

    prediction = int(probability >= THRESHOLD)

    return {
        "probability": float(probability),
        "prediction": prediction,
    }


# Чтобы запустить - ввести в backend
# uvicorn main:app --reload --port 8000 
