<template>
    <div id="root">
        <RestaurationHeader />
        <div id="app">
            <ProductList />
        </div>
    </div>
</template>

<script>
import ProductList from '@/components/Services/Restauration/ProductList.vue';
import RestaurationHeader from "@/components/Services/Restauration/RestaurationHeader.vue";

export default {
    components: {
        RestaurationHeader,
        ProductList,
    },
    data() {
        return {
            cartItems: []
        };
    },
}
</script>

<style scoped>
#root {
    display: flex;
    flex-direction: column;
}

#app {
    display: flex;
}

#top, #pq {
    margin: 0;
    padding: 0;
}

</style>
