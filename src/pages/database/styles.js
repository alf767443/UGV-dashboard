const styles = {
    typography: {
        title: {
            align: 'center',
            variant: 'h3',
            color: 'textSecondary'
        },
        subtitle:{
            align: 'center',
            variant: 'h6',
            color: 'textSecondary' 
        },
    },
    
    stack: {
        spacing: 0,
        direction: 'column',
        alignItems: 'flex-start',
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        sx: {
            mt: 3,
            mr: 3,
            ml: 3,
            mb: 1,
        },
    },

    grid: {
        main: {
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            spacing: 2,
        },
        button: {
            justifyContent: "flex-start",
            alignItems: "center",
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            sx: {
                mt: 0,
                mr: 0,
                ml: 0,
                mb: 3,
            },
            spacing: 2,
        },
    },
};

export default styles;
