<template>
    <div>
        Landing !!!
        <Navbar></Navbar>
    </div>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
const Navbar = defineAsyncComponent(() => import("../components/navbar"));
</script>
<style lang="scss" scoped></style>
