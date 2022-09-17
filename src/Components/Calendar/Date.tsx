import { iDate } from "../../utilities/calendar.utility";


interface DateType extends iDate {
    isCurrentMonth: boolean,
    isActive: boolean,
    setActive: (value: iDate) => void
}

export default function DateComponent({date, month, year, isCurrentMonth, isActive, setActive}: DateType) {
    const currentDate = new Date();
    const isCurrentDate = currentDate.getFullYear() === year &&
        currentDate.getMonth() === month &&
        currentDate.getDate() === date;
    
    let dateClass = 'date';
    if (isCurrentMonth) dateClass += ' current-month';
    if (isCurrentDate) dateClass += ' current-date';
    if (isActive) dateClass += ' active-date';

    return (
        <div className={dateClass} onClick={() => setActive({ date, month, year })}>
            {date}
        </div>
    )
}