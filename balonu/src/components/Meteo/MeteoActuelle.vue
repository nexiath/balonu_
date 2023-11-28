<template>
  <div class="weather-card" v-if="weather">
    <div class="weather-card-header">
      <h2 class="weather-location">Météo à Cappadoce</h2>
      <br>
      <div class="weather-icon" :style="{ backgroundImage: 'url(' + getWeatherIcon(weather.weather[0].icon) + ')' }"></div>
    </div>
    <div class="weather-card-body">
      <div class="temperature">{{ weather.main.temp }}°C</div>
      <div class="weather-description">{{ weather.weather[0].description }}</div>
      <div class="weather-details">
        <div class="feels-like">Température ressentie: {{ weather.main.feels_like }}°C</div>
        <div class="humidity">Humidité: {{ weather.main.humidity }}%</div>
        <div class="wind-speed">Vitesse du vent: {{ weather.wind.speed }} m/s</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weather: null
    };
  },
  methods: {
    getWeatherIcon(iconCode) {
      return `https://openweathermap.org/img/w/${iconCode}.png`;
    }
  },
  mounted() {
    const API_KEY = '2389bf2d8acb8fa0988394bbaf28e12d';
    const CITY = 'Nevsehir,TR';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

    axios.get(URL)
        .then(response => {
          this.weather = response.data;
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
  }
}
</script>

<style scoped>
.weather-card {
  max-width: 480px;
  margin: 2rem auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e7e7e7;
}

.weather-card-header {
  padding: 1.5rem;
  background-color: #4d5d77;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-location {
  margin: 0;
  font-weight: 500;
}

.weather-icon {
  width: 80px;
  height: 80px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.weather-card-body {
  padding: 1.5rem;
  text-align: center;
}

.temperature {
  font-size: 3rem;
  font-weight: 700;
  color: #333333;
}

.weather-description {
  font-size: 1.25rem;
  margin-top: 0.5rem;
  color: #555555;
  text-transform: capitalize;
}

.weather-details {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
}

.feels-like, .humidity, .wind-speed {
  font-size: 1rem;
  color: #777777;
}

@media (max-width: 600px) {
  .weather-details {
    flex-direction: column;
    align-items: center;
  }
}
</style>
