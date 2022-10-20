import { iDate } from "../models/iDate";

const lang = localStorage.getItem('lang') || 'en-US';

export function getMonthLength(
    month = new Date().getMonth(),
    year = new Date().getFullYear()
) {
    const date = new Date(year, month, 31).getDate();    
    const lastDate = 31 - date;
    return lastDate || 31;
}


export function createDatesArray(
    start: number, 
    end: number, 
    month: number = new Date().getMonth(), 
    year: number = new Date().getFullYear()
): iDate[] {
    const datesArray = [];    
    for (let i = start; i <= end; i++) {
        const date = {
            date: i,
            month,
            year
        }
        datesArray.push(date);
    }
    return datesArray;
}


export function getStartDay(
    month = new Date().getMonth(),
    year = new Date().getFullYear()
) {
    return new Date(year, month, 1).getDay();
}


export function getDatesArray(
    month = new Date().getMonth(),
    year = new Date().getFullYear(),
    shift: number = 0
) {
    const monthLength = getMonthLength(month, year);
    const prevMonthLength = getMonthLength(month - 1, year);
    const currentMonth = createDatesArray(1, monthLength, month, year);
    let startDay = new Date(year, month, 1).getDay() - 1 - shift;
    if (startDay < 0) {
        startDay = startDay + 7;
    }

    const prevMonth = createDatesArray(prevMonthLength - startDay, prevMonthLength,
        month <= 12 ? month - 1 : month + 11,
        month <= 12 ? year : year - 1);
        
    let lastDay = new Date(year, month, monthLength).getDay() + 1 - shift;
    if (lastDay < 0) {
        lastDay = lastDay + 7;
    }
    
    let nextMonth = createDatesArray(1, 7 - lastDay,
        month <= 12 ? month + 1 : month - 11,
        month <= 12 ? year : year + 1 );

    return prevMonth.concat(currentMonth, nextMonth);
}


export function createYearArray(currentYear = new Date().getFullYear()) {
    const yearsArray = [];

    for (let i = (currentYear - 9); i < (currentYear + 10); i++) {
        yearsArray.push(i);
    }
    return yearsArray;
}



export function createWeekDaysArray(formatType: Intl.DateTimeFormatOptions['weekday'] = 'long') {
    const date = new Date(2022, 4);
    return Array(7).fill(0).map((item, i) => new Intl
        .DateTimeFormat(lang, { weekday: formatType })
        .format(date.setDate(i + 1)));
}

export function createMonthArray(formatType: Intl.DateTimeFormatOptions['month'] = 'long') {
    const date = new Date();
    return Array(12).fill(0).map((item, i) => new Intl
        .DateTimeFormat(lang, { month: formatType })
        .format(date.setMonth(i)));
}


export function formatDate(inputDate: Date | iDate): string {
    let date, month, year;
    if ('year' in inputDate) {
        year = inputDate.year;
        month = inputDate.month + 1;
        date = inputDate.date;
    } else if (inputDate instanceof Date){
        year = inputDate.getFullYear();
        month = inputDate.getMonth() + 1;
        date =  inputDate.getDate();
    } else {
        return '';
    }
    
    return `${year}-${ month < 10 ? '0' + month : month }-${ date < 10 ? '0' + date : date }`;
}