import ScriptList from "components/ScriptLoggerDetail";

const getParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const graphIDParam = searchParams.get('id');
    return graphIDParam
}

const LogList = () => {    
    return(
        <ScriptList scriptID={getParam()}/>
    );
}

export default LogList
