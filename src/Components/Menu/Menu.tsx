import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { dialogSlice } from '../../state/reducers/dialog.slice';
import '../../style/menu.css';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';


export default function Menu() {
    const opened = useAppSelector(state => state.dialog.opened);
    const dialog = dialogSlice.actions;
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
            </ul>
            {opened ? (
                <Modal darkBackground>
                    <AddSchudleDialog />
                </Modal>
            ) : null}
        </>
    )
}