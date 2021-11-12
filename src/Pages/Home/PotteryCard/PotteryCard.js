import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const PotteryCard = (props) => {
    const { name, description, img, price } = props.pottery;
    return (

        <Grid item lg={4} md={6} xs={12} sx={{ px: '15px' }}>
            <Card sx={{ mb: '30px', mx: 'auto' }}>
                <CardMedia
                    component="img"
                    alt="Pottery"
                    height="140"
                    image={img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                        {description.substring(0, 90).concat('...')}
                    </Typography>
                    <Typography variant="p" color="text.secondary" sx={{ my: '20px', fontWeight: 'bold' }}>
                        Price: ${price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PotteryCard;