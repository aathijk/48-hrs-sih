from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze_crop():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # ---- Dummy AI result (replace with your ML logic) ----
    result = {
        "filename": file.filename,
        "message": "Crop analyzed successfully ✅",
        "recommendation": "Add more nitrogen fertilizer for better yield 🌱"
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
