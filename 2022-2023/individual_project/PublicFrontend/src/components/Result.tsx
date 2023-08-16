import SearchResult from "@/interfaces/SerchResult";
import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ResultEvent from "./ResultEvent";

type ResultType = {
  result: SearchResult[];
};

const Result: React.FC<ResultType> = ({ result }) => {
  return (
    <Container maxWidth="xl">
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        {result.length > 0 ? (
          <Typography variant="h6" color="text.secondary">
            Search Result:
          </Typography>
        ) : (
          <Typography variant="h6" color="text.secondary">
            No Result
          </Typography>
        )}

        {result.map((box) => (
          <Card
            sx={{
              backgroundColor: box.isCompliance ? "#FFFFFF" : "#F1C0C0",
            }}
            elevation={3}
          >
            <CardContent>
              <Grid container>
                {/* Box ID + Status */}
                <Grid item xs={10}>
                  <Typography variant="h6">
                    Box ID: {box.boxId.toString()}
                  </Typography>
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="end">
                  <Typography variant="h6" color="text.secondary">
                    {box.status}
                  </Typography>
                </Grid>
                {/* Quantity + Weight + Value */}
                <Grid item xs={1}>
                  <Typography variant="body1">
                    Quantity: {box.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">
                    Weight: {box.weight}kg
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body1">Value: {box.quantity}</Typography>
                </Grid>
                {/* Next Line */}
                <Grid item xs={12} />
                {/* Production Date + Expiration Date */}
                <Grid item xs={2}>
                  <Typography variant="body1">
                    Production Date: {box.productionDate}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">
                    Expiration Date: {box.expirationDate}
                  </Typography>
                </Grid>
                {/* Next Line */}
                <Grid item xs={12} />
                {/* Supermarket + Supplier */}
                <Grid item xs={2}>
                  <Typography variant="body1">
                    Supermarket: {box.supermarket}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">
                    Supplier: {box.supplier}
                  </Typography>
                </Grid>
                {/* Next Line */}
                <Grid item xs={12} />
                {/* Temperature + Humidity (Display it when status is Stored) */}
                {box.status === "Stored (Supplier)" ||
                box.status === "Ready To Delivery" ||
                box.status === "Sending" ||
                box.status === "Stored (Supermarket)" ? (
                  <>
                    <Grid item xs={2}>
                      <Typography variant="body1">
                        Current Temperature: {box.temperature}°C
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">
                        Current Humidity: {box.humidity}%
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
                {/* Next Line */}
                <Grid item xs={12} />
                {/* Event Logs */}
                {box.events.map((event, index) => (
                  <ResultEvent index={index} event={event} />
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Result;
