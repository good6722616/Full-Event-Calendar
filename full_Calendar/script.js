const calendarEl = document.getElementById("calendar");

const calendar = new FullCalendar.Calendar(calendarEl, {
  themeSystem: 'standard',
  eventClick: function(info) {
    let eventObj = info.event;
    if(eventObj.url) {
    window.open(eventObj.url);
    info.jsEvent.preventDefault();
    }else {
      alert (eventObj.title);
    }
  },
  initialView: "dayGridMonth",
  initialDate: new Date(),

  headerToolbar: {
    left: "prevYear prev next nextYear today",
    center: "title",
    right: "dayGridMonth timeGridWeek timeGridDay",
  },

  buttonIcons: {
    prev: 'chevron-left',
    next: 'chevron-right'
  },
  
  events: function(info, callback){
    $.ajax({
      url: "https://api.hubapi.com/hubdb/api/v2/tables/5945429/rows?portalId=22331276",
      dataType: "json",
      success: function (responses) {
        let events = [];
        responses.objects.forEach((object)=> {
          object.values['title'] = object.values['4']
          delete object.values['4']
          object.values['start'] = object.values['10']
          delete object.values['10']
          object.values['category'] = object.values['12']
          delete object.values['12']
          let event ={
            id: object.id,
            title: object.values.title,
            start: object.values.start,
            category: object.values.category,
          }
          events.push(event)
          console.log(event)
        });                       
        callback(events)
      }
    })
  },
  eventColor: "#378006",
});


document.addEventListener("DOMContentLoaded", function () {
  calendar.render();
});



const search_input = document.getElementById("search-input");
const search_form = document.getElementById("search-form")
const search_button  = document.getElementById("search_button")
const allEvents_button = document.getElementById("allEvents_button");

const originalEventSources = calendar.getEventSources();

/* clean filtering and show all events */
function showAllEvents(){
  // let eventsall = calendar.getEventSources()
  // console.log(eventsall);
  const searchedEventsAmount = searchEvents();
  if(searchedEventsAmount.length>0){
    calendar.removeAllEvents();
    originalEventSources.forEach(eventSource=>{
      calendar.addEventSource(eventSource)
    });
    calendar.render();
  }
}
allEvents_button.addEventListener('click', function(){
  search_input.value="";
  showAllEvents()
})


/* search events based on event title */
function searchEvents(){
  // Get the search term from the input field
  const searchTerm = search_input.value.trim();
  const events = calendar.getEvents();
  calendar.addEventSource(events);
  // Filter the events based on the search term
  const searchedEvents = events.filter(function(event) {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  // Remove all the existing event sources from the calendar
  calendar.removeAllEventSources();
  // Add the filtered events as a new event source to the calendar
  calendar.addEventSource(searchedEvents);
  return searchedEvents
}


search_button.addEventListener('click', function() {
  searchEvents()
});


/* filter event based on category */

function filterEvents(category){
  
  const filteredEvents = calendar.getEvents().filter(function(event) {
    return event.extendedProps.category === category;
  });
  calendar.removeAllEvents();
  calendar.addEventSource(filteredEvents);
  console.log(filteredEvents)
  return filteredEvents
  
}

document.getElementById('recruiting_seminar').addEventListener('click', function() {
  
  filterEvents('Recruiting Seminar');
})


document.getElementById('online_client_seminar').addEventListener('click', function() {
  filterEvents('Online Client Seminar');
});

document.getElementById('agent_only_seminar').addEventListener('click', function() {
  filterEvents('Agent Only Seminar');
});

document.getElementById('live_client_seminar').addEventListener('click', function() {
  filterEvents('Live Client Seminar');
});



// const api =
//   "https://api.hubapi.com/hubdb/api/v2/tables/5945429/rows?portalId=22331276";
// async function getEvents(eventsApi) {
//   const res = await fetch(eventsApi);
//   const data = await res.json();
  
//   displayEvents(data.objects)
//   console.log(data.objects)
  
// }
// getEvents(api)


// function displayEvents(eventsInfo) {
//   eventsInfo.forEach((eventInfo)=>{
//     eventInfo.values['title'] = eventInfo.values['4']
//     delete eventInfo.values['4']
//     eventInfo.values['start'] = eventInfo.values['10']
//     delete eventInfo.values['10']
//   })
// }

  // events: [
  //   {
  //     title: "All Day Event",
  //     start: "2023-03-01",
  //   },
  //   {
  //     groupId: "999",
  //     title: "Repeating Event",
  //     start: "2023-03-02T16:00:00",
  //   },
  //   {
  //     groupId: "999",
  //     title: "Repeating Event",
  //     start: "2023-03-16T16:00:00",
  //   },
  //   {
  //     title: "Conference",
  //     start: "2023-03-11",
  //   },
  //   {
  //     title: "Meeting",
  //     start: "2023-03-12T10:30:00",
  //     end: "2023-03-12T12:30:00",
  //   },
  //   {
  //     title: "Meeting",
  //     start: "2023-03-12T14:30:00",
  //   },
  //   {
  //     title: "Birthday Party",
  //     start: "2023-03-13T07:00:00",
  //   },
  //   {
  //     title: "Click for Google",
  //     url: "https://www.transglobalus.com/",
  //     start: "2023-03-28",
  //   },
  // ],