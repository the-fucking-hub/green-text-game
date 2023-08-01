<template>
  <div class="flex">
       <img :src="imgUrl" alt="">
     <div>
       <p class="green">
           >Be me <br>
           >Red Army GigaChad<br>
           >Go to Omegle<br>
           >Cosplay myself into some random Moslim from Palestin<br>
           >Meet a black man with a big nose who calls me Nigga from the first second.
           <br>
       </p>
       <p class="red">Bro i just meet Ishowspeed.
           Love it.
       </p>
     </div>
   </div>
</template>

<script setup>
/**
 * @todo find better
 */
const imgUrl = new URL('assets/a0ca5c9e9ef2a6c10351cc96c7abd3f4.webp', import.meta.url).href
</script>


<style scoped>
.back {
    background-color: #f6e9e1;
}
.flex {
    display: flex;
}

.green {
    font-size: 20px;
    color: #9BAD4E;
}

.red {
    font-size: 20px;
    color: #653333;
}

body {
    font-family: Arial, Helvetica, sans-serif;
}

img {
    width: 100px;
    height: 100px;
    padding: 10px;
}
</style>
