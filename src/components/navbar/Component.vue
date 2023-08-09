<template>
    <nav>
        <div class="logo">logo</div>
        <ul>
            <li v-for="route in routes " :key="route.name">{{ route.name }}</li>
        </ul>
    </nav>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

const routes = ref([]);

const routerRoutes = () => {
  return router.getRoutes().map(({name, path}) => ({
        name, path
    }));
};

onMounted(()=>routes.value = routerRoutes())

</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 8vh;
    background-color: blue;
}

</style>
