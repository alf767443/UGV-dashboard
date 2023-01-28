const styles = {
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
            spacing: 2,
        },
        item: {
            justifyContent: "center",
            alignItems: "stretch",
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            spacing: 0,
            sx: {
                mt: 0,
                mr: 1,
                ml: 1,
                mb: 0,
            }
        }
    },
};

export default styles;
