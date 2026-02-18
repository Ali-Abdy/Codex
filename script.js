document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');
    const clearBtn = document.getElementById('clear-btn');


    searchInput.addEventListener('input', function () {
        if (searchInput.value) {
            clearBtn.style.display = 'inline';
        } else {
            clearBtn.style.display = 'none';
        }
    });


    clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
    });
});

paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10' 
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container'); 

const apiKey = "44f66d4ab0c0a9d2fbf8ef1b4518e6a2"; 
const searchInput = document.getElementById("search-input");
const degree = document.getElementById("degree");
const description = document.getElementById("description");
const humidity = document.getElementById("Humidity");
const airQualityIndex = document.getElementById("airno");
const hourlyRows = document.getElementById("hourly-rows");
const dailyRows = document.getElementById("daily-rows");
const weatherIcon = document.querySelector("weather-icon");

async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  degree.textContent = `${data.main.temp}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}% Wind Speed: ${data.wind.speed} km/h`;
  airQualityIndex.textContent = await fetchAirQuality(
    data.coord.lat,
    data.coord.lon
  );
  fetchHourlyForecast(data.coord.lat, data.coord.lon);
  fetchDailyForecast(data.coord.lat, data.coord.lon);
}


async function fetchAirQuality(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const data = await response.json();
  return data.list[0].main.aqi;
}

async function fetchHourlyForecast(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  hourlyRows.innerHTML = ""; // Clear previous data
  data.list.slice(0, 8).forEach((hour) => {
    // Get the next 8 hours
    const hourDiv = document.createElement("div");
    hourDiv.className = "table-hourly";
    hourDiv.innerHTML = `
              <p>${new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
              <p>${hour.main.temp}°C</p>
              <p>${hour.weather[0].description}</p>
          `;
    hourlyRows.appendChild(hourDiv);
  });
}

async function fetchDailyForecast(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  dailyRows.innerHTML = ""; // Clear previous data
  data.daily.slice(0, 7).forEach((day) => {
    // Get the next 7 days
    const dayDiv = document.createElement("div");
    dayDiv.className = "daily-forecast";
    dayDiv.innerHTML = `
              <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>${day.temp.day}°C</p>
              <p>${day.weather[0].description}</p>
          `;
    dailyRows.appendChild(dayDiv);
  });
}



searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchWeather(searchInput.value);
  }
});


(function () {
  emailjs.init("B0Q44h_RH8tId3O7k"); 
  })();

  function openContactForm() {
  document.getElementById("contact-popup").style.display = "flex";
  }
  

  function closeContactForm() {
  document.getElementById("contact-popup").style.display = "none";
  }
  

  document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  

    emailjs.sendForm("service_cnl4jum", "template_uho8z1t", this).then(
      function (response) {
        alert("Message sent to hamzaabdy12@gmail.com! successfully!");
        closeContactForm();
      },
      function (error) {
        alert("Failed to send message. Please try again later.");
        console.error("Error sending email:", error);
      }
    );
  });