import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CalendarPagination from "./Calendar/CalendarPagination";
import CalendarTable from "./Calendar/Table";
import { drawerWidth } from "./Menu/Menu";

export default function Main() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1, p: 2,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                maxWidth: '100vw'
            }}
        >
            <Toolbar />
            <CalendarPagination />
            <CalendarTable />
        </Box>
    )
}