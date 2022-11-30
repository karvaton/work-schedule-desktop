import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createWeekDaysArray } from "../../utilities/calendar.utility";

const daysOfWeek = createWeekDaysArray('short');

type WeekDaysType = {
    firstDay: number
}
export default function WeekDays({ firstDay }: WeekDaysType) {
    const first = daysOfWeek.slice(0, firstDay);
    const last = daysOfWeek.slice(firstDay);
    const weekDays = last.concat(first);

    return (
        <Grid container columns={7}>
            {weekDays.map(day => 
                <Grid key={day} item xs={1}>
                    <Typography textAlign="center">{day}</Typography>
                </Grid>
            )}
        </Grid>
    )
}