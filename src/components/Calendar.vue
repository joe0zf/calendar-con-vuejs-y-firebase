<template>
  <v-row class="fill-height">
    <v-col>
      <v-btn color="primary" outlined class="mr-4" @click="dialog=true" block>
              Agregar tarea
          </v-btn>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            :weekdays="[0, 1, 2, 3, 4, 5, 6]"
            locale="es"
            :short-weekdays="false"
          ref="calendar"
          v-model="focus"
          color="secondary"
          :events="events"
          :event-color="getEventColor"
          
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-dialog v-model="dialog" max-width="700">
            <v-card>
                <v-card-title>Registrar nueva tarea</v-card-title>
                <v-container>
                    <v-row justify="center">
                        <v-col cols="8">
                            <div >
                                <v-text-field 
                                    label="Nombre del curso" 
                                    type="text" 
                                    v-model="name">
                                </v-text-field>
                                <v-text-field 
                                    label="Inicio de la tarea" 
                                    type="date" 
                                    v-model="start">
                                </v-text-field>
                                <v-text-field 
                                    label="Fin de la tarea" 
                                    type="date" 
                                    v-model="end">
                                </v-text-field>

                                <v-radio-group v-model="radioGroup" row label="Dificultad de la tarea: ">
                                  <v-radio
                        
                                    label="Fácil"
                                    value="facil"
                                  ></v-radio>
                                  <v-radio
                        
                                    label="Medio"
                                    value="medio"
                                  ></v-radio>
                                  <v-radio
                        
                                    label="Dificil"
                                    value="dificil"
                                    
                                  ></v-radio>
                                </v-radio-group>
                                
                                <v-btn type="submit" color="green" block dark  @click.stop="addTarea()" >Agregar</v-btn>
                                <v-btn type="submit" color="red"  class="mt-5" block outlined  @click.stop="dialog = false" >Cancelar</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              
            </v-toolbar>
            <v-card-text>
              <div>Autor: {{selectedEvent.author}}</div>
              <div> fecha inicio: {{selectedEvent.start | moment('DD-MM-YYYY')}}</div>
              <div> fecha fin: {{selectedEvent.end | moment('DD-MM-YYYY')}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
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
  </v-row>
</template>

<script>
import {db} from '../main'

  export default {
    name:'Calendar',
    props:['grupo'],
    data: () => ({
      snackbar: false,
      erroMsg:'',
      timeout: 3000,
      today:Date.now(),
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        '4day': '4 Dias',
      },
      
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      color:"#43B684",
      name:null,
      details:null,
      dialog:false,
      radioGroup:'medio'
    }),
    computed: {
      
      currentUser(){
        let user = JSON.parse(localStorage.getItem('user-email'));
        return user;
      },
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
      colorCurso(){
        if(this.radioGroup =='facil'){
          return "#25B8A8";
        }
        else if(this.radioGroup=="medio"){
          return "#3A6994";
        }
        else {
          return "#E06962"
        }
      }
    },
    created(){
      this.getEvents();
    },
    mounted () {
      this.$refs.calendar.checkChange();
      this.getEventsRealTime();
    },
    methods: {
        async getEvents(){
            try {
                const snapshot = await db.collection(this.grupo).get();
                const events=[];
                snapshot.forEach(doc=>{
                    //console.log(doc.data());
                    let eventoData = doc.data()
                    eventoData.id = doc.id;
                    events.push(eventoData);
                })
                this.events = events;
            } catch (error) {
                console.log(error)
            }
        },

        getEventsRealTime(){
            let self = this;
            db.collection(this.grupo).onSnapshot(function(snapshot) {
                let tarea ={};
                let idfirebase;
                    snapshot.docChanges().forEach(function(change) {
                        if (change.type === "added") {
                           //console.log("New city: ", change.doc.data());
                            //this.events.push(change.doc.data());
                            tarea=change.doc.data();
                            idfirebase = change.doc.id;
                        }
                        if (change.type === "modified") {
                            //console.log("Modified city: ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            //console.log("Removed city: ", change.doc.data());
                        }
                        
                    });
                    const resultado = self.events.find( idp => idp.id == idfirebase )
                    if(!resultado)
                    {
                        //console.log("toy dentro")
                        //console.log(idfirebase)
                        //console.log(self.events)
                        self.events.push(tarea);
                    }
                    
                    
                });

        },

        async addTarea(){
            try {
              this.dialog=false;
                if(!!this.name && !!this.start && !!this.end ){
                    await db.collection(this.grupo).add({
                        name:this.name,
                        start:this.start,
                        end:this.end,
                        color:this.colorCurso,
                        author:this.currentUser,
                    })

                    this.getEvents();
                    this.name=null;
                    this.start = null;
                    this.end = null;
                    this.color = null;
                    this.erroMsg ="Datos guardados correctamente";
                    this.snackbar = true;
                    

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

      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        

        this.start = start
        this.end = end
        
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>
