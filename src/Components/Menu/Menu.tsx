import '../../style/menu.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { dialogSlice } from '../../state/reducers/dialog.slice';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';


export default function Menu() {
    const opened = useAppSelector(state => state.dialog.opened);
    const dialog = dialogSlice.actions;
    const scheduleActions = SchedulesSlice.actions;
    const { schedules, active } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();

    return (
        <>
            <ul id="menu" className="menu">
                <li
                    className="add-schedule schedules"
                    onClick={() => dispatch(dialog.open())}
                >
                    Add schedule +
                </li>
                {schedules.map(({ id, title }) => 
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
                                        dispatch(dialog.open());
                                    }
                                }
                            />
                            <input
                                type="button"
                                value="x"
                                onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        dispatch(scheduleActions.remove({ id }));
                                    }
                                }
                            />
                        </div>
                    </li>
                )}
            </ul>
            {opened ? (
                <Modal darkBackground>
                    <AddSchudleDialog />
                </Modal>
            ) : null}
        </>
    )
}