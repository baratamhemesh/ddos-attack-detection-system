
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FileUpload from "@/components/FileUpload";
import AlgorithmSelection, { Algorithm } from "@/components/AlgorithmSelection";
import Results from "@/components/Results";
import { analyzeData } from "@/services/analyzerService";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import { ChartBar } from "lucide-react";

const Index = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string>("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([
    "passiveAggressive",
    "decisionTree",
    "randomForest",
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUploaded = (file: File, data: string) => {
    setCsvFile(file);
    setCsvData(data);
    setResults([]);
  };

  const handleAnalyze = async () => {
    if (!csvData) {
      toast({
        title: "No data to analyze",
        description: "Please upload a CSV file first",
        variant: "destructive",
      });
      return;
    }

    if (selectedAlgorithms.length === 0) {
      toast({
        title: "No algorithms selected",
        description: "Please select at least one algorithm",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const analysisResults = await analyzeData(csvData, selectedAlgorithms);
      setResults(analysisResults);
      toast({
        title: "Analysis complete",
        description: `Analyzed with ${selectedAlgorithms.length} algorithms`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis",
        variant: "destructive",
      });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyber-blue to-cyber-navy text-white">
      <NavBar />
      
      <main className="flex-1 container max-w-screen-xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ChartBar className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold">DDoS Attack Detection System</h1>
          </div>
          <p className="text-cyber-light-slate max-w-2xl mx-auto">
            Upload your network traffic dataset and analyze it using multiple machine learning algorithms
            to detect unknown DDoS attacks with high precision. Compare performance metrics and confusion matrices.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload onFileUploaded={handleFileUploaded} isLoading={isAnalyzing} />
            <AlgorithmSelection 
              selectedAlgorithms={selectedAlgorithms}
              onSelectionChange={setSelectedAlgorithms}
              isLoading={isAnalyzing}
            />
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={!csvData || selectedAlgorithms.length === 0 || isAnalyzing}
              className="bg-accent text-cyber-navy hover:bg-accent/90"
            >
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <Results results={results} />
          </div>
        )}
      </main>
      
      <footer className="bg-cyber-navy/50 backdrop-blur-sm py-4 text-center text-sm text-cyber-slate">
        <div className="container mx-auto">
          <p>DDoS Attack Detection System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
