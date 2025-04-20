
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ConfusionMatrixData {
  truePositive: number;
  trueNegative: number;
  falsePositive: number;
  falseNegative: number;
}

interface ConfusionMatrixProps {
  data: ConfusionMatrixData;
  algorithm: string;
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ data, algorithm }) => {
  const { truePositive, trueNegative, falsePositive, falseNegative } = data;
  
  // Calculate total for percentages
  const total = truePositive + trueNegative + falsePositive + falseNegative;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{algorithm} Confusion Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
          <div className=""></div>
          <div className="text-center font-semibold text-sm">Predicted Positive</div>
          <div className="text-center font-semibold text-sm">Predicted Negative</div>
          
          <div className="font-semibold text-sm">Actual Positive</div>
          <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center">
            <div className="font-bold">{truePositive}</div>
            <div className="text-xs text-muted-foreground">
              True Positive
              <br />
              {((truePositive / total) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-3 text-center">
            <div className="font-bold">{falseNegative}</div>
            <div className="text-xs text-muted-foreground">
              False Negative
              <br />
              {((falseNegative / total) * 100).toFixed(2)}%
            </div>
          </div>
          
          <div className="font-semibold text-sm">Actual Negative</div>
          <div className="bg-red-100 dark:bg-red-900/30 p-3 text-center">
            <div className="font-bold">{falsePositive}</div>
            <div className="text-xs text-muted-foreground">
              False Positive
              <br />
              {((falsePositive / total) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-3 text-center">
            <div className="font-bold">{trueNegative}</div>
            <div className="text-xs text-muted-foreground">
              True Negative
              <br />
              {((trueNegative / total) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;
