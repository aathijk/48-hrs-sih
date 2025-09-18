def analyze_soil(image_path):
    # Dummy logic for now
    return {
        "recommended_crop": "Rice",
        "moisture_level": "Medium",
        "nutrients": {"Nitrogen": "High", "Phosphorus": "Medium", "Potassium": "Low"}
    }

def chat_response(message):
    if "crop" in message.lower():
        return "Based on your soil, Rice and Wheat may be suitable."
    elif "weather" in message.lower():
        return "Weather this week looks favorable for sowing."
    else:
        return "I am here to help with crops, soil, and weather!"
