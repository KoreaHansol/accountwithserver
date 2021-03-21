<template>
  <div class="app">
    <Header />
    <div class="row-container">
      <Sidemunu />
      <Content />
    </div>
  </div>
</template>

<script>
import calander from '@/components/calander'
import Sidemunu from '@/components/sidemenu'
import Content from '@/components/content'
import Header from '@/components/header'
export default {
  name: 'App',
  components: {
    calander,
    Sidemunu,
    Content,
    Header
  }
}
</script>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .app .row-container {
    height: 90%;
    display: flex;
    flex-direction: row;
  }
  .app .row-container .side-menu {
    width: 15%;
    background: wheat;
  }
  
</style>
