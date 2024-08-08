import React from 'react';
import { Container, Typography, Avatar, Grid, Paper, Button } from '@mui/material';

const StudentProfilePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Avatar alt='jowan' src='"https://mui.com/static/images/cards/paella.jpg"' style={{ width: 100, height: 100, marginRight: 20 }} />
        <div>
          <Typography variant="h6">jowan</Typography>
          <Typography variant="body1">jo@gmail.com</Typography>
          <Typography variant="body2" color="textSecondary">
            mt viroasdasd
          </Typography>
        </div>
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
        Edit Profile
      </Button>
    </Container>
  );
};

export default StudentProfilePage;
