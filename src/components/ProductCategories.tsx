
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bulb, Fan, Wire, Switch, Plug } from "lucide-react";

const products = [
  {
    title: "Electrical",
    items: ["Switches", "Bulbs", "Wires", "MCBs"],
    icon: Switch,
  },
  {
    title: "Appliances",
    items: ["Fans", "Stoves", "Mixers"],
    icon: Fan,
  },
  {
    title: "Plumbing",
    items: ["Water Tanks", "Pipes", "Fittings"],
    icon: Wire,
  }
];

const ProductCategories = () => {
  return (
    <section className="py-16 bg-background" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
