
// @ts-nocheck
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
  name: 'MyCalendar',
  data() {
    return {
      calendar: null as Calendar | null,
      shift: true,
    };
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    toggleShift() {
      this.shift = !this.shift;
    },
    valueShift(): string {
      return this.shift ? 'T08:00:00' : 'T13:00:00';
    },
    ControlEvents(info: { view: { calendar: Calendar }; date: Date; dateStr: string }) {
      const calendarApi = info.view.calendar;
      const selectedDate = info.date;
      const name = prompt('Por favor Ingrese Su Nombre');

      if (!name) {
        alert('Cancelado');
        return;
      }

      calendarApi.unselect(); // clear date selection
      const eventsForDate = calendarApi.getEvents().filter((event) => {
        const timestamp = new Date(info.dateStr + this.valueShift());
        const eventDate = event.start as Date;
        // Compara solo el año, mes y día
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getHours() === timestamp.getHours()
        );
      });

      const aux = eventsForDate.length;
      const titlesForDate = eventsForDate.map((event) => event.title);

      console.log(aux);

      if (name && aux < 2 && !titlesForDate.includes(name)) {
        calendarApi.addEvent({
          id: info.dateStr,
          title: name,
          start: info.dateStr + this.valueShift(),
          end: info.dateStr,
        });
      } else if (titlesForDate.includes(name)) {
        alert('Cita Ya Existe');
      } else {
        alert('Limite Alcanzado');
      }
    },
    initCalendar() {
      const calendarEl = this.$refs.calendar as HTMLElement;

      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth' as 'dayGridMonth',
        locale: 'es',
        weekends: false,
        buttonText: {
          today: 'Mes Actual',
        },
        selectable: true,
        dateClick: (info) => {
          this.ControlEvents(info);
        },
      });

      this.calendar.render();
    },
  },
};
