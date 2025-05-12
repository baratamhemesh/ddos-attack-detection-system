import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export type Algorithm = 
  | "passiveAggressive" 
  | "decisionTree" 
  | "randomForest";

interface AlgorithmSelectionProps {
  selectedAlgorithms: Algorithm[];
  onSelectionChange: (algorithms: Algorithm[]) => void;
  isLoading: boolean;
}

const algorithms = [
  { id: "passiveAggressive", name: "Passive Aggressive" },
  { id: "decisionTree", name: "Decision Tree" },
  { id: "randomForest", name: "Random Forest" },
];

const AlgorithmSelection: React.FC<AlgorithmSelectionProps> = ({
  selectedAlgorithms,
  onSelectionChange,
  isLoading,
}) => {
  const toggleAlgorithm = (algorithm: Algorithm) => {
    if (selectedAlgorithms.includes(algorithm)) {
      onSelectionChange(selectedAlgorithms.filter((a) => a !== algorithm));
    } else {
      onSelectionChange([...selectedAlgorithms, algorithm]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Select Algorithms</CardTitle>
        <CardDescription>Choose the machine learning algorithms to analyze your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="flex items-center space-x-2">
              <Checkbox
                id={algorithm.id}
                checked={selectedAlgorithms.includes(algorithm.id as Algorithm)}
                onCheckedChange={() => toggleAlgorithm(algorithm.id as Algorithm)}
                disabled={isLoading}
              />
              <label
                htmlFor={algorithm.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {algorithm.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmSelection;
