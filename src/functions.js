function toggleDarkMode() {
  const body = document.body;
  const logoImg = document.getElementById('logo-img');
  const sidebar = document.querySelector('.sidebar');

  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    logoImg.src = '../assets/logo.png';
    sidebar.style.backgroundColor = '#111827';
  } else {
    logoImg.src = '../assets/logo2.png';
    sidebar.style.backgroundColor = '#ffffff';
  }
}

function performSearch() {
  const query = document.getElementById("searchInput").value;

  const dorkFilters = 'allintext:"politics" "tunis" "tunisia" -sports -entertainment';
  const finalQuery = `${dorkFilters} ${query}`;

  const searchURL = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
  
  window.open(searchURL, "_blank");
}