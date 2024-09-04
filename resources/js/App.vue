<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/create">Add Book</RouterLink>
        <RouterLink to="/authors">Authors</RouterLink>
        <RouterLink to="/add_author">Add Author</RouterLink>
    </nav>
    <main>
        <RouterView />
    </main>
</template>
