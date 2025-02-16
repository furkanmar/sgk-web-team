<template>
  <div class="container">
    <h1>Blog</h1>

    <button @click="goToCreateBlog" class="new-blog-btn">Yeni Blog</button>

    <div class="sort-menu">
      <select v-model="selectedSort" @change="sortBlogs" class="sort-select">
        <option value="alphabetical">Alfabetik Sırala</option>
        <option value="newest">Yeni Tarihli Sırala</option>
        <option value="oldest">Eski Tarihli Sırala</option>
      </select>
    </div>

    <div v-if="blogs.length">
      <div v-for="(blog, index) in blogs" :key="index" class="blog-card" @click="openBlog(blog)">
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.content }}</p>
        <small>{{ blog.author || currentUser }}</small>
        <div class="blog-date">{{ formatDate(blog.date) }}</div>
      </div>
    </div>
    <p v-else>Henüz blog eklenmemiş.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      currentUser: localStorage.getItem('currentUser') || 'Anonim',
      selectedSort: 'alphabetical'
    };
  },
  methods: {
    goToCreateBlog() {
      this.$router.push(`/${this.$route.params.username}/category5/create`);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    sortBlogs() {
      const type = this.selectedSort;
      if (type === 'alphabetical') {
        this.blogs.sort((a, b) => a.title.localeCompare(b.title));
      } else if (type === 'newest') {
        this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (type === 'oldest') {
        this.blogs.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    },
    openBlog(blog) {
      this.$router.push({
        path: `/category5/blog/${blog.id}`,
        query: { title: blog.title, content: blog.content, author: blog.author }
      });
    }
  },
  mounted() {
    this.blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    this.sortBlogs();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.blog-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  background: #f9f9f9;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}
.blog-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.blog-date {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.85em;
  color: #7f8c8d;
}
.new-blog-btn {
  position: fixed;
  right: 30px;
  top: 30px;
  padding: 10px 15px;
  background: #2e4f14;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.sort-menu {
  margin: 15px 0;
  text-align: right;
}
.sort-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #2e4f14;
  background-color: #ecf0f1;
  color: #2e4f14;
}
</style>
