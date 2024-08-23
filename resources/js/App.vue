<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/create">Add Item</RouterLink>
        <RouterLink to="/order">Order Items</RouterLink> -->
    </nav>
    <main><RouterView /></main>
</template>
