<template>
    <div class="email-section">
        <label for="email">Entrez votre adresse e-mail :</label>
        <input type="email" v-model="email" id="email">
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


