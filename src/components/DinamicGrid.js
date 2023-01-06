import { useState } from 'react';

import { Grid } from '@mui/material';

import React from 'react';

const DinamicGrid = (Itens) => {
    const sizeItens = (Itens.First != null) + (Itens.Second != null) + (Itens.Third != null) + (Itens.Fourth != null);
    console.log('Hello');
    console.log(Itens);
    console.log(sizeItens);
    console.log('End');
    switch (sizeItens) {
        case 1:
            return (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* Main block */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Itens.First />
                    </Grid>
                </Grid>
            );
        case 2:
            return (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* Main block */}
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Itens.First />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Itens.Second />
                    </Grid>
                </Grid>
            );
        case 3:
            return (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* Main block */}
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.First />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.Second />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Itens.Third />
                    </Grid>
                </Grid>
            );
        case 4:
            return (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* Main block */}
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.First />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.Second />
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.Third />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Itens.Fourth />
                        </Grid>
                    </Grid>
                </Grid>
            );
        default:
            return (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* Main block */}
                    <div> Something is wrong </div>
                </Grid>
            );
    }
};

export default DinamicGrid;
