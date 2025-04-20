
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfusionMatrix, { ConfusionMatrixData } from "./ConfusionMatrix";
import PerformanceMetrics, { MetricData } from "./PerformanceMetrics";
import ComparisonChart from "./ComparisonChart";
import TrafficClassifier from "./TrafficClassifier";
import { Algorithm } from "./AlgorithmSelection";

interface ResultsProps {
  results: {
    algorithm: Algorithm;
    confusionMatrix: ConfusionMatrixData;
    metrics: {
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
    };
  }[];
}

const algorithmNameMap: Record<Algorithm, string> = {
  passiveAggressive: "Passive Aggressive",
  decisionTree: "Decision Tree",
  randomForest: "Random Forest",
  forestTree: "Forest Tree",
  fusionNet: "Fusion Net"
};

const Results: React.FC<ResultsProps> = ({ results }) => {
  const [selectedMetric, setSelectedMetric] = useState<"accuracy" | "precision" | "recall" | "f1Score">("accuracy");

  if (!results.length) return null;

  const metricsData: MetricData[] = results.map((result) => ({
    algorithmName: algorithmNameMap[result.algorithm],
    accuracy: result.metrics.accuracy * 100,
    precision: result.metrics.precision * 100,
    recall: result.metrics.recall * 100,
    f1Score: result.metrics.f1Score * 100,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analysis Results</h2>
      
      <Tabs defaultValue="confusion_matrices" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="confusion_matrices">Confusion Matrices</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="comparison">Algorithm Comparison</TabsTrigger>
          <TabsTrigger value="classification">Traffic Classification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="confusion_matrices">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <ConfusionMatrix
                key={result.algorithm}
                data={result.confusionMatrix}
                algorithm={algorithmNameMap[result.algorithm]}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <PerformanceMetrics
            data={metricsData}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </TabsContent>
        
        <TabsContent value="comparison">
          <ComparisonChart data={metricsData} />
        </TabsContent>

        <TabsContent value="classification">
          <TrafficClassifier algorithmResults={results} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
