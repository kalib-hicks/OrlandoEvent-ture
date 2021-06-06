import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from './images/memories.png';
const App = () => {
    return (
        <Container maxwidth="lg">
<AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Orlando Even-ture</Typography>
        <img src={memories} alt="memories" height="60" />
        </AppBar>
        <Grow in>
            <Conatiner>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}
           </Grid>
           </Conatiner>
        </Grow>
         </Container>
    );
}

export default App;