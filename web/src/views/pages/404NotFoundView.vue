<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import { onMounted } from "vue";
import router from "@/utils/router.ts";

onMounted(() => {
  // wait for 5 seconds and then redirect to the home page
  setTimeout(() => {
    router.push("/");
  }, 5000);
});
</script>

<template>
  <div class="bg-blue-300 h-screen w-screen">
    <div
      class="text-center font-bold space-y-4 flex flex-col items-center justify-center place-content-center h-full"
    >
      <font-awesome-icon :icon="faQuestion" class="h-64 w-64" />
      <h1 class="text-4xl text-center">404 Not Found</h1>
      <p class="text-2xl text-center">
        The page you are looking for does not exist.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
