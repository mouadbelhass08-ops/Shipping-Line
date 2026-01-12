const params = new URLSearchParams(window.location.search);
const error = params.get('error');
if (error) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = error;

  setTimeout(() => {
    errorDiv.textContent = '';
  }, 4000);
}