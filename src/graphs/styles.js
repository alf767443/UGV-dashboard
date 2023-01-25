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
        title: {
            align: 'center',
            variant: 'h5',
            color: 'textSecondary'
        },
        subtitle:{
            align: 'center',
            variant: 'h6',
            color: 'textSecondary' 
        },
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
        simple: {
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
        },
        dual: {
            size: {
                range: 30,
                measure: 0,
                target: 30,
            },
            height: 200,
            width: 90,
            xAxis: {
              line: null,
            },
            yAxis: false,
            label: {
                measure: false,
                target: true
            },
            layout: 'vertical',
        }
    }
};

export default styles;
