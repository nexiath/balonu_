<template>
  <div class="livre-or">
    <h1>Livre d'Or</h1>
    <div class="commentaires">
      <div v-for="commentaire in commentaires" :key="commentaire.id_commentaire" class="commentaire">
        <p>{{ commentaire.contenu_commentaire }}</p>
        <div class="commentaire-details">
          <span>{{ formatDate(commentaire.date_commentaire) }}</span>
          <span class="pseudo">{{ commentaire.pseudo }}</span>
          <button v-if="showButtons" @click="supprimerCommentaire(commentaire.id_commentaire)"
            class="btn-supprimer">Supprimer</button>
          <button v-if="showButtons" @click="modifierCommentaire(commentaire)" class="btn-modifier">Modifier</button>
        </div>
      </div>
    </div>

    <form v-if="commentaireAModifier" @submit.prevent="validerModification" class="form-commentaire">
      <input v-model="pseudo" type="text" placeholder="Pseudo" class="input-pseudo" />
      <textarea v-model="nouveauCommentaire" placeholder="Modifier le commentaire"></textarea>
      <button type="submit" class="btn-valider">Valider</button>
      <button type="button" @click="annulerModification" class="btn-annuler">Annuler</button>
    </form>

    <form v-else @submit.prevent="ajouterCommentaire" class="form-commentaire">
      <input v-model="pseudo" type="text" placeholder="Pseudo" class="input-pseudo" />
      <textarea v-model="nouveauCommentaire" placeholder="Modifier le commentaire"></textarea>
      <button type="submit" class="btn-ajouter">Ajouter un commentaire</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      prestataireId: null,
      commentaires: [],
      nouveauCommentaire: '',
      pseudo: '',
      commentaireAModifier: null,
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
    showButtons() {
      console.log(this.userIdRole)
      return this.isAuthenticated && ((this.userID == (parseInt(this.prestataireId) + 1)) || (this.userID == 1));
    },


  },
  methods: {
    formatDate(date) {
      const formattedDate = new Date(date);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return formattedDate.toLocaleDateString('fr-FR', options);
    },
    async fetchPrestataire() {
      const prestataireId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:3030/presta/${prestataireId}`);
        this.prestataire = response.data;
        await this.fetchCommentaires();
      } catch (error) {
        console.error('Erreur lors de la récupération des données du prestataire', error);
      }
    },
    updateNouveauCommentaire(event) {
      this.nouveauCommentaire = event.target.value;
    },
    async fetchCommentaires() {
      try {
        const prestataireId = this.$route.params.id;
        const response = await axios.get(`http://localhost:3030/commentaires/${prestataireId}`);
        this.commentaires = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    },
    async ajouterCommentaire() {
      try {
        const prestataireId = this.$route.params.id;
        await axios.post(`http://localhost:3030/commentaires/${prestataireId}`, {
          contenu_commentaire: this.nouveauCommentaire,
          pseudo: this.pseudo,
        });
        this.nouveauCommentaire = '';
        this.pseudo = '';
        this.fetchCommentaires();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire', error);
      }
    },
    modifierCommentaire(commentaire) {
      this.commentaireAModifier = commentaire;
      this.nouveauCommentaire = commentaire.contenu_commentaire;
      this.pseudo = commentaire.pseudo;
    },
    async validerModification() {
      try {
        console.log("Début de la modification");
        const prestataireId = this.$route.params.id;
        const commentaireId = this.commentaireAModifier.id_commentaire;

        console.log("Prestataire ID :", prestataireId);
        console.log("Commentaire ID :", commentaireId);

        await axios.put(`http://localhost:3030/commentaires/${prestataireId}/${commentaireId}`, {
          contenu_commentaire: this.nouveauCommentaire,
          pseudo: this.pseudo,
        });

        console.log("Après la requête axios");

        this.commentaireAModifier = null;
        this.nouveauCommentaire = '';
        this.pseudo = '';

        console.log("Fin de la modification");
        this.fetchCommentaires();
      } catch (error) {
        console.error('Erreur lors de la modification du commentaire', error);
      }
    },
    annulerModification() {
      this.commentaireAModifier = null;
      this.nouveauCommentaire = '';
      this.pseudo = '';
    },
    async supprimerCommentaire(prestataireId, commentaireId) {
      try {
        await axios.delete(`http://localhost:3030/commentaires/${prestataireId}/${commentaireId}`);
        console.log("delete")
        this.fetchCommentaires();
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire', error);
      }
    },
  },
  created() {
    this.prestataireId = this.$route.params.id;
    this.fetchCommentaires();
  },
  mounted() {
    this.fetchCommentaires();
  },
};
</script>




<style scoped>
.livre-or {
  margin-top: 10%;
  margin-left: 24%;
  max-width: 800px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.commentaires {
  margin-top: 20px;
}

.commentaire {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.commentaire p {
  margin: 0;
}

.commentaire-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}

.btn-supprimer,
.btn-modifier {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border-radius: 3px;
}

.btn-supprimer:hover,
.btn-modifier:hover {
  background-color: #d63c21;
}

.form-commentaire {
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn-ajouter {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 3px;
}

.btn-ajouter:hover {
  background-color: #0056b3;
}
</style>