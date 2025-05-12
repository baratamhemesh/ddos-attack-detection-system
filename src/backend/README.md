
# DDoS Detection System - Backend

This directory is where you can implement your backend server for machine learning model training and prediction.

## Getting Started

1. Create a new backend server using your preferred technology (Node.js, Python, etc.)
2. Implement the API endpoints needed by the frontend
3. Connect to the machine learning models in `src/ml/MachineLearningModels.js`

## Required API Endpoints

The frontend expects the following API endpoint:

### POST /analyze

Analyzes network traffic data for DDoS detection.

**Request Body:**
```json
{
  "data": "csv data as string",
  "algorithms": ["passiveAggressive", "decisionTree", "randomForest"]
}
```

**Response:**
```json
[
  {
    "algorithm": "passiveAggressive",
    "confusionMatrix": {
      "truePositive": 450,
      "trueNegative": 380,
      "falsePositive": 20,
      "falseNegative": 150
    },
    "metrics": {
      "accuracy": 0.83,
      "precision": 0.957,
      "recall": 0.75,
      "f1Score": 0.84
    }
  },
  // Results for other algorithms...
]
```

## Example Backend Implementation (Python Flask)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import io
# Import your ML functions here

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    csv_data = data.get('csv_data')
    algorithms = data.get('algorithms')
    
    # Process CSV data
    df = pd.read_csv(io.StringIO(csv_data))
    
    # Apply ML algorithms
    results = []
    for algorithm in algorithms:
        # Add your ML code here
        # This is where you would train/test models
        
        # Example mock result
        result = {
            "algorithm": algorithm,
            "confusionMatrix": {
                "truePositive": 450,
                "trueNegative": 380,
                "falsePositive": 20,
                "falseNegative": 150
            },
            "metrics": {
                "accuracy": 0.83,
                "precision": 0.957,
                "recall": 0.75,
                "f1Score": 0.84
            }
        }
        results.append(result)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Running the Backend
1. Install dependencies for your chosen backend technology
2. Implement the API endpoints
3. Start the server (e.g., `python app.py` for Flask)
4. The frontend is configured to connect to `http://localhost:5000` by default
