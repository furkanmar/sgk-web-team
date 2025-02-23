<template>
    <div class="div">
        <h3>Yeni Etkinlik Talebi</h3>
        <form @submit.prevent="submitRequest">
            <label>Etkinlik Adı:</label>
            <input v-model="eventName" type="text" required>
            
            <label>Açıklama:</label>
            <textarea v-model="eventDescription" required></textarea>
       
            <button type="submit">Talebi Gönder</button>
            
        </form>
    </div>
</template>

<script>
export default{
    data() {
        return{
            eventName:'',
            eventDescription: ''
        };
    },
    methods:{
        submitRequest(){
            console.log("Etkinlik talebi gönderildi:", this.eventName,this.eventDescription);
            alert("Talebiniz alındı!");
           
           const newEvent= {
            title:this.eventName,
            description:this.eventDescription,
            date:"Not specified",
            location:"Not specified",
            status:"Pending"
           };

           let requestedEvents = JSON.parse(localStorage.getItem('requested_events')) ||[];
           
           requestedEvents.push(newEvent);

           localStorage.setItem('requested_events', JSON.stringify(requestedEvents));

           this.events = requestedEvents;
           
            this.$router.push('/:username/category7');
        }
    }
};
</script>

<style scoped>
.div{
    max-width: fit-content;
    margin: 0 auto;
    padding: 20px;
    background-color: rgb(249, 249, 249);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h3{
   text-align: center;
   font-size: 1.5em;
   margin-bottom: 20px;
   color: rgb(51, 51, 51);
}
form{
    display: flex;
    flex-direction: column;
    gap:15px;

}
label {
    font-size: 1.1em;
    margin-bottom: 5px;
    color: rgb(85, 85, 85);
}
input, textarea {
    padding: 10px;
    font-size: 1em;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    transition: border-color 0.3s;
}
input:focus, textarea:focus {
    border-color: rgba(0, 123, 255,0.8);
    outline: none;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

button {
    padding: 12px 20px;
    font-size: 1.1em;
    background-color: rgb(0, 123, 255);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: rgb(0, 86, 179);
}

button:focus {
    outline: none;
}

</style>