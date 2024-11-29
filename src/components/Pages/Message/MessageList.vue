<template>
    <div class="row">
      <!-- Chat Listesi -->
      <div class="col-2">
        <div class="list-group" id="list-tab" role="tablist">
          <a
            class="list-group-item list-group-item-action mb-1"
            :class="{ active: chat.id === activeChatId }"
            data-toggle="list"
            role="tab"
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat.id)"
          >
            {{ users.find(user => user.id === chat.users.find(userId => userId !== activeUserId))?.name }}
          </a>
        </div>
      </div>
  
      <!-- Mesajlaşma Alanı -->
      <div class="col-10">
        <div class="tab-content message-area" id="nav-tabContent" v-if="activeChat">
          <h5 class="chat-header">Chat with me{{ chatPartnerName }}</h5>
          <div class="messages">
            <div
              v-for="(message, index) in activeChat.messages"
              :key="index"
              :class="{'message-sent': message.sender_id === activeUserId, 'message-received': message.sender_id !== activeUserId}"
              class="message-bubble"
            >
              <strong>{{ users.find(user => user.id === message.sender_id)?.name }}:</strong>
              <span>{{ message.message }}</span>
            </div>
          </div>
          <!-- Mesaj Gönderme Alanı (En alta sabit) -->
          <div class="message-input">
            <input
              type="text"
              v-model="newMessage"
              placeholder="Mesajınızı yazın..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">Gönder</button>
          </div>
        </div>
        <div v-else class="no-chat-selected">Please select a chat to view messages</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, onMounted, ref, computed } from 'vue';
  
  const users = ref([]);
  const chats = ref([]);
  const activeChatId = ref(null);
  const newMessage = ref("");
  const props = defineProps({
    relatedChats: {
      type: Object,
      required: true
    },
    activeUserId: {
      type: Number,
      required: true
    }
  });
  
  onMounted(() => {
    users.value = JSON.parse(localStorage.getItem("users")) || [];
    chats.value = props.relatedChats;
  });
  
  const activeChat = computed(() => chats.value.find(chat => chat.id === activeChatId.value));
  const chatPartnerName = computed(() => {
    if (!activeChat.value) return '';
    const partnerId = activeChat.value.users.find(userId => userId !== props.activeUserId);
    return users.value.find(user => user.id === partnerId)?.name;
  });
  
  function selectChat(chatId) {
    activeChatId.value = chatId;
  }
  
  function sendMessage() {
    if (!newMessage.value.trim()) return;
  
    const message = {
      sender_id: props.activeUserId,
      message: newMessage.value
    };
  
    activeChat.value.messages.push(message);
  
    const updatedChats = JSON.parse(localStorage.getItem("chats")) || [];
    const chatIndex = updatedChats.findIndex(chat => chat.id === activeChatId.value);
    if (chatIndex !== -1) {
      updatedChats[chatIndex].messages.push(message);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
    }
  
    newMessage.value = "";
  }
  </script>
  
  <style scoped>
  /* Genel düzen */
  .row {
    height: 86vh;
  }
  
  /* Sol taraftaki chat listesi */
  .list-group {
    overflow-y: auto;
    max-height: 86vh;
  }
  
  .list-group-item {
    cursor: pointer;
  }
  
  /* Sağ taraftaki mesaj alanı */
  .message-area {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .chat-header {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  /* Mesaj balonları */
  .messages {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 10px; /* Mesaj yazma alanı için boşluk bırak */
  }
  
  .message-bubble {
    max-width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    position: relative;
  }
  
  .message-sent {
    background-color: #d1e7dd;
    align-self: flex-end;
    text-align: right;
  }
  
  .message-received {
    background-color: #e2e3e5;
    align-self: flex-start;
    text-align: left;
  }
  
  .message-bubble strong {
    display: block;
    font-size: 0.85rem;
    color: #555;
  }
  
  .no-chat-selected {
    text-align: center;
    color: #888;
    font-size: 1.2rem;
    margin-top: 50px;
  }
  
  /* Mesaj gönderme alanı */
  .message-input {
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    position: sticky;
    bottom: 0;
  }
  
  .message-input input {
    flex: 1;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
  }
  
  .message-input button {
    padding: 8px 15px;
    border-radius: 20px;
    background-color: #647dee;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .message-input button:hover {
    background-color: #7f53ac;
  }
  </style>
  