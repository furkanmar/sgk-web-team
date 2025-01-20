<template>

<div>

 <div v-if="event">
    <h2>Etkinlik Detayları</h2>
    <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p><strong>Tarih:</strong>{{ event.date || 'Belirtilmemiş' }} </p>
        <p><strong>Konum:</strong>{{ event.location || 'Belirtilmemiş' }} </p>
    </div>

 <div v-else>
      <p>Lütfen bir etkinlik seçiniz.</p>
    </div>
  


</div>

</template>




<script>

export default {

    name: "EventDetails",
    props:{
        event:{
            type:Object,
            required: false,
            default: () => null,
        },
    },

};

</script>

<style scoped>
h2{
    margin-bottom: 10px;

}

p{
    margin: 5px 0;
}

</style>