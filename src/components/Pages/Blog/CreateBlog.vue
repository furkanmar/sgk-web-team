<template>
  <div class="container">
    <h1>Yeni Blog</h1>

    <!-- Quill Editörü -->
    <div v-show="isEditing">
      <div ref="editor" class="quill-editor"></div>
    </div>
    <div v-show="!isEditing" class="static-content" v-html="staticContent" @click="toggleEditor"></div>
    
    <form @submit.prevent="addBlog">
      <div class="form-group">
        <label for="title">Başlık</label>
        <input v-model="title" type="text" id="title" required placeholder="Blog başlığını yazın" />
      </div>

      <div class="form-group">
        <label for="content">İçerik</label>
        <textarea v-model="content" id="content" required placeholder="Blog içeriğini yazın"></textarea>
      </div>

      <div class="form-group">
        <label for="category">Kategori</label>
        <select v-model="category" id="category" required>
          <option value="teknoloji">Genel</option>
          <option value="saglik">Siber Güvenlik</option>
          <option value="egitim">Eğitim</option>
          <option value="sorun">Sorun</option>
          <option value="oneri">Öneri</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image" class="file-label">Resim Ekle</label>
        <input type="file" @change="handleImageUpload" id="image" class="file-input" />
      </div>

      <button type="submit">Paylaş</button>
    </form>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  data() {
    return {
      title: "",
      content: "",
      category: "",
      image: null,
      isEditing: true,
      staticContent: ""
    };
  },
  mounted() {
    this.initQuill();
  },
  methods: {
    initQuill() {
      this.quill = new Quill(this.$refs.editor, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
          ]
        }
      });
    },
    addBlog() {
      if (!this.title || !this.content) {
        alert("Başlık ve içerik zorunludur!");
        return;
      }

      const imageUrl = this.image ? URL.createObjectURL(this.image) : null;

      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push({
        id: this.generateUUID(),
        title: this.title,
        content: this.content,
        category: this.category,
        image: imageUrl,
        date: new Date()
      });

      localStorage.setItem("blogs", JSON.stringify(blogs));

      this.$router.push(`/${this.$route.params.username}/category5`);
    },
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    generateUUID() {
      return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    toggleEditor() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.staticContent = this.quill.root.innerHTML;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  color: #2e4f14;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #2e4f14;
  outline: none;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

button {
  padding: 12px 20px;
  background-color: #2e4f14;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #245b10;
}

.file-input {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 12px 20px;
  background-color: #2e4f14ad;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #245b10;
}
</style>
