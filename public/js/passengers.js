async function loadPassengers() {
  const res = await fetch('/api/passengers');
  const passengers = await res.json();
  document.getElementById('list').innerHTML =
    passengers.map(p => `
      <p>${p.name} (${p.email}) 
        <button onclick="deletePassenger(${p.id})">Delete</button>
      </p>`).join('');
}

async function deletePassenger(id) {
  await fetch('/api/passengers/' + id, { method: 'DELETE' });
  loadPassengers();
}

document.getElementById('addForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData.entries());
  await fetch('/api/passengers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  loadPassengers();
};

loadPassengers();