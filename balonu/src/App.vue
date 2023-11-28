<template>
  <div id="app">

    <!-- <div class="quote" v-if="userDetails">
      {{ userDetails.nom }} - {{ userDetails.email }}
    </div> -->
    <RedBar />
    <NavBar />
    <FooTer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';
import RedBar from '@/components/RedBar.vue';

export default {
  name: 'App',
  components: {
    RedBar,
    NavBar,
    FooTer,
  },
  computed: {
    // Mapper userDetails depuis Vuex
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogout() {
      await this.logout();
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/');
      }
    }
  },
  created() {
    // Si nécessaire, vérifiez l'authentification de l'utilisateur au démarrage de l'application
    // Assurez-vous que verifyUserAuthentication est bien défini dans votre store Vuex
    if (this.verifyUserAuthentication) {
      this.verifyUserAuthentication().catch(() => {
        this.handleLogout(); // Gérez le cas où l'utilisateur n'est pas authentifié ou le token est expiré
      });
    }
  }
}
</script>

<style>
body {
  display: block;
  margin: 0;
}

* {
  scrollbar-width: auto;
  scrollbar-color: #727272 transparent;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #575757;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>
