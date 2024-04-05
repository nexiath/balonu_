<template>
    <div class="container">

        <!-- Barre latérale avec des boutons pour chaque section -->
        <div class="sidebar">
            <MenuComponent @menuItemSelected="selectMenuItem" />
        </div>

        <!-- Contenu dynamique en fonction de l'élément du menu sélectionné -->
        <div class="content">
            <div v-if="selectedMenuItem === 'textEditor'">
                <TextEditorComponent v-model="manifestationText" />
            </div>

            <div v-if="selectedMenuItem === 'interactiveMap'">
                <InteractiveMapComponent />
            </div>

            <div v-if="selectedMenuItem === 'prestataireManagement'">
                <PrestataireManagementComponent />
            </div>

            <div v-if="selectedMenuItem === 'prestataireDetails'">
                <PrestataireDetailsComponent v-model="selectedPrestataire" />
            </div>

            <div v-if="selectedMenuItem === 'statistics'">
                <StatistiquesView />
            </div>
            <!-- Ajoutez d'autres sections en fonction de vos besoins -->
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/LoginRegister/Organisation/MenuComponent.vue';
import TextEditorComponent from '@/components/LoginRegister/Organisation/TextEditorComponent.vue';
import InteractiveMapComponent from '@/components/LoginRegister/Organisation/InteractiveMapComponent.vue';
import PrestataireManagementComponent from '@/components/LoginRegister/Organisation/PrestataireManagementComponent.vue';
import PrestataireDetailsComponent from '@/components/LoginRegister/Organisation/PrestataireDetailsComponent.vue';
import StatistiquesView from "@/views/StatistiquesView.vue";

export default {
    components: {
        StatistiquesView,
        MenuComponent,
        TextEditorComponent,
        InteractiveMapComponent,
        PrestataireManagementComponent,
        PrestataireDetailsComponent,
    },
    data() {
        return {
            selectedMenuItem: 'textEditor', // Mettez l'élément du menu par défaut ici
            manifestationText: '', // Utilisé pour stocker le texte de la manifestation
            selectedPrestataire: null, // Utilisé pour stocker le prestataire sélectionné
        };
    },
    methods: {
        selectMenuItem(item) {
            this.selectedMenuItem = item;
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    margin-top: 3em; /* Ajoute une marge en haut de 3em */
}

.sidebar {
    width: 150px;
    background-color: #f0f0f0;
    padding: 10px;
}

.content {
    flex-grow: 1;
    margin-left: 10px; /* Ajustez selon vos besoins pour laisser de l'espace à la barre latérale */
}
</style>