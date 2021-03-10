<template>
  <v-app>
    <div>
      <v-sheet tile height="54" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-menu offset-y >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#7F74B4"
          dark
          v-bind="attrs"
          v-on="on"
        >
         使用者
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="sendDateTime"
        >
        <template v-slot:day-body="{ date, week }">
            <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
          </template>
        </v-calendar>
      </v-sheet>
      <br />

      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#7F74B4" dark v-bind="attrs" v-on="on">
              新增預約
            </v-btn>
          </template>

          <v-card >
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
                          label="請選擇日期"
                          hint="YYYY/MM/DD"
                          persistent-hint
                          readonly
                          required
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="selectedDate"
                        no-title
                        ref="datepicker"
                        @input="showPicker = false "
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
<!--------------------------------------------------------------------------->
                  <v-col cols="12" sm="6" md="6">
                    <v-dialog
                      ref="dialog1"
                      v-model="modal1"
                      :return-value.sync="start"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        id="start"
                        ref="start"
                          v-model="start"
                          label="開始時間"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="modal1" v-model="start" full-width scrollable="true" format="24hr">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal1 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog1.save(start)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
<!--------------------------------------------------------------------------->
                  <v-col cols="12" sm="6" md="6">
                    <v-dialog
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="end"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="end"
                          ref="end"
                          label="結束時間"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="modal2" v-model="end" full-width scrollable="true" format="24hr">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog2.save(end)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
<!--------------------------------------------------------------------------->
                </v-row>
              </v-container>
              <small>*為必填</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false; sendDateTime()"
                
              >
                確定新增
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    type: "month",
    types: ["month", "week", "day"],
    weekday: [1, 2, 3, 4, 5, 6, 0],
    value: "",
    ready: false,
    events: [],

    items: [
        { title: '使用者1' },
        { title: '使用者2' },
        { title: '使用者3' },
        { title: '使用者4' },
      ],

    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],

    dialog: false,
    showPicker: false,
    selectedDate: new Date().toISOString().substring(0, 10),

    start: new Date(),
    end: new Date(),
    modal2: false,
    modal1: false,
  }),


  methods: {

    getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)

        this.cal.scrollToTime(first)
      },
      updateTime () {
        setInterval(() => this.cal.updateTimes(), 60 * 1000)
      },

    sendDateTime(){
      const events = [];

      const time ={}
      time.date= this.$refs.datepicker.value
      time.start= this.$refs.start.value
      time.end = this.$refs.end.value   
  
      
    events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: time.start,
          end: time.end,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
        this.events = events;
    },


    getEventColor(event) {
      return event.color;
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },

   computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
    },

    mounted () {
      this.ready = true
      this.scrollToTime()
      this.updateTime()
    },
};

</script>

<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>