document.getElementById('registerForm').addEventListener('submit', function(e) {
  const role = document.getElementById('role').value;
  const allowedRoles = ['PassengerRole', 'CorpRole'];

  // Prevent tampering
  if (!allowedRoles.includes(role)) {
    e.preventDefault();
    alert('Invalid role selection!');
  }
});