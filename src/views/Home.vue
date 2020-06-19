<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col md="6">
          <chart-sec/>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
// @ is an alias to /src

import ChartSec from '@/components/ChartSec.vue'
export default {
  name: 'Home',
  components:{
    ChartSec
  }
}
</script>
