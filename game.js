// Game State
let gameState = {
    round: 1,
    maxRounds: 5,
    score: 0,
    currentLocation: null,
    guessLocation: null,
    roundResults: []
};

// Random Locations Around the World
const randomLocations = [
    // Europe
    { lat: 48.8566, lng: 2.3522 },      // Paris, France
    { lat: 51.5074, lng: -0.1278 },     // London, UK
    { lat: 41.9028, lng: 12.4964 },     // Rome, Italy
    { lat: 52.5200, lng: 13.4050 },     // Berlin, Germany
    { lat: 40.4168, lng: -3.7038 },     // Madrid, Spain
    { lat: 59.3293, lng: 18.0686 },     // Stockholm, Sweden
    { lat: 50.0755, lng: 14.4378 },     // Prague, Czech Republic
    { lat: 47.4979, lng: 19.0402 },     // Budapest, Hungary

    // North America
    { lat: 40.7128, lng: -74.0060 },    // New York, USA
    { lat: 34.0522, lng: -118.2437 },   // Los Angeles, USA
    { lat: 41.8781, lng: -87.6298 },    // Chicago, USA
    { lat: 37.7749, lng: -122.4194 },   // San Francisco, USA
    { lat: 43.6532, lng: -79.3832 },    // Toronto, Canada
    { lat: 49.2827, lng: -123.1207 },   // Vancouver, Canada
    { lat: 19.4326, lng: -99.1332 },    // Mexico City, Mexico

    // South America
    { lat: -23.5505, lng: -46.6333 },   // São Paulo, Brazil
    { lat: -22.9068, lng: -43.1729 },   // Rio de Janeiro, Brazil
    { lat: -34.6037, lng: -58.3816 },   // Buenos Aires, Argentina
    { lat: -33.4489, lng: -70.6693 },   // Santiago, Chile
    { lat: -12.0464, lng: -77.0428 },   // Lima, Peru

    // Asia
    { lat: 35.6762, lng: 139.6503 },    // Tokyo, Japan
    { lat: 37.5665, lng: 126.9780 },    // Seoul, South Korea
    { lat: 39.9042, lng: 116.4074 },    // Beijing, China
    { lat: 31.2304, lng: 121.4737 },    // Shanghai, China
    { lat: 22.3193, lng: 114.1694 },    // Hong Kong
    { lat: 1.3521, lng: 103.8198 },     // Singapore
    { lat: 13.7563, lng: 100.5018 },    // Bangkok, Thailand
    { lat: 28.6139, lng: 77.2090 },     // Delhi, India
    { lat: 19.0760, lng: 72.8777 },     // Mumbai, India
    { lat: 25.2048, lng: 55.2708 },     // Dubai, UAE

    // Africa
    { lat: -33.9249, lng: 18.4241 },    // Cape Town, South Africa
    { lat: -26.2041, lng: 28.0473 },    // Johannesburg, South Africa
    { lat: 30.0444, lng: 31.2357 },     // Cairo, Egypt
    { lat: -1.2921, lng: 36.8219 },     // Nairobi, Kenya
    { lat: 33.5731, lng: -7.5898 },     // Casablanca, Morocco

    // Oceania
    { lat: -33.8688, lng: 151.2093 },   // Sydney, Australia
    { lat: -37.8136, lng: 144.9631 },   // Melbourne, Australia
    { lat: -41.2865, lng: 174.7762 },   // Wellington, New Zealand
    { lat: -36.8485, lng: 174.7633 },   // Auckland, New Zealand
];

// Google Maps objects
let panorama;
let guessMap;
let resultMap;
let guessMarker;
let actualMarker;
let guessedMarker;

// Initialize game when Google Maps API is loaded
function initGame() {
    console.log('Google Maps API loaded');
    setupEventListeners();
}

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
    gameState.currentLocation = randomLocations[randomIndex];

    // Add small random offset to make it less predictable (within ~1km)
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    gameState.currentLocation = {
        lat: gameState.currentLocation.lat + latOffset,
        lng: gameState.currentLocation.lng + lngOffset
    };

    gameState.guessLocation = null;

    // Initialize Street View panorama
    if (!panorama) {
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('panorama'),
            {
                position: gameState.currentLocation,
                pov: {
                    heading: Math.random() * 360,  // Random heading
                    pitch: 0
                },
                addressControl: false,
                showRoadLabels: false,
                zoomControl: true,
                fullscreenControl: true
            }
        );
    } else {
        panorama.setPosition(gameState.currentLocation);
        panorama.setPov({
            heading: Math.random() * 360,
            pitch: 0
        });
    }

    updateUI();
}

// Show guess map
function showGuessMap() {
    document.getElementById('map-overlay').classList.remove('hidden');

    if (!guessMap) {
        guessMap = new google.maps.Map(document.getElementById('guess-map'), {
            center: { lat: 20, lng: 0 },
            zoom: 2,
            streetViewControl: false
        });

        guessMap.addListener('click', (e) => {
            placeGuessMarker(e.latLng);
        });
    }
}

// Hide guess map
function hideGuessMap() {
    document.getElementById('map-overlay').classList.add('hidden');
}

// Place guess marker
function placeGuessMarker(location) {
    if (guessMarker) {
        guessMarker.setMap(null);
    }

    guessMarker = new google.maps.Marker({
        position: location,
        map: guessMap,
        title: 'Your Guess'
    });

    gameState.guessLocation = {
        lat: location.lat(),
        lng: location.lng()
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
    if (!resultMap) {
        resultMap = new google.maps.Map(document.getElementById('result-map'), {
            center: gameState.currentLocation,
            zoom: 4
        });
    }

    // Clear previous markers
    if (actualMarker) actualMarker.setMap(null);
    if (guessedMarker) guessedMarker.setMap(null);

    // Add actual location marker (green)
    actualMarker = new google.maps.Marker({
        position: gameState.currentLocation,
        map: resultMap,
        title: 'Actual Location',
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
    });

    // Add guessed location marker (red)
    guessedMarker = new google.maps.Marker({
        position: gameState.guessLocation,
        map: resultMap,
        title: 'Your Guess',
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
    });

    // Draw line between markers
    const line = new google.maps.Polyline({
        path: [gameState.currentLocation, gameState.guessLocation],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        map: resultMap
    });

    // Fit bounds to show both markers
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(gameState.currentLocation);
    bounds.extend(gameState.guessLocation);
    resultMap.fitBounds(bounds);

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

// Make initGame available globally
window.initGame = initGame;
