import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { iSchedule } from "../../models/iSchedules";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";
import { ReactComponent as EditIcon } from '../../static/icons/edit-svgrepo-com.svg';
import { ReactComponent as DeleteIcon } from '../../static/icons/delete-svgrepo-com.svg';


type iSchedulePreview = Pick<iSchedule, 'id' | 'title'>

interface iSchedileListItem extends iSchedulePreview {
    openEdit: () => void
    openRemove: (value: Pick<iSchedule, 'id' | 'title'>) => void
}
export function ScheduleLI({ id, title, openRemove, openEdit }: iSchedileListItem) {
    const dispatch = useAppDispatch();
    const { active } = useAppSelector(state => state.schedules);
    const scheduleActions = SchedulesSlice.actions;

    return (
        <li
            key={id}
            className={"schedules" + (id === active ? ' schedule-active' : "")}
            onClick={() => 
                dispatch(scheduleActions.activate({ id }))
            }
        >
            <span>{title}</span>
            <div className="schedule-manage-btns">
                <button
                    className="schedule-btn-edit"
                    onClick={() => {
                        dispatch(scheduleActions.startEditing({ id }));
                        openEdit();
                    }}
                    title="Edit this schedule"
                >
                    <EditIcon height={'15px'} width={'20px'} title='' />
                </button>
                <button
                    className="schedule-btn-remove"
                    onClick={e => {
                        e.stopPropagation();
                        openRemove({ id, title });
                    }}
                    title="Delete this schedule"
                >
                    <DeleteIcon height={'25px'} width={'20px'} title='' />
                </button>
            </div>
        </li>
    );
}