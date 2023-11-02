/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Navbar from './Navbar';
import { getCurrentUser } from '../services/auth.service';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = ({ handleChange }) => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }
  return (
    <main>
      <Navbar handleChange={handleChange} user={user} />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
