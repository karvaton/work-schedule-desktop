import '../../style/menu.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';
import ConfirmDialog from './Confirm';
import { iSchedule } from '../../models/iSchedules';
import { ScheduleLI } from './ScheduleListItem';


export default function Menu() {
    const [openedConfirmDialog, toggleConfirmDialog] = useState<Pick<iSchedule, "id" | "title"> | false>(false);
    const [openedAddScheduleDialog, toggleAddScheduleDialog] = useState<boolean>(false);
    const scheduleActions = SchedulesSlice.actions;
    const { schedules } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();

    return (
        <>
            <ul id="menu" className="menu">
                <li
                    className="add-schedule schedules"
                    onClick={() => toggleAddScheduleDialog(true)}
                >
                    Add schedule +
                </li>
                {schedules.map(({ id, title }) => 
                    <ScheduleLI
                        key={id}
                        id={id}
                        title={title}
                        openEdit={() => toggleAddScheduleDialog(true)}
                        openRemove={toggleConfirmDialog} 
                    />
                )}
                {openedConfirmDialog ? 
                    <Modal darkBackground opened={!!openedConfirmDialog.id}>
                        <ConfirmDialog
                            question={`Delete schedule "${openedConfirmDialog.title}"?`}
                            onAccept={() => {
                                dispatch(scheduleActions.remove({ id: openedConfirmDialog.id }));
                                toggleConfirmDialog(false);
                            }}
                            onDecline={() => toggleConfirmDialog(false)}
                        />
                    </Modal> 
                : null}
            </ul>
            <Modal darkBackground opened={openedAddScheduleDialog}>
                <AddSchudleDialog closeFn={() => toggleAddScheduleDialog(false)} />
            </Modal>
        </>
    )
}