<template>
  <div class="franchement">
    <div class="montgolfiere-detail-container">
      <!-- Détails de la montgolfière -->
      <div class="montgolfiere-detail"  v-if="montgolfiere">
        <h2>{{ montgolfiere.libelle_montgolfiere }}</h2>
        <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière" class="montgolfiere-image">

        <div class="montgolfiere-info">
          <p><strong>Vol :</strong> {{ montgolfiere.libelle_vol }}</p>
          <p><strong>Prix du Vol :</strong> {{ montgolfiere.prix_vol }} €</p>
          <p><strong>Nombre de places disponibles :</strong> {{ montgolfiere.nombre_place }}</p>
          <p><strong>Description du Vol :</strong> <span v-html="montgolfiere.avis_vol"></span></p>
          <p v-if="montgolfiere.parcours"><strong>Parcours :</strong> {{ montgolfiere.parcours.libelle_parcours }} - {{ montgolfiere.parcours.distance_parcours }} km - {{ montgolfiere.parcours.duree_parcours }}</p>
          <p><strong>Status :</strong> {{ montgolfiere.montgolfiere_est_active ? 'Active' : 'Inactive' }}</p>
          <p><strong>Couleur :</strong> {{ montgolfiere.libelle_couleur }}</p>
          <p><strong>Date de Début :</strong> {{ new Date(montgolfiere.date_debut).toLocaleString() }}</p>
          <p><strong>Date de Fin :</strong> {{ new Date(montgolfiere.date_fin).toLocaleString() }}</p>
          <p v-if="montgolfiere.nom_utilisateur">
            <strong>Créé par :</strong> {{ montgolfiere.nom_utilisateur }} {{ montgolfiere.prenom_utilisateur }}
          </p>
        </div>
      </div>

      <!-- Formulaire d'achat -->
        <div class="achat-form" v-if="montgolfiere && montgolfiere.montgolfiere_est_active && montgolfiere.nombre_place > 0">
        <h3>Acheter des Billets</h3>
        <img v-if="qrCodeSrc" :src="qrCodeSrc" alt="Votre QR Code" class="qr-code">

        <form @submit.prevent="preparerAchat">
          <div class="form-group">
            <label for="nombreBillets">Nombre de billets:</label>
            <input type="number" v-model.number="nombreBillets" min="1" :max="montgolfiere.nombre_place" class="input-billets" id="nombreBillets">
          </div>
          <div class="form-group">
            <label for="nom">Nom:</label>
            <input type="text" v-model="infosAchat.nom" class="input-text" id="nom">
          </div>
          <div class="form-group">
            <label for="prenom">Prénom:</label>
            <input type="text" v-model="infosAchat.prenom" class="input-text" id="prenom">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="infosAchat.email" class="input-text" id="email">
          </div>
          <div class="form-group">
            <label for="numeroCarte">Numéro de carte:</label>
            <input type="text" v-model="detailsPaiement.numeroCarte" class="input-text" id="numeroCarte">
          </div>
          <button type="button" class="btn-confirm" @click="ouvrirModal">Confirmer</button>
        </form>
      </div>
      <p v-else class="no-billets-available">Aucun billet disponible pour l'instant.</p>
    </div>
    

    <!-- Modal de Confirmation -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Confirmation de Paiement</h3>
        <p>Vous allez acheter {{ nombreBillets }} billet(s) pour un total de {{ nombreBillets * montgolfiere.prix_vol }} €. Confirmez-vous cette transaction ?</p>
        <div class="modal-actions">
          <button @click="acheterBillets">Confirmer</button>
          <button @click="fermerModal">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from '@/services/axios.service';
import Cookies from 'js-cookie';
import QRCode from 'qrcode';

export default {
  data() {
    return {
      montgolfiere: null,
      nombreBillets: 1,
      showModal: false,
      qrCodeSrc: '',
      infosAchat: {
        nom: '',
        prenom: '',
        email: '',
      },
      detailsPaiement: {
        numeroCarte: '',
      },
    };
  },
  created() {
    this.fetchMontgolfiereDetail();
  },
  methods: {
    async fetchMontgolfiereDetail() {
      try {
        const response = await axios.get(`/montgolfieres/${this.$route.params.id}`);
        this.montgolfiere = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails:', error);
      }
    },
    ouvrirModal() {
      this.showModal = true;
    },
    fermerModal() {
      this.showModal = false;
    },
    simulerPaiement() {
      return this.detailsPaiement.numeroCarte && this.detailsPaiement.numeroCarte.length === 16;
    },
    async acheterBillets() {
      if (this.nombreBillets > this.montgolfiere.nombre_place) {
        alert("Erreur : le nombre de places demandées est trop élevé.");
        return;
      }

      if (this.simulerPaiement()) {
        const heureDepart = new Date(this.montgolfiere.date_debut).toLocaleTimeString();

        const detailsAchat = `
      Nom de la Montgolfière: ${this.montgolfiere.libelle_montgolfiere}
      Nom du Vol: ${this.montgolfiere.libelle_vol}
      Nom: ${this.infosAchat.nom}
      Prénom: ${this.infosAchat.prenom}
      Nombre de Billets: ${this.nombreBillets}
      Total Paiement: ${this.nombreBillets * this.montgolfiere.prix_vol} €
      Heure de départ: ${heureDepart}
    `;

        try {
          this.qrCodeSrc = await QRCode.toDataURL(detailsAchat);
          this.montgolfiere.nombre_place -= this.nombreBillets;
          this.enregistrerTransactionCookie();
          await this.miseAJourMontgolfiere();
          alert(`Achat de ${this.nombreBillets} billet(s) pour la montgolfière ${this.montgolfiere.libelle_montgolfiere} réussi.`);
        } catch (error) {
          console.error('Erreur lors de la génération du QR Code:', error);
        }
      } else {
        alert("Échec du paiement. Veuillez vérifier les informations de paiement.");
      }
      this.fermerModal();
    },

    enregistrerTransactionCookie() {
      let achats = Cookies.get('achats');
      achats = achats ? JSON.parse(achats) : {};
      achats[this.montgolfiere.id_montgolfiere] = (achats[this.montgolfiere.id_montgolfiere] || 0) + this.nombreBillets;
      Cookies.set('achats', JSON.stringify(achats), { expires: 7 });
    },
    async miseAJourMontgolfiere() {
      try {
        await axios.put(`/montgolfieres/modifier/${this.montgolfiere.id_montgolfiere}`, { nombrePlace: this.montgolfiere.nombre_place });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la montgolfière:', error);
      }
    },
  },
};
</script>



<style scoped>
.franchement {
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 10%;
  max-width: 1200px;
  margin: auto;
}

.qr-code {
    display: block;
    margin: 20px auto;
    width: 200px;
    height: 200px;
  }

.montgolfiere-detail-container {
  display: flex;
  gap: 50px;
}

.montgolfiere-detail {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.montgolfiere-image {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 20px;
}

.montgolfiere-info, .achat-form {
  margin-bottom: 20px;
}

.montgolfiere-info p, .achat-form h3 {
  margin: 10px 0;
  font-size: 1.1em;
}

.input-billets, .input-paiement {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Style pour les champs nom, prénom et numéro de carte */
.input-text {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Style pour le bouton de confirmation */
.btn-confirm {
  background-color: #E30A17;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.btn-confirm:hover {
  background-color: #bf0a0d;
}

/* Style pour la modal de confirmation */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.modal-actions {
  text-align: right;
  margin-top: 20px;
}

.modal-actions button {
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #4CAF50;
  color: white;
}

.modal-actions button:last-child {
  background-color: #f44336;
  color: white;
}

.no-billets-available {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #dc3545;
}

.qrcode-container {
    text-align: center;
    margin-top: 20px;
  }

  .qrcode-container img {
    width: 150px; /* Taille du QR Code */
    height: 150px;
    border: 1px solid #ccc;
    padding: 10px;
    background: white;
  }
</style>
