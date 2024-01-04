<template>
    <div class="text-editor">
        <div ref="quillEditor"></div>
        <button @click="saveChanges">Enregistrer les modifications</button>
    </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
    data() {
        return {
            quill: null,
        };
    },
    mounted() {
        this.initializeQuill();
    },
    methods: {
        initializeQuill() {
            this.quill = new Quill(this.$refs.quillEditor, {
                theme: 'snow',
            });
        },
        saveChanges() {
            const modifiedText = this.quill.root.innerHTML;
            console.log('Texte modifié :', modifiedText);
        },
    },
};
</script>

<style scoped>
.text-editor {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
/* Ajoutez des styles supplémentaires selon vos besoins */
</style>
