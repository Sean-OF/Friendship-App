function registerUser() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      
        if (data.success) {
            alert('Registration successful! You can now log in.');
            document.getElementById('register').style.display = 'none';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred during registration.');
    });
}
let currentThemeIndex = 0;
const themes = ['theme1', 'theme2', 'theme3'];

function toggleTheme() {
    // Get the body element
    const body = document.body;

    // Remove the current theme class
    body.classList.remove(themes[currentThemeIndex]);

    // Move to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Add the new theme class
    body.classList.add(themes[currentThemeIndex]);
  }