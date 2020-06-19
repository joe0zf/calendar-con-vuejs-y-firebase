<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="490">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                >
                    <v-icon>
                        mdi-plus
                    </v-icon>
                
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">Agregar a nuevo estudiante</v-card-title>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field type="text" v-model="nombre" label="Nombres"></v-text-field>
                                <v-text-field type="text" v-model="paterno" label="Apellido paterno"></v-text-field>
                                <v-text-field type="text" v-model="materno" label="Apellido materno"></v-text-field>
                                <v-text-field type="text" v-model="dni" label="DNI"></v-text-field>
                                <v-text-field type="text" v-model="grupo" label="Grado y Sección"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">Cerrar</v-btn>
                <v-btn color="green darken-1" text @click="addStudent()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </div>
</template>
<script>
import {db} from '../main'
export default {
    name:'AddStudent',
    props:['gradoysec'],
    data:()=>({
        dialog:false,
        nombre:'',
        paterno:'',
        materno:'',
        dni:'',
        grupo:''

    }),
    methods:{
        async addStudent(){
            try {
                if(this.nombre&&this.paterno&&this.materno){
                    await db.collection(this.gradoysec).add({
                        dni:this.dni,
                        nombre:this.nombre,
                        paterno:this.paterno,
                        materno:this.materno,
                        grupo:this.grupo
                    })

                        this.dni="";
                        this.nombre="";
                        this.paterno="";
                        this.materno="";
                        this.grupo=""

                }   
                else{
                    console.log("datos obligatorios")
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>