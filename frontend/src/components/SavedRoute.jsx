// src/pages/SavedRoutesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SavedRoute = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("savedRoutes");
    if (stored) {
      setRoutes(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = [...routes];
    updated.splice(index, 1);
    localStorage.setItem("savedRoutes", JSON.stringify(updated));
    setRoutes(updated);
  };

  const handleView = (route) => {
    alert(`Route from (${route.from.lat}, ${route.from.lng}) to (${route.to.lat}, ${route.to.lng})`);
    // Optional: pass route data back to map with state or params
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">🛣️ Saved Routes</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Map
          </button>
        </div>

        {routes.length === 0 ? (
          <p className="text-gray-600">No saved routes found.</p>
        ) : (
          <ul className="space-y-4">
            {routes.map((route, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <p className="font-semibold mb-1">
                  From: ({route.from.lat.toFixed(2)}, {route.from.lng.toFixed(2)})
                </p>
                <p className="font-semibold mb-1">
                  To: ({route.to.lat.toFixed(2)}, {route.to.lng.toFixed(2)})
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Memories: {route.memories?.length || 0} | Saved on:{" "}
                  {new Date(route.timestamp).toLocaleString()}
                </p>

                {route.memories?.length > 0 && (
                  <ul className="text-sm text-gray-700 pl-4 list-disc">
                    {route.memories.map((m, i) => (
                      <li key={i}>
                        <strong>{m.title}</strong>: {m.description}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-x-2 mt-3">
                  <button
                    onClick={() => handleView(route)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedRoute;
