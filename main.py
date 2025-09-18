from fastapi import FastAPI, Form, File, UploadFile
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from PIL import Image
import io

app = FastAPI(title="Farmer-Friendly Crop Recommendation System")

# Load CSV at startup
df = pd.read_csv("crop_data.csv")

# Function to estimate nutrients from previous yield and fertilizer usage
def estimate_nutrients(previous_yield, fertilizer_times):
    N = min(120, fertilizer_times * 10 + previous_yield / 100)
    P = min(100, fertilizer_times * 5 + previous_yield / 150)
    K = min(100, fertilizer_times * 5 + previous_yield / 200)
    return N, P, K

# Function to estimate pH based on soil type
def estimate_ph(soil_type):
    soil_type = soil_type.lower()
    if soil_type == 'loamy':
        return 6.5
    elif soil_type == 'clay':
        return 7.0
    elif soil_type == 'sandy':
        return 6.8
    else:
        return 6.8  # default

# Function to estimate humidity from image brightness
def get_humidity_from_image(file: UploadFile):
    image = Image.open(io.BytesIO(file.file.read())).convert('L')  # grayscale
    arr = np.array(image)
    brightness = arr.mean()
    humidity = min(100, max(10, brightness / 2))  # map brightness to humidity %
    return humidity

@app.post("/recommend_crop/")
async def recommend_crop(
    previous_yield: float = Form(...),
    fertilizer_times: int = Form(...),
    soil_type: str = Form(...),
    temperature: float = Form(...),
    rainfall: float = Form(...),
    image: UploadFile = File(...)
):
    # Estimate missing features
    N, P, K = estimate_nutrients(previous_yield, fertilizer_times)
    ph = estimate_ph(soil_type)
    humidity = get_humidity_from_image(image)

    # Create input vector
    input_vector = np.array([N, P, K, temperature, humidity, ph, rainfall])

    # Extract dataset features and labels
    features = df[['N','P','K','temperature','humidity','ph','rainfall']].values
    labels = df['label'].values

    # Find nearest neighbor
    distances = np.linalg.norm(features - input_vector, axis=1)
    idx = np.argmin(distances)
    recommended_crop = labels[idx]

    return JSONResponse(content={
        "recommended_crop": recommended_crop,
        "estimated_features": {
            "N": round(N, 2),
            "P": round(P, 2),
            "K": round(K, 2),
            "humidity": round(humidity, 2),
            "pH": round(ph, 2)
        }
    })
