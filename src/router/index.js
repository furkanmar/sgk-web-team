
import { createRouter, createWebHistory } from 'vue-router';

import CategoryOne from '../components/Pages/CategoryOne.vue';
import CategoryTwo from '@/components/Pages/Message/CategoryTwo.vue';
import CategoryThree from '@/components/Pages/CategoryThree.vue';
import CategoryFour from '@/components/Pages/CategoryFour.vue';
import CategoryFive from '@/components/Pages/CategoryFive.vue';
import CategorySix from '@/components/Pages/CategorySix.vue';
import CategorySeven from '@/components/Activity/CategorySeven.vue';
import CategoryEight from '@/components/Pages/CategoryEight.vue';
import CategoryNine from '@/components/Pages/CategoryNine.vue';
import CategoryTen from '@/components/Pages/CategoryTen.vue';
import EventRequest from '@/components/Activity/EventRequest.vue';
import RequestedEvents from '@/components/Activity/RequestedEvents.vue';
const routes = [
  
    { path: '/:username/category1', component: CategoryOne },
    { path: '/:username/category2', component: CategoryTwo },
    { path: '/:username/category3', component: CategoryThree },
    { path: '/:username/category4', component: CategoryFour },
    { path: '/:username/category5', component: CategoryFive },
    { path: '/:username/category6', component: CategorySix },
    { path: '/:username/category7', component: CategorySeven },
    { path: '/:username/category8', component: CategoryEight },
    { path: '/:username/category9', component: CategoryNine },
    { path: '/:username/category10', component: CategoryTen },
    { path: '/event-request', component: EventRequest},
    {path: '/requested-events', component: RequestedEvents}
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
