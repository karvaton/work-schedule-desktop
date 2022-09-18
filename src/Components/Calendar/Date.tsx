import { iDate } from "../../models/iDate";

interface DateType extends iDate {
    isCurrentMonth: boolean,
    isActive: boolean,
    setActive: (value: iDate) => void
    workday: boolean | null
}

export default function DateComponent({date, month, year, isCurrentMonth, isActive, setActive, workday}: DateType) {
    const currentDate = new Date();
    const isCurrentDate = currentDate.getFullYear() === year &&
        currentDate.getMonth() === month &&
        currentDate.getDate() === date;
    
    let dateClass = 'date';
    if (isCurrentMonth) dateClass += ' current-month';
    if (isCurrentDate) dateClass += ' current-date';
    if (isActive) dateClass += ' active-date';
    if (workday) dateClass += ' workday';
    else if (workday === false) dateClass += ' weekend';

    return (
        <div className={dateClass} onClick={() => setActive({ date, month, year })}>
            {date}
        </div>
    )
}