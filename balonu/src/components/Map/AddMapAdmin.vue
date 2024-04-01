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
/* Style général */
.hello {
    font-family: 'Arial', sans-serif;
    margin: 20px;
}

/* Liens de navigation */
router-link {
    text-decoration: none;
    color: #3498db;
}

/* Titre principal */
h1 {
    color: #2c3e50;
}

/* Emplacements */
.emplacement {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ecf0f1;
    background-color: #ecf0f1;
}

.modif, .suppr {
    background-color: #e74c3c;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
}

.modif:hover, .suppr:hover {
    background-color: #c0392b;
}

/* Formulaire d'ajout et de modification d'emplacement */
form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

label {
    margin-bottom: 5px;
}

input {
    padding: 5px;
    margin-bottom: 10px;
}

button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 15px;
    cursor: pointer;
}

button:hover {
    background-color: #2980b9;
}

/* Carte */
.map {
    margin-top: 20px;
}

/* Carte Leaflet */
.l-map {
    height: 400px;
}

/* Marqueurs */
.l-marker {
    width: 30px;
    height: 30px;
}

/* Tooltip pour les coordonnées cliquées */
.tooltip {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    z-index: 1000;
}

</style>
