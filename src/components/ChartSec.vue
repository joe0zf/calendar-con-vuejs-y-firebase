<template>
    <div>
        <BarChart :chart-data="dataCollection" :options="options">
            
        </BarChart>
    </div>
</template>

<script>
import BarChart from './BarChar.js';
import {db} from '../main'

export default {
    name:'ChartSec',
    
    components:{BarChart},
    data:()=>({
        dataCollection:null,
        loaded:false,
        totalHomeWork:[],
        options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
    }),
    async mounted(){
        
        await this.getTotalHomework();
        await this.fillData();
    },
    methods:{
        fillData(){
            this.dataCollection={
                labels:['1ro-A','1ro-B','2do-A','2do-B','3ro-A','3ro-B','4to','5to'],
                datasets:[
                    {
                        label:'Total de tareas asignadas',
                        backgroundColor:'rgba(255,119,131,.7)',
                        borderColor:'rgba(255,119,131,1)',
                        pointBackgroundColor:'black',
                        borderWidth:1,
                        pointBorderColor:'rgb(255,119,131)',
                        data:this.totalHomeWork,
                    },
                ]
            }

        },

       async getTotalHomework(){
            try {
                const snapshot = await db.collection('tareas1a').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }

            try {
                const snapshot = await db.collection('tareas1b').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }
            try {
                const snapshot = await db.collection('tareas2a').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }
            try {
                const snapshot = await db.collection('tareas2b').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }
            try {
                const snapshot = await db.collection('tareas3a').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }
            try {
                const snapshot = await db.collection('tareas3b').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }

            try {
                const snapshot = await db.collection('tareas4').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
            } catch (error) {
                console.log(error)
            }

            try {
                const snapshot = await db.collection('tareas5').get();
                const events=[];
                snapshot.forEach(doc=>{
                    let eventoData = doc.data()
                    events.push(eventoData);
                })
                this.totalHomeWork.push(events.length);
                console.log(this.totalHomeWork)
            } catch (error) {
                console.log(error)
            }
        }
    }
    
}
</script>