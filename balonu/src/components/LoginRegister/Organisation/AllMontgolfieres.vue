<template>
    <div class="all-montgolfieres">
        <p>Apagnan</p>
        <table>
            <thead>
            <tr>
                <th>Libellé</th>
                <th>Statut</th>
                <th>Nombre de places</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="montgolfiere in getMontgolfieres" :key="montgolfiere.id_montgolfiere" :style="{ backgroundColor: montgolfiere.montgolfiere_est_active ? 'green' : 'orange' }">
                <td>{{ montgolfiere.libelle_montgolfiere }}</td>
                <td>{{ montgolfiere.montgolfiere_est_active ? 'Active' : 'Inactive' }}</td>
                <td>{{ montgolfiere.nombre_place }}</td>
                <td>
                    <button @click="rendreActive(montgolfiere)" :disabled="montgolfiere.montgolfiere_est_active">Rendre active</button>
                    <button @click="rendreInactive(montgolfiere)" :disabled="!montgolfiere.montgolfiere_est_active">Rendre inactive</button>
                    <button @click="supprimerMontgolfiere(montgolfiere.id_montgolfiere)">Supprimer</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("montgolfiereElmir", ["getMontgolfieres"]),
    },
    methods: {
        async fetchMontgolfieresByUtilisateur() {
            try {
                const userId = this.$route.params.id_utilisateur;
                await this.$store.dispatch("montgolfiereElmir/fetchMontgolfieresByUtilisateur", userId);
            } catch (error) {
                console.error(error);
            }
        },
        async rendreActive(montgolfiere) {
            // Appeler l'action pour rendre la montgolfière active
            await this.$store.dispatch("montgolfiereElmir/updateMontgolfiere", {
                ...montgolfiere,
                montgolfiere_est_active: true,
            });
        },
        async rendreInactive(montgolfiere) {
            // Appeler l'action pour rendre la montgolfière inactive
            await this.$store.dispatch("montgolfiereElmir/updateMontgolfiere", {
                ...montgolfiere,
                montgolfiere_est_active: false,
            });
        },
        async supprimerMontgolfiere(idMontgolfiere) {
            // Appeler l'action pour supprimer la montgolfière
            if (confirm("Voulez-vous vraiment supprimer cette montgolfière ?")) {
                await this.$store.dispatch("montgolfiereElmir/deleteMontgolfiere", idMontgolfiere);
            }
        },
    },
    created() {
        this.fetchMontgolfieresByUtilisateur();
    },
};
</script>

<style scoped>
div.all-montgolfieres {
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>
