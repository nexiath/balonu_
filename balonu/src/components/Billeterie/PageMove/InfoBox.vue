<template>
  <div class="info-box">
    <div>{{ prix }}</div>
    <div>{{ duration }}</div>
    <div>{{ maxPeople }}</div>
    <div>{{ age }}</div>
    <div>{{ reviews }}</div>
  </div>
</template>


<script>
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {
            montgolfiere: null,
            vol: null, // Ajoutez une propriété pour stocker les informations du vol
        };
    },
    async mounted() {
        // Récupérez l'ID de la montgolfière à partir des paramètres de l'URL
        const montgolfiereId = this.$route.params.id;

        try {
            // Utilisez l'ID pour récupérer les détails de la montgolfière depuis l'API
            const responseMontgolfiere = await axiosMarche.get(`/montgolfieres/${montgolfiereId}`);
            this.montgolfiere = responseMontgolfiere.data;

            // Utilisez l'ID de la montgolfière pour récupérer les informations du vol depuis l'API
            const responseVol = await axiosMarche.get(`/vols/${montgolfiereId}`);
            this.montgolfiere.volDetails = responseVol.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la montgolfière:', error);
        }
    },
};
</script>