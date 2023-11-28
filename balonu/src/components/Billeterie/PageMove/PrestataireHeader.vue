<template>
  <div>

    <h1>{{ providerName }}</h1>

  </div>
</template>

<script>
export default {
  props: {
    providerName: {
      type: String,
      required: true
    }
  }
};
</script>
