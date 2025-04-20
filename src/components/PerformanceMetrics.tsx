
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Algorithm } from "./AlgorithmSelection";

export interface MetricData {
  algorithmName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

interface PerformanceMetricsProps {
  data: MetricData[];
  selectedMetric: "accuracy" | "precision" | "recall" | "f1Score";
  onMetricChange: (metric: "accuracy" | "precision" | "recall" | "f1Score") => void;
}

const metricColors = {
  accuracy: "#4285F4", // Google Blue
  precision: "#EA4335", // Google Red
  recall: "#FBBC05", // Google Yellow
  f1Score: "#34A853", // Google Green
};

const metricNames = {
  accuracy: "Accuracy",
  precision: "Precision",
  recall: "Recall",
  f1Score: "F1 Score",
};

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data, selectedMetric, onMetricChange }) => {
  const chartData = data.map(item => ({
    name: item.algorithmName,
    value: item[selectedMetric],
  }));
  
  const algorithmNameMap: Record<Algorithm, string> = {
    passiveAggressive: "Passive Aggressive",
    decisionTree: "Decision Tree",
    randomForest: "Random Forest",
    forestTree: "Forest Tree",
    fusionNet: "Fusion Net"
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Performance Metrics</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {(Object.keys(metricNames) as Array<keyof typeof metricNames>).map((metric) => (
            <button
              key={metric}
              onClick={() => onMetricChange(metric)}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                selectedMetric === metric
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {metricNames[metric]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2)}%`, metricNames[selectedMetric]]}
                labelFormatter={(name) => `Algorithm: ${name}`}
              />
              <Legend />
              <Bar
                dataKey="value"
                name={metricNames[selectedMetric]}
                fill={metricColors[selectedMetric]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
