import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';

let countryData = [
    { "letter": "Belize", "lat": 17.1899, "lng": -88.4976 },
    { "letter": "Poland", "lat": 51.9194, "lng": 19.1451 },
    { "letter": "Cyprus", "lat": 35.1264, "lng": 33.4299 },
    { "letter": "South Sudan", "lat": 7.8627, "lng": 30.2176 },
    { "letter": "Burkina Faso", "lat": 12.2383, "lng": -1.5616 },
    { "letter": "Kuwait", "lat": 29.3117, "lng": 47.4818 },
    { "letter": "Argentina", "lat": -38.4161, "lng": -63.6167 },
    { "letter": "Estonia", "lat": 58.5953, "lng": 25.0136 },
    { "letter": "Qatar", "lat": 25.3548, "lng": 51.1839 },
    { "letter": "Denmark", "lat": 56.2639, "lng": 9.5018 },
    { "letter": "Turkey", "lat": 38.9637, "lng": 35.2433 },
    { "letter": "Mali", "lat": 17.5707, "lng": -3.9962 },
    { "letter": "Hungary", "lat": 47.1625, "lng": 19.5033 },
    { "letter": "Pakistan", "lat": 30.3753, "lng": 69.3451 },
    { "letter": "Gabon", "lat": -0.8037, "lng": 11.6094 },
    { "letter": "United Arab Emirates", "lat": 23.4241, "lng": 53.8478 },
    { "letter": "Azerbaijan", "lat": 40.1431, "lng": 47.5769 },
    { "letter": "Greece", "lat": 39.0742, "lng": 21.8243 },
    { "letter": "Liberia", "lat": 6.4281, "lng": -9.4295 },
    { "letter": "Morocco", "lat": 31.7917, "lng": -7.0926 },
    { "letter": "Colombia", "lat": 4.5709, "lng": -74.2973 },
    { "letter": "Niger", "lat": 17.6078, "lng": 8.0817 },
    { "letter": "Ethiopia", "lat": 9.145, "lng": 40.4897 },
    { "letter": "Jordan", "lat": 30.5852, "lng": 36.2384 },
    { "letter": "Mexico", "lat": 23.6345, "lng": -102.5528 },
    { "letter": "Malaysia", "lat": 4.2105, "lng": 101.9758 },
    { "letter": "Syria", "lat": 34.8021, "lng": 38.9968 },
    { "letter": "Ghana", "lat": 7.9465, "lng": -1.0232 },
    { "letter": "Lebanon", "lat": 33.8547, "lng": 35.8623 },
    { "letter": "Austria", "lat": 47.5162, "lng": 14.5501 },
    { "letter": "Norway", "lat": 60.472, "lng": 8.4689 },
    { "letter": "Kazakhstan", "lat": 48.0196, "lng": 66.9237 },
    { "letter": "Algeria", "lat": 28.0339, "lng": 1.6596 },
    { "letter": "Spain", "lat": 40.4637, "lng": -3.7492 },
    { "letter": "Oman", "lat": 21.5126, "lng": 55.9233 },
    { "letter": "Angola", "lat": -11.2027, "lng": 17.8739 },
    { "letter": "Ukraine", "lat": 48.3794, "lng": 31.1656 },
    { "letter": "Germany", "lat": 51.1657, "lng": 10.4515 },
    { "letter": "South Africa", "lat": -30.5595, "lng": 22.9375 },
    { "letter": "United Kingdom", "lat": 55.3781, "lng": -3.4360 },
    { "letter": "Venezuela", "lat": 6.4238, "lng": -66.5897 },
    { "letter": "Nigeria", "lat": 9.082, "lng": 8.6753 },
    { "letter": "Australia", "lat": -25.2744, "lng": 133.7751 },
    { "letter": "Canada", "lat": 56.1304, "lng": -106.3468 },
    { "letter": "Egypt", "lat": 26.8206, "lng": 30.8025 },
    { "letter": "Indonesia", "lat": -0.7893, "lng": 113.9213 },
    { "letter": "Libya", "lat": 26.3351, "lng": 17.2283 },
    { "letter": "Iraq", "lat": 33.2232, "lng": 43.6793 },
    { "letter": "Brazil", "lat": -14.2350, "lng": -51.9253 },
    { "letter": "Japan", "lat": 36.2048, "lng": 138.2529 },
    { "letter": "China", "lat": 35.8617, "lng": 104.1954 },
    { "letter": "Saudi Arabia", "lat": 23.8859, "lng": 45.0792 },
    { "letter": "Russia", "lat": 61.5240, "lng": 105.3188 },
    { "letter": "India", "lat": 20.5937, "lng": 78.9629 },
    { "letter": "Iran", "lat": 32.4279, "lng": 53.6880 },
    { "letter": "United States of America", "lat": 37.0902, "lng": -95.7129 },
    { "letter": "Unknown", "lat": 0, "lng": 0 }
];

const CirclesMap = ({ data }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = L.map(mapRef.current).setView([20, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // Set up map tiles
            maxZoom: 18,
            attribution: 'Blackcoffer',
        }).addTo(map);
        
        data.forEach((d, index) => { // Create circles for each country using D3
            if(d.letter === "Unknown") return;

            L.circle([countryData[index].lat, countryData[index].lng], {
                color: 'transparent',
                fillColor: 'var(--primary-color',
                fillOpacity: 0.5,
                radius: Math.sqrt(d.frequency) * 25000,
            })
                .addTo(map)
                .bindPopup(`${d.letter}: ${d.frequency}`);
        });

        return () => { // Cleanup function to remove the map on component unmount
            map.remove();
        };
    }, [data]);

    return <div id="map" ref={mapRef} style={{ height: '600px' }} />;
};

export default CirclesMap;
