import {
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  useGetUser,
  useGetUserDownVotedPosts,
  useGetUserPosts,
  useGetUserSavedPosts,
  useGetUserUpVotedPosts,
  useGetUsers,
} from '../../lib/react-query/queries';
import { Link, useParams } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { getCurrentUser } from '../../services/auth.service';
import ImageIcon from '@mui/icons-material/Image';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CustomTabPanel from '../CustomTabPanel';
import UpdateUserModal from '../UpdateUserModal';
import Loader from '../Loader';

const ProfilePage = () => {
  const params = useParams();
  const theme = useTheme();
  const currentUser = getCurrentUser();
  const [value, setValue] = useState('1');
  const { data: user, isLoading: userIsLoading } = useGetUser(params?.username);
  const { data } = useGetUsers();
  const {
    data: userPosts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetUserPosts(user?.id);

  const {
    data: userUpVotedPosts,
    hasNextPage: upVotedPostsHasNextPage,
    fetchNextPage: upVotedPostsFetchNextPage,
    isLoading: upVotedPostsIsLoading,
  } = useGetUserUpVotedPosts(user?.id);

  const {
    data: userDownVotedPosts,
    hasNextPage: downVotedPostsHasNextPage,
    fetchNextPage: downVotedPostsFetchNextPage,
    isLoading: downVotedPostsIsLoading,
  } = useGetUserDownVotedPosts(user?.id);

  const {
    data: userSavedPosts,
    hasNextPage: savedPostsHasNextPage,
    fetchNextPage: savedPostsFetchNextPage,
    isLoading: savedPostsIsLoading,
  } = useGetUserSavedPosts();

  const total =
    userPosts?.pages.map((group) => group?.content).flatMap((p) => p.length) *
    userPosts?.pages.map((group) => group.totalPages);

  const users = data?.filter((u) => u.username !== params?.username);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth='md'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          {userIsLoading ? (
            <Loader />
          ) : (
            <>
              <Stack direction='row'>
                <IconButton
                  sx={{ cursor: 'default', p: 0 }}
                  disableFocusRipple
                  disableRipple
                >
                  {user?.imageUrl !== null ? (
                    <Avatar
                      alt='Avatar'
                      src={user?.imageUrl}
                      sx={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: '6rem' }} />
                  )}
                </IconButton>
                <Stack
                  sx={{ display: 'flex', justifyContent: 'center', ml: 1 }}
                >
                  <Typography variant='h5'>
                    <b>{user?.username}</b>
                  </Typography>
                  <Typography variant='body1'>@{user?.username}</Typography>
                  <Typography variant='body1'>
                    {total} {total > 1 ? 'Posts' : 'Post'}
                  </Typography>
                </Stack>
                <UpdateUserModal profileUser={user} />
              </Stack>
              <Stack sx={{ mt: 1 }}>
                <TabContext value={value}>
                  <TabList variant='scrollable' onChange={handleChange}>
                    <Tab
                      icon={<ImageIcon />}
                      iconPosition='start'
                      label='Posts'
                      value='1'
                    />
                    <Tab
                      icon={<ArrowUpwardIcon />}
                      iconPosition='start'
                      label='Upvoted Posts'
                      value='2'
                    />
                    <Tab
                      icon={<ArrowDownwardIcon />}
                      iconPosition='start'
                      label='Downvoted Posts'
                      value='3'
                    />
                    {currentUser?.id === user?.id && (
                      <Tab
                        icon={<InsertDriveFileIcon />}
                        iconPosition='start'
                        label='Saved Posts'
                        value={'4' || false}
                      />
                    )}
                  </TabList>
                  <CustomTabPanel
                    data={userPosts}
                    value={'1'}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isLoading={isLoading}
                  />
                  <CustomTabPanel
                    data={userUpVotedPosts}
                    value={'2'}
                    fetchNextPage={upVotedPostsFetchNextPage}
                    hasNextPage={upVotedPostsHasNextPage}
                    isLoading={upVotedPostsIsLoading}
                  />
                  <CustomTabPanel
                    data={userDownVotedPosts}
                    value={'3'}
                    fetchNextPage={downVotedPostsFetchNextPage}
                    hasNextPage={downVotedPostsHasNextPage}
                    isLoading={downVotedPostsIsLoading}
                  />
                  {currentUser?.id === user?.id && (
                    <CustomTabPanel
                      data={userSavedPosts}
                      value={'4'}
                      fetchNextPage={savedPostsFetchNextPage}
                      hasNextPage={savedPostsHasNextPage}
                      isLoading={savedPostsIsLoading}
                    />
                  )}
                </TabContext>
              </Stack>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {users?.length > 0 && (
            <Paper>
              <Stack
                spacing={1}
                sx={{
                  mb: 2,
                  p: 2,
                }}
              >
                <Typography>Other users</Typography>
                <Divider />
                {users?.map((user) => (
                  <Stack key={user?.id}>
                    <Link key={user.id} to={`/users/${user.username}`}>
                      <Stack
                        direction='row'
                        spacing={1}
                        sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                      >
                        <IconButton sx={{ p: 0 }}>
                          {user?.imageUrl !== null ? (
                            <Avatar
                              alt='Avatar'
                              src={user?.imageUrl}
                              sx={{ width: '2.5rem', height: '2.5rem' }}
                            />
                          ) : (
                            <AccountCircle sx={{ fontSize: '2.5rem' }} />
                          )}
                        </IconButton>
                        <Typography
                          sx={{ color: theme.palette.text.primary }}
                          variant='caption'
                        >
                          @{user.username}
                        </Typography>
                      </Stack>
                    </Link>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
