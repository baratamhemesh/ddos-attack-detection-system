
import { Algorithm } from "@/components/AlgorithmSelection";
import { ConfusionMatrixData } from "@/components/ConfusionMatrix";

// Base URL for API requests - update this with your actual backend URL
const API_BASE_URL = "http://localhost:5000";

interface AnalysisResult {
  algorithm: Algorithm;
  confusionMatrix: ConfusionMatrixData;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export const analyzeTrafficData = async (
  csvData: string,
  algorithms: Algorithm[]
): Promise<AnalysisResult[]> => {
  try {
    console.log("Sending data to backend for analysis...");
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: csvData,
        algorithms: algorithms,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error connecting to backend:", error);
    // Fall back to mock service if backend is unavailable
    console.log("Falling back to mock analysis...");
    
    // Import dynamically to avoid circular dependency
    const { analyzeData } = await import("./analyzerService");
    return analyzeData(csvData, algorithms);
  }
};
