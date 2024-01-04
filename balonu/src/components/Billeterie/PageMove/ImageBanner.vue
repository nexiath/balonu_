<template>
    <div class="all">
        <div class="img">
            <img :src="montgolfiere.photo_montgolfiere" alt="Photo de la montgolfière" class="centered-image">
        </div>
    </div>
</template>

<script>
import axiosMarche from '@/services/axios.service';

export default {
    data() {
        return {
            montgolfiere: null,
            vol: null,
        };
    },
    async mounted() {
        const montgolfiereId = this.$route.params.id;

        try {
            const responseMontgolfiere = await axiosMarche.get(`/montgolfieres/${montgolfiereId}`);
            this.montgolfiere = responseMontgolfiere.data;

            const responseVol = await axiosMarche.get(`/vols/${montgolfiereId}`);
            this.montgolfiere.volDetails = responseVol.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la montgolfière:', error);
        }
    },
};

</script>

<style scoped>
.all {
    padding-top: 10%;
    font-family: 'Poppins', 'Arial', serif;
}

.img {
    width: 100%;
    height: 350px; /* Ajustez la hauteur selon vos besoins */
    overflow: hidden; /* Assurez-vous que l'image ne dépasse pas la hauteur spécifiée */
}

.centered-image {
    display: flex;
    align-items: flex-end;
}

.boutique {
    padding-top: 4%;
    text-align: center;
    font-size: 30px;
    color: #ffffff;
}

.txtttt {
    font-size: 20px;
    margin-top: 1%;
    margin-left: 32%;
    display: flex;
    width: 700px;
    text-align: center;
    color: #ffffff;
}

hr {
    display: block;
    width: 20%;
    border-color: red;
    border-style: solid;
    border-width: 1px;
}
</style>
