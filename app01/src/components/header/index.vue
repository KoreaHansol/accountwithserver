<template>
    <div class="header">
        <div class="header-font">가계부</div>
    </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .app .header {
    display: flex;
    height: 10%;
    background: tomato;
    justify-content: center;
  }
  .app .header .header-font {
    align-self: center;
  }
</style>
