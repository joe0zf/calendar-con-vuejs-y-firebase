<template>
  <v-app>
    <nav-bar v-if="existUser()"/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import firebase from 'firebase'
export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    //
  }),
  methods:{
    existUser(){
      
      let usuario = firebase.auth().currentUser;
      //console.log(!!usuario);
      return !!usuario;
    }
  }
};
</script>
