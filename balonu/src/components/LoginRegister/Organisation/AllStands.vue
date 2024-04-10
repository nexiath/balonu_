<template>
    <div class="all-montgolfieres">

        <h1>Stands</h1>

        <table>
            <thead>
            <tr>
                <th>Libellé</th>
                <th>description_stand</th>
                <th>Actions</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="stands in standsUtilisateur" :key="stands.id_stand" >
                <td>{{ stands.libelle_stand }}</td>
                <td>{{ stands.description_stand}}</td>
                <td>
                    <button @click="deleteStand(stands.id_stand)" class="btn-action delete-btn">Supprimer</button>
                </td>
            </tr>
            </tbody>
        </table>
        <button @click="retourPagePrecedente" class="btn-retour">Retour</button>

    </div>
</template>

<script>
import axiosMarche from "@/services/axios.service";

export default {
    data() {
        return {
            standsUtilisateur: [],
        };
    },
    methods: {
        retourPagePrecedente() {
            this.$router.go(-1); // Retourne à la page précédente
        },

        async fetchStandUtilisateur() {
            try {
                const userId = this.$route.params.id_utilisateur;
                const response = await axiosMarche.get(`/stands/utilisateur/${userId}`);
                this.standsUtilisateur = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des stands de l’utilisateur:', error);
            }
        },
        async deleteStand(id_stand) {
            try {
                await axiosMarche.delete(`/stands/${id_stand}`);
                this.fetchStandUtilisateur();
            } catch (error) {
                console.error('Erreur lors de la suppression du stand:', error);
                alert("Erreur lors de la suppression du stand.");
            }
        },
    },
    mounted() {
        this.fetchStandUtilisateur();
    }
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
