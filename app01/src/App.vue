<template>
  <div class="app">
    <Header />
    <div class="row-container">
      <Sidemunu />
      <Content />
    </div>
    <div class="popup">
      <popup-anchor></popup-anchor>
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

<style scoped lang='scss'>
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
    .row-container {
      height: 90%;
      display: flex;
      flex-direction: row;
      .side-menu {
        width: 15%;
        background: wheat;
      }
    }
  }
</style>
