import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


import firebase from 'firebase/app'
import 'firebase/firestore';
Vue.use(require('vue-moment'));

const firebaseConfig = {
  apiKey: "AIzaSyCXj2xGLPIGZkH1c2WdjnFWraa2vdddgIw",
    authDomain: "reporte-tareas-40d34.firebaseapp.com",
    databaseURL: "https://reporte-tareas-40d34.firebaseio.com",
    projectId: "reporte-tareas-40d34",
    storageBucket: "reporte-tareas-40d34.appspot.com",
    messagingSenderId: "495352698282",
    appId: "1:495352698282:web:cd388403065338df4c47d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(){
  //console.log(user)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

})


