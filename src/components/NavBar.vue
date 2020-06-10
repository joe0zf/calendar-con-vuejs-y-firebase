<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="#e1e1e1"
            
            >
            <v-list>
                
                <v-list-item
                router to="/"
                >
                    <v-list-item-icon>
                    <v-icon>mdi-chart-bar</v-icon>
                    </v-list-item-icon>
                    
                        <v-list-item-title>Panel</v-list-item-title>
                    
                </v-list-item>
                
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
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Cuarto</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-calendar-check</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>Quinto</v-list-item-title>
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
                                    <v-icon >
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
export default {
    name:'navbar',
    data:()=>({
        drawer:true,
        itemsMenu:[
            {title:'Primero',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Primero A',link:'/primero-a'},{title:'Primero B',link:'/primero-b'}]},
            {title:'Segundo',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Segundo A',link:'/segundo-a'},{title:'Segundo B',link:'/segundo-b'}]},
            {title:'Tercero',icon:'mdi-calendar-check',link:'/',subItems:[{title:'Tercero A',link:'/tercero-a'},{title:'Tercero B',link:'/tercero-b'}]},
        ],
        notificaciones:[
            {nombre: 'Patricio Estrella', icon: 'mdi-storefront', ruta: '/detalle-servicio/:id', tipo: 'Servicio', msn: 'Se registro como nuevo Servicio'},
            {nombre: 'Bob Esponja', icon: 'mdi-moped', ruta: '/detalle-delivery/:id', tipo: 'Delivery', msn: 'Se registro como nuevo Delivery'},
            {nombre: 'Patricio Estrella', icon: 'mdi-storefront', ruta: '/detalle-servicio/:id', tipo: 'Servicio', msn: 'Se registro como nuevo Servicio'},
            {nombre: 'Bob Esponja', icon: 'mdi-moped', ruta: '/detalle-delivery/:id', tipo: 'Delivery', msn: 'Se registro como nuevo Delivery'},
            {nombre: 'Bob Esponja', icon: 'mdi-moped', ruta: '/detalle-delivery/:id', tipo: 'Delivery', msn: 'Se registro como nuevo Delivery'}
        ]
    }),
    components:{
    },
    methods:{
        urlSubItem(e){
            alert(e);
        },
        ruta(r){
            if(r=='panel')
            {
                this.$router.replace('/')
            }
        }
    }
}
</script>