<script lang="ts">
// @ts-nocheck
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
export default {
  name: 'MyCalendar',
  data() {
    return {
      calendar: null,
      shift: true
    };
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    toggleShift(){
      this.shift=!this.shift
    },
    ControlEvents(info) {
        if(this.shift){
            var time='T08:00:00'
          }else{
            var time='T13:00:00'
          }
          console.log(time)
          let calendarApi = info.view.calendar
          let selectedDate=info.date
          let name = prompt('Por favor Ingrese Su Nombre')
          calendarApi.unselect() // clear date selection
          const eventsForDate = calendarApi.getEvents().filter(event => {
            const eventDate = event.start;
            // Compara solo el año, mes y día
            return (
              eventDate.getFullYear() === selectedDate.getFullYear() &&
              eventDate.getMonth() === selectedDate.getMonth() &&
              eventDate.getDate() === selectedDate.getDate()
            );
          });
          let aux= eventsForDate.length
          const titlesForDate = eventsForDate.map(event => event.title);
          if ((name)&& aux<2 && !titlesForDate.includes(name)){
            calendarApi.addEvent({
              id: info.dateStr,
              title: name,
              start: info.dateStr+time,
              end: info.dateStr
            })
          }else if(titlesForDate.includes(name)){
            alert("Cita Ya Existe")
          }else{
            alert("Limite Alcanzado")
          }
    },
    initCalendar() {
      const calendarEl = this.$refs.calendar;

      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        locale: 'es',
        weekends: false,
        buttonText:{
          today: 'Mes Actual',
        },
        selectable: true,
        dateClick: (info)=>{this.ControlEvents(info)}
      });

      this.calendar.render();
    }
  }
};
</script>
<template>
  <div>
    <div ref="calendar"></div>
    <button v-if="shift" @click="toggleShift">Turno Mañana</button>
    <button v-else @click="toggleShift">Turno Tarde</button>
  </div>
</template>