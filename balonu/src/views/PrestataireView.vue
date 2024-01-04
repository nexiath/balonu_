<template>
    <div>
        <PrestataireHeader />
        <ImageBanner />
        <Infobox />
        <NavigationBar />
        <SectionsComponent />
    </div>
</template>
<script>
import PrestataireHeader from '@/components/Billeterie/PageMove/PrestataireHeader.vue';
import ImageBanner from '@/components/Billeterie/PageMove/ImageBanner.vue';
import Infobox from '@/components/Billeterie/PageMove/InfoBox.vue';
import NavigationBar from '@/components/Billeterie/PageMove/NavigationBar.vue';
import SectionsComponent from "@/components/Billeterie/PageMove/SectionsComponent.vue";

export default {

    components: {
        PrestataireHeader,
        ImageBanner,
        Infobox,
        NavigationBar,
        SectionsComponent,

    }

}
</script>


<style scoped>

</style>
