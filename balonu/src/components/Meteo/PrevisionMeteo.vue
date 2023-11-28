<template>
  <div class="forecast-container">
    <div class="forecast-card" v-for="forecast in forecasts" :key="forecast.dt">
      <div class="forecast-date">{{ getDay(forecast.dt) }}</div>
      <div class="forecast-icon" :style="{ backgroundImage: 'url(' + getWeatherIcon(forecast.weather[0].icon) + ')' }"></div>
      <div class="forecast-temp">Température moyenne : {{ forecast.main.temp.toFixed(1) }}°C</div>
      <div class="forecast-description">{{ forecast.weather[0].description }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      forecasts: []
    };
  },
  methods: {
    getWeatherIcon(iconCode) {
      return `https://openweathermap.org/img/w/${iconCode}.png`;
    },
    getDay(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString('fr-FR', { weekday: 'long' });
    }
  },
  mounted() {
    const API_KEY = '2389bf2d8acb8fa0988394bbaf28e12d';
    const CITY = 'Nevsehir,TR';
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

    axios.get(URL)
        .then(response => {
          this.forecasts = response.data.list.filter((_, index) => index % 8 === 0);
        })
        .catch(error => {
          console.error("Error fetching forecast data:", error);
        });
  }
}
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #e3e4e6;
  margin: 0;
  padding: 0;
}

.forecast-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.forecast-card {
  background-color: #ffffff;
  flex: 1 1 260px;
  margin: 10px;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.forecast-card:hover {
  transform: translateY(-5px);
}

.forecast-date {
  color: #334155;
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.forecast-icon {
  width: 80px;
  height: 80px;
  background-size: contain;
  margin: auto;
  background-position: center center;
  background-repeat: no-repeat;
}

.forecast-temp {
  color: #1f2937;
  font-size: 1.5rem;
  margin: 20px 0;
}

.forecast-description {
  color: #64748b;
  font-size: 1rem;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .forecast-container {
    gap: 10px;
  }
}
</style>
