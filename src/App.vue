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
import { ref ,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import MainPage from './components/MainPage.vue';
import LoginPage from './components/LoginPage.vue';

const logIn = ref(false);
const activeUser = ref({});
const username = ref("");
const router = useRouter();
const userdata=ref([]);
const chatdata=ref([]);



onMounted(()=>{
  userdata.value=[{"id":1,"name":"Alice","email":"a@a","email_password":"a","chats":[101,102]},{"id":2,"name":"Bob","email":"bob@example.com","email_password":"bobpass123","chats":[101]},{"id":3,"name":"Charlie","email":"charlie@example.com","email_password":"charliepass123","chats":[102,103]},{"id":4,"name":"Diana","email":"diana@example.com","email_password":"dianapass123","chats":[103]},{"id":null,"name":"furkan","email":"furkanmar@outlook.com","email_password":"aa","chats":[]},{"id":null,"name":"a","email":"a@a","email_password":"a","chats":[]},{"id":7,"name":"a","email":"a@aa","email_password":"a","chats":[]},{"id":null,"name":"a","email":"aa@aa","email_password":"a","chats":[]},{"id":9,"name":"aa","email":"aaa@a","email_password":"a","chats":[]}]
  localStorage.setItem('users',JSON.stringify(userdata.value));
  chatdata.value=[{"id":101,"users":[1,2],"messages":[{"sender_id":1,"message":"Hello Bob, how are you?"},{"sender_id":2,"message":"Hi Alice, I'm good! How about you?"},{"sender_id":1,"message":"a"},{"sender_id":1,"message":"sd"},{"sender_id":1,"message":"fd"},]},{"id":102,"users":[1,3],"messages":[{"sender_id":1,"message":"Hi Charlie, did you finish the project?"},{"sender_id":3,"message":"Yes, just completed it today!"},{"sender_id":1,"message":"zsdfd"}]},{"id":103,"users":[3,4],"messages":[{"sender_id":4,"message":"Hey Charlie, are we still on for the meeting?"},{"sender_id":3,"message":"Yes, let's meet at 3 PM."}]}]
  localStorage.setItem('chats',JSON.stringify( chatdata.value));

})


const logout = () => {
  logIn.value = false;
  activeUser.value = "";
  username.value = "";
  router.push('/'); 
}

const log = (user) => {
  console.log(user)
  
  activeUser.value = user
  username.value = user.email.split('@')[0]; 
  

  logIn.value = true;


  
  router.push(`/${username.value}/category1`); 
}
</script>
