<template>
  <div class="email-section">
    <label for="email">Entrez votre adresse e-mail :</label>
    <input type="email" v-model="email" id="email">
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    };
  }
}
</script>


