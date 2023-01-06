// Imported from project
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// --------- SideBarContent - index --------- \\
const SideBarContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
    </SimpleBar>
);

export default SideBarContent;
