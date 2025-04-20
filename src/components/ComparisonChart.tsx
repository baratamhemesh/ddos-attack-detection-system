
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MetricData } from "./PerformanceMetrics";

interface ComparisonChartProps {
  data: MetricData[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  // Transform the data for the chart
  const transformedData = data.map((item) => ({
    name: item.algorithmName,
    Accuracy: parseFloat((item.accuracy).toFixed(2)),
    Precision: parseFloat((item.precision).toFixed(2)),
    Recall: parseFloat((item.recall).toFixed(2)),
    "F1 Score": parseFloat((item.f1Score).toFixed(2)),
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Algorithm Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={transformedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Legend />
              <Bar dataKey="Accuracy" fill="#4285F4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#EA4335" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#FBBC05" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1 Score" fill="#34A853" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
