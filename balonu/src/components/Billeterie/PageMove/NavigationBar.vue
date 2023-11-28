<template>
  <div class="navigation-bar">
    <button v-for="item in items" :key="item">{{ item }}</button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
