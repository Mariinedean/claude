// Game State
let gameState = {
    round: 1,
    maxRounds: 5,
    score: 0,
    currentLocation: null,
    guessLocation: null,
    roundResults: []
};

// Random Locations Around the World with hints
const randomLocations = [
    // Europe
    { lat: 48.8566, lng: 2.3522, hint: "Look for the famous river and urban layout" },      // Paris
    { lat: 51.5074, lng: -0.1278, hint: "Notice the Thames River and historic architecture" },     // London
    { lat: 41.9028, lng: 12.4964, hint: "Ancient city with the famous river flowing through" },     // Rome
    { lat: 52.5200, lng: 13.4050, hint: "Large European capital with many parks" },     // Berlin
    { lat: 40.4168, lng: -3.7038, hint: "Center of Spain, inland location" },     // Madrid
    { lat: 59.3293, lng: 18.0686, hint: "Nordic archipelago city on the Baltic Sea" },     // Stockholm
    { lat: 50.0755, lng: 14.4378, hint: "Historic Central European city with a river bend" },     // Prague
    { lat: 47.4979, lng: 19.0402, hint: "Danube River divides this capital city" },     // Budapest

    // North America
    { lat: 40.7128, lng: -74.0060, hint: "Manhattan Island, dense urban grid" },    // New York
    { lat: 34.0522, lng: -118.2437, hint: "West coast sprawl near mountains" },   // Los Angeles
    { lat: 41.8781, lng: -87.6298, hint: "Great Lakes city with grid pattern" },    // Chicago
    { lat: 37.7749, lng: -122.4194, hint: "Hilly peninsula city by the bay" },   // San Francisco
    { lat: 43.6532, lng: -79.3832, hint: "Canadian city on Lake Ontario" },    // Toronto
    { lat: 49.2827, lng: -123.1207, hint: "Pacific Northwest coastal city" },   // Vancouver
    { lat: 19.4326, lng: -99.1332, hint: "High altitude mega-city in a valley" },    // Mexico City

    // South America
    { lat: -23.5505, lng: -46.6333, hint: "Massive Brazilian metropolis inland" },   // São Paulo
    { lat: -22.9068, lng: -43.1729, hint: "Coastal Brazilian city with distinctive geography" },   // Rio
    { lat: -34.6037, lng: -58.3816, hint: "Capital on the Río de la Plata" },   // Buenos Aires
    { lat: -33.4489, lng: -70.6693, hint: "Chilean capital near the Andes" },   // Santiago
    { lat: -12.0464, lng: -77.0428, hint: "Coastal desert city in Peru" },   // Lima

    // Asia
    { lat: 35.6762, lng: 139.6503, hint: "Massive urban sprawl on Tokyo Bay" },    // Tokyo
    { lat: 37.5665, lng: 126.9780, hint: "Han River flows through this capital" },    // Seoul
    { lat: 39.9042, lng: 116.4074, hint: "Vast Chinese capital in the north" },    // Beijing
    { lat: 31.2304, lng: 121.4737, hint: "Major port city on the Yangtze Delta" },    // Shanghai
    { lat: 22.3193, lng: 114.1694, hint: "Dense island and peninsula city" },    // Hong Kong
    { lat: 1.3521, lng: 103.8198, hint: "Island city-state near the equator" },     // Singapore
    { lat: 13.7563, lng: 100.5018, hint: "River delta capital in Southeast Asia" },    // Bangkok
    { lat: 28.6139, lng: 77.2090, hint: "Large inland capital in South Asia" },     // Delhi
    { lat: 19.0760, lng: 72.8777, hint: "Coastal megacity on a peninsula" },     // Mumbai
    { lat: 25.2048, lng: 55.2708, hint: "Desert coastal city with artificial islands" },     // Dubai

    // Africa
    { lat: -33.9249, lng: 18.4241, hint: "Southwestern tip of Africa near Table Mountain" },    // Cape Town
    { lat: -26.2041, lng: 28.0473, hint: "Large South African inland city" },    // Johannesburg
    { lat: 30.0444, lng: 31.2357, hint: "Nile River delta mega-city" },     // Cairo
    { lat: -1.2921, lng: 36.8219, hint: "East African capital city" },     // Nairobi
    { lat: 33.5731, lng: -7.5898, hint: "Major Moroccan coastal city" },     // Casablanca

    // Oceania
    { lat: -33.8688, lng: 151.2093, hint: "Iconic harbor city in Australia" },   // Sydney
    { lat: -37.8136, lng: 144.9631, hint: "Southern Australian coastal capital" },   // Melbourne
    { lat: -41.2865, lng: 174.7762, hint: "Capital city on a harbor in New Zealand" },   // Wellington
    { lat: -36.8485, lng: 174.7633, hint: "Largest New Zealand city on isthmus" },   // Auckland
];

// Leaflet map objects
let exploreMap;
let guessMap;
let resultMap;
let guessMarker;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    console.log('Game initialized - No API key required!');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('make-guess-btn').addEventListener('click', showGuessMap);
    document.getElementById('confirm-guess').addEventListener('click', submitGuess);
    document.getElementById('cancel-guess').addEventListener('click', hideGuessMap);
    document.getElementById('next-round-btn').addEventListener('click', nextRound);
    document.getElementById('play-again-btn').addEventListener('click', resetGame);
}

// Start game
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    resetGameState();
    loadRound();
}

// Reset game state
function resetGameState() {
    gameState = {
        round: 1,
        maxRounds: 5,
        score: 0,
        currentLocation: null,
        guessLocation: null,
        roundResults: []
    };
    updateUI();
}

// Reset game
function resetGame() {
    document.getElementById('game-over-modal').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

// Load a new round
function loadRound() {
    // Get random location using randomized integer
    const randomIndex = Math.floor(Math.random() * randomLocations.length);
    const location = randomLocations[randomIndex];

    gameState.currentLocation = {
        lat: location.lat,
        lng: location.lng,
        hint: location.hint
    };

    // Add small random offset to make it less predictable
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    gameState.currentLocation.lat += latOffset;
    gameState.currentLocation.lng += lngOffset;

    gameState.guessLocation = null;

    // Update hint text
    document.getElementById('hint-text').textContent = gameState.currentLocation.hint;

    // Initialize explore map (satellite view)
    if (!exploreMap) {
        exploreMap = L.map('explore-view', {
            center: [gameState.currentLocation.lat, gameState.currentLocation.lng],
            zoom: 15,
            zoomControl: true,
            attributionControl: true
        });

        // Use satellite imagery (Esri World Imagery)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 18
        }).addTo(exploreMap);
    } else {
        exploreMap.setView([gameState.currentLocation.lat, gameState.currentLocation.lng], 15);
    }

    updateUI();
}

// Show guess map
function showGuessMap() {
    document.getElementById('map-overlay').classList.remove('hidden');

    if (!guessMap) {
        guessMap = L.map('guess-map', {
            center: [20, 0],
            zoom: 2,
            worldCopyJump: true
        });

        // Use OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(guessMap);

        // Add click handler
        guessMap.on('click', function(e) {
            placeGuessMarker(e.latlng);
        });
    } else {
        // Reset view
        guessMap.setView([20, 0], 2);
    }
}

// Hide guess map
function hideGuessMap() {
    document.getElementById('map-overlay').classList.add('hidden');
}

// Place guess marker
function placeGuessMarker(latlng) {
    if (guessMarker) {
        guessMap.removeLayer(guessMarker);
    }

    guessMarker = L.marker(latlng, {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(guessMap);

    gameState.guessLocation = {
        lat: latlng.lat,
        lng: latlng.lng
    };

    document.getElementById('confirm-guess').disabled = false;
}

// Submit guess
function submitGuess() {
    if (!gameState.guessLocation) return;

    hideGuessMap();

    // Calculate distance
    const distance = calculateDistance(
        gameState.currentLocation.lat,
        gameState.currentLocation.lng,
        gameState.guessLocation.lat,
        gameState.guessLocation.lng
    );

    // Calculate points based on distance
    const points = calculatePoints(distance);

    gameState.score += points;

    // Save round result
    gameState.roundResults.push({
        round: gameState.round,
        distance: distance,
        points: points,
        actual: gameState.currentLocation,
        guess: gameState.guessLocation
    });

    // Show result
    showResult(distance, points);
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Calculate points based on distance
function calculatePoints(distance) {
    if (distance < 10) return 5000;
    if (distance < 50) return 4000;
    if (distance < 100) return 3000;
    if (distance < 500) return 2000;
    if (distance < 1000) return 1000;
    return 500;
}

// Show result
function showResult(distance, points) {
    document.getElementById('distance').textContent = distance.toLocaleString();
    document.getElementById('points-earned').textContent = points.toLocaleString();

    // Show result map with both markers
    const resultMapDiv = document.getElementById('result-map');
    resultMapDiv.innerHTML = ''; // Clear previous map

    resultMap = L.map('result-map', {
        center: [gameState.currentLocation.lat, gameState.currentLocation.lng],
        zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(resultMap);

    // Add actual location marker (green)
    const actualMarker = L.marker(
        [gameState.currentLocation.lat, gameState.currentLocation.lng],
        {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }
    ).addTo(resultMap).bindPopup('Actual Location');

    // Add guessed location marker (red)
    const guessedMarker = L.marker(
        [gameState.guessLocation.lat, gameState.guessLocation.lng],
        {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        }
    ).addTo(resultMap).bindPopup('Your Guess');

    // Draw line between markers
    const line = L.polyline([
        [gameState.currentLocation.lat, gameState.currentLocation.lng],
        [gameState.guessLocation.lat, gameState.guessLocation.lng]
    ], {
        color: 'red',
        weight: 2,
        opacity: 0.7
    }).addTo(resultMap);

    // Fit bounds to show both markers
    const bounds = L.latLngBounds(
        [gameState.currentLocation.lat, gameState.currentLocation.lng],
        [gameState.guessLocation.lat, gameState.guessLocation.lng]
    );
    resultMap.fitBounds(bounds, { padding: [50, 50] });

    updateUI();
    document.getElementById('result-modal').classList.remove('hidden');
}

// Next round
function nextRound() {
    document.getElementById('result-modal').classList.add('hidden');

    if (gameState.round >= gameState.maxRounds) {
        showGameOver();
    } else {
        gameState.round++;
        loadRound();
    }
}

// Show game over
function showGameOver() {
    document.getElementById('final-score').textContent = gameState.score.toLocaleString();

    // Build round summary
    const summaryDiv = document.getElementById('round-summary');
    summaryDiv.innerHTML = '<h3>Round Summary</h3>';

    gameState.roundResults.forEach((result) => {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round-item';
        roundDiv.innerHTML = `
            <span>Round ${result.round}</span>
            <span>${result.distance.toLocaleString()} km - ${result.points.toLocaleString()} pts</span>
        `;
        summaryDiv.appendChild(roundDiv);
    });

    document.getElementById('game-over-modal').classList.remove('hidden');
}

// Update UI
function updateUI() {
    document.getElementById('round').textContent = gameState.round;
    document.getElementById('score').textContent = gameState.score.toLocaleString();
}
