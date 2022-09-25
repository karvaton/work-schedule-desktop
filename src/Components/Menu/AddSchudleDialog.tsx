import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TypesOfSchedule } from "../../models/iSchedules";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";
import { formatDate } from "../../utilities/calendar.utility";
import ScheduleFields from "./ScheduleFields";
import { ReactComponent as CloseIcon } from '../../static/icons/close-svgrepo-com.svg';


type AddSchudleDialogType = {
    closeFn: () => void
}
export default function AddSchudleDialog({ closeFn }: AddSchudleDialogType) {
    const intl = useIntl();
    const { editing, schedules } = useAppSelector(state => state.schedules);
    const inputSchedule = schedules.find(({ id }) => id === editing);
    const [title, setTitle] = useState<string>(inputSchedule?.title || '');
    const [firstDate, setFirstDate] = useState<Date | null>(inputSchedule?.firstDate ? 
        new Date(inputSchedule.firstDate.year, inputSchedule.firstDate.month, inputSchedule.firstDate.date)
        : null);
    const [scheduleTypes, setScheduleTypes] = useState<TypesOfSchedule[]>(
        inputSchedule?.types ? inputSchedule?.types : [{
            id: 0,
            title: intl.formatMessage({
                id: 'Workdays',
                defaultMessage: 'Workdays'
            }),
            value: 0
        }, {
            id: 1,
            title: intl.formatMessage({
                id: 'Weekends',
                defaultMessage: 'Weekends'
            }),
            value: 0
        }]
    );

    const dispatch = useAppDispatch();
    const schedulesActions = SchedulesSlice.actions;

    function setScheduleParams() {
        const [year, month, date] = [firstDate?.getFullYear(), firstDate?.getMonth(), firstDate?.getDate()];
            
        if (title && year && month && date && scheduleTypes.length > 1) {
            const schedule = {
                title,
                firstDate: { year, month, date },
                types: scheduleTypes,
            };

            if (editing) {
                dispatch(schedulesActions.edit(schedule));
            } else {
                dispatch(schedulesActions.add(schedule));
            }
            closeFn();
        }
    }

    function closeDialog() {
        if (editing) {
            dispatch(schedulesActions.finishEditing());
        }
        closeFn();
    }

    function updateScheduleFields(scheduleType: TypesOfSchedule) {
        const types = [...scheduleTypes];
        const typeIndex = scheduleTypes.findIndex(({ id }) => id === scheduleType.id);
        types.splice(typeIndex, 1, scheduleType);
        setScheduleTypes(types);
    }

    return (
        <div className="add-schedule-dialog dialog">
            <label htmlFor="title">
                <FormattedMessage 
                    id="Schedule name"
                    defaultMessage="Schedule name"
                />
            </label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name"
            />
            <label htmlFor="choose-date">
                <FormattedMessage
                    id="Choose first day"
                    defaultMessage="Choose first day"
                />
            </label>
            <input
                type="date"
                name="choose-date"
                id="choose-date"
                value={firstDate ? formatDate(firstDate) : ''}
                onChange={(e) => setFirstDate(e.target.valueAsDate)}
            />
            <label>
                <FormattedMessage
                    id="Set fields of schedule"
                    defaultMessage="Set work shifts"
                />
            </label>

            <div className="schedule-fields">
                <div className="schedule-field-header">
                    <FormattedMessage
                        id="Work shifts"
                        defaultMessage="Work shifts"
                    />
                </div>
                <div className="schedule-field-header">
                    <FormattedMessage
                        id="Days"
                        defaultMessage="Days"
                    />
                </div>
                <div></div>

                {scheduleTypes.map(({ id, title, value }) =>
                    <ScheduleFields
                        key={id}
                        id={id}
                        title={title}
                        value={value}
                        removeField={() => setScheduleTypes(
                            scheduleTypes.filter(item => item.id !== id)
                        )}
                        enableRemoving={scheduleTypes.length < 3}
                        updateFields={updateScheduleFields}
                    />
                )}
            </div>
            {scheduleTypes.length < 10 ? (
                <button
                    onClick={() => setScheduleTypes([...scheduleTypes, {
                        id: Math.max(...scheduleTypes.map(({ id }) => id)) + 1,
                        title: '',
                        value: 0
                    }])}
                >
                    <FormattedMessage
                        id="Add another field"
                        defaultMessage="Add another field"
                    />
                </button>
            ) : null}
            <div className="open-close-btns">
                <button onClick={closeDialog}>
                    <FormattedMessage
                        id="Cancel"
                        defaultMessage="Cancel"
                    />
                </button>
                <button onClick={setScheduleParams}>OK</button>
            </div>
            <button className="close-btn" onClick={closeDialog}>
                <CloseIcon height='30px' width='30px' />
            </button>
        </div>
    );
}
