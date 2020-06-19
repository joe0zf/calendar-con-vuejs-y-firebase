<template>
    <div>
        <v-card>
            <v-card-title>
                Reporte de tareas de segundo A de secundaria
            </v-card-title>
            <v-container >
                <v-row justify="center">
                    <v-col cols="10">
                        <calendar grupo="tareas2a"/>
                    </v-col>
                </v-row>
                
            </v-container>
        </v-card>
        
    </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
export default {
    components:{
        Calendar
    }
}
</script>