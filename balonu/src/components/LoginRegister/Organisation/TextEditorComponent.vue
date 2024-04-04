<template>
    <div class="text-editor">
        <div class="editor-container" ref="quillEditor"></div>
        <button @click="saveChanges" class="save-button">Enregistrer les modifications</button>
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

.editor-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

.save-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #b02424;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.save-button:hover {
    background-color: #dc3131;
}
</style>
