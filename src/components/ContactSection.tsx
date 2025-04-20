
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-16 bg-primary/5" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Plug className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold">Kedarinadh Enterprises</h3>
              <p className="text-muted-foreground">Main Road, Mandasa</p>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = "tel:+919490967239"}
                className="mt-4"
              >
                Call Us: +91 94909 67239
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Visit our store for the best electrical and plumbing solutions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
