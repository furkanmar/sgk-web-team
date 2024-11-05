<template>
  <div id="app" class="d-flex flex-column vh-100">
    <div class="d-flex flex-grow-1 overflow-hidden">
      <div class="border border-black d-flex ">
        <SideBar ></SideBar>
      </div>
      <div class="flex-fill p-3 overflow-auto bg-light border border-black mx-3" >
        <router-view ></router-view>
      </div>
    </div>
    <div class="border  border-black">
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
