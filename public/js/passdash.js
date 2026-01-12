// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
    await fetch('/logout', { method: 'POST' });
    window.location.href = '/login';
    } catch (err) {
    console.error('Logout failed:', err);
    }
});

// Redirect to booking page
document.getElementById('bookBtn').addEventListener('click', () => {
    window.location.href = '/booking';
});

// Populate table dynamically
async function loadBookings() {
try {
    const res = await fetch('/api/passenger-dashboard'); // <-- updated
    const bookings = await res.json();

    const table = document.getElementById('voyagesTable');

    bookings.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${b.departure}</td>
        <td>${b.arrival}</td>
        <td>${b.seats}</td>
        <td>${b.price}</td>
        <td>${new Date(b.booking_date).toLocaleDateString()}</td>
    `;
    table.appendChild(row);
    });
} catch (err) {
    console.error('Failed to load bookings:', err);
}
}

// Load bookings when page opens
loadBookings();