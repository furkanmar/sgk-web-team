<template>
  <div class="d-flex flex-column vh-100">
    <div class="d-flex flex-grow-1 overflow-hidden">
      <div class="border border-black d-flex">
        <SideBar :username="username" @logout="logout"></SideBar>
      </div>
      <div class="flex-fill p-3 overflow-auto bg-light border border-black mx-3">
        <router-view
        :activeUserID="ActiveUser.id"
        ></router-view>
      </div>
    </div>
    <div class="border border-black">
      <FooterComp></FooterComp>
    </div>
  </div>
</template>

<script setup>
import FooterComp from './FooterComp.vue';
import SideBar from './SideBar.vue';
import { defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  ActiveUser: {
    type: Object,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const logout = () => {
  emit('logout'); 
}

onMounted(() => {
  console.log("Aktif kullanıcı:", props.ActiveUser);
  console.log("username:", props.username);
});
</script>
