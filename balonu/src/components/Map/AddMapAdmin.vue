<template>
  <div class="hello">
    <router-link to="/map">Retour à la page de la map</router-link>
    <h1>{{ msg }}</h1>
    <div class="emplacement" v-for="emplacement in emplacements" :key="emplacement.id_emplacement">
      {{ emplacement.id_emplacement }} | {{ emplacement.libelle_emplacement }} | {{ emplacement.capacite_emplacement }} |
      {{ emplacement.caracteristique_emplacement }} | {{ emplacement.point_eau_nombre }} | {{ emplacement.prise_nombre }} |
      {{ emplacement.coordonnee_x }} | {{ emplacement.coordonnee_y }}
      <button class="modif" @click="modifierEmplacement(emplacement)">Modifier</button>
      <button class="suppr" @click="supprimerEmplacement(emplacement.id_emplacement)">Supprimer</button>


    </div>
    <!-- Formulaire pour ajouter un nouvel emplacement -->
    <div>
      <h2>Ajouter un nouvel emplacement</h2>
      <form @submit.prevent="ajouterEmplacement">
        <label>Libellé:
          <input v-model="nouvelEmplacement.libelle_emplacement" type="text" required>
        </label>
        <label>Capacité:
          <input v-model.number="nouvelEmplacement.capacite_emplacement" type="number" required>
        </label>
        <label>Caractéristique:
          <input v-model="nouvelEmplacement.caracteristique_emplacement" type="text" required>
        </label>
        <label>Point d'eau:
          <input v-model.number="nouvelEmplacement.point_eau_nombre" type="number" required>
        </label>
        <label>Prise:
          <input v-model.number="nouvelEmplacement.prise_nombre" type="number" required>
        </label>
        <label>Coordonnée X:
          <input v-model="nouvelEmplacement.coordonnee_x" type="text" required>
        </label>
        <label>Coordonnée Y:
          <input v-model="nouvelEmplacement.coordonnee_y" type="text" required>
        </label>
        <div v-if="clickedCoordinates.lat !== null && clickedCoordinates.lng !== null">
          <p>Coordonnées cliquées : {{ clickedCoordinates.lat.toFixed(6) }}, {{ clickedCoordinates.lng.toFixed(6) }}</p>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
    <!-- Formulaire pour Modifier un emplacement existant -->
    <div v-if="emplacementEnEdition">
      <h2>Ajouter un nouvel emplacement</h2>
      <form @submit.prevent="validerModification">
        <label>Libellé:
          <input v-model="emplacementEnEdition.libelle_emplacement" type="text" required>
        </label>
        <label>Capacité:
          <input v-model.number="emplacementEnEdition.capacite_emplacement" type="number" required>
        </label>
        <label>Caractéristique:
          <input v-model="emplacementEnEdition.caracteristique_emplacement" type="text" required>
        </label>
        <label>Point d'eau:
          <input v-model.number="emplacementEnEdition.point_eau_nombre" type="number" required>
        </label>
        <label>Prise:
          <input v-model.number="emplacementEnEdition.prise_nombre" type="number" required>
        </label>
        <label>Coordonnée X:
          <input v-model="emplacementEnEdition.coordonnee_x" type="text" required>
        </label>
        <label>Coordonnée Y:
          <input v-model="emplacementEnEdition.coordonnee_y" type="text" required>
        </label>
        <button type="submit">Enregistrer</button>
        <button @click="annulerModification">Annuler</button>
      </form>
    </div>
    <div class="map">
      <l-map
          :center="center"
          :zoom="zoom"
          :max-bounds="maxBounds"
          :max-bounds-viscosity="maxBoundsViscosity"
          :min-zoom="minZoom"
          class="map"
          ref="map"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @click="onMapClick"
      >


        <l-tile-layer
            :url="url"
        >
        </l-tile-layer>

        <l-marker
            v-for="marker in markers"
            :key="marker.id"
            :lat-lng="marker.coordinates"
            :icon="createCustomIcon(marker.hasStand ? 'marker_active_shop.svg' : 'marker_inactive_shop.svg')"

            @click="selectEmplacement(marker.id)"
        >

        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { mapState, mapGetters, mapActions } from 'vuex';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";

export default {
  data() {
    return {
      msg: 'Welcome to my VueX store',
      nouvelEmplacement: {
        libelle_emplacement: '',
        capacite_emplacement: null,
        caracteristique_emplacement: '',
        point_eau_nombre: null,
        prise_nombre: null,
        coordonnee_x: null,
        coordonnee_y: null
      },
      emplacementEnEdition: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [ 38.668997324, 34.836829986 ],
      zoom: 15,
      minZoom: 15,
      maxBounds: [
        [38.67, 34.84],
        [38.65, 34.82]
      ],
      maxBoundsViscosity: 1.0,
      markers: [],
      clickedCoordinates: { lat: null, lng: null },

    };
  },
  computed: {
    ...mapGetters('emplacements', ['getEmplacements']),
    ...mapState('emplacements', ['emplacements']),
  },
  methods: {
    ...mapActions('emplacements', ['fetchEmplacements', "addEmplacement", "updateEmplacement", "deleteEmplacement"]),
    ajouterEmplacement() {
      this.nouvelEmplacement.coordonnee_x = parseFloat(this.nouvelEmplacement.coordonnee_x);
      this.nouvelEmplacement.coordonnee_y = parseFloat(this.nouvelEmplacement.coordonnee_y);

      this.addEmplacement(this.nouvelEmplacement);
      // Réinitialisez les valeurs du formulaire après l'ajout
      this.nouvelEmplacement = {
        libelle_emplacement: '',
        capacite_emplacement: null,
        caracteristique_emplacement: '',
        point_eau_nombre: null,
        prise_nombre: null,
        coordonnee_x: null,
        coordonnee_y: null
      };
    },
    modifierEmplacement(emplacement) {
      // Copie de l'emplacement pour éviter de modifier l'original directement
      this.emplacementEnEdition = { ...emplacement };
      this.emplacementEnEdition.coordonnee_x = this.clickedCoordinates.lat.toFixed(6);
      this.emplacementEnEdition.coordonnee_y = this.clickedCoordinates.lng.toFixed(6);
    },
    validerModification() {
      this.updateEmplacement(this.emplacementEnEdition);
      this.emplacementEnEdition = null; // réinitialiser après la modification effectuée
    },
    annulerModification() {
      this.emplacementEnEdition = null; // Annuler la modification
    },
    supprimerEmplacement(idEmplacement) {
      // Demander confirmation avant la suppression
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet emplacement ?');
      if (confirmation) {
        this.deleteEmplacement(idEmplacement);
      }
    },
    createCustomIcon(markerPath) {
      // Crée une icône personnalisée avec le chemin du marqueur SVG
      const customIcon = new L.divIcon({
        html: `<img src="${markerPath}" alt="Marker" class="icon_map" />`,
        iconSize: [32, 32], // Ajuste la taille de l'icône selon tes besoins
      });
      return customIcon;
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    onMapClick(event) {
      // Les coordonnées du point cliqué
      const latlng = event.latlng;
      this.clickedCoordinates = { lat: latlng.lat, lng: latlng.lng };

      console.log(`Coordonnées du point cliqué : ${latlng.lat}, ${latlng.lng}`);
      this.nouvelEmplacement.coordonnee_x = this.clickedCoordinates.lat.toFixed(6);
      this.nouvelEmplacement.coordonnee_y = this.clickedCoordinates.lng.toFixed(6);
    },
    async updateMarkers() {
      await this.fetchEmplacements();

      this.markers = this.emplacements.map(emplacement => {
        const hasStand = this.stands.some(stand => stand.id_emplacement === emplacement.id_emplacement);
        emplacement.hasStand = hasStand;
        return {
          id: emplacement.id_emplacement,
          coordinates: [emplacement.coordonnee_x, emplacement.coordonnee_y],
          hasStand: hasStand,
        };
      });
    }
  },
  mounted() {
    this.fetchEmplacements();
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  width: 100%;
  max-width: 800px;
  margin: auto;
  font-family: 'Poppins', serif;
}

.hello h1, h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.emplacement {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modif, .suppr {
  background-color: #ff0000;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 5px;
  transition: background-color 0.2s ease;
}

.modif:hover, .suppr:hover {
  background-color: #a04545;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 10px;
}

input[type="text"], input[type="number"] {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

button[type="submit"]:hover {
  background-color: #367c39;
}

.router-link {
  margin-bottom: 20px;
  text-decoration: none;
  color: #ff0000;
  font-weight: bold;
}

.router-link:hover {
  text-decoration: underline;
}

.map {
  width: 100%;
  height: 400px; 
  margin-top: 20px;
}
</style>
