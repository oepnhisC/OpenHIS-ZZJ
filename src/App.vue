<script setup>
import {  RouterView } from 'vue-router'

</script>

<template>
  <div>
    <RouterView  :key="$route.fullPath"/>
  </div>
</template>

<style scoped>

</style>
