<template>
    <div class="container">
        <h1><b>Foire aux questions</b></h1>
        <div class="questions">
            <div class="questions-item" v-for="(question, index) in questions" :key="index">
                <div class="question-button" @click="toggleQuestion(index)">
                    <span class="questions-item-title">{{ question.title }}</span>
                    <font-awesome-icon icon="caret-down" />
                </div>
                <div class="questions-item-content" :class="{ 'show': question.showContent }">
                    <p>{{ question.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "MontgolfiereFAQ",
    data() {
        return {
            questions: [
                {
                    title: "Quand et où se déroule la prochaine manifestation de montgolfières ?",
                    content: "La prochaine manifestation de montgolfières aura lieu le 15 Janvier au 15 Aout en Cappadoce. Restez informé en consultant notre page d'événements.",
                    showContent: false,
                },
                {
                    title: "Comment puis-je réserver un vol en montgolfière lors de l'événement ?",
                    content: "Vous pouvez réserver votre vol en montgolfière directement sur notre site web. Assurez-vous de réserver à l'avance car les places sont limitées.",
                    showContent: false,
                },
                {
                    title: "Comment puis-je réserver un produit lié à un stand ?",
                    content: "Vous pouvez réserver votre produit d'un stand spécifique directement sur notre site web. Assurez-vous de réserver à l'avance car les places sont limitées.",
                    showContent: false,
                },
                {
                    title: "Y a-t-il des activités spéciales pour les enfants pendant la manifestation ?",
                    content: "Oui, nous avons prévu des activités spéciales pour les enfants, y compris des animations, des jeux et des vols captifs. Consultez notre programme pour plus de détails.",
                    showContent: false,
                },
                {
                    title: "Est-il possible d'assister à l'événement sans réserver de vol en montgolfière ?",
                    content: "Bien sûr ! L'entrée à l'événement est gratuite. Vous pouvez profiter des spectacles au sol, de la nourriture, et de l'ambiance sans réserver de vol en montgolfière.",
                    showContent: false,
                },
                {
                    title: "Y a-t-il un parking disponible sur place ?",
                    content: "Oui, nous avons un parking dédié pour les visiteurs. Veillez à suivre les indications pour un stationnement facile et pratique.",
                    showContent: false,
                },

            ],
        };
    },
    methods: {
        toggleQuestion(index) {
            this.questions[index].showContent = !this.questions[index].showContent;
        },
    },
};
</script>

<style scoped>

body {
    background-color: #fcfcfc;
}

div#app {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #fcfcfc;
}

div.container {
    margin-top: 10em;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 5em;
    margin-right: 5em;
}

h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    color: #464646;
    font-weight: normal;
    text-align: center;
    border-bottom: 3px #E30A17 solid;
    width: 500px;
    padding-bottom: 0.5em;
}

h1 > b {
    font-weight: bold;
}

div.questions {
    width: 100%;
}

div.questions-item {
    background-color: #D9D9D9;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition: 500ms;
}

div.questions-item:nth-child(even) {
    background-color: white;
}

div.questions-item > div.question-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

div.questions-item > div.questions-item-content {
    padding-top: 0;
    max-height: 0;
    overflow: hidden;
    transition: 500ms;
}

div.questions-item > div.questions-item-content.show {
    opacity: 1;
    max-height: 9em;
    transition: 500ms;
    padding-top: 1em;
}


</style>