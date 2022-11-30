import Grid from "@mui/material/Grid";
import { useContext, useMemo, useState } from "react";
import { TouchscreenContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { iDate } from "../../models/iDate";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { getDatesArray } from "../../utilities/calendar.utility"
import palette from "../../utilities/palette.utility";
import { iScheduleDate, transformScheduleDates } from "../../utilities/schedule.utility";
import DateComponent from "./C-Date";


type DatesType = {
    month: number,
    year: number,
    firstWeekDay: number
}
export default function Dates({ month, year, firstWeekDay }: DatesType) {
    const isTouchScreen = useContext<boolean>(TouchscreenContext)
    const currentDate = new Date();
    const datesArray = useMemo(() => getDatesArray(month, year, firstWeekDay), [month, year, firstWeekDay]);
    const { active, schedules } = useAppSelector(state => state.schedules);
    const schedule = useMemo(() => schedules.find(({ id }) => id === active), [active, schedules]);
    const schedulesArr = useMemo(() => transformScheduleDates(datesArray, schedule), [datesArray, schedule]);
    const [moveStartX, setMoveStartX] = useState<number>(0);
    const [shift, setShift] = useState<number>(0);
    const [isDrag, setDrag] = useState<boolean>(false);

    const { setYear, setMonth } = calendarSlice.actions;
    const dispatch = useAppDispatch();

    const [activeDate, setActiveDate] = useState<iDate>({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
    });

    function back() {
        const prevMonth = month - 1 < 0 ?
            month + 11 :
            month - 1;

        dispatch(setMonth(prevMonth));
        if (prevMonth === 11) {
            dispatch(setYear(year - 1));
        }
    }

    // function forward() {
    //     const nextMonth = month + 1 > 11 ?
    //         month - 11 :
    //         month + 1;

    //     dispatch(setMonth(nextMonth));
    //     if (nextMonth === 0) {
    //         dispatch(setYear(year + 1));
    //     }
    // }

    // function getMove(start: number, end: number) {
    //     const d = start - end;
    //     setShift(d);
    //     if (Math.abs(d) > 80) {
    //         if (d > 0) {
    //             forward();
    //         } else if (d < 0) {
    //             back();
    //         }
    //     }
    // }

    return (
        <Grid container columns={7} columnSpacing={1}          
            // className="dates week"
            // onPointerDown={e => {
            //     e.stopPropagation();
            //     if (isTouchScreen) {
            //         setDrag(true);
            //         setMoveStartX(e.clientX)
            //     }
            // }}
            // onPointerMove={e => {
            //     e.stopPropagation();
            //     isTouchScreen && isDrag && setShift(e.clientX - moveStartX);
            // }}
            // onPointerUp={e => {
            //     e.stopPropagation();
            //     isTouchScreen && getMove(moveStartX, e.clientX);
            //     setDrag(false);
            //     setShift(0);
            // }}
            // style={{ left: shift }}
        >
            {schedulesArr.map((item: iScheduleDate) =>
                <Grid item xs={1} key={new Date(item.year, item.month, item.date).getTime()}>
                    <DateComponent
                        date={item.date}
                        month={item.month}
                        year={item.year}
                        isCurrentMonth={item.month === month && item.year === year}
                        isActive={
                            item.date === activeDate.date &&
                            item.month === activeDate.month &&
                            item.year === activeDate.year
                        }
                        setActive={setActiveDate}
                        type={item.type}
                        title={schedule?.types.find(({ id }) => id === item.type)?.title}
                        color={item.type === null ? null :
                            item.type !== null && item.color ? item.color :
                                palette.getColor(item.type)
                        }
                    />
                </Grid>
            )}
        </Grid>
    )
}