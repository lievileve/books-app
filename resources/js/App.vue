<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { goToRoute } from './services/router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/create">Add Book</RouterLink>
        <RouterLink to="/authors">Authors</RouterLink>
        <RouterLink to="/authors_add">Add Author</RouterLink>
        <!-- <button @click="goToRoute('create')">Add Book</button>
        <button @click="goToRoute('authors')">Authors</button>
        <button @click="goToRoute('authors_add')">Add Author</button> -->
    </nav>
    <main>
        <RouterView />
    </main>
</template>
