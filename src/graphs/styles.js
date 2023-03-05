
import Divider from '@mui/material/Divider';

const styles = {
    bullet:{
        simple: {
            measureField: 'measures',
            rangeField: 'ranges',
            targetField: 'value',
            xField: 'title',
            size: {
                range: 30,
                measure: 0,
                target: 30,
            },
            height: 50,
            width: 300,
            xAxis: {
              line: null,
            },
            yAxis: false,
            label: {
                measure: false,
                target: true,
            },  
            animation: false,
        },
        dual: {
            measureField: 'measures',
            rangeField: 'ranges',
            targetField: 'value',
            xField: 'title',
            size: {
                range: 30,
                measure: 0,
                target: 30,
            },
            height: 178,
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
            animation: false,
        },
        stack: {
            direction:'row',
            divider:<Divider orientation="vertical" flexItem />,
            justifyContent:"space-evenly",
            alignItems:'center',
            spacing:0,
        }
    },

    plot:{
        //padding: 'auto',
        smooth: true,
		animation: false,
        style:{
            width: '100%',
            height: 200,
        }
    },

    typography: {
        title: {
            align: 'center',
            variant: 'h5',
            color: 'textSecondary'
        },
        subtitle:{
            align: 'center',
            variant: 'h5',
            color: 'textSecondary' 
        },
    },

    stack: {
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        spacing: 1,
        sx: {
            mt: 1,
            mr: 1,
            ml: 1,
            mb: 1,
        },
    },

    maincard: {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        sx: {
            mt: 1,
            mr: 1,
            ml: 1,
            mb: 1,
        },
        height: '100%',
        content: false,
    },

    box: {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        sx: {
            mt: 1,
            mr: 1,
            ml: 1,
            mb: 1,
            display: 'grid',
            gridAutoRows: '100%',
            gap: 1,
        },
        height: '100%',
    },

    grid: {
        direction:"row",
        justifyContent:"space-between",
        alignItems:"stretch"
    },

    map:{
        style:{
            width: '100%',
            height: 450,
        }
    },

    statusIcon:{
        popup:{
            icon:{
                sx:{
                    width: 35, 
                    height: 35,
                },
            },
            typography:{
                primary:{
                    align:'left',
                    variant: "h5", 
                    color:'textPrimary',
                },
                secondary:{
                    align:'left',
                    variant:"body1",
                    color:'textSecondary',
                },
            },
            popover:{
                title:"Log",
				trigger:"click",
            }
        },
        badge:{
            overlap:"circular",
			anchorOrigin:{ 
                vertical: 'bottom', 
                horizontal: 'right', 
            },
            size: "lg" 
        },
        avatar:{
            sx:{
                bgcolor: 'transparent',
            },
        },
        icon:{
            main:{
                color:'gray',
                sx:{
                    height: 107, 
                    width: 67,
                },
            },
            badge:{
                sx:{
                    width: 37, 
                    height: 37
                },
            },
        },
        container:{
            direction:"row",
            justifyContent:"center",
            alignItems:"center",
            height: '100%',

        },
        item:{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2,
            xl: 2,
            sx:{
                height: 198
            },
        }
        
    },
};

export default styles;
