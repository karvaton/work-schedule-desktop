import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { iSchedule } from "../../models/iSchedules";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";


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
            onClick={
                () => dispatch(scheduleActions.activate({ id }))
            }
        >
            <span>{title}</span>
            <div className="schedule-manage-btns">
                <input
                    type="button"
                    value="Edit"
                    onClick={
                        (e) => {
                            dispatch(scheduleActions.startEditing({ id }));
                            openEdit();
                        }
                    }
                />
                <input
                    type="button"
                    value="x"
                    onClick={
                        (e) => {
                            e.stopPropagation();
                            openRemove({ id, title });
                        }
                    }
                />
            </div>
        </li>
    );
}