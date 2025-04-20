
import React from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";
import ProductCategories from "@/components/ProductCategories";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main>
        <Hero />
        <ProductCategories />
        <ContactSection />
      </main>
      
      <footer className="bg-primary/10 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Kedarinadh Enterprises &copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
