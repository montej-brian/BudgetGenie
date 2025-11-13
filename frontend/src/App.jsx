import React from "react";
import Home from "./pages/Home";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Home />
      <Analytics />
    </div>
  );
};

export default App;
