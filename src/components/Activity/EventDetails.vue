<template>
    <div v-if="localEvent" class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>Etkinlik Detayları</h2>
        <h3>{{ localEvent.title }}</h3>
        <p>{{ localEvent.description }}</p>
        
        <p><strong>Tarih:</strong>
          <input 
            v-if="isEditing" 
            v-model="localEvent.date" 
            type="date" 
            placeholder="Tarih belirtin">
          <span v-else>{{ localEvent.date || 'Belirtilmemiş' }}</span>
        </p>
        
        <p><strong>Konum:</strong>
          <input 
            v-if="isEditing" 
            v-model="localEvent.location" 
            placeholder="Konum belirtin">
          <span v-else>{{ localEvent.location || 'Belirtilmemiş' }}</span>
        </p>
        
        <div v-if="showStatus && localEvent.status">
          <p><strong>Durum:</strong> {{ localEvent.status }}</p>
        </div>
        
        <div v-if="isEditing">
          <button @click="saveChanges">Değişiklikleri Kaydet</button>
        </div>
        
        <div v-else>
          <button v-if="showStatus" class="edit-btn" @click="startEditing">Düzenle</button>
        </div>
        
        <!-- Onay ve red butonları -->
        <div v-if="showStatus">
          <button @click="approveRequest">Onayla</button>
          <button @click="rejectRequest">Reddet</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
    name: "EventDetails",
    props: {
      event: {
        type: Object,
        required: false,
        default: () => null,
      },
      showStatus: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        isEditing: false,
        // event prop'unu yerel data'ya kopyalayın
        localEvent: { ...this.event },  // Bu kopyayı kullanmaya devam edin
      };
    },
    watch: {
      // Prop değiştiğinde, yerel data'yı güncelleyin
      event(newEvent) {
        this.localEvent = { ...newEvent };
      },
    },
    methods: {
      startEditing() {
        this.isEditing = true;
      },
      saveChanges() {
        this.isEditing = false;
        this.$emit('updateEvent', this.localEvent);  // Yerel değişkeni ilet
      },
      approveRequest() {
        this.$emit('approveRequest', this.localEvent); // Etkinliği onayla
      },
      rejectRequest() {
        this.$emit('rejectRequest', this.localEvent); // Etkinliği reddet
      },
    },
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 10px;
    text-decoration: underline;
    text-underline-offset: 7px;
  }
  
  p {
    margin: 5px 0;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: rgba(255, 255, 255, 0.858);
    padding: 20px;
    border: 2px solid black;
    border-radius: 8px;
    width: 400px;
    text-align: center;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
  }
  
  .close:hover {
    background-color: rgb(244, 78, 78);
  }
  
  .edit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
  
  .edit-btn:hover {
    color: darkblue;
  }
  </style>
  