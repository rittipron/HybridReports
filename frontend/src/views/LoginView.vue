<template>
    <header class="absolute inset-x-0 top-0 z-50">
      <Navber />
    </header>
    <div class="justify-center items-center flex-col my-auto h-screen">
        <LoginComponent />
        <LoginListComponent />
    </div>
</template>

<script setup>  
    import LoginComponent from '@/components/login/LoginComponent.vue';
    import LoginListComponent from '@/components/login/LoginListComponent.vue';
</script>