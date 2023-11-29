<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
export default defineComponent({
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
    valueShift(){
      if(this.shift){
        return 'T08:00:00'
      }else{
        return 'T13:00:00'
      }
    },
    ControlEvents(info: any) {
      let calendarApi = info.view.calendar
      let selectedDate=info.date
      let name = prompt('Por favor Ingrese Su Nombre')
      calendarApi.unselect() // clear date selection
      const eventsForDate = calendarApi.getEvents().filter(event => {
        var timestamp = new Date(info.dateStr + this.valueShift());
        const eventDate = event.start;
        // Compara solo el año, mes y día
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getHours() === timestamp.getHours()
        );
      });
      let mesActual= new Date()
      mesActual=mesActual.getMonth()
      let aux= eventsForDate.length
      const titlesForDate = eventsForDate.map(event => event.title);
      if ((name)&& aux<2 && !titlesForDate.includes(name) && (selectedDate.getMonth()=== mesActual)){
        calendarApi.addEvent({
          id: info.dateStr,
          title: name,
          start: info.dateStr+this.valueShift(),
          end: info.dateStr
        })
      }else if(titlesForDate.includes(name)){
        alert("Cita Ya Existe")
      }else if(!name){
        alert("Cancelado")
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
});
</script>
<template>
  <div>
    <div ref="calendar"></div>
    <button v-if="shift" @click="toggleShift">Turno Mañana</button>
    <button v-else @click="toggleShift">Turno Tarde</button>
  </div>
</template>