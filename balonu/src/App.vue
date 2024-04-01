<template>
    <div id="app">
        <RedBar />
        <NavBar />
        <FooTer />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RedBar from './components/RedBar.vue';
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';

export default {
    name: 'App',
    components: {
        RedBar,
        NavBar,
        FooTer,
    },
    computed: {
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
        // Initialise l'authentification à la création de l'application
        this.$store.dispatch('auth/initializeAuthentication');
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
