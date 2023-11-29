<template>
  <div id="map">
    <div class="panel">
      <h2>Description de l'emplacement</h2>

      <div v-if="selectedEmplacement">
        <p>{{ selectedEmplacement.libelle_emplacement }}</p>
        <p>{{ selectedEmplacement.capacite_emplacement }}</p>
        <p>{{ selectedEmplacement.caracteristique_emplacement }}</p>
        <p>{{ selectedEmplacement.point_eau_nombre }}</p>
        <p>{{ selectedEmplacement.prise_nombre }}</p>
        <!-- Ajoutez d'autres champs ici selon vos besoins -->
        <!-- Afficher les stands liés à cet emplacement -->
        <div v-for="stand in stands" :key="stand.id_stand">
          {{ stand.id_stand }} | {{ stand.libelle_stand }} | {{ stand.description_stand }}
          <!-- Ajoutez d'autres propriétés de stand selon vos besoins -->
        </div>
        <div v-if="utilisateurSelectionne">
          <h3>Détails de l'utilisateur</h3>
          <p>Nom de l'utilisateur : {{ utilisateurSelectionne.nom_utilisateur }}</p>
          <p>Login de l'utilisateur : {{ utilisateurSelectionne.login_utilisateur }}</p>
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
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapState, mapGetters, mapActions } from 'vuex';
import * as L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
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
      selectedEmplacement: null,
      utilisateurSelectionne: null,
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
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
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
          const standId = await this.$store.dispatch('standsEmplacements/fetchStandsByEmplacement', emplacementId);
          console.log("L'id du stand sélectionné est : " + standId);
          await this.fetchAffectationsStandByIdStand(standId);
          const utilisateurId = await this.$store.dispatch('affectationsStand/fetchAffectationsStandByIdStand', standId);
          console.log("L'id du utilisateur sélectionné est : " + utilisateurId);

          // Mise à jour de la propriété utilisateurSelectionne
          await this.$store.dispatch('utilisateurs/fetchUtilisateurByIdUtilisateur', utilisateurId, { root: true });
          this.utilisateurSelectionne = this.$store.getters['utilisateurs/getUtilisateurById'](utilisateurId);
          console.log("Bon les gars : " + this.utilisateurSelectionne)

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
    }
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
  }
}
</script>

<style>
.map {
  position: absolute;
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
  height: 800px;
  top: 30px;
  left: 30px;
  background-color: red;
  z-index: 999999;
  color: white;
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
</style>
