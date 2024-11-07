<script>
import {ref} from "vue";
import { useMouse } from '@vueuse/core'
const minScreenWidthForToggle = 1026;



export default {
  name: 'SideBar',
  setup() {
    // eslint-disable-next-line no-unused-vars
    const {x, y} = useMouse()
// eslint-disable-next-line no-unused-vars
    const one = ref<HTMLElement | null>null
    const two = ref<HTMLElement | null>null
    const nine = ref<HTMLElement | null>null
    return{x, y, one, two, nine
    }
  },
  data() {
    return {
      isCollapsed: this.getScreenSmall(),
      isScreenSmall: this.getScreenSmall(),
      categories: [
        { id: 1, name: 'Kategori 1', path: '/category1', icon: 'fas fa-home', ref: 'one' },
        { id: 2, name: 'Kategori 2', path: '/category2', icon: 'fas fa-user', ref: 'two' },
        { id: 3, name: 'Kategori 3', path: '/category3', icon: 'fas fa-cog', ref: 'three' },
        { id: 4, name: 'Kategori 4', path: '/category4', icon: 'fas fa-chart-bar', ref: 'four' },
        { id: 5, name: 'Kategori 5', path: '/category5', icon: 'fas fa-bell',ref: 'five' },
        { id: 6, name: 'Kategori 6', path: '/category6', icon: 'fas fa-envelope', ref: 'six' },
        { id: 7, name: 'Kategori 7', path: '/category7', icon: 'fas fa-calendar', ref: 'seven' },
        { id: 8, name: 'Kategori 8', path: '/category8', icon: 'fas fa-book', ref: 'eight' },
        { id: 9, name: 'Kategori 9', path: '/category9', icon: 'fas fa-folder', ref: 'nine' },
        { id: 10, name: 'Kategori 10', path: '/category10', icon: 'fas fa-tools', ref: 'ten' },
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


<template>
  <div class="sidebar-wrapper d-flex flex-column bg-dark" :class="{ 'collapsed': isScreenSmall ? isCollapsed : false }" style="">
    <img src="@/assets/cs-logo.png" alt="CS Logo" class="my-3 mx-5 align-self-center" style="width: 50px; height: auto;">
    <button id="toggle" class="toggle-button btn btn-dark mx-3" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div class="p-2 sidebar-container">
      <div class="p-2 list-group flex-grow-1 bg-dark position-relative"  >
        <div class="bg-dark position-relative" >
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.path"
          class="list-group-item d-flex align-items-center m-1 position-relative glow padding-glow"
          :class="{ 'active': $route.path === category.path }"
          :style="{
            '--x': `${x - (category.ref?.offsetLeft ?? 0)}px`,
            '--y': `${y - (category.ref?.offsetTop ?? 0)}px`
          }"
          :ref="category.ref"

        >
          <div class="position-relative flex-fill p-2 bg-dark">
          <i :class="category.icon" class="me-2 text-white"></i>
          <span v-if="isScreenSmall ? !isCollapsed : true" class="text-white">{{ category.name }}</span>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.sidebar-wrapper {
  width: 200px;
  transition: width 0.3s ease-in-out;
}
.glow::before{
  content: '';
  position: absolute;
  inset: 0px;
  background: radial-gradient(
  200px circle at var(--x) var(--y),
  #C7A257,
  transparent
  );
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
.padding-glow{
  padding-top: 2px;
  padding-right: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
}

@media only screen and (min-width: 1026px) {
  #toggle {
    display: none;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
