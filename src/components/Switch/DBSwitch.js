import * as React from 'react';
import Switch from '@mui/joy/Switch';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';

function DBSwitch() {

  const [fromLocal, setfromLocal] = React.useState(JSON.parse(window.localStorage.getItem('fromLocal')));


  React.useEffect(() => {
    setfromLocal(JSON.parse(window.localStorage.getItem('fromLocal')));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('fromLocal', fromLocal);
  }, [fromLocal]);

  function refreshPage() {
    //window.location.reload(false);
  }

  function onChange(event){
    setfromLocal(event.target.checked);
    refreshPage();
  }

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
      <Switch
        color={fromLocal ? 'primary' : 'success'}
        slotProps={{ input: { 'aria-label': 'fromLocal mode' } }}
        startDecorator={
            <CloudIcon
            sx={{ color: fromLocal ? 'text.tertiary' : '#00684a', fontSize: 28 }}
            />
        }
        endDecorator={
            <StorageIcon sx={{ color: fromLocal ? 'primary.500' : 'text.tertiary', fontSize: 28 }} />
        }
        checked={fromLocal}
        onChange={onChange}
        />
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}


export default DBSwitch;

