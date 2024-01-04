<template>
    <div class="section">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <img v-if="image" :src="image" alt="Section Image"/>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        image: String
    }
}
</script>