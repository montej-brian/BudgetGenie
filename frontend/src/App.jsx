import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <Home />
    </div>
  );
};

export default App;
