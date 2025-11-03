import React from "react";

const AiBudgetCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-2">AI Recommendation</h3>
      <p className="text-gray-700 whitespace-pre-line">{data || "No data yet."}</p>
    </div>
  );
};

export default AiBudgetCard;
