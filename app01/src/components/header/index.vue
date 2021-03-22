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

<style scoped lang='scss'>
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
      display: flex;
      height: 10%;
      background: tomato;
      justify-content: center;
      .header-font {
        align-self: center;
      }
    }
  }
</style>
