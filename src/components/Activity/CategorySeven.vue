<template>
  <div>
    <h2>Etkinlikler</h2>
    <ul>
        <li 
        v-for="event in events"
        :key="event.id"
        @click="selectEvent(event)"
        class="event-item"
        >
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
      </li>
    </ul>

    <EventDetails :event="selectedEvent" />


  </div>
</template>


<script>
import EventDetails from './EventDetails.vue';

export default{
name: "EventList",
components: {EventDetails},
data(){
  return{
    events: [
      { id: 1, title:"Siber Güvenlik Dönem Sonu Toplantısı",description:"2024-2025 Güz Dönemi sona ermeden önce dönem değerlendirmesi ve ileriki dönemlerin planlanması için toplantıya davetlisiniz.Detaylar için tıklayınız",date: "20.02.2025",location: "M01"},
      { id: 2, title:"SiberGüvenlik102",description:"Siber güvenlik temelleri atölyemizin ikinci dersine davetlisiniz. Detaylar için tıklayınız." },
      {id : 3, title:"Linux101",description:"Linux'e giriş atölyemizin ilk dersine davetlisiniz. Detaylar için tıklayınız."}
    ],
    selectedEvent: null
  };
},
methods:{
  selectEvent(event){
    console.log("Selected Event:",event);
    this.selectedEvent = event;
  },
},
};
</script>

<style scoped>

  .event-item {
  cursor:pointer;
  padding: 10px;
  border: 1px solid rgb(204, 204, 204);
  margin-bottom: 5px;
  transition: background-color 0.3s;

  }

  .event-item:hover{
    background-color: rgb(240, 240, 240) ;
  }



</style>