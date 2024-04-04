<template>
    <div class="menu">
        <button @click="selectMenuItem('textEditor')" :class="{ 'active': selectedItem === 'textEditor' }" class="menu-button">Éditeur de Texte</button>
        <button @click="selectMenuItem('interactiveMap')" :class="{ 'active': selectedItem === 'interactiveMap' }" class="menu-button">Carte Interactive</button>
        <button @click="selectMenuItem('prestataireManagement')" :class="{ 'active': selectedItem === 'prestataireManagement' }" class="menu-button">Gestion des Prestataires</button>
        <button @click="selectMenuItem('prestataireDetails')" :class="{ 'active': selectedItem === 'prestataireDetails' }" class="menu-button">Détails du Prestataire</button>
        <button @click="selectMenuItem('statistics')" :class="{ 'active': selectedItem === 'statistics' }" class="menu-button">Statistiques</button>
        <!-- Ajoutez d'autres boutons en fonction de vos besoins -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedItem: null
        };
    },
    methods: {
        selectMenuItem(item) {
            this.selectedItem = item;
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
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-button {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: #b02424;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.menu-button:hover {
    background-color: #460606;
}

.active {
    background-color: #dc3131 !important;
}
</style>
