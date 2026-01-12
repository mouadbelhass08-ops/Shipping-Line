// Toast welcome
const params = new URLSearchParams(window.location.search);
if (params.get('welcome') === '1') {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 1000);
    }, 4000);
}

// Load stats
async function loadStats() {
    const res = await fetch('/api/admin/stats');
    const stats = await res.json();
    document.getElementById('totalUsers').textContent = `Total Users: ${stats.totalUsers}`;
    document.getElementById('totalPassengers').textContent = `Passengers: ${stats.passengers}`;
    document.getElementById('totalCorporations').textContent = `Corporations: ${stats.corporations}`;
}

// Load users
async function loadUsers() {
    const res = await fetch('/api/admin/users');
    const users = await res.json();
    const list = document.getElementById('usersList');
    list.innerHTML = '';
    users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.email} (${u.role})`;
    list.appendChild(li);
    });
}

// Load passengers
async function loadPassengers() {
    const res = await fetch('/api/admin/passengers');
    const passengers = await res.json();
    const list = document.getElementById('passengersList');
    list.innerHTML = '';
    passengers.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.id} - ${p.name} (${p.email})`;
    list.appendChild(li);
    });
}

async function loadBookings() {
    const res = await fetch('/api/admin/bookings');
    const bookings = await res.json();
    const tbody = document.querySelector('#bookingsTable tbody');
    tbody.innerHTML = ''; // clear previous rows

    bookings.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${b.passenger}</td>
        <td>${b.departure}</td>
        <td>${b.arrival}</td>
        <td>${b.seats}</td>
        <td>${new Date(b.booking_date).toLocaleDateString()}</td>
    `;
    tbody.appendChild(row);
    });
}

// Load all sections
loadStats();
loadUsers();
loadPassengers();
loadBookings();