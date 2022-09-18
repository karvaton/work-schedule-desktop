import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { dialogSlice } from "../../state/reducers/dialog.slice";

export default function AddSchudleDialog() {
    const dialog = dialogSlice.actions;
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('');
    const [firstDate, setFirstDate] = useState<string>();
    const [countOfWorkdays, setCountOfWorkdays] = useState<string>('');
    const [countOfWeekends, setCountOfWeekends] = useState<string>('');

    function setScheduleParams() {
        const [year, month, date] = firstDate?.split('-') as Array<string>;

        console.log({
            title,
            firstDate: { 
                year, month, date
            },
            countOfWorkdays: Number(countOfWorkdays),
            countOfWeekends: Number(countOfWeekends)
        });
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
                // value={firstDate}
                onChange={(e) => setFirstDate(e.target.value)}
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
                <button onClick={() => dispatch(dialog.close())}>Cancel</button>
                <button onClick={setScheduleParams}>OK</button>
            </div>
            <button className="close-btn" onClick={() => dispatch(dialog.close())}>x</button>
        </div>
    );
}