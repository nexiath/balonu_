<template>
    <div class="image-banner">
        <img :src="imageUrl" alt="Banner"/>
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    }
}
</script>
