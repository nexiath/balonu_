<template>
  <questions-component></questions-component>
</template>

<script>

import QuestionsComponent from "@/components/Faq/QuestionsComponent";

export default {
  components: {QuestionsComponent},
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
          title: "Question 3",
          content: "Contenu de la question 3.",
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


</style>
