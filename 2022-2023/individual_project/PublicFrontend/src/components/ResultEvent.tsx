import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import CustomEvent from "@/interfaces/CustomEvent";
import React from "react";
import dayjs from "dayjs";

type ResultEventType = {
  index: number;
  event: CustomEvent;
};

const ResultEvent: React.FC<ResultEventType> = ({ index, event }) => {
  return (
    <Grid item xs={12} my={1}>
      <Card
        elevation={3}
        sx={{
          ":hover": { backgroundColor: "#F5F5F5" },
        }}
      >
        <CardHeader
          title={`${index + 1}. ${event.eventName}`}
          subheader={dayjs.unix(event.timestamp).format("YYYY-MM-DD HH:mm")}
        />
        {event.eventName !== "CreateBox" &&
        event.eventName !== "BoxHasRecalled" ? (
          <CardContent>
            {event.eventName === "ChangeBoxLocation" ? (
              <>
                <Typography variant="body1">From: {event.from}</Typography>
                <Typography variant="body1">To: {event.to}</Typography>
              </>
            ) : (
              ""
            )}
            {event.eventName === "TrackBox" ||
            event.eventName === "BoxStoredIsNotCompliance" ? (
              <>
                <Typography variant="body1">
                  Temperature: {event.temperature}°C
                </Typography>
                <Typography variant="body1">
                  humidity: {event.humidity}%
                </Typography>
              </>
            ) : (
              ""
            )}
          </CardContent>
        ) : (
          ""
        )}
      </Card>
    </Grid>
  );
};

export default ResultEvent;
