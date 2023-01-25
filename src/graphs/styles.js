const styles = {
    graph:{
        big:{
            /*
            width: 800,
            height: 400
            */
        },
        medium:{
            width: 400,
            height: 200
        },
        small:{
            /*
            width: 200,
            height: 200
            */
        }
    },
    stack: {
        direction: 'column',
        alignItems: 'center',
        spacing: 1
    },
    typography: {
        variant: 'h5',
        color: 'textSecondary'
    },
    box: {
        sx: {
            p: 1,
            pb: 1
        }
    },
    maincard: {
        sx: {
            mt: 1,
            mr: 1,
            ml: 1,
            mb: 1

        },
        content: false
    },
    bullet:{
        size: {
            range: 30,
            measure: 0,
            target: 30,
        },
        height: 50,
        width: 350,
        xAxis: {
          line: null,
        },
        yAxis: false,
        label: {
            measure: false,
            target: true,
        },  
    }
};

export default styles;
