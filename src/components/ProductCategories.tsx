
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Cable, Fan, Waves, Plug, ShowerHead, Thermometer } from "lucide-react";

const ProductCategories = () => {
  const categories = [
    { name: "Switches", icon: <Plug className="h-12 w-12 text-primary" /> },
    { name: "Bulbs", icon: <Lightbulb className="h-12 w-12 text-primary" /> },
    { name: "Wires", icon: <Cable className="h-12 w-12 text-primary" /> },
    { name: "Fans", icon: <Fan className="h-12 w-12 text-primary" /> },
    { name: "Water Tanks", icon: <Waves className="h-12 w-12 text-primary" /> },
    { name: "Plumbing", icon: <ShowerHead className="h-12 w-12 text-primary" /> },
    { name: "Stoves", icon: <Thermometer className="h-12 w-12 text-primary" /> },
  ];

  return (
    <section className="py-16 bg-background" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                {category.icon}
                <CardTitle className="mt-4 text-center">{category.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
