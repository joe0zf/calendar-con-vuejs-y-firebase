<template>
    <div>
        <v-card>
            <v-card-title>
                Reporte de tareas de tercero B de secundaria
            </v-card-title>
            <v-container >
                <v-row justify="center">
                    <v-col cols="10">
                        <calendar grupo="tareas3b"/>
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