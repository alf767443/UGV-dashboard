const styles = {
    typography: {
        align: 'left',
        variant: "h3",
        color: "textSecondary",
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
    },

    stack: {
        spacing: 2,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        sx: {
            mt: 1,
            mr: 1,
            ml: 1,
            mb: 0,
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
            mr: 0,
            ml: 0,
            mb: 0,
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
        item: {
            justifyContent: "center",
            alignItems: "stretch",
            xs: 12,
            sm: 12,
            md: 12,
            lg: 6,
            xl: 6,
            spacing: 0,
        }
    },
};

export default styles;
