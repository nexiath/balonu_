<template>
  <div className="info-panel">
    <img v-if="selected" :src="selected.imageSrc" alt="Selected Item"/>
    <p>Lorem ipsum dolor sit amet...</p>
    <button className="red-button">Voir la presentation</button>
  </div>
</template>

<script>
export default {
  props: {
    selected: Object
  }
};
</script>

<style>
.info-panel {
  width: 40%;
  padding: 20px;
}

.red-button {
  background-color: #FF4E4E;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 0;
  cursor: pointer;
  border-radius: 4px;
}
</style>
