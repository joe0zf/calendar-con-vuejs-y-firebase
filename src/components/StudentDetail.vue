<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="green"
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>
                        mdi-eye
                    </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{name}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">Ok</v-btn>
                    </v-toolbar-items>
                    </v-toolbar>
                    <v-container>
                        <v-card-title>Reporte de incidencias  <add-report-student :id="idstudent" grupo="quintosec" @refresh_data="getEvents"/> </v-card-title>
                        <v-row>
                            <v-col>
                                <v-simple-table fixed-header height="400px">
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                        <th class="text-left">Fecha</th>
                                        <th class="text-left">Descripción</th>
                                        <th class="text-left">Docente</th>
                                        <th class="text-left">Curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in reportes" :key="item.id">
                                        <td>{{ item.fechayhora }}</td>
                                        <td>{{ item.descripcion }}</td>
                                        <td>{{ item.docente }}</td>
                                        <td>{{ item.curso }}</td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-container>
                    

                </v-card>
                </v-dialog>
        </v-row>
        
    </div>
</template>
<script>
import AddReportStudent from './AddReportStudent.vue'
import {db} from '../main'
export default {
    name:'StudentDetail.vue',
    components:{
        AddReportStudent
    },
    props:['name','idstudent','grupo'],
    data:()=>({
        dialog:false,
        notifications: false,
        sound: true,
        widgets: false,
        reportes: []
    }),
    methods:{
        async getEvents(){
            //console.log("llegueee")
            
            try {
                const snapshot = await db.collection(this.grupo).doc(this.idstudent).collection('reporte').get();
                const events=[];
                //console.log(snapshot);
                snapshot.forEach(doc=>{
                   // console.log(doc.data());
                    let eventoData = doc.data()
                    eventoData.id = doc.id;
                    //console.log(eventoData.id)
                    events.push(eventoData);
                })
                this.reportes = events;
                //this.$emit("refresh_cont",this.reportes.length)
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.getEvents();
    }
}
</script>