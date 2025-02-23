<template>
    <div class="requested-events">
        <h2>Talepler</h2>
        <ul>
            <li 
                v-for="event in requestedEvents"
                :key="event.title"
                @click="openEventDetails(event)"
                class="event-item">
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
                <span>Status: {{ event.status }}</span>
            </li>
        </ul>
        <!--Etkinlik Detayları-->
        <EventDetails 
            v-if="isModalOpen"
            :event="selectedEvent"
            :showStatus="true"
            @close="closeModal"
            @updateEvent="updateEvent"
            @approveRequest="approveRequest"
            @rejectRequest="rejectRequest"
            />
        
    </div>
    
</template>

<script>
import EventDetails from './EventDetails.vue';

export default{
    components: {EventDetails},
    data(){
        return{
            requestedEvents: JSON.parse(localStorage.getItem("requested_events")) || [],
            selectedEvent:null,
            isModalOpen:false,
        };
    },
    methods: {
        openEventDetails(event) {
            this.selectedEvent = event;
            this.isModalOpen = true;
        },
        closeModal() {
            this.selectedEvent = null;
            this.isModalOpen = false;
        },
        updateEvent(updatedEvent){
            const index = this.requestedEvents.findIndex(event => event.title === updatedEvent.title);
            if (index !== -1) {
                this.requestedEvents[index] = updatedEvent;
                this.updateLocalStorage();
                }
        },
        approveRequest() {
            // Etkinliği onayla
            this.selectedEvent.status = 'Approved';
            this.removeFromRequestedEvents();
            this.addToEvents();
            this.updateEventStatus();
        },
        rejectRequest() {
            // Etkinliği reddet
            this.selectedEvent.status = 'Rejected';
            this.removeFromRequestedEvents();
            this.updateEventStatus();
        },
        removeFromRequestedEvents(){
            this.requestedEvents=this.requestedEvents.filter(event => event.title !== this.selectedEvent.title);
            this.updateLocalStorage();
        },
        addToEvents(){
            let events = JSON.parse(localStorage.getItem('events')) ||[];
            
            const updatedEvent = {
                ...this.selectedEvent,
                //Açıklama ve Başlıkta düzeltilebilmeli.
                date: this.selectedEvent.date,
                location: this.selectedEvent.location
            };
            
            events.push(this.updatedEvent);
            localStorage.setItem('events',JSON.stringify(events));
        },
        updateEventStatus(){
            localStorage.setItem('requested_events', JSON.stringify(this.requestedEvents));
        },
        updateLocalStorage(){
            localStorage.setItem('requested_events', JSON.stringify(this.requestedEvents));
        }
    },
};

</script>
<style scoped>
/* Styling for the requested_events page */
.requested-events {
    padding: 20px;
}

.event-item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid rgb(204, 204, 204);
    background-color: rgba(255, 255, 255, 0.5);
    margin-bottom: 5px;
    transition: background-color 0.3s;
    border-radius: 10px;
}

.event-item:hover {
    background-color: rgb(240, 240, 240);
}
</style>