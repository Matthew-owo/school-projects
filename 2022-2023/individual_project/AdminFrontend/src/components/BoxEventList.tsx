import { Card, CardContent, Stack, Typography } from "@/components/@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const BoxEventList: React.FC<{ boxId: number }> = ({ boxId }) => {
  const [events, setEvents] = useState(null);
  const [rows, setRows] = useState<React.JSX.Element[]>([]);

  const fetchEvent = async (boxId: number) => {
    const response = await fetch(`/api/box/event/${boxId}`);
    const data = await response.json();

    setEvents(data);
  };

  useEffect(() => {
    fetchEvent(boxId);
  }, []);

  useEffect(() => {
    // setRows([]);
    if (events !== null)
      events.forEach((event, index: number) => {
        rows.push(
          <Stack direction="row" key={index}>
            {event.eventName}
          </Stack>
        );
      });
  }, [events]);

  const switchEventRender = (event) => {
    switch (event.eventName) {
      case "CreateBox":
        return <Typography>Date: {dayjs.unix(event.timestamp).format("YYYY-MM-DD HH:mm")}</Typography>;
      case "ChangeBoxLocation":
        return (
          <>
            <Typography>From: {event.from}</Typography>
            <Typography>To: {event.to}</Typography>
            <Typography>Date: {dayjs.unix(event.timestamp).format("YYYY-MM-DD HH:mm")}</Typography>
          </>
        );
      case "TrackBox":
        return (
          <>
            <Typography>Temperature: {event.temperature}°C</Typography>
            <Typography>Humidity: {event.humidity}%</Typography>
            <Typography>Date: {dayjs.unix(event.timestamp).format("YYYY-MM-DD HH:mm")}</Typography>
          </>
        );
    }
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        {events !== null ? (
          <>
            {(() => {
              let rows = [];
              if (events !== null) {
                events.forEach((event, index: number) => {
                  rows.push(
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          {index + 1}. {event.eventName}
                        </Typography>
                        {switchEventRender(event)}
                      </CardContent>
                    </Card>
                  );
                });
              }
              return rows;
            })()}
          </>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};

export default BoxEventList;
