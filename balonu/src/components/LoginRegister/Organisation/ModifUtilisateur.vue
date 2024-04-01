<template>
    <div class="modifier-utilisateur">
        <h2>Modifier l'utilisateur</h2>
        <form @submit.prevent="updateUser">
            <div>
                <label for="login">Login:</label>
                <input type="text" v-model="userDetails.login_utilisateur" id="login" required />
            </div>
            <div>
                <label for="nom">Nom:</label>
                <input type="text" v-model="userDetails.nom_utilisateur" id="nom" required />
            </div>
            <div>
                <label for="prenom">Prénom:</label>
                <input type="text" v-model="userDetails.prenom_utilisateur" id="prenom" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="userDetails.mail_utilisateur" id="email" required />
            </div>
            <div>
                <label for="telephone">Téléphone:</label>
                <input type="tel" v-model="userDetails.telephone_utilisateur" id="telephone" required />
            </div>
            <div>
                <label for="siret">SIRET:</label>
                <input type="text" v-model="userDetails.siret_utilisateur" id="siret" required />
            </div>
            <div>
                <label for="role">Rôle:</label>
                <select v-model="userDetails.id_role" id="role" required>
                    <!-- Options pour les rôles, ajustez selon vos besoins -->
                    <option value="1">Prestataire</option>
                    <option value="2">Montgolfier</option>
                </select>
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>
import utilisateurService from "@/services/utilisateur.service";

export default {
    data() {
        return {
            userDetails: JSON.parse(this.$route.query.userDetails),
        };
    },
    methods: {
        async updateUser() {
            try {
                // Appelez votre service pour mettre à jour l'utilisateur
                await utilisateurService.updateUser(
                    this.userDetails.id_utilisateur,
                    this.userDetails.login_utilisateur,
                    this.userDetails.mot_de_passe_utilisateur, // Assurez-vous de récupérer le mot de passe actuel ou de le gérer correctement
                    this.userDetails.nom_utilisateur,
                    this.userDetails.prenom_utilisateur,
                    this.userDetails.mail_utilisateur,
                    this.userDetails.telephone_utilisateur,
                    this.userDetails.siret_utilisateur,
                    this.userDetails.id_role
                );

                // Redirigez l'utilisateur vers la page de gestion des utilisateurs ou une autre page appropriée
                this.$router.push('/orga');
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                // Gérez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
            }
        },
    },
};
</script>

<style scoped>
.modifier-utilisateur {
    max-width: 400px;
    margin: 20px auto;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
}

input, select {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
