<template>
  <v-row justify="center" class="text-center">
    <v-col>
      <v-sheet height="600">
        <v-toolbar prominent>
            
          <h2>預約行事曆</h2>
          <v-spacer></v-spacer>
            <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <v-calendar
          ref="calendar"
          v-model="value"
          type="week"
          weekdays="1, 2, 3, 4, 5, 6, 0]"
          hide-header="true"
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

      <v-btn color="#7F74B4" class="white--text" elevation="5" @click="save"
        >+ 新增預約</v-btn>
    </v-col>
  </v-row>
</template>


<style lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
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


<script>
import modal from './components/modal';

export default {
  name: "weekSchedule",

  components: {
    modal,
  },

  data: () => ({
    value: "",
    ready: false,
    event: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    // names: [
    //   "Meeting",
    //   "Holiday",
    //   "PTO",
    //   "Travel",
    //   "Event",
    //   "Birthday",
    //   "Conference",
    //   "Party",
    // ],
  }),

  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
  },

  mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
    this.$refs.calendar.checkChange();
  },





  methods: {
    setEvents(event){
        return event.color
    },

  


    setEvents({ start, end }) {
      const events = [];
    },

    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },

    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },

    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  },
};
</script>

