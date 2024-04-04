<template>
    <div class="page-container">
        <div class="modifier-utilisateur">
            <h2>Modifier l'utilisateur</h2>
            <form @submit.prevent="updateUser" class="user-form">
                <div class="form-group">
                    <label for="login">Login:</label>
                    <input type="text" v-model="userDetails.login_utilisateur" id="login" required />
                </div>
                <div class="form-group">
                    <label for="nom">Nom:</label>
                    <input type="text" v-model="userDetails.nom_utilisateur" id="nom" required />
                </div>
                <div class="form-group">
                    <label for="prenom">Prénom:</label>
                    <input type="text" v-model="userDetails.prenom_utilisateur" id="prenom" required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" v-model="userDetails.mail_utilisateur" id="email" required />
                </div>
                <div class="form-group">
                    <label for="telephone">Téléphone:</label>
                    <input type="tel" v-model="userDetails.telephone_utilisateur" id="telephone" required />
                </div>
                <div class="form-group">
                    <label for="siret">SIRET:</label>
                    <input type="text" v-model="userDetails.siret_utilisateur" id="siret" required />
                </div>
                <div class="form-group">
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
.page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
}

.modifier-utilisateur {
    width: 80%;
    max-width: 500px;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 1em;
}

.user-form {
    display: flex;
    flex-direction: column;
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
.page-container {
    margin-top: 7em; /* Ajoute une marge en haut de 3em */
}
</style>
