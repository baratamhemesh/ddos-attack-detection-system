
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface TrafficClassifierProps {
  algorithmResults: any[];
}

const TrafficClassifier: React.FC<TrafficClassifierProps> = ({ algorithmResults }) => {
  const [classification, setClassification] = useState<string | null>(null);
  const { toast } = useToast();

  const classifyTraffic = () => {
    if (!algorithmResults || algorithmResults.length === 0) {
      toast({
        title: "No analysis results",
        description: "Please analyze the traffic data first",
        variant: "destructive",
      });
      return;
    }

    // Simple ensemble voting based on majority predictions
    const totalAlgorithms = algorithmResults.length;
    const detectedAttacks = algorithmResults.filter(result => {
      const { truePositive, falseNegative } = result.confusionMatrix;
      return truePositive > falseNegative; // If true positives are higher, algorithm leans towards attack detection
    }).length;

    // If more than half of algorithms detect attack patterns
    const isDDoS = detectedAttacks > totalAlgorithms / 2;
    setClassification(isDDoS ? "DDoS Attack Detected" : "Normal Traffic");

    toast({
      title: isDDoS ? "Warning: DDoS Attack Detected" : "Analysis Complete",
      description: isDDoS 
        ? "The traffic patterns indicate a potential DDoS attack"
        : "The traffic appears to be normal",
      variant: isDDoS ? "destructive" : "default",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Traffic Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <Button 
            onClick={classifyTraffic}
            className="bg-accent text-cyber-navy hover:bg-accent/90"
            size="lg"
          >
            Classify Traffic
          </Button>
          
          {classification && (
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              classification.includes("DDoS") 
                ? "bg-red-500/10 text-red-500"
                : "bg-green-500/10 text-green-500"
            }`}>
              {classification.includes("DDoS") ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <ShieldCheck className="h-5 w-5" />
              )}
              <span className="font-semibold">{classification}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficClassifier;
