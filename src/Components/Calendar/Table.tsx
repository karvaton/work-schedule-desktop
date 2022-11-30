import { useContext } from "react";
import { LocaleContext } from "../../App";
import { useAppSelector } from "../../hooks/redux";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import WeekDays from "./CalendarHeader";
import Dates from "./C-Dates";


export default function CalendarTable() {
    const lang = useContext(LocaleContext).locale;
    const { active } = useAppSelector(state => state.schedules);
    const { month, year, settings: { firstWeekday } } = useAppSelector(state => state.calendar);
    const monthFullName = new Intl.DateTimeFormat(lang, { month: /* isMobile ?  */'short'/*  : 'long' */ }).format(new Date(year, month));
    
    return (
        <Container sx={{ padding: 0 }}>
            <WeekDays firstDay={firstWeekday} />
            <Dates month={month} year={year} firstWeekDay={firstWeekday} />
        </Container>
    )
}