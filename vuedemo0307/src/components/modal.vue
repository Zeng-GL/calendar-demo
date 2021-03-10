<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#7F74B4" dark v-bind="attrs" v-on="on"> 新增預約 </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">請選擇項目及時間</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="['美甲保養', '護膚', '按摩', '整形']"
                  label="請填入預約項目"
                  required
                ></v-select>
              </v-col>


              <v-col cols="12">
                <v-menu
                  v-model="showPicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedDate"
                      label="Choose the date"
                      hint="YYYY/MM/DD"
                      persistent-hint
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    no-title
                    @input="showPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>



            </v-row>
          </v-container>
          <small>*為必填</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            確定新增
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  name: "modal",

  data: () => ({
    dialog: false,
    showPicker: false,
    selectedDate: null,
  }),
};
</script>