<template>
  <div class="timepicker">
    <label for="time">Sélectionner une horaire:</label>
    <select id="time" v-model="selectedTime">
      <option disabled value="">Veuillez choisir un horaire</option>
      <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  data() {
    return {
      selectedTime: null,
      times: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    };
  }
}
</script>

<style>
.timepicker {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.timepicker label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.timepicker select {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
  appearance: none;
  background: #fff url('https://d3sxshmncs10te.cloudfront.net/icon/free/svg/1514148.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTY5NzMyODAwMCwicSI6bnVsbCwiaWF0IjoxNjk3MTI5MDI3fQ__.64c1e75f0a2ebecba4641c7c9e0684bb1675e4a2f22e27a54ef7d1bbc3dcee02') no-repeat 95% center;
}

</style>
