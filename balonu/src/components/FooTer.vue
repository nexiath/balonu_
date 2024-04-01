
<template>

  <footer class="footer">
    <div class="first-line">

      <ul class="professionnels">
        <h4>Professionnels</h4>
        <li>Vols et prises de vue</li>
        <li>Vos événements avec Balonu Inc.</li>
        <li>Presse</li>
      </ul>

      <ul class="partenaires">
        <h4>Partenaires</h4>
        <li>Nos partenaires</li>
        <li>Nous soutenir</li>
      </ul>

      <ul class="societe-amis">
        <h4>Sociétés d'amis</h4>
        <li>Devenir Membre</li>
      </ul>

    </div>

    <div class="second-line">
      <ul>
        <li><router-link to="/meteo">Météo</router-link></li>
        <li><router-link to="/faq">Foire aux questions</router-link></li>
        <li>Politique de confidentialité</li>
        <li>Mentions légales</li>
        <li>Contact</li>
        <li>S'inscrire à la newsletter</li>
        <li>Lettre d'information</li>
        <li class="rejoindre"><router-link to="/register">Nous rejoindre</router-link></li>
      </ul>
    </div>

    <span class="copyright">2023© Montgolfières Inc. - Tous droits réservés</span>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
  footer {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    padding-left: 5em;
    padding-right: 5em;
    padding-top: 3em;
    padding-bottom: 3em;
    text-align: center;
  }

  footer > .first-line {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1.5em;
  }

  footer > .first-line > ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    align-items: center;
    width: 30%;
  }

  footer > .first-line > ul h4 {
    text-transform: uppercase;
    font-size: 20px;
    margin-bottom: 1em;
    color: #1E1E1E;
  }

  footer > .first-line > ul li {
    margin-bottom: 0.5em;
    color: #464646;
    font-size: 14px;
  }

  footer > .second-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    justify-content: center;
    margin-bottom: 1.5em;
  }

  footer > .second-line > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    width: 30%;
  }

  footer > .second-line > ul > router-link, footer > .second-line > ul > li, footer > .second-line > ul > li > a, #app > footer > div.first-line > ul.partenaires > li > a {
    color: #464646 !important;
    font-size: 14px;
    margin-bottom: 0.5em;
    cursor: pointer;
  }

  footer > .second-line > ul > .rejoindre > router-link,
  footer > .second-line > ul > .rejoindre > li,
  footer > .second-line > ul > .rejoindre > li > a,
  #app > footer > div.first-line > ul.partenaires > li > a {
      color: #464646 !important;
      font-size: 14px;
      margin-bottom: 0.5em;
      cursor: pointer;
      font-weight: bold;
  }

  #app > footer > div > ul > .rejoindre > li > a:hover,
  #app > footer > div > ul > .rejoindre:hover,
  #app > footer > div.first-line > ul.partenaires > li > a:hover {
      color: #E30A17 !important;
  }

  #app > footer > div > ul > li > a:hover, #app > footer > div > ul > li:hover, #app > footer > div.first-line > ul.partenaires > li > a:hover {
    color: #E30A17 !important;
  }

  span.copyright {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    display: inline;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
  }

  /* Style de la navbar mobile */
  @media only screen
  and (max-width : 780px) {
    footer > .first-line {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    footer > .first-line > ul, footer > .second-line > ul, span.copyright {
      margin-bottom: 1.5em;
      width: 100%;
    }
  }

</style>

