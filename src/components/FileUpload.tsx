
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onFileUploaded: (file: File, data: string) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = useCallback(
    (selectedFile: File) => {
      if (!selectedFile) return;

      if (!selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          onFileUploaded(selectedFile, e.target.result);
        }
      };
      reader.readAsText(selectedFile);
    },
    [onFileUploaded, toast]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [handleFileChange]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload Network Traffic Dataset</CardTitle>
        <CardDescription>Upload a CSV file containing network traffic data for DDoS attack detection</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] transition-colors ${
            isDragging ? "border-accent bg-accent/10" : "border-border"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 mb-4 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Your file should contain network traffic features and labels
            </p>
          </div>
          <Input
            type="file"
            accept=".csv"
            className="hidden"
            id="file-upload"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="file-upload">
            <Button className="mt-4" variant="outline" disabled={isLoading} asChild>
              <span>Select File</span>
            </Button>
          </label>
        </div>
      </CardContent>
      <CardFooter>
        {file && (
          <p className="text-sm text-muted-foreground">
            Selected file: <span className="font-medium text-foreground">{file.name}</span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
