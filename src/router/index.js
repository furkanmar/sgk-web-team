
import { createRouter, createWebHistory } from 'vue-router';

import CategoryOne from '../components/Pages/CategoryOne.vue';
import CategoryTwo from '@/components/Pages/CategoryTwo.vue';
import CategoryThree from '@/components/Pages/CategoryThree.vue';
import CategoryFour from '@/components/Pages/CategoryFour.vue';
import CategoryFive from '@/components/Pages/CategoryFive.vue';
import CategorySix from '@/components/Pages/CategorySix.vue';
import CategorySeven from '@/components/Pages/CategorySeven.vue';
import CategoryEight from '@/components/Pages/CategoryEight.vue';
import CategoryNine from '@/components/Pages/CategoryNine.vue';
import CategoryTen from '@/components/Pages/CategoryTen.vue';


const routes = [
  
    { path: '/category1', component: CategoryOne },
    { path: '/category2', component: CategoryTwo },
    { path: '/category3', component: CategoryThree },
    { path: '/category4', component: CategoryFour },
    { path: '/category5', component: CategoryFive },
    { path: '/category6', component: CategorySix },
    { path: '/category7', component: CategorySeven },
    { path: '/category8', component: CategoryEight },
    { path: '/category9', component: CategoryNine },
    { path: '/category10', component: CategoryTen },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
