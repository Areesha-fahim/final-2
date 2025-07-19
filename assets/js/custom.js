// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Weather Widget
function updateWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            try {
                // Note: In a real implementation, you would call your weather API here
                // This is a mock implementation
                const weatherInfo = {
                    temp: Math.round(20 + Math.random() * 15),
                    location: "Your Location"
                };
                
                document.querySelector('.weather-temp').textContent = `${weatherInfo.temp}°C`;
                document.querySelector('.weather-location').textContent = weatherInfo.location;
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        });
    }
}

// Update weather every 30 minutes
updateWeather();
setInterval(updateWeather, 30 * 60 * 1000);

// Live Chat Button
const chatButton = document.querySelector('.live-chat-btn');
chatButton.addEventListener('click', () => {
    // In a real implementation, this would open your chat widget
    alert('Chat feature coming soon! Please contact us through the Contact page.');
});
