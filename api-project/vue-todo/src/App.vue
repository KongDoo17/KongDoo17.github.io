<template>
  <div id="app">
    <category></category>
    <i id = "cate" class="fas fa-align-justify"></i>
  </div>
</template>

<script>
import category from './components/category.vue';
  export default {
    components : {
      category
    }
  }
</script>

<style>
  body {
    text-align : center;
    margin : 0;
    padding : 0;
    min-width : 720px;
    max-width : 800px;
    min-height : 700px;
    float : center;
  }
  #app {
    border : 1px solid black;
    min-width : 720px;
    max-width : 800px;
    min-height : 700px;
    margin : 0 auto;
  }
  #cate {
    position : static;
    top : 0;
    left : 0;   
  }
</style>