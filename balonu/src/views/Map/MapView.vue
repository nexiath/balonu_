<template>
  <div class="themap">
    <LeafletMap />
  </div>
</template>

<script>
import LeafletMap from '@/components/Map/LeafletMap.vue';


export default {
  components: {
    LeafletMap
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style>
.themap{
    margin-top: 10%;
}
div.panel {
  position: absolute;
  width: 500px;
  height: 800px;
  top: 30px;
  left: 30px;
  background-color: red;
  z-index: 999999;
  color: white;
}

.leaflet-container .leaflet-marker-pane img.icon_map {
  width: 40px !important;
}

.addEmplacement:hover {
  background-color: #e1e1e1;
  color: black;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  border-radius: 20px;
  width: 300px;
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;
}
</style>
