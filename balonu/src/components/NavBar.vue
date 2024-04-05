<template>
  <div class="navbar-container">
    <nav class="navbar" :class="navbarClass">
      <div class="container">
        <div class="left-side">
          <router-link to="/">
            <img src="@/assets/logolonu.png" class="logo" ref="logoImage">
          </router-link>
        </div>
        <div class="nav-links">
          <router-link to="/">{{ $t('acceuil') }}</router-link>
          <router-link to="/billeterie">{{ $t('Billetterie') }}</router-link>
          <router-link to="/services">{{ $t('Services') }}</router-link>
          <router-link to="/apropos">{{ $t('propos') }}</router-link>
          <router-link to="#contact">{{ $t('contact') }}</router-link>
        </div>
        <div class="language-selector" @click="toggleDropdown">
          <font-awesome-icon icon="globe" />
          <div v-if="showDropdown" class="dropdown">
            <button @click="changeLanguage('fr')">FR</button>
            <button @click="changeLanguage('en')">EN</button>
            <button @click="changeLanguage('tr')">TR</button>
            <button @click="changeLanguage('jp')">JP</button>
          </div>
        </div>
        <div v-if="isAuthenticated" class="right-side">
          <div class="account-dropdown" @click="toggleAccountDropdown">
            Mon compte
            <div v-if="showAccountDropdown" class="dropdown">
              <router-link :to="`/moncompte`">Mes informations</router-link>
                <br>
              <router-link v-if="isAuthenticated && (userIdRole === 2)" :to="`/services/montgolfieres/${this.userID-1}`">Mes Montgolfieres</router-link>
              <router-link v-if="isAuthenticated && (userIdRole === 1)" :to="`/services/stands/${this.userID-1}`">Mes Stands</router-link>
              <router-link v-if="isAuthenticated && (userIdRole === 3)" to="/orga">Dashboard</router-link>
                <br>
                <router-link v-if="isAuthenticated && (userIdRole === 2) || (userIdRole === 1)" :to="`/presta/${this.userID-1}`">Mon profil</router-link>
                <button @click="handleLogout">Logout</button>
            <!-- <div v-if="showAccountDropdown" class="dropdown">
              <router-link to="/moncompte">Mon profil</router-link>
                <br>
              <router-link v-if="isAuthenticated && (userIdRole === 2)" to="/mesmontgolfieres">Mes Montgolfieres</router-link>
              <router-link v-if="isAuthenticated && (userIdRole === 1)" to="/stands">Mes Stands</router-link>
              <router-link v-if="isAuthenticated && (userIdRole === 3)" to="/orga">Dashboard</router-link>
                <button @click="handleLogout">Logout</button> -->
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav class="mobile-nav" :class="navbarClass">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/logolonu_blanc.png" class="logo" ref="logoImageMobile">
        </router-link>
      </div>
      <div class="hamburger">
        <label for="check">
          <input @click.stop="toggleHamburgerMenu" type="checkbox" id="check"/>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div class="fullscreen-menu" :class="{'clicked': isClicked}">
        <router-link to="/">Accueil</router-link>
        <router-link to="/billeterie">Billetterie</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/apropos">A propos</router-link>
        <router-link to="#contact">Contact</router-link>
      </div>
    </nav>
    <router-view class="router-view"/>
    <FooTer />
  </div>
</template>


<script>
import { mapGetters, mapActions,mapState } from 'vuex';

export default {
  data() {
    return {
      navbarClass: 'transparent',
      showDropdown: false,
      isConnected: false,
      showAccountDropdown: false,
      isClicked: false
    };
  },
  name: 'HomeView',
  components: {
  },
  computed: {
    ...mapState('auth', ['userID']),
    ...mapGetters('auth', ['isAuthenticated', 'userDetails', 'userIdRole']),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
      this.$router.afterEach(this.handleRouteChange);

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogout() {
      await this.logout();
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/');
      }
    },

    toggleAccountDropdown() {
      this.showAccountDropdown = !this.showAccountDropdown;
    },

    handleScroll() {
      const img = this.$refs.logoImage;
      const imgMobile = this.$refs.logoImageMobile;
      const homePage = document.querySelector("body > div#app > div > div");

      if (homePage && homePage.classList.contains("homepage")) {
        if (window.scrollY > 0) {
          this.navbarClass = 'scrolled';
          img.src = "data:image/png;base64,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"
          imgMobile.src = "data:image/png;base64,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"
        } else {
          this.navbarClass = 'transparent';
          img.src = "/img/logolonu.62ef656f.png"
          imgMobile.src = "data:image/png;base64,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"
        }
      } else {
        this.navbarClass = 'scrolled';
      }
    },

    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    toggleHamburgerMenu() {
      this.isClicked = !this.isClicked;
    },

    simulateLogin() {
      this.isConnected = true;
    },
      handleRouteChange() {
          // Mettez ici le code pour ajuster la classe de votre barre de navigation
          // en fonction de la position de défilement ou d'autres conditions
          this.navbarClass = 'scrolled'; // Par exemple, définissez simplement la classe "scrolled" ici
      }

  }
};
</script>


<style>

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', serif;
}

nav {
  z-index: 801;
}

.logo {
  width: 100%;
  transition: 200ms;
}

.logo:hover {
  transform: scale(1.05);
  transition: 200ms;
}

.scrolled svg {
  color: #010101;
}

#app > nav > div > div.language-selector > svg:hover {
  transform: scale(1.05);
  transition: 200ms;
}

#app > nav > div > div.language-selector > svg {
  transform: scale(1);
  transition: 200ms;
}

.navbar-container {
  width: 100%;
}

.navbar {
  z-index: 10000;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: transparent;
  font-family: 'Poppins', serif;
  font-size: 20px;
  font-weight: 400;
  padding-top: 2%;
  transition: background 0.3s ease;
}

.navbar.scrolled {
  background: white;
  padding-top: 1%;
  padding-bottom: 1%;
  z-index: 999;
  height: auto;
  border-bottom: 1px white;
  color: #464646;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
}

.navbar {
  color: white;
}

font-awesome-icon {
  color: #464646 !important;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.left-side,
.right-side,
.nav-links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 999;
}

.nav-links {
  text-align: center;
}
a {
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 1px;
  margin: 0 0.5rem;
  transition: all 0.4s ease;
  width: 110px;
  font-size: 17px;
  color: white;
}

.navbar.scrolled a {
  color: #464646;
}

a.router-link-exact-active {
  font-weight: bold;
}


.nav-links a:hover {
  transform: scale(1.05);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #E30A17;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.login-button {
  background-color: #E30A17;
  color: white;
  padding: 7px 15px;
  font-family: 'Poppins', serif;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-button:hover {
  transform: scale(0.95);
  box-shadow: 0px 2px 4px rgba(34, 34, 34, 0.2);
}

.router-view {
  min-height: 100vh;
}

.language-selector {
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #010101;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.language-selector:hover .dropdown {
  display: block;
}

.dropdown button {
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.account-dropdown {
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding-left: 2%;
}

.account-dropdown .dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: red;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 20px;
  text-align:left;
}


.account-dropdown .dropdown a {
    font-size: 13px;
}


.account-dropdown:hover .dropdown {
  display: block;
}

.account-dropdown .dropdown router-link {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  text-align:left;
  transition: background-color 0.3s ease;
}

.account-dropdown .dropdown router-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav {
  display: none;
}

/* Style de la navbar mobile */
@media only screen
and (max-width : 1000px) {

  .navbar {
    display: none;
  }

  .mobile-nav {
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-right: 1em;
  }

  .mobile-nav.scrolled {
    background-color: #fff;
  }

  .mobile-nav .logo img{
    width: 50px;
    z-index: 300;
  }

  .mobile-nav .logo {
    z-index: 300;
  }

  div.hamburger {
    z-index: 300;
  }

  label{
    display:flex;
    flex-direction:column;
    width:70px;
    cursor:pointer;
    z-index: 300;
  }

  .scrolled label span {
    background-color: #000000;
  }

  label span{
    background: #ffffff;
    border-radius:10px;
    height:7px;
    margin: 7px 0;
    transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);

  }


  span:nth-of-type(1){
    width:50%;

  }

  span:nth-of-type(2){
    width:100%;
  }


  span:nth-of-type(3){
    width:75%;

  }


  input[type="checkbox"]{
    display:none;
  }


  input[type="checkbox"]:checked ~ span:nth-of-type(1){
    transform-origin:bottom;
    transform:rotatez(45deg) translate(8px,0px)
  }


  input[type="checkbox"]:checked ~ span:nth-of-type(2){

    transform-origin:top;
    transform:rotatez(-45deg)
  }


  input[type="checkbox"]:checked ~ span:nth-of-type(3){

    transform-origin:bottom;
    width:50%;
    transform: translate(30px,-11px) rotatez(45deg);

  }

  div.fullscreen-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: #f9f9f9;
    top: -1000px;
    transition: 500ms ease;
  }

  div.fullscreen-menu.clicked {
    top: 0;
    transition: 500ms ease;
  }

  div.fullscreen-menu > a {
    color: #464646;
    text-align: center;
  }

}
.account-dropdown {
  background-color: #7d7d7d; /* Couleur de fond grise */
  color: white; /* Texte blanc pour le contraste */
  padding: 10px 20px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  border: none; /* Pas de bordure */
  cursor: pointer; /* Style de curseur pour indiquer qu'il est cliquable */
  transition: all 0.3s ease; /* Transition douce pour les changements d'état */
  font-weight: bold; /* Texte en gras */
  text-align: center; /* Alignement du texte au centre */
  display: inline-flex; /* Affichage en flex pour aligner les icônes et le texte */
  align-items: center; /* Alignement vertical des éléments */
  font-family: 'Poppins', sans-serif; /* Police Poppins */
  gap: 8px; /* Espace entre l'icône et le texte */
  text-decoration: none; /* Pas de soulignement de texte */
}

.account-dropdown:hover, .account-dropdown:focus {
  background-color: #888888; /* Couleur plus foncée au survol et au focus */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Ombre plus prononcée */
  outline: none; /* Supprimer le contour par défaut lors du focus */
}

.account-dropdown-icon {
  /* Icône (si utilisée) */
  font-size: 1.2em; /* Taille de l'icône */
}


</style>


