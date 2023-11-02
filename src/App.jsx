import { CssBaseline, ThemeProvider } from '@mui/material';
import { useDarkMode } from './hooks/use-dark-mode';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import RegisterAdminPage from './components/pages/RegisterAdmin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import RegisterModPage from './components/pages/RegisterMod';
import RegisterUserPage from './components/pages/RegisterUser';
import LoginPage from './components/pages/Login';
import AuthLayout from './components/AuthLayout';
import CommunityPage from './components/pages/Community';
import RootLayout from './components/RootLayout';
import PostPage from './components/pages/Post';
import TagPostsPage from './components/pages/TagPosts';
import ProfilePage from './components/pages/Profile';

const queryClient = new QueryClient();

function App() {
  const { appTheme, handleChange } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <Toaster />
        <CssBaseline />
        <Routes>
          <Route element={<AuthLayout handleChange={handleChange} />}>
            <Route path='/register' element={<RegisterUserPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Route>

          <Route element={<RootLayout handleChange={handleChange} />}>
            <Route index element={<HomePage />} />
            <Route
              path='/communities/:communityName'
              element={<CommunityPage />}
            />
            <Route path='/tags/:tagName' element={<TagPostsPage />} />
            <Route path='/posts/:postId' element={<PostPage />} />
            <Route path='/users/:username' element={<ProfilePage />} />
            <Route path='/register-admin' element={<RegisterAdminPage />} />
            <Route path='/register-mod' element={<RegisterModPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
