<template>
  <div class="checkout">
    <div class="order-summary">
      <h2>Récapitulatif de votre commande</h2>
      <ResumeCommande :items="items"  />
    </div>
    <MethodePaiement />
    <EmaiLing />
    <button @click="processPurchase">Procéder à l'achat</button>
    <img v-if="qrCodeSrc" :src="qrCodeSrc" alt="Votre QR Code">
  </div>
</template>

<script>
import QRCode from 'qrcode';
import axios from 'axios';
import ResumeCommande from '@/components/Services/Restauration/ResumeCommande.vue';
import MethodePaiement from '@/components/Services/Restauration/MethodePaiement.vue';
import EmaiLing from '@/components/Services/Restauration/EmaiLing.vue';

export default {
  components: {
    ResumeCommande,
    MethodePaiement,
    EmaiLing
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      qrCodeSrc: ''
    };
  },
  methods: {
    async processPurchase() {
      const qrData = JSON.stringify(this.items);
      this.qrCodeSrc = await QRCode.toDataURL(qrData);

      const msg = {
        to: 'recipient@example.com',
        from: 'sender@example.com',
        subject: 'Récapitulatif de commande',
        text: 'Voici le récapitulatif de votre commande.',
        html: '<strong>Voici le récapitulatif de votre commande.</strong>',
      };

      axios.post('/sendmail', msg)
          .then(() => {
            alert('Email envoyé avec succès!');
          })
          .catch((error) => {
            alert('Erreur lors de l\'envoi de l\'email:', error);
          });
    }
  },
  created() {
    console.log("kfldfs:", this.items);
  },
}
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
