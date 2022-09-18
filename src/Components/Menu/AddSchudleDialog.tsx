import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { dialogSlice } from "../../state/reducers/dialog.slice";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";
import { formatDate } from "../../utilities/calendar.utility";


export default function AddSchudleDialog() {
    const { editing, schedules } = useAppSelector(state => state.schedules);
    const inputSchedule = schedules.find(({ id }) => id === editing);
    const [title, setTitle] = useState<string>(inputSchedule?.title || '');
    const [firstDate, setFirstDate] = useState<Date | null>(inputSchedule?.firstDate ? 
        new Date(inputSchedule.firstDate.year, inputSchedule.firstDate.month, inputSchedule.firstDate.date)
        : null);
    const [countOfWorkdays, setCountOfWorkdays] = useState<string>(inputSchedule?.countOfWorkdays ? `${inputSchedule.countOfWorkdays}` : '');
    const [countOfWeekends, setCountOfWeekends] = useState<string>(inputSchedule?.countOfWeekends ? `${inputSchedule.countOfWeekends}` : '');

    const dispatch = useAppDispatch();
    const dialog = dialogSlice.actions;
    const schedulesActions = SchedulesSlice.actions;

    function setScheduleParams() {
        const [year, month, date] = [firstDate?.getFullYear(), firstDate?.getMonth(), firstDate?.getDate()];
            
        if (title && year && month && date && countOfWorkdays && countOfWeekends) {
            const schedule = {
                title,
                firstDate: { year, month, date },
                countOfWorkdays: Number(countOfWorkdays),
                countOfWeekends: Number(countOfWeekends)
            };

            if (editing) {
                dispatch(schedulesActions.edit(schedule));
            } else {
                dispatch(schedulesActions.add(schedule));
            }
            dispatch(dialog.close());
        }
    }

    function closeDialog() {
        if (editing) {
            dispatch(schedulesActions.finishEditing());
        }
        dispatch(dialog.close());
    }

    return (
        <div className="add-schedule-dialog dialog">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="choose-date">
                Choose first day
            </label>
            <input
                type="date"
                name="choose-date"
                id="choose-date"
                value={firstDate ? formatDate(firstDate) : ''}
                onChange={(e) => setFirstDate(e.target.valueAsDate)}
            />
            <label htmlFor="number-of-work-days">
                Number of work-days
            </label>
            <input
                type="text"
                name="number-of-work-days"
                id="number-of-work-days" 
                value={countOfWorkdays}
                onChange={e => setCountOfWorkdays(e.target.value.match(/\d/g)?.join('') || '')}
            />
            <label htmlFor="number-of-weekends">
                Number of weekends
            </label>
            <input
                type="text"
                name="number-of-work-days"
                id="number-of-work-days" 
                value={countOfWeekends}
                onChange={e => setCountOfWeekends(e.target.value.match(/\d/g)?.join('') || '')}
            />
            <div className="open-close-btns">
                <button onClick={closeDialog}>Cancel</button>
                <button onClick={setScheduleParams}>OK</button>
            </div>
            <button className="close-btn" onClick={closeDialog}>x</button>
        </div>
    );
}

