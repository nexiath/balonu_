<template>
    <div class="all">
    <div class="livre-or">
        <div v-if="showConfiguration">
            <h2>Configuration du Livre d'Or</h2>
            <input v-model="enteteModifiable" placeholder="Modifier l'entête du Livre d'Or" class="input-entete" />
            <button @click="modifierEntete" class="btn-entete">Sauvegarder l'entête</button>
        </div>
        <h1>{{ enteteLivreOr }}</h1>
        <div class="commentaires">
            <div v-for="commentaire in commentaires" :key="commentaire.id_commentaire" class="commentaire">
                <p>{{ commentaire.contenu_commentaire }}</p>
                <div class="commentaire-details">
                    <span>{{ formatDate(commentaire.date_commentaire) }}</span>
                    <span class="pseudo">{{ commentaire.pseudo }}</span>
                    <button v-if="showButtons" @click="supprimerCommentaire(commentaire.id_commentaire)" class="btn-supprimer">Supprimer</button>
                    <button v-if="showButtons" @click="modifierCommentaire(commentaire)" class="btn-modifier">Modifier</button>
                </div>
            </div>
        </div>

        <form v-if="commentaireAModifier" @submit.prevent="validerModification" class="form-commentaire">
            <input v-model="pseudo" type="text" placeholder="Pseudo" class="input-pseudo" />
            <textarea v-model="nouveauCommentaire" placeholder="Modifier le commentaire" class="input-commentaire"></textarea>
            <div class="buttons">
                <button type="submit" class="btn-valider">Valider</button>
                <button type="button" @click="annulerModification" class="btn-annuler">Annuler</button>
            </div>
        </form>

        <form v-else @submit.prevent="ajouterCommentaire" class="form-commentaire">
            <input v-model="pseudo" type="text" placeholder="Pseudo" class="input-pseudo" />
            <textarea v-model="nouveauCommentaire" placeholder="Ajouter un commentaire" class="input-commentaire"></textarea>
            <button type="submit" class="btn-ajouter">Ajouter un commentaire</button>
        </form>
    </div>
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
      enteteLivreOr: 'Livre d\'Or',
      enteteModifiable: '',
    };
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
    showButtons() {
      console.log(this.userIdRole)
      return this.isAuthenticated && ((this.userID == (parseInt(this.prestataireId) + 1)) || (this.userID == 1));
    },
    showConfiguration() {
      return this.isAuthenticated && ((this.userID == (parseInt(this.prestataireId) + 1)) || (this.userID == 1));
    },

  },
  methods: {

    modifierEntete() {
      axios.put(`http://localhost:3030/presta/entete/${this.prestataireId}`, {
        entete_livre_or: this.enteteModifiable,
      }).then(() => {
        this.enteteLivreOr = this.enteteModifiable;
        this.enteteModifiable = '';
      }).catch(error => {
        console.error('Erreur lors de la mise à jour de l\'entête', error);
      });
    },
    created() {
    this.prestataireId = this.$route.params.id;
    this.fetchCommentaires();
  },
    formatDate(date) {
      const formattedDate = new Date(date);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return formattedDate.toLocaleDateString('fr-FR', options);
    },
    async fetchPrestataire() {
      try {
        const response = await axios.get(`http://localhost:3030/presta/${this.prestataireId}`);
        this.enteteLivreOr = response.data.entete_livre_or || 'Livre d\'Or';
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
    this.fetchPrestataire();
  },
  mounted() {
    this.fetchCommentaires();
  },
};
</script>



<style scoped>
.all{
    margin-top: 9%;
}
.livre-or {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.input-entete {
    width: calc(100% - 140px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.btn-entete {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 3px;
}

.btn-entete:hover {
    background-color: #0056b3;
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

.pseudo {
    color: #666;
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

.input-pseudo,
.input-commentaire {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.buttons {
    display: flex;
}

.btn-valider,
.btn-annuler,
.btn-ajouter {
    flex: 1;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
}

.btn-valider {
    background-color: #007bff;
    color: white;
}

.btn-annuler {
    background-color: #ffc107;
    color: #333;
    margin-left: 10px;
}

.btn-ajouter {
    background-color: #dc3131;
    color: white;
}

.btn-valider:hover {
    background-color: #0056b3;
}

.btn-annuler:hover {
    background-color: #d39e00;
}

.btn-ajouter:hover {
    background-color: #b02424;
}
</style>