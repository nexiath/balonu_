<template>
  <div class="app-container">
    <MapClient @item-selected="handleItemSelected"/>
  </div>
</template>

<script>
import MapClient from '@/components/Map/MapClient.vue';


export default {
  components: {
    MapClient
  },
  data() {
    return {
      selectedItem: null
    };
  },
  methods: {
    handleItemSelected(item) {
      this.selectedItem = item;
    }
  }
};
</script>

<style>
.app-container {
  padding-top: 10%;
  display: flex;
  height: 100vh;
}

.app-container > *:first-child {
  width: 30%;
  min-width: 200px;
}

.app-container > *:last-child {
  flex: 1;
}
</style>
