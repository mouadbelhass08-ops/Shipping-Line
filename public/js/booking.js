// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
    await fetch('/logout', { method: 'POST' });
    window.location.href = '/login';
    } catch (err) {
    console.error('Logout failed:', err);
    }
});
// Redirect to dashboard
document.getElementById('dashboardBtn').addEventListener('click', () => {
window.location.href = '/passenger-dashboard';
});

// Price calculation logic
const departure = document.getElementById('departure');
const arrival = document.getElementById('arrival');
const seats = document.getElementById('seats');
const priceDisplay = document.getElementById('price');

const prices = {
    "Casablanca-Tangier": 300,
    "Casablanca-Marseille": 1200,
    "Casablanca-New York": 5000,
    "Tangier-Casablanca": 300,
    "Tangier-Marseille": 1000,
    "Tangier-New York": 4800,
    "Marseille-Casablanca": 1200,
    "Marseille-Tangier": 1000,
    "Marseille-New York": 4500,
    "New York-Casablanca": 5000,
    "New York-Tangier": 4800,
    "New York-Marseille": 4500
};

function calculatePrice() {
    const dep = departure.value;
    const arr = arrival.value;
    const seatCount = parseInt(seats.value) || 0;

    if (dep && arr && dep !== arr && seatCount > 0) {
    const key = `${dep}-${arr}`;
    const basePrice = prices[key] || 0;
    priceDisplay.textContent = basePrice * seatCount;
    } else {
    priceDisplay.textContent = 0;
    }
}

departure.addEventListener('change', calculatePrice);
arrival.addEventListener('change', calculatePrice);
seats.addEventListener('input', calculatePrice);