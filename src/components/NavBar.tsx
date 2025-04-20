
import React from "react";
import { Shield, ShieldAlert } from "lucide-react";

const NavBar: React.FC = () => {
  return (
    <div className="bg-cyber-navy text-white w-full p-3 shadow-md">
      <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-accent" />
          <span className="font-bold text-xl">DDoS Analyzer</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-cyber-lightest-navy/50 px-3 py-1 rounded-full">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse-slow"></div>
            <span className="text-sm">Detection System Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
