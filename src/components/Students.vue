<template>
    <div>
        <v-simple-table fixed-header height="600px">
            <template v-slot:default>
            <thead>
                <tr>
                    <th>#</th>
                    <th class="text-left">Apellidos y nombres</th>
                    <th class="text-center">Grado y sección </th>
                    <!--<th class="text-center">Número de observaciones </th>-->
                    <th class="text-left">Detalle </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in students" :key="item.name">
                <td>{{index+1}}</td>
                <td>{{ item.nombre }} {{item.paterno}} {{item.materno}}</td>
                <td class="text-center">5to U</td>
                <!--<td class="text-center"> <v-chip :color="setChipColor(item.calories)" dark>{{ item.calories }}</v-chip> </td>-->
                <!--<td class="text-center">{{cant}}</td>-->
                <td>
                    <student-detail :idstudent="item.id"  :grupo="grado" :name="item.nombre+' '+item.paterno+' ' + item.materno" />
                </td>
                
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import StudentDetail from './StudentDetail.vue'
import {db} from '../main'
export default {
    name:'Students',
    props:['grado'],
    components:{
        StudentDetail
    },
    data:()=>({
        students: [],
        
    }),
    methods:{
        setChipColor(n){
            if(n<=5)
            {
                return "green";
            }
            else if(n<=10)
            {
                return "yellow"
            }
            else if(n<=20)
            {
                return "orange"
            }
            else
            {
                return "red"
            }
        },

        async getEvents(){
            //console.log("llegueee")
            
            try {
                const snapshot = await db.collection(this.grado).get();
                const events=[];
                //console.log(snapshot);
                snapshot.forEach(doc=>{
                    //console.log(doc.data());
                    let eventoData = doc.data()
                    eventoData.id = doc.id;
                    //console.log(eventoData.id)
                    events.push(eventoData);
                })
                this.students = events;
            } catch (error) {
                console.log(error)
            }
        }

    },
    created(){
        this.getEvents()
    }
}
</script>