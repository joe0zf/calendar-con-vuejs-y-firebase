<template>
    <div>
        <v-card>
            <v-card-title>
                Reporte de tareas del 2do - A de secundaria 
            </v-card-title>
            <v-card-subtitle>Dificultad de la tarea asignada
                <v-chip color="#25B8A8" dark>Fácil</v-chip>
                <v-chip color="#3A6994" dark>Medio</v-chip> 
                <v-chip color="#E06962" dark>Difícil</v-chip> 
            </v-card-subtitle>
            <v-container >
                <v-row justify="space-around">
                    <v-col md="7">
                        <calendar grupo="tareas2a"/>
                    </v-col>
                    <v-col >
                        <resume-boxes dbtarea="tareas2a"/>
                    </v-col>
                </v-row>
                
            </v-container>
        </v-card>
        <v-card>
            <v-card-title>Observaciones a alumnos  <add-student gradoysec="segundoasec"/></v-card-title>
            <v-container>
                <v-row justify="center">
                    <v-col md="10">
                        <students grado="segundoasec"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        
    </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import Students from '@/components/Students.vue'
import AddStudent from '@/components/AddStudent.vue'
import ResumeBoxes from '@/components/ResumeBoxes.vue'
export default {
    components:{
        Calendar,
        Students,
        AddStudent,
        ResumeBoxes
    }
}
</script>