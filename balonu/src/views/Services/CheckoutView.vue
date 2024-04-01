<template>
    <div class="checkout">
        <div class="order-summary">
            <h2>Récapitulatif de votre commande</h2>
            <ResumeCommande :items="items" />
        </div>
        <MethodePaiement v-model="selectedMethod" />
        <EmaiLing v-model="email" />
        <button @click="handleButtonClick">
            {{ buttonLabel }}
        </button>
        <img v-if="qrCodeSrc" :src="qrCodeSrc" alt="Votre QR Code">
    </div>
</template>

<script>
import QRCode from 'qrcode';
import ResumeCommande from '@/components/Services/Restauration/ResumeCommande.vue';
import MethodePaiement from '@/components/Services/Restauration/MethodePaiement.vue';
import EmaiLing from '@/components/Services/Restauration/EmaiLing.vue';

export default {
    components: {
        ResumeCommande,
        MethodePaiement,
        EmaiLing,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            qrCodeSrc: '',
            selectedMethod: '',
            email: '',
            buttonLabel: 'Valider la commande',
            buttonClicked: false,
        };
    },
    methods: {
        async confirmPurchase() {
            if (!this.email || !this.selectedMethod) {
                alert('Veuillez fournir une adresse e-mail et choisir une méthode de paiement.');
                return;
            }
            this.total = this.items.reduce((acc, item) => acc + (item.prix_produit * item.quantite_produit), 0);

            const formattedDetails = this.items.map(item => (
                `Nom du produit: ${item.libelle_produit}\n` +
                `Prix du produit: ${item.prix_produit}€\n` +
                `Quantité prise: ${item.quantite_produit}\n`
            )).join('\n');

            const orderDetails = `${formattedDetails}\nTotal: ${this.total.toFixed(2)}€\nLe moyen de paiement par : ${this.selectedMethod}\nEmail : ${this.email}`;

            this.qrCodeSrc = await QRCode.toDataURL(orderDetails);
            this.$root.$emit('clear-cart');

            this.buttonLabel = 'Retourner au menu';
            this.buttonClicked = true;
        },

        handleButtonClick() {
            if (this.buttonClicked) {
                this.$router.push('/');
            } else {
                this.confirmPurchase();
            }
        },
    },
    created() {
        console.log("votre commande :", this.items);
    },
};
</script>


<style>
.checkout{
  padding-top: 10%;
}
.order-summary {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}
</style>
