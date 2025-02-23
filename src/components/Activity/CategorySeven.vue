<template  >
  <div class="div">
    <div class="header-container">
      <h2>Etkinlikler</h2>
      <button @click="goToEventRequest">Yeni Etkinlik Talebi</button>
      <button @click="goToRequestedEvents">Talepleri Gör</button> 
    </div>
   <!--Etkinlik Listesi-->
   <ul>
        <li 
        v-for="event in events"
        :key="event.id"
        @click="openModal(event)"
        class="event-item"
        >
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
      </li>
    </ul>
    <!--Etkinlik Detayları-->
  <EventDetails 
  v-if="isModalOpen"
  :event="selectedEvent"
  :showStatus="false"
  @close="closeModal"
  />
  
  </div>
</template>


<script>

import EventDetails from './EventDetails.vue';

export default{
name: "EventList",
components: {EventDetails},
data(){
  return{
    events: JSON.parse(localStorage.getItem('events')) || [],
    selectedEvent: null,
    isModalOpen: false,  //Açılır Pencere kontrolü
  };
},
methods:{
  openModal(event){
    this.selectedEvent=event;
    this.isModalOpen=true;
  },
  closeModal(){
    this.selectedEvent=null;
    this.isModalOpen=false;
  },
  goToEventRequest(){
    this.$router.push('/event-request');
  },
  goToRequestedEvents(){
    this.$router.push('/requested-events');
  }
},
};
</script>

<style scoped>
  .header-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  button{
   background-color: aliceblue;
   border: 1px solid aliceblue;
   padding: 5px 10px;
   cursor:pointer;
  }
  button:hover{
    background-color: rgba(0, 123, 255,0.8);
    border-radius: 5px;
    color: azure;
  }
  ul{
    list-style: none;
    padding: 0;
    margin:0;
  }


  .event-item {
  cursor:pointer;
  padding: 10px;
  border: 1px solid rgb(204, 204, 204);
  background-color: rgba(255, 255, 255, 0.5); 
  margin-bottom: 5px;
  transition: background-color 0.3s;
  border-radius: 10px;
  }

  .event-item:hover{
    background-color: rgb(240, 240, 240) ;
  }
  
</style>