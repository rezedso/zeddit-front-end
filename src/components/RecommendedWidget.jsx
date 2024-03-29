/* eslint-disable react/prop-types */
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RecommendedWidget = ({ theme, communities }) => {
  return (
    <Paper>
      <Stack
        direction='column'
        spacing={1}
        sx={{
          mb: 2,
          p: 2,
        }}
      >
        <Typography>Recommended communities</Typography>
        <Divider />
        {communities?.map((community) => (
          <Link to={`/communities/${community.name}`} key={community.id}>
            <Typography sx={{ color: theme.palette.text.primary }}>
              c/{community.name}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};

export default RecommendedWidget;
