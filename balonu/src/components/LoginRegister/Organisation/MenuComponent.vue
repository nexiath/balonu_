<template>
    <div class="menu">
        <button @click="selectMenuItem('textEditor')">Text Editor</button>
        <button @click="selectMenuItem('interactiveMap')">Interactive Map</button>
        <button @click="selectMenuItem('prestataireManagement')">Prestataire Management</button>
        <button @click="selectMenuItem('prestataireDetails')">Prestataire Details</button>
        <button @click="selectMenuItem('statistics')">Statistics</button>
        <!-- Ajoutez d'autres boutons en fonction de vos besoins -->
    </div>
</template>

<script>
export default {
    methods: {
        selectMenuItem(item) {
            this.$emit('menuItemSelected', item);
        },
    },
};
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #f0f0f0;
}
button {
    margin-bottom: 5px;
}
</style>
