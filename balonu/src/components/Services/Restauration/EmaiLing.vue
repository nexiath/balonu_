<template>
    <div class="email-section">
        <label for="email" class="email-label">Entrez votre adresse e-mail :</label>
        <input type="email" v-model="email" id="email" class="email-input">
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            email: this.value
        };
    },
    watch: {
        email() {
            this.$emit('input', this.email);
        }
    }
}
</script>

<style scoped>
.email-section {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
}

.email-label {
    display: block;
    margin-bottom: 5px;
}

.email-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;

}
</style>
