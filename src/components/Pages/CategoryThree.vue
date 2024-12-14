<template>
  <div>
    <h2>Blog</h2>
    <div class="blog-container">
      <div v-for="(blog, index) in blogs" :key="index" class="blog-post">
        <h3 @click="navigateToBlog(blog)">{{ blog.title }}</h3>
        <p @click="navigateToBlog(blog)">{{ blog.content }}</p>
        <span class="blog-author">Yazar: {{ blog.author }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryThree',
  data() {
    return {
      blogs: [
        { title: "Başlık 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor nec magna ullamcorper venenatis. Sed eu sapien sed ligula luctus suscipit non non elit. Donec venenatis, neque non gravida faucibus, nulla lectus lacinia arcu, in fermentum neque metus non velit. Praesent vel nulla ut lorem fermentum malesuada. Morbi vehicula convallis magna, eget accumsan nisi auctor sed. Sed convallis, elit sit amet convallis fermentum, metus purus accumsan ipsum, sit amet pharetra felis ipsum vitae nulla. Vestibulum eget eros velit. Donec venenatis eros id lacus consequat, ut vulputate nulla cursus. Aenean auctor elit in ipsum vehicula, eget fermentum lectus cursus. Mauris eget est ac sapien vehicula accumsan ac sit amet nulla. Suspendisse potenti. Cras vehicula, felis sed convallis posuere, augue ligula feugiat turpis, ac fermentum massa ligula at metus. In eu lorem non libero volutpat dapibus in nec nulla. Donec ut convallis eros.", author: "Yazar 1" },
        { title: "Başlık 2", content: "İçerik 2.", author: "Yazar 2" },
        { title: "Başlık 3", content: "İçerik 3.", author: "Yazar 3" },
        { title: "Başlık 4", content: "İçerik 4.", author: "Yazar 4" },
      ],
    };
  },
methods: {
    navigateToBlog(blog) {
      // Blog detay sayfasına yönlendirme
      this.$router.push({
        path: `/category3/blog/${blog.id}`,
        query: { title: blog.title, content: blog.content, author: blog.author },
      });
    },
  },
};
</script>

<style scoped>
.blog-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.blog-post {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  transition: box-shadow 0.3s ease;
}

.blog-post:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.blog-post h3 {
  margin: 0 0 10px;
  color: #333;
}

.blog-post p {
  margin: 0 0 10px;
  color: #555;
}

.blog-author {
  font-size: 0.9rem;
  color: #777;
  margin-left: 1000px;
}
</style>
