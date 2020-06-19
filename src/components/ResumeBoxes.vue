<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="11">
                    <v-card color="#434343" dark>
                        <v-card-title> <v-icon size="45">mdi-calendar-today</v-icon> Total de tareas de hoy</v-card-title>
                        <v-row class="my-0 mx-0" justify="center">
                            <v-col class="display-2" cols="4" align-self="center">
                                {{toDay}} 
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="11">
                    <v-card color="#434343" dark>
                        <v-card-title class="my-0"> <v-icon size="45">mdi-calendar-week</v-icon>   Total de tareas de la semana</v-card-title>
                        <v-row class="my-0 mx-0" justify="center">
                            <v-col class="display-2" cols="4">
                                {{toWeek}}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="11">
                    <v-card color="#434343" dark>
                        <v-card-title> <v-icon size="45">mdi-calendar-month</v-icon> Total de tareas del mes</v-card-title>
                        <v-row class="my-0 mx-0" justify="center">
                            <v-col class="display-2" cols="4">
                                {{toMonth}}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import {db} from '../main'
import moment from 'moment'
moment().format();
export default {
    name:'ResumeBoxes',
    props:['dbtarea'],
    data:()=>({
        homeWorkToDay:null,
        homeWorkToWeek:null,
        homeWorkToMonth:null,
        allHomeWorks:[]
    }),
    computed:{
        
        toDay(){
            let cont=0;
            let to_day = moment().startOf('day');
            console.log(to_day);
            for(let item of this.allHomeWorks)
            {
                let ini = moment(item.start)._d;
                let fin = moment(item.end)._d;
                
                if(+ini<= +to_day && +to_day <= +fin)
                {
                    //console.log(fin);
                    cont++;
                }
            }
            return cont
        },
        toWeek(){
            //let to_day = new Date(); // get current date
            //console.log(to_day)
            //let first = to_day.getDate() - to_day.getDay(); // First day is the day of the month - the day of the week
            //let last = first + 6; // last day is the first day + 6

            let firstday = moment().startOf('week')._d; //new Date(to_day.setDate(first));
            let lastday = moment().endOf('week')._d//new Date(to_day.setDate(last));
            //console.log(lastday.toISOString().substr(8,2))
            //console.log(lastday)
            
            let cont=0;
            for(let item of this.allHomeWorks)
            {
                let ini = moment(item.start)._d//new Date(item.start);
                let fin = moment(item.end)._d//new Date(item.end);
                if(+fin<=+lastday && +fin >= +firstday && +ini>= +firstday && +ini<= +lastday){
                    cont++;
                }
                else if(+ini <= +firstday && +firstday<= +fin || +ini<=lastday && +lastday <= +fin){
                    cont++;
                }
                
            }


            return cont;
        },
        toMonth(){
            let this_month = new Date().toISOString().substr(5,2)
            let cont=0;
            for(let item of this.allHomeWorks)
            {
                let ini = item.start.substr(5,2);
                let fin = item.end.substr(5,2);
                
                    if(ini==this_month || fin == this_month)
                    {
                        cont++;
                    }
                    
                
            }
            return cont
        }
    },
    methods:{
        async getEvents(){
            try {
                const snapshot = await db.collection(this.dbtarea).get();
                const allHomeWorks=[];
                snapshot.forEach(doc=>{
                    //console.log(doc.data());
                    let eventoData = doc.data()
                    eventoData.id = doc.id;
                    allHomeWorks.push(eventoData);
                })
                this.allHomeWorks = allHomeWorks;
               // console.log(this.allHomeWorks)
            } catch (error) {
                console.log(error)
            }
        },
          getEventsRealTime(){
            let self = this;
            db.collection(this.dbtarea).onSnapshot(function(snapshot) {
                let tarea ={};
                let idfirebase;
                    snapshot.docChanges().forEach(function(change) {
                        if (change.type === "added") {
                            tarea=change.doc.data();
                            idfirebase = change.doc.id;
                        }
                        
                    });
                    const resultado = self.allHomeWorks.find( idp => idp.id == idfirebase )
                    if(!resultado)
                    {
                        self.allHomeWorks.push(tarea);
                        console.log(tarea)
                    }
                    
                    
                });

        },
    },
    mounted(){
        this.getEvents();
        this.getEventsRealTime();
    }
}
</script>