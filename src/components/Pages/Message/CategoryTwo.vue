<template>
  <div class="d-flex flex-column">
    <MessageList
    :relatedChats="relatedChats"
    :activeUserId="props.activeUserID"></MessageList>
  </div>
</template>

<script setup>
import { defineProps,ref, onBeforeMount} from 'vue';
import MessageList from './MessageList.vue';


const relatedChats=ref({});
const users=ref({});

const props = defineProps({
  activeUserID: {
    type: Number,
    required: true,
  },
});

onBeforeMount(()=>{
  users.value=JSON.parse(localStorage.getItem('users'));
  const allChat=JSON.parse(localStorage.getItem('chats'));
  relatedChats.value=allChat.filter(chat=> chat.users.find(userId=>userId==props.activeUserID));
  console.log('chat gitmeden',relatedChats.value);
  
})
</script>

