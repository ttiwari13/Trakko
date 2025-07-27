import React, { useEffect, useRef, useState } from 'react';
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

  const destination = [28.6315, 77.2167]; // Dummy destination: Connaught Place

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
      from: currentLocation,
      to: destination,
      memories: memories,
      createdAt: new Date(),
    };

    console.log('🗺️ Route Saved:', routeData);
    alert('Route saved successfully (see console for now)');
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
    </div>
  );
};

export default MapPage;
