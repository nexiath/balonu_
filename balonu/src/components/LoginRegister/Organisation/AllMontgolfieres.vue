<template>
    <div class="all-montgolfieres">

        <h1>Montgolfières</h1>

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
            <tr v-for="montgolfiere in getMontgolfieres" :key="montgolfiere.id_montgolfiere" :style="{ backgroundColor: montgolfiere.montgolfiere_est_active ? '#d9ead3' : '#f9d6d5' }">
                <td>{{ montgolfiere.libelle_montgolfiere }}</td>
                <td>{{ montgolfiere.montgolfiere_est_active ? 'Active' : 'Inactive' }}</td>
                <td>{{ montgolfiere.nombre_place }}</td>
                <td>
                    <button @click="rendreActive(montgolfiere)" :disabled="montgolfiere.montgolfiere_est_active" class="btn-action active-btn">Rendre active</button>
                    <button @click="rendreInactive(montgolfiere)" :disabled="!montgolfiere.montgolfiere_est_active" class="btn-action inactive-btn">Rendre inactive</button>
                    <button @click="supprimerMontgolfiere(montgolfiere.id_montgolfiere)" class="btn-action delete-btn">Supprimer</button>
                </td>
            </tr>
            </tbody>
        </table>
        <button @click="retourPagePrecedente" class="btn-retour">Retour</button>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "@/services/axios.service";

export default {
    computed: {
        ...mapGetters("montgolfiereElmir", ["getMontgolfieres"]),
    },
    methods: {
        retourPagePrecedente() {
            this.$router.go(-1); // Retourne à la page précédente
        },
        async fetchMontgolfieresByUtilisateur() {
            try {
                const userId = this.$route.params.id_utilisateur;
                await this.$store.dispatch("montgolfiereElmir/fetchMontgolfieresByUtilisateur", userId);
            } catch (error) {
                console.error(error);
            }
        },
        async rendreActive(montgolfiere) {
            try {
                console.log(montgolfiere.id_montgolfiere)

                // Appeler l'action pour rendre la montgolfière active
                await this.$store.dispatch("montgolfiereElmir/activerMontgolfiere", {
                    idMontgolfiere: montgolfiere.id_montgolfiere,
                });
            } catch (error) {
                console.error("Erreur lors du rendu de la montgolfière active :", error);
            }
        },

        async rendreInactive(montgolfiere) {
            try {
                console.log(montgolfiere.id_montgolfiere)
                // Appeler l'action pour rendre la montgolfière inactive
                await this.$store.dispatch("montgolfiereElmir/desactiverMontgolfiere", {
                    idMontgolfiere: montgolfiere.id_montgolfiere,
                });
            } catch (error) {
                console.error("Erreur lors du rendu de la montgolfière inactive :", error);
            }
        },



        async supprimerMontgolfiere(id) {
            try {
                await axios.delete(`http://localhost:3030/montgolfieres/${id}`);
                this.fetchMontgolfieresByUtilisateur();
                alert("Montgolfière supprimée avec succès");
            } catch (error) {
                console.error('Erreur lors de la suppression de la montgolfière:', error);
                alert("Erreur lors de la suppression: " + (error.response ? error.response.data.message : error.message));
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
    background-color: #f3f3ec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

table {
    width: 55%;
    border-collapse: collapse;
    margin: 20px;
}
th, td {
    border: 1px solid #2d2b2b;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.btn-retour {
    margin-bottom: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: #dc3131;
    color: white;
    border-radius: 3px;
}

.btn-retour:hover {
    background-color: #b02424;
}


.btn-action {
    margin-right: 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    font-weight: bold;
}


.delete-btn {
    background-color: #dc3131;
    color: white;
}

.delete-btn:hover {
    background-color: #b02424;
}
</style>