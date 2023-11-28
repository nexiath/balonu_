<template>
  <div class="datepicker">
    <label for="date">Jour de réservation:</label>
    <input type="date" id="date" v-model="selectedDate">
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      selectedDate: null
    };
  }
}
</script>

<style>
.datepicker {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.datepicker label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.datepicker input {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
}
</style>
