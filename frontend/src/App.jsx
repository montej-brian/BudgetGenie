import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <SplashScreen /> : (
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Home />
          <Analytics />
        </div>
      )}
    </>
  );
};

export default App;
