<template>
  <div class="info-box">
    <div>{{ price }}</div>
    <div>{{ duration }}</div>
    <div>{{ maxPeople }}</div>
    <div>{{ age }}</div>
    <div>{{ reviews }}</div>
  </div>
</template>

<script>
export default {
  props: {
    price: String,
    duration: String,
    maxPeople: String,
    age: String,
    reviews: String
  }
}
</script>
