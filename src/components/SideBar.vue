<template>
  <div class="sidebar-wrapper d-flex flex-column bg-dark" :class="{ 'collapsed': isScreenSmall ? isCollapsed : false }" style="">
    <img src="@/assets/cs-logo.png" alt="CS Logo" class="my-3 mx-5 align-self-center" style="width: 50px; height: auto;">
    <button id="toggle" class="toggle-button btn btn-dark mx-3" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div class="p-2 sidebar-container">
      <div class="list-group flex-grow-1">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.path"
          class="list-group-item border border-2 d-flex align-items-center m-1"
          :class="{ 'active': $route.path === category.path }"
          style=""
        >
          <i :class="category.icon" class="me-2"></i>
          <span v-if="isScreenSmall ? !isCollapsed : true">{{ category.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const minScreenWidthForToggle = 1026;

export default {
  name: 'SideBar',
  data() {
    return {
      isCollapsed: this.getScreenSmall(),
      isScreenSmall: this.getScreenSmall(),
      categories: [
        { id: 1, name: 'Kategori 1', path: '/category1', icon: 'fas fa-home' },
        { id: 2, name: 'Kategori 2', path: '/category2', icon: 'fas fa-user' },
        { id: 3, name: 'Kategori 3', path: '/category3', icon: 'fas fa-cog' },
        { id: 4, name: 'Kategori 4', path: '/category4', icon: 'fas fa-chart-bar' },
        { id: 5, name: 'Kategori 5', path: '/category5', icon: 'fas fa-bell' },
        { id: 6, name: 'Kategori 6', path: '/category6', icon: 'fas fa-envelope' },
        { id: 7, name: 'Kategori 7', path: '/category7', icon: 'fas fa-calendar' },
        { id: 8, name: 'Kategori 8', path: '/category8', icon: 'fas fa-book' },
        { id: 9, name: 'Kategori 9', path: '/category9', icon: 'fas fa-folder' },
        { id: 10, name: 'Kategori 10', path: '/category10', icon: 'fas fa-tools' },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    getScreenSmall() {
      return window.innerWidth < minScreenWidthForToggle;
    },
    updateScreenSmall() {
      this.isScreenSmall = this.getScreenSmall();
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenSmall);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSmall);
  }
};
</script>

<style scoped>
.sidebar-wrapper {
  width: 200px;
  transition: width 0.3s ease-in-out;
}

.sidebar-wrapper.collapsed {
  width: 100px;
}

.sidebar-container {
  overflow: scroll;
}

.sidebar-wrapper.collapsed .list-group-item {
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
}

.sidebar-wrapper.collapsed i {
  margin-right: 0;
}

.toggle-button {
  transition: transform 0.3s ease-in-out;
}

.list-group-item {
  transition: padding 0.3s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
}

.list-group-item.active {
  background-color: #5c5c5c;
  color: white;
}

.list-group-item:hover {
  cursor: pointer;
}

@media only screen and (min-width: 1026px) {
  #toggle {
    display: none;
  }
}
</style>
