<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="#e1e1e1"
            
            >
            <v-list subheader>
                
                
                <v-list-item
                router to="/"
                >
                    <v-list-item-icon>
                    <v-icon>mdi-chart-bar</v-icon>
                    </v-list-item-icon>
                    
                        <v-list-item-title>Panel</v-list-item-title>
                    
                </v-list-item>
                <v-subheader>Primaria</v-subheader>
                
                 
                
                <v-list-group
                    v-for="item in primaria"
                    :key="item.name"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="subItem in item.subItems"
                    :key="subItem.title"
                    router :to="subItem.link"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item router to="/tercero-primaria">
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Tercero</v-list-item-title>
                </v-list-item>
                <v-list-group
                    v-for="item in primariaCuarto"
                    :key="item.name"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="subItem in item.subItems"
                    :key="subItem.title"
                    router :to="subItem.link"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-item router to="/quinto-primaria">
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Quinto</v-list-item-title>
                </v-list-item>
                <v-list-item router to="/sexto-primaria">
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Sexto</v-list-item-title>
                </v-list-item>
                
                <v-subheader>Secundaria</v-subheader>

                <v-list-group
                    v-for="item in itemsMenu"
                    :key="item.name"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="subItem in item.subItems"
                    :key="subItem.title"
                    router :to="subItem.link"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item router to="/cuarto-secundaria">
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Cuarto</v-list-item-title>
                </v-list-item>
                <v-list-item router to="/quinto-secundaria">
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Quinto</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    

                    <v-list-item-title>@cramertech</v-list-item-title>
                </v-list-item>

                </v-list>
            </v-navigation-drawer>
            <v-app-bar
                app
                clipped-left
                color="#001d26"
                dense
                dark
                >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-avatar>
                <img
                    src="@/assets/logo-cramer.png"
                    
                >
                </v-avatar>
                <v-toolbar-title class="ml-8 align-center">
                    <span class="title">Reporte de tareas </span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-row class="d-flex flex-row justify-end">
            
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" dark>
                                    <v-icon @click="logout()">
                                        mdi-logout
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Salir</span>
                        </v-tooltip>
                        
                    
                </v-row>
                </v-app-bar>

    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'navbar',
    data:()=>({
        drawer:true,
        itemsMenu:[
            {title:'Primero',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Primero A',link:'/primero-a-secundaria'},{title:'Primero B',link:'/primero-b-secundaria'}]},
            {title:'Segundo',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Segundo A',link:'/segundo-a-secundaria'},{title:'Segundo B',link:'/segundo-b-secundaria'}]},
            {title:'Tercero',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Tercero A',link:'/tercero-a-secundaria'},{title:'Tercero B',link:'/tercero-b-secundaria'}]},
        ],
        primaria:[
            {title:'Primero',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Primero A',link:'/primero-a-primaria'},{title:'Primero B',link:'/primero-b-primaria'},{title:'Primero C',link:'/primero-c-primaria'}]},
            {title:'Segundo',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Segundo A',link:'/segundo-a-primaria'},{title:'Segundo B',link:'/segundo-b-primaria'}]},
           
        ],
        primariaCuarto:[{title:'Cuarto',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Cuarto A',link:'/cuarto-a-primaria'},{title:'Cuarto B',link:'/cuarto-b-primaria'}]},]
    }),
    components:{
    },
    methods:{
        ruta(r){
            if(r=='panel')
            {
                this.$router.replace('/')
            }
        },
        logout(){
            firebase.auth().signOut().then(()=>this.$router.replace('/login'));
            localStorage.clear();
        }
    }
}
</script>