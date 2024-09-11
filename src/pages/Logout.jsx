import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const auth = getAuth();
  const navigate = useNavigate();
  signOut(auth)
    .then(() => {
      console.log('Logged out');
      navigate('/');
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
  return <h1>Logout</h1>;
}

export default Logout;
