<template>
  <div id="map">


      <!-- Inside your panel div -->
      <div class="search-bar" ref="search-bar">
        <input @click="unselectEmplacement"
               v-model="searchQuery"
               @input="updateStandSuggestions"
               placeholder="Rechercher un stand" />
        <button @click="searchStand">Rechercher</button>

        <img src="https://cdn.discordapp.com/attachments/1174355753654550568/1179855317207617636/next_search_icon.png" alt="Image" @click="afficherSearch">

        <!-- Suggestions dropdown -->
        <ul v-if="standSuggestions.length" class="suggestions">
          <li v-for="suggestion in standSuggestions" :key="suggestion.id_stand" @click="selectSuggestion(suggestion)">
            {{ suggestion.libelle_stand }}
          </li>
        </ul>
      </div>

    <div class="panel" ref="panel">
      
      <div v-if="selectedEmplacement">
        <img src="https://www.looper.com/img/gallery/dragon-ball-super-why-doesnt-gohan-go-super-saiyan-his-ultimate-form-explained/l-intro-1693404560.jpg" alt="">
        <div v-for="stand in stands" :key="stand.id_stand" class="stands">
          <h2>{{ stand.libelle_stand }}</h2>
          <p class="description">"{{ stand.description_stand }}"</p>
          <!-- Ajoutez d'autres propriétés de stand selon vos besoins -->
        </div>
        <hr>
        <p class="emplacement_desc">Nom de l'emplacement : <span>{{ selectedEmplacement.libelle_emplacement }}</span></p>
        <p class="emplacement_desc">Capacité d'accueil : <span>{{ selectedEmplacement.capacite_emplacement }}</span></p>
        <p class="emplacement_desc">Caractéristique de l'emplacement : <span>{{ selectedEmplacement.caracteristique_emplacement }}</span></p>
        <p class="emplacement_desc">Nombre de point d'eau : <span>{{ selectedEmplacement.point_eau_nombre }}</span></p>
        <p class="emplacement_desc">Nombre de prise : <span>{{ selectedEmplacement.prise_nombre }}</span></p>
        <!-- Ajoutez d'autres champs ici selon vos besoins -->
        <!-- Afficher les stands liés à cet emplacement -->
        <hr>
        <div v-if="utilisateurSelectionne" class="utilisateur">
          <p>Le stand a été réservé par : <span>{{ utilisateurSelectionne.nom_utilisateur }}</span></p>
          <!-- Ajoutez d'autres champs utilisateur selon vos besoins -->
        </div>
      </div>
      <router-link to="/addMap">
        <button class="addEmplacement">
          Ajouter un emplacement (admin)
        </button>
      </router-link>
    </div>
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

      <LControl class="zones_de_deplacement" :options="{ position: 'topright' }">
        <button @click="goToZoneA">Zone A</button>
        <button @click="goToZoneB">Zone B</button>
        <button @click="goToZoneC">Zone C</button>
        <button @click="goToZoneDepart">Zone de départ</button>
      </LControl>



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
      <l-polygon
          :lat-lngs="zoneDelimitee"
          :options="{ color: 'red', fillColor: 'blue', fillOpacity: 0.5 }"
      ></l-polygon>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolygon, LControl } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapState, mapGetters, mapActions } from 'vuex';
import * as L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [ 38.658805897345786, 34.82456992881735 ],
      zoom: 15,
      minZoom: 15,
      maxBounds: [
        [40.67, 30.84],
        [35.65, 35.82]
      ],
      maxBoundsViscosity: 1.0,
      markers: [],
      selectedEmplacement: null,
      utilisateurSelectionne: null,
      zoneDelimitee: [
        [38.662693151690625, 34.84173736750405],
        [38.661118168890184, 34.841393916257175],
        [38.65981124197273, 34.84251013280952],
        [38.66048146388401, 34.84379807498535],
        [38.661620826738705, 34.84379807498535],
      ],
      searchQuery: '',
      standSuggestions: [],
    };
  },
  computed: {
    ...mapGetters('emplacements', ['getEmplacements']),
    ...mapGetters('standsEmplacements', ['getStands']),
    ...mapState('emplacements', ['emplacements']),
    ...mapState('standsEmplacements', ['stands']),
    // il faut récupérer tous les utilisateurs et les affectations de stands aux utilisateurs
    ...mapGetters('utilisateurs' ['getUtilisateurs', 'getUtilisateurById']),
    ...mapState('utilisateurs', ['utilisateurs']),
    // Pareil pour les affectations
    ...mapGetters('affectationsStand' ['getAffectationsStand']),
    ...mapState('affectationsStand', ['affectationsStand']),
  },
  methods: {
    ...mapActions('emplacements', ['fetchEmplacements']),
    ...mapActions('standsEmplacements', ['fetchStandsByEmplacement', 'fetchStands']),
    // Récupérer les fetchs
    ...mapActions('utilisateurs', ['fetchUtilisateurs', 'fetchUtilisateurByIdUtilisateur']),
    ...mapActions('affectationsStand', ['fetchAffectationsStand', "fetchAffectationsStandByIdStand"]),

    createCustomIcon(markerPath) {
      // Crée une icône personnalisée avec le chemin du marqueur SVG
      const customIcon = new L.divIcon({
        html: `<img src="${markerPath}" alt="Marker" class="icon_map" />`,
        iconSize: [32, 32], // Ajuste la taille de l'icône selon tes besoins
      });
      return customIcon;
    },
    unselectEmplacement() {
      // Clear the selectedEmplacement when the search bar is clicked
      this.selectedEmplacement = null;
      this.utilisateurSelectionne = null; // Also clear the selected user
      this.fetchStands();
      const panel = this.$refs.panel;
      panel.classList.remove('visible')
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    afficherSearch() {
      const searchBox = this.$refs["search-bar"];
      searchBox.classList.toggle('visible')
    },
    goToZoneA() {
      const newPosition = [38.669964431633, 34.74972025206886];

      this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins

      this.center = newPosition;
    },
    goToZoneB() {
      const newPosition = [38.60793625163658, 34.733616450026794];

      this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins

      this.center = newPosition;
    },
    goToZoneC() {
      const newPosition = [38.59234158660849, 34.88552641798665];

      this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins

      this.center = newPosition;
    },
    goToZoneDepart() {
      const newPosition = [38.658805897345786, 34.82456992881735];

      this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins

      this.center = newPosition;
    },

    onMapClick(event) {
      // Les coordonnées du point cliqué
      const latlng = event.latlng;
      console.log(`Coordonnées du point cliqué : ${latlng.lat}, ${latlng.lng}`);
    },
    async selectEmplacement(emplacementId) {
      const selectedEmplacement = this.emplacements.find(e => e.id_emplacement === emplacementId);
      if (selectedEmplacement) {
        this.selectedEmplacement = selectedEmplacement;
        try {
          // Fetch the stand details for the selected emplacement
          const originalStands = [...this.stands]; // Faites une copie de la liste originale des stands

          const standId = await this.$store.dispatch('standsEmplacements/fetchStandsByEmplacement', emplacementId);
          console.log("L'id du stand sélectionné est : " + standId);
          await this.fetchAffectationsStandByIdStand(standId);
          const utilisateurId = await this.$store.dispatch('affectationsStand/fetchAffectationsStandByIdStand', standId);
          console.log("L'id du utilisateur sélectionné est : " + utilisateurId);

          // Mise à jour de la propriété utilisateurSelectionne
          await this.$store.dispatch('utilisateurs/fetchUtilisateurByIdUtilisateur', utilisateurId, { root: true });
          this.utilisateurSelectionne = this.$store.getters['utilisateurs/getUtilisateurById'](utilisateurId);
          console.log("Bon les gars : " + this.utilisateurSelectionne)
          this.stands = originalStands; // Restaurez la liste originale des stands

          const panel = this.$refs.panel;
          panel.classList.add('visible');

        } catch (error) {
          // Gérer les erreurs si nécessaire
          console.error('Une erreur s\'est produite lors de la récupération de l\'ID du stand :', error);
        }
      }
    },
    async updateMarkers() {
      await this.fetchEmplacements();
      await this.fetchStands();
      await this.fetchAffectationsStand();
      await this.fetchUtilisateurs();

      this.markers = this.emplacements.map(emplacement => {
        const hasStand = this.stands.some(stand => stand.id_emplacement === emplacement.id_emplacement);
        emplacement.hasStand = hasStand;
        return {
          id: emplacement.id_emplacement,
          coordinates: [emplacement.coordonnee_x, emplacement.coordonnee_y],
          hasStand: hasStand,
        };
      });
    },
    async searchStand() {
      const query = this.searchQuery.trim().toLowerCase();
      console.log("La recherche est : " + query)

      // Find the stand based on the search query
      const foundStand = this.stands.find(stand =>
          stand.libelle_stand.toLowerCase().includes(query)
      );

      if (foundStand) {
        try {
          // Fetch the emplacement associated with the found stand
          const emplacementId = foundStand.id_emplacement;
          await this.fetchEmplacements();
          const foundEmplacement = this.emplacements.find(
              emplacement => emplacement.id_emplacement === emplacementId
          );

          if (foundEmplacement) {
            // Center the map on the coordinates of the found emplacement
            const newPosition = [foundEmplacement.coordonnee_x, foundEmplacement.coordonnee_y];
            this.$refs.map.mapObject.flyTo(newPosition, 15);

            // Optionally, select the emplacement associated with the stand
            this.selectEmplacement(emplacementId);
            this.searchQuery = null;
          } else {
            // Handle case when emplacement is not found
            console.log('Emplacement not found');
          }
        } catch (error) {
          // Handle errors if necessary
          console.error('Error fetching emplacement:', error);
        }
      } else {
        // Handle case when no stand is found
        console.log('Stand not found');
      }
    },
    updateStandSuggestions() {
      const query = this.searchQuery.trim().toLowerCase();
      this.standSuggestions = this.stands.filter(stand =>
          stand.libelle_stand.toLowerCase().includes(query)
      );
    },
    selectSuggestion(suggestion) {
      // Set the selected stand based on the suggestion
      // this.selectEmplacement(suggestion.id_emplacement);
      console.log(suggestion)
      this.searchQuery = suggestion.libelle_stand
      // Clear the suggestions
      this.standSuggestions = [];
    },
  },
  mounted() {
    this.fetchEmplacements();
    // Au chargement de la page, met à jour les marqueurs avec les coordonnées des emplacements
    this.markers = this.emplacements.map(emplacement => ({
      id: emplacement.id_emplacement,
      coordinates: [emplacement.coordonnee_x, emplacement.coordonnee_y],
    }));
    this.updateMarkers()
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolygon,
    LControl
  }
}
</script>

<style scoped>
.map {
  position: absolute;
  top: 100px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.leaflet-tile-pane {
  background-color: red;
}

div.panel {
  position: absolute;
  width: 500px;
  height: 600px;
  top: 150px;
  left: -470px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #E6E6E6;
  z-index: 999999;
  color: black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.30);
  transition: 500ms;
}

div.stands {
  margin-top: 1em;
  text-align: center;
}

div.panel hr {
  width: 80%;
  height: 1px;
  margin-bottom: 1em;
  margin-top: 1em;

}

div.panel img {
  width: 100%;
  border-radius: 10px;
}

span.libelle_stand {
  font-weight: bold;
}

p.description {
  font-style: italic;
}

p.emplacement_desc {
  font-size: 13px;
}

p > span {
  font-weight: bold;
}

p {
  font-size: 13px;
}

.utilisateur {
  text-align: center;
}


.leaflet-container .leaflet-marker-pane img.icon_map {
  width: 40px !important;
}

.leaflet-div-icon {
  border: 0 !important;
  background-color: transparent;
}

.addEmplacement {
  background-color: #fff;
  color: black;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  border-radius: 20px;
  width: 300px;
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;
}

.addEmplacement:hover {
  background-color: #e1e1e1;
  color: black;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  border-radius: 20px;
  width: 300px;
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;
}

/* Add to your style section */



.suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #E6E6E6;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid black;
  color: black;
}

.suggestions li:last-child {
  border-bottom: none;

}

div.zones_de_deplacement {
  display: flex;
  border-radius: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.30);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.30);
}

div.zones_de_deplacement > button {
  height: 100px;
  width: 100px;
  border: 0;
  cursor: pointer;
  transition: 100ms;
}

div.zones_de_deplacement > button:hover {
  background-color: #E6E6E6;
  transition: 100ms;
}

div.zones_de_deplacement > button:nth-child(1) {
  border-bottom: 5px solid #820e00;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

div.zones_de_deplacement > button:nth-child(2) {
  border-bottom: 5px solid darkblue;

}

div.zones_de_deplacement > button:nth-child(3) {
  border-bottom: 5px solid yellow;

}

div.zones_de_deplacement > button:nth-child(4) {
  border-bottom: 5px solid darkgreen;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

div.search-bar {
  position: absolute;
  top: 90px;
  /* a déplacer à left: -30px;*/
  left: -300px;
  z-index: 99999999999999999;
  justify-content: center;
  align-items: center;
  background-color: #E6E6E6;
  height: 100px;
  padding-top: 1.5em;
  padding-bottom: 1em;
  padding-right: 5em;
  padding-left: 1em;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.30);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.30);
  transition: 500ms ease;
}

div.search-bar > input {
  margin: 0;
}

.search-bar input {
  padding: 5px;
  height: 50px;
  border: 0;
  -moz-box-shadow:inset 0 0 10px rgba(0,0,0,0.30);
  box-shadow:inset 0 0 10px rgba(0,0,0,0.30);
  background: transparent;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.search-bar button {
  padding: 5px 10px;
  height: 50px;
  background-color: #E30A17;
  color: white;
  border: none;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.search-bar button:hover {
  background-color: darkred;
}

.search-bar img {
  width: 40px;
  position: absolute;
  top: 30%;
  right: 10px;
  cursor: pointer;
}

.search-bar.visible {
  left: 0px;
}

.panel.visible {
  left: 0px;
}



</style>
