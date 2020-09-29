import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


import firebase from 'firebase/app'
import 'firebase/firestore';
Vue.use(require('vue-moment'));

const firebaseConfig = {
  apiKey: "################################",
    authDomain: "###########################",
    databaseURL: "###############################",
    projectId: "######################4",
    storageBucket: "###########",
    messagingSenderId: "###############",
    appId: ":w#####################"
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


