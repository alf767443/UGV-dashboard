const styles = {
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

    stack: {
        spacing: 0,
        direction: 'column',
        alignItems: 'center',
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
        main: {
            direction: "row",
            justifyContent: "center",
            alignItems: "stretch",  
            spacing: 0,
        },
        column: {
            header: {
                justifyContent: "center",
                alignItems: "stretch",
                xs: 12,
                sm: 12,
                md: 12,
                lg: 7,
                xl: 7,
                spacing: 0,
            },
            map: {
                justifyContent: "center",
                alignItems: "stretch",
                direction: "column",
                xs: 12,
                sm: 12,
                md: 12,
                lg: 5,
                xl: 5,
                spacing: 0,
            },
            graphs: {
                justifyContent: "center",
                alignItems: "stretch",
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
                xl: 6,
                spacing: 0,
            },
            subheader: {
                justifyContent: "center",
                alignItems: "stretch",
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
                spacing: 0,
            }
        }
    },
};

export default styles;
