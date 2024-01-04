<template>
    <div class="tout">
        <select v-model="selectedRole" @change="fetchUsers">
            <option value="all">Tous</option>
            <option value="1">Prestataires</option>
            <option value="2">Montgolfiers</option>
        </select>
        <table>
            <tr>
                <th>Login</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>SIRET</th>
                <th>Rôle</th>
                <th>Actions</th>
            </tr>
            <tr v-for="user in filteredUsers" :key="user.id_utilisateur">
                <td>{{ user.login_utilisateur }}</td>
                <td>{{ user.nom_utilisateur }}</td>
                <td>{{ user.prenom_utilisateur }}</td>
                <td>{{ user.mail_utilisateur }}</td>
                <td>{{ user.telephone_utilisateur }}</td>
                <td>{{ user.siret_utilisateur }}</td>
                <td>{{ user.id_role }}</td>
                <td>
                    <button @click="editUser(user)">Modifier</button>
                    <button @click="deleteUser(user)">Supprimer</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { utilisateurService } from '@/services/utilisateur.service';

export default {
    data() {
        return {
            users: [],
            selectedRole: 'all'
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const users = await utilisateurService.getUsers();
                this.users = users;
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            }
        },
        async editUser(user) {
            // Implémentez la logique pour la modification du prestataire
            // Par exemple, vous pouvez naviguer vers une page de modification
            // ou afficher un formulaire de modification ici.
            console.log('Modifier l\'utilisateur', user);
        },
        async deleteUser(user) {
            try {
                // Vérifiez si l'utilisateur est sûr de vouloir supprimer
                const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer l'utilisateur ${user.login_utilisateur}?`);
                if (!confirmDelete) {
                    return;
                }

                // Appelez votre API pour supprimer l'utilisateur
                await utilisateurService.deleteUser(user.id_utilisateur);

                // Actualisez la liste des utilisateurs après la suppression
                this.fetchUsers();
                console.log(`L'utilisateur ${user.login_utilisateur} a été supprimé avec succès.`);
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur', error);
                // Gérez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
            }
        }
    },
    computed: {
        ...mapState('auth', ['userID']),
        ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
        filteredUsers() {
            if (this.selectedRole === 'all') {
                return this.users;
            }
            return this.users.filter(user => user.id_role.toString() === this.selectedRole);
        }
    }
};
</script>



<style scoped>
.tout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2%;


    width: 100%;
    max-width: 800px;
    margin: 5% auto;
    font-family: 'Poppins', serif;
}

select {
    font-family: 'Poppins', serif;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

table {
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px; /* Espace entre le select et le tableau */
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left; /* Alignement du texte à gauche */
}

th {
    background-color: #f2f2f2;
    color: #464646; /* Couleur du texte de l'en-tête */
}

/* Style pour les lignes du tableau */
tr:nth-child(even) {background-color: #f2f2f2;}
tr:hover {background-color: #e8e8e8;} /* Survol des lignes */
</style>