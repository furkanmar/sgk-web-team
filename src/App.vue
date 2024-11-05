<template>
  <div id="app" class="d-flex flex-column vh-100">
    <div class="d-flex flex-grow-1 overflow-hidden">
      <div class=" d-flex ">
        <SideBar ></SideBar>
      </div>
      <div class="flex-fill overflow-auto bg-dark-subtle p-3" >
        <router-view ></router-view>
      </div>
    </div>
    <div class="k">
      <FooterComp></FooterComp>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    FooterComp,
  },
};
</script>
