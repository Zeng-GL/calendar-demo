<template>
  <v-app id="inspire">
    <v-container fill-height fluid>
      <v-row justify="center"  class="text-center">
        <v-date-picker
          v-model="selectdate"
          color="#7F74B4"
          header-color="white"
          scrollable="true"
          first-day-of-week="1"
          show-adjacent-months="true"
          elevation="15"
          reactive="true"
          actions
        >
        
          <template scope="{ save }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              depressed 
              color="#7F74B4"
              class="white--text"
              elevation="5"
              @click="save"
                >選擇</v-btn>
            </v-card-actions>
          </template>
        
        </v-date-picker>
      </v-row>
    </v-container>
  </v-app>
</template>




<script>
export default {
  name: "App",

  data() {
    return {
      // attrs: [
      //   {
      //     key: "today",
      //     highlight: {
      //       backgroundColor: "#ff8080",
      //     },
      //     dates: new Date(2018, 0, 1),
      //   },
      // ],
    };
  },
};
</script>



