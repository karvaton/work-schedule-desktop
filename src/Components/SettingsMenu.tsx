import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { calendarSlice } from "../state/reducers/calendar.slice";
import { LocaleContext } from "../App";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { createWeekDaysArray } from "../utilities/calendar.utility";


const weekdays = createWeekDaysArray();

interface Props {
    anchor: HTMLElement | null
    handleClose: () => void
}

export default function SettingsMenu({ anchor, handleClose }: Props) {
    const { firstWeekday } = useAppSelector(state => state.calendar.settings);
    const { setFirstWeekday } = calendarSlice.actions;
    const dispatch = useAppDispatch();
    const { locale: lang, setLocale } = useContext(LocaleContext);
    
    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchor)}
            onClose={handleClose}
        >
            <FormControl>
                <InputLabel id="select-first-weekday-label">First weekday</InputLabel>
                <Select
                    labelId="select-first-weekday-label"
                    id="select-first-weekday"
                    value={firstWeekday}
                    label="Year"
                    onChange={e =>
                        dispatch(setFirstWeekday(Number(e.target.value)))
                    }
                    sx={{ m: 1, minWidth: 120 }}
                >
                    {weekdays.map((weekday, index) =>
                        <MenuItem key={index} value={index}>{weekday}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="select-language-label">Language</InputLabel>
                <Select
                    labelId="select-language-label"
                    id="select-language"
                    value={lang}
                    label="Language"
                    onChange={e => {
                        const lang = e.target.value;
                        localStorage.setItem('lang', lang);
                        setLocale(lang);
                    }}
                    sx={{ m: 1, minWidth: 120 }}
                >
                    <MenuItem value='en-US'>English</MenuItem>
                    <MenuItem value='uk-UA'>Українська</MenuItem>
                </Select>
            </FormControl>
        </Menu>
    )
}