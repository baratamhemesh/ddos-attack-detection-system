
import { Algorithm } from "@/components/AlgorithmSelection";
import { ConfusionMatrixData } from "@/components/ConfusionMatrix";

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

// This is a mock service that simulates ML processing
// In a real app, you'd process the data with actual ML algorithms
export const analyzeData = async (
  csvData: string,
  algorithms: Algorithm[]
): Promise<AnalysisResult[]> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      const results: AnalysisResult[] = algorithms.map((algorithm) => {
        // Generate somewhat realistic metrics with some variance between algorithms
        // These are mock values - in a real app this would use actual ML processing
        const baseAccuracy = 0.85 + Math.random() * 0.1;
        const basePrecision = 0.82 + Math.random() * 0.15;
        const baseRecall = 0.8 + Math.random() * 0.15;
        let f1Score = (2 * basePrecision * baseRecall) / (basePrecision + baseRecall);
        
        // Generate confusion matrix values that are mathematically consistent
        // Assuming we're working with about 1000 samples total
        const totalSamples = 1000;
        const positives = Math.round(totalSamples * 0.6); // 60% are actual positives
        const negatives = totalSamples - positives;
        
        const truePositives = Math.round(positives * baseRecall);
        const falseNegatives = positives - truePositives;
        
        const trueNegatives = Math.round(negatives * (baseAccuracy * 1.1 - baseRecall * 0.6));
        const falsePositives = negatives - trueNegatives;
        
        // Ensure the metrics are consistent with the confusion matrix
        const calculatedAccuracy = (truePositives + trueNegatives) / totalSamples;
        const calculatedPrecision = truePositives / (truePositives + falsePositives);
        const calculatedRecall = truePositives / (truePositives + falseNegatives);
        const calculatedF1 = (2 * calculatedPrecision * calculatedRecall) / 
                             (calculatedPrecision + calculatedRecall);

        // Algorithm-specific adjustments to make the results more interesting
        let adjustedMetrics = {
          accuracy: calculatedAccuracy,
          precision: calculatedPrecision,
          recall: calculatedRecall,
          f1Score: calculatedF1
        };
        
        switch (algorithm) {
          case "passiveAggressive":
            // Make PA slightly better at recall but worse at precision
            adjustedMetrics.recall += 0.03;
            adjustedMetrics.precision -= 0.02;
            break;
          case "randomForest":
            // Random Forest typically has good overall performance
            adjustedMetrics.accuracy += 0.04;
            adjustedMetrics.precision += 0.02;
            break;
          case "decisionTree":
            // Make Decision Tree more balanced
            adjustedMetrics.precision += 0.01;
            adjustedMetrics.recall += 0.01;
            break;
        }
        
        // Recalculate F1 based on adjusted precision and recall
        adjustedMetrics.f1Score = (2 * adjustedMetrics.precision * adjustedMetrics.recall) / 
                                  (adjustedMetrics.precision + adjustedMetrics.recall);
        
        // Create adjusted confusion matrix values based on the metrics
        const adjustedTotalSamples = 1000;
        const adjustedPositives = Math.round(adjustedTotalSamples * 0.6);
        const adjustedNegatives = adjustedTotalSamples - adjustedPositives;
        
        const adjustedTruePositives = Math.round(adjustedPositives * adjustedMetrics.recall);
        const adjustedFalseNegatives = adjustedPositives - adjustedTruePositives;
        
        const adjustedAccWithoutTP = (adjustedMetrics.accuracy * adjustedTotalSamples - adjustedTruePositives) / 
                                    (adjustedTotalSamples - adjustedPositives);
        const adjustedTrueNegatives = Math.round(adjustedNegatives * adjustedAccWithoutTP);
        const adjustedFalsePositives = adjustedNegatives - adjustedTrueNegatives;
        
        // Cap all metrics at 0.99 for realism
        Object.keys(adjustedMetrics).forEach(key => {
          const metricKey = key as keyof typeof adjustedMetrics;
          adjustedMetrics[metricKey] = Math.min(adjustedMetrics[metricKey], 0.99);
        });

        return {
          algorithm,
          confusionMatrix: {
            truePositive: adjustedTruePositives,
            trueNegative: adjustedTrueNegatives,
            falsePositive: adjustedFalsePositives,
            falseNegative: adjustedFalseNegatives,
          },
          metrics: adjustedMetrics,
        };
      });
      
      resolve(results);
    }, 2000); // 2 second delay to simulate processing
  });
};
