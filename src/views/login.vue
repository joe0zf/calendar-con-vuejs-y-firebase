<template>
    <div style="display:flex;height:98vh;align-items:center;">
        <v-container>
            <v-row justify="center">
                <v-col cols="6" :fullscreen="$vuetify.breakpoint.xsOnly">
                    <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="6" :fullscreen="$vuetify.breakpoint.xsOnly">
                    <v-form @submit.prevent="login()">
                        <v-text-field type="text" label="Correo institucional" v-model="email"></v-text-field>
                        <v-text-field type="password" label="Constraseña" v-model="password"></v-text-field>
                        <v-btn type="submit" color="primary" @click.stop="" block> Ingresar </v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
            {{ errorMsg }}
                <v-btn
                    color="blue"
                    text
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
            
    </div>
</template>

<script>
//import db from '@/firebase/init';
import firebase from 'firebase';

export default {
    name:'loginComp',
    data: () => ({
        snackbar:false,
        timeout: 3500,
        email:'',
        password:'',
        errorMsgStatus:false,
        errorMsg:''
        
    }),
    
    methods:{
        
        login(){
            this.errorMsg = '';
            if(this.email && this.password)
            {
                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then((user) =>{
                    this.$router.replace({name:'Home'});
                    console.log(user.user.email);
                    //this.setUser(user.user.email)
                    localStorage.setItem('user-email',JSON.stringify(user.user.email));
                })
                .catch(err =>{
                    this.snackbar = true;
                    this.errorMsg = err;
                })
            }
            else{
                    this.snackbar = true;
                    this.errorMsg = "Complete todos los campos por favor";
            }
        }
    }
}
</script>