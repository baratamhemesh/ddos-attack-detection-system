
import React from "react";
import { Plug } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <div className="bg-white text-primary w-full p-3 shadow-md">
      <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plug className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Kedarinadh Enterprises</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Owned by Baratam Tirupathi Rao</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
