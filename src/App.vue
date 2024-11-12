<template>
  <div id="app" class="d-flex flex-column vh-100">
    <div v-if="!logIn">
      <LoginPage @log="log"></LoginPage>
    </div>
    <div v-else>
      <MainPage :ActiveUser="activeUser" :username="username" @logout="logout"></MainPage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainPage from './components/MainPage.vue';
import LoginPage from './components/LoginPage.vue';

const logIn = ref(false);
const activeUser = ref("");
const username = ref("");
const router = useRouter();

const logout = () => {
  logIn.value = false;
  activeUser.value = "";
  username.value = "";
  router.push('/'); 
}

const log = (email) => {
  activeUser.value = email;
  username.value = email.split('@')[0]; 
  logIn.value = true;

  
  router.push(`/${username.value}/category1`); 
}
</script>
