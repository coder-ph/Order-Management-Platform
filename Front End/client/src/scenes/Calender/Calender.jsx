import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import { tokens } from "../../theme";

const Calender = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); 


  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setCurrentEvents(parsedEvents);
    }
    setIsLoaded(true);
  }, []);


  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      calendarApi.addEvent(newEvent);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'?`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleEventsSet = (events) => {
    const eventsArr = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    }));
    setCurrentEvents(eventsArr);
  };

  return (
    <Box mt="20px">
      <DasshboardHeader title="CALENDER" subtitle="" />
      <Box display="flex" justifyContent="space-between">
       
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          mr="20px"
          height="85vh"
          overflow="auto"
        >
          <Typography variant="h5" mb="10px">
            Events
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.primary[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography variant="caption">
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Render FullCalendar only after events are loaded */}
        {isLoaded && (
          <Box flex="1 1 100%" ml="15px" paddingRight="20px">
            <FullCalendar
              height="85vh"
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,listWeek",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={handleEventsSet}
              initialEvents={currentEvents}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Calender;
