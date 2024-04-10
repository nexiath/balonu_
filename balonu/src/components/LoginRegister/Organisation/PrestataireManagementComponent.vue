<template>
    <div class="prestataire">
        <select v-model="selectedRole" @change="fetchUsers">
            <option value="all">Tous</option>
            <option value="1">Prestataires</option>
            <option value="2">Montgolfiers</option>
        </select>
        <router-link to="/ajouter-utilisateur"><button class="add-btn">Ajouter un utilisateur</button></router-link>

        <div class="table-wrapper">
            <table class="fl-table">
            <thead>
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
            </thead>
            <tbody>
            <tr v-for="user in filteredUsers" :key="user.id_utilisateur">
                <td>{{ user.login_utilisateur }}</td>
                <td>{{ user.nom_utilisateur }}</td>
                <td>{{ user.prenom_utilisateur }}</td>
                <td>{{ user.mail_utilisateur }}</td>
                <td>{{ user.telephone_utilisateur }}</td>
                <td>{{ user.siret_utilisateur }}</td>
                <td>{{ user.id_role }}</td>
                <td>
                    <div class="action-buttons">
                    <button @click="editUser(user)" class="edit-btn">Modifier</button>
                    <button @click="deleteUser(user)" class="delete-btn">Supprimer</button>
                    <button v-if="user.id_role === 2" class="services-btn">
                        <router-link :to="`/all-montgolfieres/${user.id_utilisateur}`">
                            Voir les services
                        </router-link>
                    </button>
                        <button v-if="user.id_role === 1" class="services-btn">
                            <router-link :to="`/all-stands/${user.id_utilisateur}`">
                                Voir les services
                            </router-link>
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        </div>

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
            try {
                const userDetails = await utilisateurService.getDetailsUtilisateur(user.id_utilisateur);

                this.$router.push({
                    name: 'PageModificationUtilisateur',
                    params: { id_utilisateur: user.id_utilisateur },
                    query: { userDetails: JSON.stringify(userDetails) }
                });
            } catch (error) {
                console.error('Erreur lors de la modification de l\'utilisateur', error);
            }
        },
        async deleteUser(user) {
            try {
                const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer l'utilisateur ${user.login_utilisateur}?`);
                if (!confirmDelete) {
                    return;
                }

                await utilisateurService.deleteUser(user.id_utilisateur);
                this.fetchUsers();

                console.log(`L'utilisateur ${user.login_utilisateur} a été supprimé avec succès.`);
            } catch (error) {
                alert("Veuillez supprimer tous les commentaires et services associés à cet utilisateur avant de le supprimer");
                console.error('Erreur lors de la suppression de l\'utilisateur', error);
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
.prestataire {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0;
    width: 90%;
    margin-left: 2%;
    margin-right: 2%;
}
.table-wrapper {
    box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.prestataire select {
    margin-right: 10px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}
.prestataire button {
    padding: 5px 10px;
    background-color: #8797af;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;


}

.prestataire .delete-btn {
    background-color: #dc3545; /* Rouge */
}

.prestataire .services-btn {
    background-color: #e7875f; /* Bleu */
}

.prestataire table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
}
.prestataire th, .prestataire td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.prestataire th {
    background-color: #f2f2f2;
}

.prestataire td button {
    margin-right: 5px;
    background-color: #bea4a4;
}
.prestataire tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

</style>