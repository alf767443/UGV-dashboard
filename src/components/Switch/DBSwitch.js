import * as React from 'react';
import Switch from '@mui/joy/Switch';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';


function DBSwitch() {
  const [dark, setDark] = React.useState(false);
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
      <Switch
        color={dark ? 'primary' : 'success'}
        slotProps={{ input: { 'aria-label': 'dark mode' } }}
        startDecorator={
            <CloudIcon
            sx={{ color: dark ? 'text.tertiary' : '#00684a', fontSize: 28 }}
            />
        }
        endDecorator={
            <StorageIcon sx={{ color: dark ? 'primary.500' : 'text.tertiary', fontSize: 28 }} />
        }
        checked={dark}
        onChange={(event) => setDark(event.target.checked)}
        />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}


export default DBSwitch;

