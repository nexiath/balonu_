<template>
  <div>
    <div id="map" style="height: 600px;"></div>
    <div :class="['side-panel', { active: showSidePanel }]">
      <span class="close-icon" @click="closeSidePanel">&times;</span>
      <h2>{{ selectedPlace }}</h2>
      <button>Réserver</button>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      map: null,
      showSidePanel: false,
      selectedPlace: null,
      emptyPlaces: [
        { id: 1, coords: [38.657497324, 34.836729986] },
        { id: 2, coords: [38.658697324, 34.835629986] },
        { id: 3, coords: [38.659997324, 34.837529986] },
        { id: 4, coords: [38.660897324, 34.838429986] },
      ],
    };
  },
  methods: {
    openSidePanel(place) {
      this.selectedPlace = place;
      this.showSidePanel = true;
    },
    closeSidePanel() {
      this.showSidePanel = false;
      this.selectedPlace = null;
    },
    addEmptyPlaces() {
      this.emptyPlaces.forEach(place => {
        L.marker(place.coords, { icon: this.emptyPlaceIcon })
            .addTo(this.map)
            .on('click', () => this.openReservationPanel(place.id));
      });
    },
    openReservationPanel(placeId) {
      this.selectedPlace = `Emplacement ${placeId}`;
      this.showSidePanel = true;
    },
  },
  mounted() {
    this.map = L.map('map', {
      minZoom: 15,
      maxBounds: [
        [38.67, 34.84],
        [38.65, 34.82]
      ],
      maxBoundsViscosity: 1.0
    }).setView([38.668997324, 34.836829986], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    const restaurantIcon = L.icon({
      iconUrl: 'https://cdn.discordapp.com/attachments/1174355753654550568/1174355804581793937/quoicou_1.png?ex=65674b12&is=6554d612&hm=80720edf3a949d33d3b05eb66ef95ee966b82d47fbcde1cb0cee868922b5f266&',
      iconSize: [30, 30]
    });

    const barbecueIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/14/14480.png',
      iconSize: [30, 30]
    });

    const boutiqueIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/256/290/290957.png',
      iconSize: [30, 30]
    });

    this.emptyPlaceIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/0/619.png',
      iconSize: [30, 30]
    });

    L.marker([38.655497324, 34.831729986], { icon: restaurantIcon }).addTo(this.map)
        .on('click', () => this.openSidePanel("Jojo's Burger"));

    L.marker([38.657997324, 34.831729986], { icon: barbecueIcon }).addTo(this.map)
        .on('click', () => this.openSidePanel('Barbecues'));

    L.marker([38.660497324, 34.833729986], { icon: boutiqueIcon }).addTo(this.map)
        .on('click', () => this.openSidePanel('Boutique'));


    this.addEmptyPlaces();


    const zoneDeDecollage = [
      [38.665, 34.835],
      [38.666, 34.837],
      [38.664, 34.839],
      [38.662, 34.837],
      [38.663, 34.835]
    ];



    L.polygon(zoneDeDecollage, {
      color: 'purple',
      fillColor: '#f03',
      fillOpacity: 0.5,
      dashArray: '5, 5'
    }).addTo(this.map)
        .bindPopup('Zone de décollage de montgolfières');
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}

.side-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 30%;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Poppins', 'Arial', serif;
  color: #1E1E1E;
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}


@media (max-width: 768px) {
  .side-panel {
    width: 50%;
  }
}


@media (max-width: 480px) {
  .side-panel {
    width: 100%;
  }
}

.side-panel.active {
  transform: translateX(0);
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
}

.side-panel h2 {
  text-align: center;
  margin-bottom: 15px;
}

.side-panel button {
  background-color: #E30A17;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  width: 100%;
}

.side-panel button:hover {
  background-color: #820e00;
}
</style>

