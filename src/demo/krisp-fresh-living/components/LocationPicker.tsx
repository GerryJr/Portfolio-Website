import { useState, useEffect } from 'react';
import { LOCATIONS } from '../lib/menu-data';

interface LocationPickerProps {
  onSelect: (locationId: string) => void;
}

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

export default function LocationPicker({ onSelect }: LocationPickerProps) {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [lastVisit] = useState<string | null>(() => {
    try { return localStorage.getItem('krisp_last_location'); } catch { return null; }
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
        },
        () => { /* user denied, no distance shown */ }
      );
    }
  }, []);

  // Calculate distances if we have user location
  const locationsWithDistance = LOCATIONS.map(loc => {
    const distance = (userLat !== null && userLng !== null)
      ? kmToMiles(getDistanceKm(userLat, userLng, loc.lat, loc.lng))
      : null;
    return { ...loc, distance };
  });

  // Sort by distance if available
  if (userLat !== null) {
    locationsWithDistance.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  }

  const nearestId = userLat !== null ? locationsWithDistance[0]?.id : null;

  const isSuggested = (locId: string) =>
    (nearestId !== null && locId === nearestId) || lastVisit === locId;

  return (
    <div className="krisp-locpicker-overlay">
      <div className="krisp-locpicker-card">
        <div className="krisp-locpicker-logoWrapper">
          <img src="/demo/krisp/krisp-icon.webp" alt="KRISP" width={56} height={56} />
        </div>
        <h2 className="krisp-locpicker-title">Choose Your Location</h2>
        <p className="krisp-locpicker-subtitle">Select a store to start your order.</p>

        <div className="krisp-locpicker-locations">
          {locationsWithDistance.map(loc => (
            <button
              key={loc.id}
              className={`krisp-locpicker-locationCard${isSuggested(loc.id) ? ' krisp-locpicker-suggested' : ''}`}
              onClick={() => {
                try { localStorage.setItem('krisp_last_location', loc.id); } catch {}
                onSelect(loc.id);
              }}
            >
              <svg
                className="krisp-locpicker-pinIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="krisp-locpicker-locationInfo">
                <span className="krisp-locpicker-locationName">{loc.name}</span>
                <span className="krisp-locpicker-locationAddress">
                  {loc.address}, {loc.city}
                </span>
                <span className="krisp-locpicker-locationHours">
                  {Object.entries(loc.hours).map(([days, time]) => (
                    <span key={days}>{days}: {time}</span>
                  ))}
                </span>
                <div className="krisp-locpicker-locationMeta">
                  {loc.distance !== null && (
                    <span className="krisp-locpicker-distance">{loc.distance.toFixed(1)} mi</span>
                  )}
                  {nearestId !== null && loc.id === nearestId && (
                    <span className="krisp-locpicker-badge">Nearest</span>
                  )}
                  {lastVisit === loc.id && (
                    <span className="krisp-locpicker-badge">Last visit</span>
                  )}
                </div>
              </div>
              <span className="krisp-locpicker-arrow">&rsaquo;</span>
            </button>
          ))}
        </div>

        <p className="krisp-locpicker-powered">Secure ordering powered by Toast</p>
      </div>
    </div>
  );
}
