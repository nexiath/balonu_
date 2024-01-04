<template>
<div class="container tout">
    <h1><b>{{ nom_utilisateur }} {{ prenom_utilisateur }}</b></h1>
</div>
</template>


<script>
</script>



<style scoped>

body {
    background-color: #fcfcfc;
}

.tout{
    padding-top: 10%;
}

div.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 5em;
    margin-right: 5em;
}

h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    color: #464646;
    font-weight: normal;
    text-align: center;
    border-bottom: 3px #E30A17 solid;
    width: 66%;
    padding-bottom: 0.5em;
}

h1 > b {
    font-weight: bold;
}

form{
    margin: 40px;
}


</style>