<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="490">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                
                v-bind="attrs"
                v-on="on"
                class="mx-2" 
                fab 
                dark 
                color="indigo"
                >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">Agregar nueva incidencia </v-card-title>
                
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field type="date" label="Fecha" v-model="fecha"></v-text-field>
                            <v-text-field type="time" label="Hora aproximada" v-model="hora"></v-text-field>
                            <v-text-field type="text" label="Nombre del docente" v-model="docente"></v-text-field>
                            <v-text-field type="text" label="Curso" v-model="curso"></v-text-field>
                            <v-textarea
                                clearable
                                clear-icon="mdi-close"
                                label="Descripción"
                                v-model="descripcion"
                                ></v-textarea>
                        </v-col>
                    </v-row>
                    
                </v-container>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">Cancelar</v-btn>
                <v-btn color="green darken-1" text @click="addReport()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
            
        </v-dialog>
        <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                >
                {{ erroMsg }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
        </v-snackbar>
    </div>
</template>

<script>
import {db} from '../main'
export default {
    name:'AddReportStudent',
    props:['id','grupo'],
    data:()=>({
        snackbar: false,
        erroMsg:'',
        timeout: 3000,
        dialog:false,
        fecha:null,
        hora:null,
        docente:"",
        curso:"",
        descripcion:"",
        
    }),
    methods:{
        async addReport(){
            try {
                if(this.fecha && this.hora &&this.docente&&this.curso&&this.descripcion){
                    await db.collection(this.grupo).doc(this.id).collection('reporte').add({
                        curso:this.curso,
                        descripcion:this.descripcion,
                        docente:this.docente,
                        fechayhora:this.fecha+' '+this.hora
                    })

                    //this.getEvents();
                    this.curso="";
                    this.descripcion="";
                    this.docente="";
                    this.fecha="";
                    this.hora="";
                    this.$emit('refresh_data')
                    this.erroMsg ="Datos guardados correctamente";
                    this.snackbar = true;
                    this.dialog = false;
                }   
                else{
                    this.erroMsg ="Complete todos los campos por favor :)";
                    this.snackbar = true;
                }
            } catch (error) {
                    this.erroMsg =error;
                    this.snackbar = true;
            }
        },
    }
}
</script>