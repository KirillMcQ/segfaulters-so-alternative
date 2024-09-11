import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import app from '../../firebase';
import { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import { validateEmail } from '../../helpers';
import Error from '../Error/Error';
import { FcGoogle } from 'react-icons/fc';
import {
  handleSignInWithGoogle,
  handleSignInWithGithub,
} from '../../firebaseHelpers';
import { AiFillGithub } from 'react-icons/ai';

// Login the user
async function loginUser(auth, email, password, setErrState, navigate) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Redirect user
      navigate('/questions');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrState(errorCode);
    });
}

function LoginForm({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [err, setErr] = useState(null);
  const [githubErr, setGithubErr] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth(app);

  function handleSubmit(e) {
    e.preventDefault();
    if (validateEmail(email)) {
      loginUser(auth, email, password, setErr, navigate);
      if (!err) {
        console.log('here');
      }
    } else {
      setIsEmailValid(false);
    }
  }

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    handleSignInWithGoogle(navigate);
  }

  function handleLoginWithGithubBtnClick() {
    handleSignInWithGithub(navigate, setGithubErr);
  }

  useEffect(
    function () {
      if (user) {
        console.log('USER SHOULDNT BE HERE!!!');
        navigate('/questions');
      }
    },
    [user, navigate]
  );

  return (
    <>
      {githubErr && (
        <div className={styles.centerErr}>
          <div className='alert alert-danger'>{githubErr}</div>
        </div>
      )}
      {err && (
        <div className={styles.centerErr}>
          <Error>{err}</Error>
        </div>
      )}
      <div className={styles.center} onSubmit={handleSubmit}>
        <form className={styles.form}>
          <input
            placeholder='Email'
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={!isEmailValid ? { border: '1px solid red' } : {}}
            required
          />

          <input
            placeholder='Password'
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='btn btn-primary'>Log in</button>
          <p style={{ textAlign: 'center', margin: 0 }}>Or</p>
          <button
            className={`${styles.signInWithGoogleBtn} btn btn-light`}
            type='button'
            onClick={handleLoginWithGoogle}
          >
            Sign in with <FcGoogle size={30} />
          </button>
          <button
            className={`${styles.signInWithGoogleBtn} btn btn-light`}
            type='button'
            onClick={handleLoginWithGithubBtnClick}
          >
            Sign in with <AiFillGithub size={30} />
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
