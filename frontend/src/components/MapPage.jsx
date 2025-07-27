// src/pages/MapPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import MemoryForm from '../components/MemoryForm';

const MapPage = () => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const [memories, setMemories] = useState([]);
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const destination = [28.6315, 77.2167]; // Connaught Place

  useEffect(() => {
    if (mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(userLatLng);

        const map = L.map('map').setView(userLatLng, 14);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        L.marker(userLatLng).addTo(map).bindPopup('Your Location').openPopup();

        routingRef.current = L.Routing.control({
          waypoints: [L.latLng(...userLatLng), L.latLng(...destination)],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          createMarker: () => null,
        }).addTo(map);

        map.on('click', (e) => {
          setSelectedLatLng(e.latlng);
        });
      },
      (err) => {
        alert('Please allow location permission to use the map.');
        console.error(err);
      }
    );
  }, []);

  const handleSaveMemory = (data) => {
    const map = mapRef.current;
    if (!map) return;

    const marker = L.marker([data.latlng.lat, data.latlng.lng]).addTo(map);
    marker.bindPopup(`<b>${data.title}</b><br/>${data.description}`).openPopup();

    setMemories((prev) => [...prev, data]);
    setSelectedLatLng(null);
  };

  const handleSaveRoute = () => {
    if (!currentLocation) return;

    const routeData = {
      from: {
        lat: currentLocation[0],
        lng: currentLocation[1],
      },
      to: {
        lat: destination[0],
        lng: destination[1],
      },
      memories: memories.map((m) => ({
        title: m.title,
        description: m.description,
        latlng: { lat: m.latlng.lat, lng: m.latlng.lng },
      })),
      timestamp: new Date().toISOString(),
    };

    const existingRoutes = JSON.parse(localStorage.getItem('savedRoutes')) || [];
    const updatedRoutes = [...existingRoutes, routeData];
    localStorage.setItem('savedRoutes', JSON.stringify(updatedRoutes));

    setMemories([]);
    alert('✅ Route saved successfully!');
  };

  return (
    <div className="w-full h-screen relative">
      <div id="map" className="w-full h-full z-0 rounded-lg" />
      
      {selectedLatLng && (
        <MemoryForm
          latlng={selectedLatLng}
          onSubmit={(memory) => handleSaveMemory({ ...memory, latlng: selectedLatLng })}
          onClose={() => setSelectedLatLng(null)}
        />
      )}

      <button
        onClick={handleSaveRoute}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-[1000]"
      >
        Save Route
      </button>

      <button
        onClick={() => navigate('/saved-routes')}
        className="absolute top-16 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-[1000]"
      >
        Show Saved Routes
      </button>
    </div>
  );
};

export default MapPage;
