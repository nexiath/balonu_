<template>
    <div class="red-bar"></div>
  </template>
  
  <script>
  export default {
    name: 'RedBar',
  }
  </script>
  
  <style scoped>
  .red-bar {
    background-color: #E30A17;
    height: 4px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  </style>