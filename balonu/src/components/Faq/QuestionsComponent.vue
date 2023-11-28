<template>
  <div class="container">
    <h1>Foire aux <b>questions</b></h1>
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
  name: "QuestionsComponent",
  data() {
    return {
      questions: [
        {
          title: "Est-ce que Sefa a terminé le login ?",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.",
          showContent: false, // Initial state
        },
        {
          title: "Une autre question ?",
          content: "Contenu de l'autre question.",
          showContent: false, // Initial state
        },
        {
          title: "Johan est drole ?",
          content: "Non",
          showContent: false,
        },
        {
          title: "Question 4",
          content: "Contenu de la question 4.",
          showContent: false,
        },
        {
          title: "Question 5",
          content: "Contenu de la question 5.",
          showContent: false,
        },
        {
          title: "Question 6",
          content: "Contenu de la question 6.",
          showContent: false,
        },
        {
          title: "Question 7",
          content: "Contenu de la question 7.",
          showContent: false,
        },
        {
          title: "Question 8",
          content: "Contenu de la question 8.",
          showContent: false,
        },
        {
          title: "Question 9",
          content: "Contenu de la question 9.",
          showContent: false,
        },
        {
          title: "Question 10",
          content: "Contenu de la question 10.",
          showContent: false,
        },
      ],
    };
  },
  methods: {
    toggleQuestion(index) {
      // Inverser l'état "showContent" de la question
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
