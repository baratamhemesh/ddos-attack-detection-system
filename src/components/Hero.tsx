
import React from "react";
import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Plug className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Kedarinadh Enterprises</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Your trusted source for electrical supplies, plumbing solutions, and home appliances in Mandasa
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            View Our Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
