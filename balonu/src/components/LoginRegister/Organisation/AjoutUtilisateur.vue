<template>
    <div>
        <form @submit.prevent="submitForm">
            <label for="login">Login:</label>
            <input v-model="login" type="text" id="login" required />

            <label for="motDePasse">Mot de passe:</label>
            <input v-model="motDePasse" type="password" id="motDePasse" required />

            <label for="nom">Nom:</label>
            <input v-model="nom" type="text" id="nom" required />

            <label for="prenom">Prénom:</label>
            <input v-model="prenom" type="text" id="prenom" required />

            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required />

            <label for="telephone">Téléphone:</label>
            <input v-model="telephone" type="text" id="telephone" required />

            <label for="siret">SIRET:</label>
            <input v-model="siret" type="text" id="siret" required />

            <label for="role">Rôle:</label>
            <select v-model="role" id="role" required>
                <!-- Options pour les rôles, ajustez selon vos besoins -->
                <option value="1">Prestataire</option>
                <option value="2">Montgolfier</option>
            </select>

            <button type="submit">Créer un utilisateur</button>
        </form>

        <!-- Afficher les utilisateurs existants -->
        <ul>
            <li v-for="utilisateur in utilisateurs" :key="utilisateur.id_utilisateur">
                {{ utilisateur.nom_utilisateur }}
            </li>
        </ul>
    </div>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";

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
        utilisateurs() {
            return this.$store.getters['utilisateurs/getUtilisateurs'];
        },
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
form {
    margin-top: 15em;
    display: flex;
    flex-direction: column;
    padding-left: 15em;
    padding-right: 15em;
}

ul {
    margin-left: 15em;
}
</style>