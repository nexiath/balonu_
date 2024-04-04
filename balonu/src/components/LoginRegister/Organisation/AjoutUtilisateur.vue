<template>
    <div class="page-container">

    <div class="user-form-container">
        <form @submit.prevent="submitForm" class="user-form">
            <div class="form-group">
                <label for="login">Login:</label>
                <input v-model="login" type="text" id="login" required />
            </div>

            <div class="form-group">
                <label for="motDePasse">Mot de passe:</label>
                <input v-model="motDePasse" type="password" id="motDePasse" required />
            </div>

            <div class="form-group">
                <label for="nom">Nom:</label>
                <input v-model="nom" type="text" id="nom" required />
            </div>

            <div class="form-group">
                <label for="prenom">Prénom:</label>
                <input v-model="prenom" type="text" id="prenom" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="email" type="email" id="email" required />
            </div>

            <div class="form-group">
                <label for="telephone">Téléphone:</label>
                <input v-model="telephone" type="text" id="telephone" required />
            </div>

            <div class="form-group">
                <label for="siret">SIRET:</label>
                <input v-model="siret" type="text" id="siret" required />
            </div>

            <div class="form-group">
                <label for="role">Rôle:</label>
                <select v-model="role" id="role" required>
                    <!-- Options pour les rôles, ajustez selon vos besoins -->
                    <option value="1">Prestataire</option>
                    <option value="2">Montgolfier</option>
                </select>
            </div>

            <button type="submit">Créer un utilisateur</button>
        </form>

        <!-- Afficher les utilisateurs existants -->
        <ul class="user-list">
            <li v-for="utilisateur in utilisateurs" :key="utilisateur.id_utilisateur" class="user-item">
                {{ utilisateur.nom_utilisateur }}
            </li>
        </ul>
    </div>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    data() {
        return {
            login: '',
            motDePasse: '',
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            siret: '',
            role: '',
        };
    },
    computed: {
        ...mapGetters('utilisateurs', ['getUtilisateurs']),
        ...mapState('utilisateurs', ['utilisateurs']),
    },
    methods: {
        ...mapActions('utilisateurs', ['fetchUtilisateurs', 'fetchUtilisateurByIdUtilisateur', 'createUser']),
        async submitForm() {
            try {
                const userData = {
                    login_utilisateur: this.login,
                    mot_de_passe_utilisateur: this.motDePasse,
                    nom_utilisateur: this.nom,
                    prenom_utilisateur: this.prenom,
                    mail_utilisateur: this.email,
                    telephone_utilisateur: this.telephone,
                    siret_utilisateur: this.siret,
                    id_role: this.role,
                };

                await this.$store.dispatch('utilisateurs/createUser', userData);

                // Réexécutez fetchUtilisateurs pour mettre à jour la liste après la création
                await this.$store.dispatch('utilisateurs/fetchUtilisateurs');

                // Réinitialisez les champs du formulaire après la création
                this.login = '';
                this.motDePasse = '';
                this.nom = '';
                this.prenom = '';
                this.email = '';
                this.telephone = '';
                this.siret = '';
                this.role = '';

                // Naviguez vers la nouvelle page
                await this.$router.push('/orga'); // Remplacez '/nouvelle-page' par le chemin de votre nouvelle page

            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
            }
        },
    },
    mounted() {
        this.$store.dispatch('utilisateurs/fetchUtilisateurs');
    }
};
</script>

<style scoped>
.page-container {
    margin-top: 5em; /* Ajoute une marge en haut de 3em */
}
.user-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.user-form {
    width: 80%;
    max-width: 500px;
    margin-top: 3em;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1.5em;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="password"],
input[type="email"],
select {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button[type="submit"] {
    width: 100%;
    padding: 0.7em;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

.user-list {
    margin-top: 2em;
    padding: 0;
    list-style-type: none;
}

.user-item {
    padding: 0.5em;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 0.5em;
}

</style>
