import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { createMonthArray, createYearArray } from "../../utilities/calendar.utility";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const months = createMonthArray();

export default function CalendarPagination() {
    const { month, year } = useAppSelector(state => state.calendar);
    const { setYear, setMonth } = calendarSlice.actions;
    const dispatch = useAppDispatch();

    function handleChangeMonth(month: number) {
        dispatch(setMonth(month));
    }
    
    function handleChangeYear(year: number) {
        dispatch(setYear(year));
    }

    return (
        <Box 
            display="flex"
            alignContent="flex-end"
            sx={{ p: 1, mt: -1, ml: -2, mr: -2 }}
        >
            {/* <Box display="flex"> */}
                <FormControl sx={{ flexShrink: 0 }}>
                    <InputLabel id="select-month-label">Month</InputLabel>
                    <Select
                        labelId="select-month-label"
                        id="select-month"
                        value={month}
                        label="Month"
                        onChange={e => handleChangeMonth(Number(e.target.value))}
                        sx={{ m: .5, minWidth: 105, fontSize: 14 }}
                    >
                        {months.map((month, index) => 
                            <MenuItem key={index} value={index}>{month}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl sx={{ flexShrink: 0 }}>
                    <InputLabel id="select-year-label">Year</InputLabel>
                    <Select
                        labelId="select-year-label"
                        id="select-year"
                        value={year}
                        label="Year"
                        onChange={e => handleChangeYear(Number(e.target.value))}
                        sx={{ m: .5, mr: 1.5, minWidth: 80, fontSize: 14 }}
                    >
                        {createYearArray(year).map(year => 
                            <MenuItem key={year} value={year}>{`${year}`}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            {/* </Box> */}

            {/* <Box flex={1} display="flex" justifyContent="flex-end"> */}
                <Button variant="outlined" sx={{ m: .5, marginLeft: 'auto' }}>
                    <ArrowBackIcon />
                </Button>
                <Button variant="outlined" sx={{ m: .5,  }}>
                    <ArrowForwardIcon />
                </Button>
            {/* </Box> */}
        </Box>
    )
}