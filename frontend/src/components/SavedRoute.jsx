// src/components/SavedRoute.jsx
import React from "react";

const dummyRoutes = [
  {
    name: "Morning Walk 🏃‍♂️",
    emoji: "🌅",
    from: { lat: 28.6139, lng: 77.209 },
    to: { lat: 28.7041, lng: 77.1025 },
    timestamp: "2025-07-26T08:00:00Z",
  },
  {
    name: "Evening Ride 🚴‍♀️",
    emoji: "🌇",
    from: { lat: 19.076, lng: 72.8777 },
    to: { lat: 18.5204, lng: 73.8567 },
    timestamp: "2025-07-25T18:45:00Z",
  },
];

// inside SavedRoute.jsx
const SavedRoute = ({ routes = [], onClose, onView, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-bold">Saved Routes</h2>
        {routes.length === 0 ? (
          <p>No saved routes yet.</p>
        ) : (
          <ul className="space-y-2">
            {routes.map((route, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <div>
                  <p className="text-sm text-gray-600">
                    From: {route.from.lat.toFixed(3)}, {route.from.lng.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {route.to.lat.toFixed(3)}, {route.to.lng.toFixed(3)}
                  </p>
                  <p className="text-xs text-gray-400">📅 {route.timestamp || route.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(route)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default SavedRoute;