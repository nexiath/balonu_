<template>

    <div id="map" class="containerMap">
        <div class="panel-left" ref="panel-left">
            <div class="left">
                <div class="search-bar" ref="search-bar">

                    <input
                        v-model="searchQuery"
                        @input="updateStandSuggestions"
                        placeholder="Rechercher un stand" />

                    <button @click="searchStand">
                        Rechercher
                    </button>
                    <!-- Suggestions dropdown -->
                    <ul v-if="standSuggestions.length" class="suggestions">
                        <li v-for="suggestion in standSuggestions" :key="suggestion.id_stand" @click="selectSuggestion(suggestion)">
                            {{ suggestion.libelle_stand }}
                        </li>
                    </ul>
                </div>
                <div v-if="!selectedEmplacement" class="unselectedEmplacement">
                    <ul >
                        <li v-for="stand in standsSearch" :key="stand.id_stand">
                            {{ stand.libelle_stand }}
                            <router-link :to="`/modifier-stand/${stand.id_stand}`"><button class="buttonFonction">Modifier</button></router-link>
                            <button @click="supprimerStand(stand.id_stand)" class="buttonFonction">Supprimer</button>
                        </li>
                    </ul>
                </div>

                <router-link to="/addmap" class="ajoutEmplacement">Ajouter un emplacement</router-link>

                <div v-if="selectedEmplacement" class="selectedEmplacement">
                    <span @click="unselectEmplacement" class="retour">&lsaquo; Retour à la liste</span>
                    <div v-for="stand in stands" :key="stand.id_stand" class="stands">
                        <img :src="stand.image_stand" alt="">
                        <h2>{{ stand.libelle_stand }}</h2>
                        <p class="description">"{{ stand.description_stand }}"</p>
                        <!-- Ajoutez d'autres propriétés de stand selon vos besoins -->
                        <div v-if="utilisateurSelectionne" class="utilisateur">
                            <!--<p>Le stand a été réservé par : <span>{{ utilisateurSelectionne.nom_utilisateur }}</span></p>-->
                            <!-- Ajoutez d'autres champs utilisateur selon vos besoins -->
                        </div>
                    </div>
                    <div class="description">
                        <p class="emplacement_desc">Nom de l'emplacement : <span>{{ selectedEmplacement.libelle_emplacement }}</span></p>
                        <p class="emplacement_desc">Capacité d'accueil : <span>{{ selectedEmplacement.capacite_emplacement }}</span></p>
                        <p class="emplacement_desc">Caractéristique de l'emplacement : <span>{{ selectedEmplacement.caracteristique_emplacement }}</span></p>
                        <p class="emplacement_desc">Nombre de point d'eau : <span>{{ selectedEmplacement.point_eau_nombre }}</span></p>
                        <p class="emplacement_desc">Nombre de prise : <span>{{ selectedEmplacement.prise_nombre }}</span></p>
                        <!-- Ajoutez d'autres champs ici selon vos besoins -->
                        <!-- Afficher les stands liés à cet emplacement -->
                    </div>
                </div>
            </div>
            <div class="arrow" @click="showPanel">
                <img src="https://icones.pro/wp-content/uploads/2021/06/symbole-fleche-droite-noir.png" alt="Flèche de recherche">
            </div>
        </div>
        <div class="map-container">
            <div class="map-wrapper">
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
                <div class="zones">
                    <button @click="goToZoneDepart">Zone de départ</button>
                    <button @click="goToZoneA">Zone A</button>
                    <button @click="goToZoneB">Zone B</button>
                    <button @click="goToZoneC">Zone C</button>
                </div>

                <div>
                    <button class="zone_ensemble" @click="goToZoneEnsemble">Vue d'ensemble</button>
                </div>
            </LControl>

            <LControl class="zone_ensemble_control">
            </LControl>

            <LControl :options="{ position: 'bottomright' }" class="bottom_right_legend">
                <div class="legend">
                    <div class="line">
                        <img src="marker_active_shop.svg" alt=""><p>Emplacement réservé</p>
                    </div>
                    <div class="line">
                        <img src="marker_inactive_shop.svg" alt=""><p>Emplacement non réservé</p>
                    </div>
                    <div class="line">
                        <div class="zone_start"></div><p>Zone de départ</p>
                    </div>
                    <div class="line">
                        <div class="zone_end"></div><p>Zone d'arrivée</p>
                    </div>
                </div>
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
                :lat-lngs="zoneDelimitee1"
                :options="{ color: 'red', fillColor: 'blue', fillOpacity: 0.5 }"
                @click="showPopupDepart">
                <div>
                    <h3>Informations sur la zone</h3>
                    <p>Ceci est un pop-up pour la zone délimitée.</p>
                </div>
            </l-polygon>

            <l-polygon
                :lat-lngs="zoneDelimitee2"
                :options="{ color: 'black', fillColor: 'green', fillOpacity: 0.5 }"
                @click="showPopupParcoursA">
                <div>
                    <h3>Informations sur la zone</h3>
                    <p>Ceci est un pop-up pour la zone délimitée.</p>
                </div>
            </l-polygon>

            <l-polygon
                :lat-lngs="zoneDelimitee3"
                :options="{ color: 'black', fillColor: 'green', fillOpacity: 0.5 }"
                @click="showPopupParcoursB">
                <div>
                    <h3>Informations sur la zone</h3>
                    <p>Ceci est un pop-up pour la zone délimitée.</p>
                </div>
            </l-polygon>

            <l-polygon
                :lat-lngs="zoneDelimitee4"
                :options="{ color: 'black', fillColor: 'green', fillOpacity: 0.5 }"
                @click="showPopupParcoursC">
                <div>
                    <h3>Informations sur la zone</h3>
                    <p>Ceci est un pop-up pour la zone délimitée.</p>
                </div>
            </l-polygon>
        </l-map>
            </div>
        </div>
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
            center: [ 38.61391964574221, 34.805048628944476 ],
            zoom: 12,
            minZoom: 12,
            maxBounds: [
                [40.67, 30.84],
                [35.65, 35.82]
            ],
            maxBoundsViscosity: 1.0,
            markers: [],
            selectedEmplacement: null,
            utilisateurSelectionne: null,
            zoneDelimitee1: [
                [38.665335795883315, 34.837943515394066],
                [38.66463180248642, 34.845152759107826],
                [38.659267816019764, 34.8467834213764],
                [38.65772559555288, 34.8430929751896],
                [38.66205043414981, 34.83622702879557],
            ],
            zoneDelimitee2: [
                [38.67096261147489, 34.76151140493887],
                [38.67119725596131, 34.76837735133294],
                [38.66848203700892, 34.77202488535476],
                [38.665733191945975, 34.772196534014604],
                [38.661140373900096, 34.76245547256806],
            ],
            zoneDelimitee3: [
                [38.616633933386346, 34.737622397200894],
                [38.616466239001035, 34.7517045098641],
                [38.606672206927406, 34.75415170627201],
                [38.60418994535468, 34.74599438491222],
                [38.609389178593254, 34.73650613217272],
            ],zoneDelimitee4: [
                [38.59946343122414, 34.88284512563534],
                [38.598289281355065, 34.89194697894203],
                [38.59164658613874, 34.89130297988731],
                [38.59067361452551, 34.88421899028538],
                [38.59526995063847, 34.87941046401015],
            ],
            searchQuery: '',
            standSuggestions: [],
            volsAuDepart: [],
            volsParcoursA: [],
            volsParcoursB: [],
        };
    },
    computed: {
        ...mapGetters('emplacements', ['getEmplacements']),
        ...mapGetters('standsEmplacements', ['getStands']),
        ...mapGetters('stands', ['getAllStandsSearch']),
        ...mapState('emplacements', ['emplacements']),
        ...mapState('standsEmplacements', ['stands']),
        ...mapState('stands', ['standsSearch']),
        // il faut récupérer tous les utilisateurs et les affectations de stands aux utilisateurs
        ...mapGetters('utilisateurs' ['getUtilisateurs', 'getUtilisateurById']),
        ...mapState('utilisateurs', ['utilisateurs']),
        // Pareil pour les vols
        ...mapGetters('affectationsStand' ['getAffectationsStand']),
        ...mapState('affectationsStand', ['affectationsStand']),
        // Récupération des vols
        ...mapGetters('vols' ['getVols', 'getVolsParcoursA']),
        ...mapState('vols' ['vols']),
    },
    methods: {
        ...mapActions('emplacements', ['fetchEmplacements']),
        ...mapActions('standsEmplacements', ['fetchStandsByEmplacement', 'fetchStands', 'deleteStand']),
        // Récupérer les fetchs
        ...mapActions('utilisateurs', ['fetchUtilisateurs', 'fetchUtilisateurByIdUtilisateur']),
        ...mapActions('affectationsStand', ['fetchAffectationsStand', "fetchAffectationsStandByIdStand", 'deleteAffectationsStandByIdStand']),
        // Vols
        ...mapActions('vols', ['fetchVols', "fetchVolsByParcours"]),
        ...mapActions('stands', ['fetchAllStandsSearch']),

        async fetchVolsAuDepart() {
            try {
                await this.$store.dispatch('vols/fetchVols');
                this.volsAuDepart = this.$store.getters['vols/getVols'];
                console.log("Apagnan : ", this.volsAuDepart);
            } catch (error) {
                console.error('Erreur lors de la récupération des vols au départ:', error);
            }
        },

        async fetchVolsParcoursA() {
            try {
                const id_parcours_A = 1; // Remplacez 1 par l'id du parcours A
                await this.$store.dispatch('vols/fetchVolsByParcoursA', id_parcours_A);
                this.volsParcoursA = this.$store.getters['vols/getVolsParcoursA'];
                console.log("Parcours A : ", this.volsParcoursA);
            } catch (error) {
                console.error('Erreur lors de la récupération des vols du parcours A:', error);
            }
        },

        async fetchVolsParcoursB() {
            try {
                const id_parcours_B = 2; // Remplacez 1 par l'id du parcours B
                await this.$store.dispatch('vols/fetchVolsByParcoursB', id_parcours_B);
                this.volsParcoursB = this.$store.getters['vols/getVolsParcoursB'];
                console.log("Parcours B : ", this.volsParcoursB);
            } catch (error) {
                console.error('Erreur lors de la récupération des vols du parcours B:', error);
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
        unselectEmplacement() {
            // Clear the selectedEmplacement when the search bar is clicked
            this.selectedEmplacement = null;
            this.utilisateurSelectionne = null; // Also clear the selected user
            //const panel = this.$refs.panel;
            //panel.classList.remove('visible')
        },
        showPanel() {
            const panel = this.$refs["panel-left"];
            panel.classList.toggle('visible')
        },
        zoomUpdated (zoom) {
            this.zoom = zoom;
        },
        centerUpdated (center) {
            this.center = center;
        },
        afficherSearch() {
            //const searchBox = this.$refs["search-bar"];
            //searchBox.classList.toggle('visible')
        },
        goToZoneA() {
            const newPosition = [38.669964431633, 34.74972025206886];

            this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins
        },
        goToZoneB() {
            const newPosition = [38.60793625163658, 34.733616450026794];

            this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins
        },
        goToZoneC() {
            const newPosition = [38.59234158660849, 34.88552641798665];

            this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins

        },
        goToZoneDepart() {
            const newPosition = [38.658805897345785, 34.82456992881735];

            this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins
        },

        goToZoneEnsemble() {
            const newPosition = [38.61391964574221, 34.805048628944476];
            const newZoom = 12;

            this.$refs.map.mapObject.flyTo(newPosition, newZoom); // 15 est le niveau de zoom, ajustez selon vos besoins

            this.center = newPosition;
            this.zoom = newZoom;
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

                    const standId = await this.$store.dispatch('standsEmplacements/fetchStandsByEmplacement', emplacementId);
                    console.log("L'id du stand sélectionné est : " + standId);
                    await this.fetchAffectationsStandByIdStand(standId);
                    const utilisateurId = await this.$store.dispatch('affectationsStand/fetchAffectationsStandByIdStand', standId);
                    console.log("L'id du utilisateur sélectionné est : " + utilisateurId);

                    // Mise à jour de la propriété utilisateurSelectionne
                    await this.$store.dispatch('utilisateurs/fetchUtilisateurByIdUtilisateur', utilisateurId, { root: true });
                    this.utilisateurSelectionne = this.$store.getters['utilisateurs/getUtilisateurById'](utilisateurId);

                    const panel = this.$refs["panel-left"];
                    panel.classList.add('visible');

                    this.centerOnStand(selectedEmplacement)

                } catch (error) {
                    // Gérer les erreurs si nécessaire
                    console.error('Une erreur s\'est produite lors de la récupération de l\'ID du stand :', error);
                }
            }
        },
        showPopupDepart(event) {
            // Les coordonnées du clic
            const latlng = event.latlng;

            // Contenu du pop-up
            const popupContent = `
<h3>Liste des vols sur la zone de départ</h3>
      ${this.volsAuDepart.map(data => `
      <ul>
        <li>${data.libelle_vol}</li>
        <!-- Ajoutez plus de cellules de données si nécessaire -->
      </ul>
    `).join('')}

    `;

            // Options du pop-up
            const popupOptions = {
                autoClose: false, // Pour garder le pop-up ouvert jusqu'à ce qu'il soit fermé manuellement
            };

            // Créer et afficher le pop-up
            L.popup(popupOptions)
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(this.$refs.map.mapObject);
        },
        showPopupParcoursA(event) {
            // Les coordonnées du clic
            const latlng = event.latlng;

            // Contenu du pop-up
            const popupContent = `
      <h3>Liste des vols qui atterissent dans la zone A</h3>
      ${this.volsParcoursA.map(data => `
      <ul>
        <li>${data.libelle_vol}</li>
        <!-- Ajoutez plus de cellules de données si nécessaire -->
      </ul>
    `).join('')}

    `;

            // Options du pop-up
            const popupOptions = {
                autoClose: false, // Pour garder le pop-up ouvert jusqu'à ce qu'il soit fermé manuellement
            };

            // Créer et afficher le pop-up
            L.popup(popupOptions)
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(this.$refs.map.mapObject);
        },
        showPopupParcoursB(event) {
            // Les coordonnées du clic
            const latlng = event.latlng;

            // Contenu du pop-up
            const popupContent = `
     <h3>Liste des vols qui atterissent dans la zone B</h3>
      ${this.volsParcoursB.map(data => `
      <ul>
        <li>${data.libelle_vol}</li>
        <!-- Ajoutez plus de cellules de données si nécessaire -->
      </ul>
    `).join('')}

    `;

            // Options du pop-up
            const popupOptions = {
                autoClose: false, // Pour garder le pop-up ouvert jusqu'à ce qu'il soit fermé manuellement
            };

            // Créer et afficher le pop-up
            L.popup(popupOptions)
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(this.$refs.map.mapObject);
        },
        showPopupParcoursC(event) {
            // Les coordonnées du clic
            const latlng = event.latlng;

            // Contenu du pop-up
            const popupContent = `
     <h3>Liste des vols qui atterissent dans la zone B</h3>
      ${this.volsParcoursB.map(data => `
      <ul>
        <li>${data.libelle_vol}</li>
        <!-- Ajoutez plus de cellules de données si nécessaire -->
      </ul>
    `).join('')}

    `;

            // Options du pop-up
            const popupOptions = {
                autoClose: false, // Pour garder le pop-up ouvert jusqu'à ce qu'il soit fermé manuellement
            };

            // Créer et afficher le pop-up
            L.popup(popupOptions)
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(this.$refs.map.mapObject);
        },
        // ...
        async updateMarkers() {
            await this.fetchEmplacements();
            await this.fetchStands();
            await this.fetchAllStandsSearch();
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
        centerOnStand(stand) {
            const newPosition = [stand.coordonnee_x, stand.coordonnee_y];
            this.$refs.map.mapObject.flyTo(newPosition, 15); // 15 est le niveau de zoom, ajustez selon vos besoins
        },
        async searchStand() {
            const query = this.searchQuery.trim().toLowerCase();
            console.log("La recherche est : " + query)

            // Find the stand based on the search query
            const foundStand = this.standsSearch.find(stand =>
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
                        console.log('Emplacement trouvé');

                        //this.searchQuery = null;
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
            this.standSuggestions = this.standsSearch.filter(stand =>
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
        async supprimerStand(idStand) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce stand ?")) {
                try {
                    // Récupérez l'ID de l'utilisateur à partir de votre état Vuex ou d'où vous l'avez

                    // Appel à la fonction deleteStand avec les deux paramètres
                    await this.$store.dispatch('standsEmplacements/deleteStand', idStand);

                    // Supprimez également l'affectation du stand

                    // ettez à jour la liste des stands après la suppression
                    await this.$store.dispatch('standsEmplacements/fetchStands');
                    await this.$store.dispatch('stands/fetchAllStandsSearch');
                    this.updateMarkers()
                } catch (error) {
                    console.error('Erreur lors de la suppression du stand :', error);
                }
            }
        },
    },
    mounted() {
        this.fetchVolsAuDepart();
        this.fetchVolsParcoursA();
        this.fetchVolsParcoursB();
        this.fetchAllStandsSearch();
        this.fetchEmplacements();
        // Au chargement de la page, met à jour les marqueurs avec les coordonnées des emplacements
        this.markers = this.emplacements.map(emplacement => ({
            id: emplacement.id_emplacement,
            coordinates: [emplacement.coordonnee_x, emplacement.coordonnee_y],
        }));
        this.updateMarkers();

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
.containerMap  {
    margin: 5%;
}
html, body{
    overflow-y: hidden !important;
}


.map {
    position: relative;
    width: 100%; /* Prendre toute la largeur disponible */
    height: 700px; /* Taille de la carte (à ajuster selon vos besoins) */
    overflow: hidden;
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


.leaflet-tile-pane {
}


div.stands {
    margin-top: 1em;
    text-align: center;
}


span.libelle_stand {
    font-weight: bold;
}

p.description {
    font-style: italic;
    font-size: 20px;
}

p.emplacement_desc {
    font-size: 12px;
    margin: 0 !important;
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

.suggestions {
    list-style: none;
    padding: 0;
    margin: 0;
    top: 80px;
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

div.zones_de_deplacement > div.zones > button {
    height: 100px;
    width: 100px;
    border: 0;
    cursor: pointer;
    transition: 100ms;
}

div.zones_de_deplacement > div.zones > button:hover {
    background-color: #E6E6E6;
    transition: 100ms;
}

div.zones_de_deplacement > div.zones > button:nth-child(1) {
    border-bottom: 5px solid #820e00;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

div.zones_de_deplacement > div.zones > button:nth-child(2) {
    border-bottom: 5px solid darkblue;

}

div.zones_de_deplacement > div.zones > button:nth-child(3) {
    border-bottom: 5px solid yellow;

}

div.zones_de_deplacement > div > button:nth-child(4) {
    border-bottom: 5px solid darkgreen;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

div.panel-left {
    position: fixed;
    top: 110px;
    z-index: 99999999999999999;
    background-color: #E6E6E6;
    left: -515px;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 2em;
    height: 85vh;
    max-width: 550px;
    width: 550px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    -webkit-box-shadow: 0px 5px 15px 5px rgba(0,0,0,0.30);
    box-shadow: 0px 5px 15px 5px rgba(0,0,0,0.30);
    transition: 500ms ease;
    display: flex;
    justify-content: center;
}

div.panel-left.visible {
    left: 0;
}
div.left {
    width: 99%;
}
.panel-left {
    overflow-y: auto; /* Permet le défilement vertical si le contenu dépasse */
    max-height: 100vh; /* Limite la hauteur du panneau à la hauteur de la fenêtre */
}
div.arrow {
    width: 1%;
    margin-top: 50%;
    cursor: pointer;
}

div.arrow img {
    width: 30px;
    margin-left: 3px;
}

div.panel-left > .selectedEmplacement {
    max-width: 100%;
    transition: 500ms;
}

.selectedEmplacement img {
    width: 60%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
}

.selectedEmplacement h2,p {
    text-align: left;
}

.selectedEmplacement h2 {
    font-size: 30px;
    margin-bottom: 15px;
}

.selectedEmplacement p {
    margin-bottom: 15px;
}

div.search-bar {

    min-width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    margin-bottom: 3em;
}


div.search-bar > input {
    margin: 0;
    width: 70%;
}

.search-bar input {
    padding: 5px;
    padding-left: 15px;
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
    width: 30%;
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

button.zone_ensemble {
    height: 50px;
    width: 400px;
    border: 0;
    cursor: pointer;
    transition: 100ms;
    background: #fff;
    border-bottom: 5px solid mediumpurple;
    border-radius: 20px;
}

button.zone_ensemble:hover {
    background-color: #E6E6E6;
    transition: 100ms;
}

div.description {
    margin-top: 1em;
    background-color: rgba(159, 159, 159, 0.56);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    height: 150px;
    padding: 1em;
}

.unselectedEmplacement {
    transition: 500ms;
}

.unselectedEmplacement > ul {
    overflow-y: auto;  /* Ajoutez cette ligne pour activer le défilement vertical */
    max-height: 700px; /* Ajoutez une hauteur maximale à votre choix */
}

.unselectedEmplacement > ul > li {
    background-color: #E6E6E6;
    cursor: pointer;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.unselectedEmplacement > ul > li:nth-child(odd) {
    height: 50px;
    background-color: #9B9B9B;
}

span.retour {
    font-size: 13px;
    cursor: pointer;
}

span.retour:hover {
    color: #1E1E1E;
}

.zones_de_deplacement{
    display: flex;
    flex-direction: column;
    background: none;
    position: fixed;
    top: 110px;
    right: 10px;
}

div.zones {
    display: flex;
    margin-bottom: 1em;
}

div.legend {
    background-color: #E6E6E6;
    display: flex;
    flex-direction: column;
    width: 300px;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    border-radius: 20px;
    -moz-box-shadow: 0 0 10px rgba(0,0,0,0.30);
    box-shadow: 0 0 10px rgba(0,0,0,0.30);
}

div.legend div.line {
    display: flex;
    justify-content: stretch;
    align-items: center;
    margin-bottom: 1em;
    height: 50px;
}

div.legend div.zone_start{
    background-color: rgba(0, 0, 255, 0.50);
    width: 50px;
    height: 30px;
    border: 3px red solid;
    margin-right: auto;
}

div.legend div.zone_end {
    background-color: rgba(66, 159, 66, 0.7);
    width: 50px;
    height: 30px;
    border: 3px black solid;
    margin-right: auto;
}

div.legend div.line img {
    width: 30px;
    margin-right: auto;
}

.bottom_right_legend {
    position: fixed;
    right: 10px;
    bottom: 60px;
}


div.leaflet-control-zoom.leaflet-bar.leaflet-control
{
    position: fixed !important;
    right: 0 !important;
    bottom: 0 !important;
}
.voirStand{
    background-color: #E30A17;
    color: #ffffff;

    border: 1px solid #d3d3d3;
    padding: 4px 28px;
    font-family: 'Poppins', serif;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 280px;
    /* Légèrement plus étroit */
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.buttonFonction {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #E30A17;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.buttonFonction:hover {
    background-color: #bf0a0d;
}

.ajoutEmplacement{
    color: red; /* Change la couleur du texte en rouge */

}
</style>
