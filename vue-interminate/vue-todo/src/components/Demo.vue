<template>
  <div id="root">
    <p>{{ originalPrice }}</p> 100
    <p>{{ doublePrice }}</p> 200
    <p>{{ triplePrice }}</p> 300
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed : {
        ...mapGetters(['originalPrice', 'doublePrice', 'triplePrice']),
        // originalPrice() {
        //     return this.$store.getters.originalPrice;
        // },
        // doublePrice() {
        //     return this.$store.getters.doublePrice;
        // },
        // triplePrice() {
        //     return this.$store.getters.triplePrice;
        // },
    }
}
</script>

<style>

</style>