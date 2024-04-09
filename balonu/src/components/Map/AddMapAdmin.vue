<template>
    <div class="containerMap">
        <h1>Emplacement sur la map</h1>

        <button @click="retourPagePrecedente" class="btn-retour">Retour</button>
        <h2>{{ msg }}</h2>

        <div class="emplacement-cards">
        <div class="emplacement-card" v-for="emplacement in emplacements" :key="emplacement.id_emplacement">
            <div class="card-header">
                <span class="emplacement-id">{{ emplacement.id_emplacement }}</span>
                <span v-if="!emplacement.isEditing" class="emplacement-label">{{ emplacement.libelle_emplacement }}</span>
                <input v-else v-model="emplacement.libelle_emplacement" />

            </div>
            <div class="card-details">
                <div class="detail">
                    <span class="detail-label">Capacité: </span>
                    <span v-if="!emplacement.isEditing" class="detail-value">{{ emplacement.capacite_emplacement }}</span>
                    <input v-else v-model.number="emplacement.capacite_emplacement" />
                </div>
                <div class="detail">
                    <span class="detail-label">Caractéristique: </span>
                    <span v-if="!emplacement.isEditing" class="detail-value">{{ emplacement.caracteristique_emplacement }}</span>
                    <input v-else v-model="emplacement.caracteristique_emplacement" />
                </div>
                <div class="detail">
                    <span class="detail-label">Point d'eau: </span>
                    <span v-if="!emplacement.isEditing" class="detail-value">{{ emplacement.point_eau_nombre }}</span>
                    <input v-else v-model.number="emplacement.point_eau_nombre" />
                </div>
                <div class="detail">
                    <span class="detail-label">Prise: </span>
                    <span v-if="!emplacement.isEditing" class="detail-value">{{ emplacement.prise_nombre }}</span>
                    <input v-else v-model.number="emplacement.prise_nombre" />
                </div>
                <div class="detail">
                    <span class="detail-label">Coordonnées: </span>
                    <span class="detail-value">{{ emplacement.coordonnee_x }}, {{ emplacement.coordonnee_y }}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="modify-btn" @click="modifierEmplacement(emplacement)">
                    {{ emplacement.isEditing ? 'Enregistrer' : 'Modifier' }}
                </button>
                <button class="delete-btn" @click="supprimerEmplacement(emplacement.id_emplacement)">Supprimer</button>
            </div>
        </div>
        </div>

        <!-- Formulaire pour ajouter un nouvel emplacement -->
        <div class="form-container">
            <h2>Ajouter un nouvel emplacement</h2>
            <form @submit.prevent="ajouterEmplacement" class="add-emplacement-form">
                <div class="form-group">
                    <label for="libelle">Libellé:</label>
                    <input id="libelle" v-model="nouvelEmplacement.libelle_emplacement" type="text" required>
                </div>
                <div class="form-group inline-group">
                    <label for="capacite">Capacité:</label>
                    <input id="capacite" v-model.number="nouvelEmplacement.capacite_emplacement" type="number" required>
                </div>
                <div class="form-group inline-group">
                    <label for="caracteristique">Caractéristique:</label>
                    <input id="caracteristique" v-model="nouvelEmplacement.caracteristique_emplacement" type="text" required>
                </div>
                <div class="form-group inline-group">
                    <label for="pointEau">Point d'eau:</label>
                    <input id="pointEau" v-model.number="nouvelEmplacement.point_eau_nombre" type="number" required>
                </div>
                <div class="form-group inline-group">
                    <label for="prise">Prise:</label>
                    <input id="prise" v-model.number="nouvelEmplacement.prise_nombre" type="number" required>
                </div>
                <div class="form-group inline-group">
                    <label for="coordonneeX">Coordonnée X:</label>
                    <input id="coordonneeX" v-model="nouvelEmplacement.coordonnee_x" type="text" required>
                </div>
                <div class="form-group inline-group">
                    <label for="coordonneeY">Coordonnée Y:</label>
                    <input id="coordonneeY" v-model="nouvelEmplacement.coordonnee_y" type="text" required>
                </div>
                <div v-if="clickedCoordinates.lat !== null && clickedCoordinates.lng !== null" class="inline-group">
                    <p>Coordonnées cliquées : {{ clickedCoordinates.lat.toFixed(6) }}, {{ clickedCoordinates.lng.toFixed(6) }}</p>
                </div>
                <div class="card-actions">

                <button type="submit" class="card-actions">Ajouter</button>
                </div>

            </form>
        </div>

        <div class="map-container">
            <div class="map-wrapper">
                <l-map :center="center"
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
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker v-if="clickedCoordinates.lat !== null && clickedCoordinates.lng !== null"
                              :lat-lng="[clickedCoordinates.lat, clickedCoordinates.lng]">
                    </l-marker>
                    <l-marker
                        v-for="marker in markers"
                        :key="marker.id"
                        :lat-lng="marker.coordinates"
                        :icon="createCustomIcon(marker.hasStand ? 'marker_active_shop.svg' : 'marker_inactive_shop.svg')"
                        @click="selectEmplacement(marker.id)"
                    ></l-marker>
                </l-map>
            </div>
        </div>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { mapState, mapGetters, mapActions } from 'vuex';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import axiosMarche from "@/services/axios.service";

export default {
    data() {
        return {
            msg: 'Gestion des emplacement',
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
            center: [38.61391964574221, 34.805048628944476],
            zoom: 12,
            minZoom: 12,
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
            if (!emplacement.isEditing) {
                this.$set(emplacement, 'isEditing', true);
            } else {
                axiosMarche.put(`http://localhost:3030/emplacements/${emplacement.id_emplacement}`, emplacement);
                this.$store.commit('UPDATE_EMPLACEMENT', emplacement);
                emplacement.isEditing = false;
            }
        },
        validerModification() {
            this.updateEmplacement(this.emplacementEnEdition);
            this.emplacementEnEdition = null; // réinitialiser après la modification effectuée
        },
        annulerModification() {
            this.emplacementEnEdition = null; // Annuler la modification
        },
        retourPagePrecedente() {
            this.$router.go(-1); // Retourne à la page précédente
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

<style scoped>
/* Style général */
.containerMap  {
    font-family: 'Arial', sans-serif;
    margin: 10%;
}
.map-container {
    border: 2px solid #ccc; /* Ajouter des bordures à la carte */
    border-radius: 8px;
    margin-top: 20px; /* Espacement par rapport aux autres éléments */
    overflow: hidden; /* Assurer que les bordures ne débordent pas */
}

.map-wrapper {

    width: 100%; /* Prendre toute la largeur disponible */
}

.map {
    position: relative;

    width: 100%; /* Prendre toute la largeur disponible */
    height: 700px; /* Taille de la carte (à ajuster selon vos besoins) */
}
.emplacement-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.emplacement-card {
    flex: 1 1 300px; /* Carte flexible avec une largeur de base de 300px */
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.emplacement-id {
    font-weight: bold;
    color: #333;
}

.emplacement-label {
    font-size: 1.2em;
    color: #333;
}
.btn-retour {
    margin-bottom: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: #dc3131;
    color: white;
    border-radius: 3px;
}
.card-details {
    margin-bottom: 10px;
}

.detail {
    margin-bottom: 5px;
}

.detail-label {
    font-weight: bold;
}

.card-actions button {
    margin-right: 10px;
    background-color: #e74c3c;
    color: #fff;
    padding: 8px 15px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}
.inline-group {
    display: inline-block;
    margin-right: 10px;
}
.card-actions button:hover {
    background-color: #c0392b;
}

.form-container {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 15px;
}



</style>
