import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Homelist from '../components/Homelist'
import Wish from '../components/WishList'
import News from '../components/News'
import Mine from '../components/Mine'
import HouseDetail from '../components/HouseDetail'
import AddHouse from '../components/AddHouse'
import MineRelease from '../components/MineRelease'
import HouseEdit from '../components/HouseEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homelist',
    component: Homelist,
    children:[
      { path: '', name: 'home', component: Home },
      { path: '/wish', name: 'wish', component: Wish },
      { path: '/news', name: 'news', component: News },
      { path: '/mine', name: 'mine', component: Mine },
    ]
  },
  {
    path: '/house_detail',
    name: 'house_detail',
    component: HouseDetail
  },
  {
    path: '/add_house',
    name: 'add_house',
    component: AddHouse
  },
  {
    path: '/mine_release',
    name: 'mine_release',
    component: MineRelease
  },
  {
    path: '/house_edit',
    name: 'house_edit',
    component: HouseEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
