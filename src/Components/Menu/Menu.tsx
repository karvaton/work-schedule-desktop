import '../../style/menu.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';
import ConfirmDialog from './Confirm';
import { iSchedule } from '../../models/iSchedules';
import { ScheduleLI } from './ScheduleListItem';
import { FormattedMessage, useIntl } from 'react-intl';
import useWindowSize from '../../hooks/useWindowSize';
import { ReactComponent as MenuIcon } from "../../static/icons/menu-svgrepo-com.svg";


type MenuType = {
    opened?: boolean
    closeMenuFn: () => void
}
export default function Menu({ opened, closeMenuFn }: MenuType) {
    const [openedConfirmDialog, toggleConfirmDialog] = useState<Pick<iSchedule, "id" | "title"> | false>(false);
    const [openedAddScheduleDialog, toggleAddScheduleDialog] = useState<boolean>(false);
    const scheduleActions = SchedulesSlice.actions;
    const { schedules } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [width] = useWindowSize();
    const isMobile = width < 700;

    return (
        <>
            <ul className={ opened ? "menu menu-active" : "menu" }>
                {isMobile ? (
                    <li>
                        <button className="open-menu-btn" onClick={closeMenuFn}>
                            <MenuIcon height='28px' />
                        </button>
                    </li>
                ) : null}
                {schedules.map(({ id, title }) => 
                    <ScheduleLI
                        key={id}
                        id={id}
                        title={title}
                        openEdit={() => toggleAddScheduleDialog(true)}
                        openRemove={toggleConfirmDialog} 
                    />
                )}
                <li
                    className="add-schedule schedules"
                    onClick={() => toggleAddScheduleDialog(true)}
                >
                    <FormattedMessage
                        id='Add schedule'
                        defaultMessage='Add schedule'
                    /> +
                </li>
                {openedConfirmDialog ? 
                    <Modal darkBackground opened={!!openedConfirmDialog.id}>
                        <ConfirmDialog
                            question={intl.formatMessage({
                                id: "Delete schedule",
                                defaultMessage: `Delete schedule "{title}"?`
                            }, {
                                title: openedConfirmDialog.title 
                            })}
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