import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SignUpOnboarding.module.css';
import { getUserDocFromUid, updateCertainDoc } from '../../firebaseHelpers';

function SignUpOnboarding() {
  const [userInfo, setUserInfo] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const { uid } = useParams();
  const navigate = useNavigate();

  function handleKeepUsername() {
    updateCertainDoc('users', uid, { wasOnboarded: true }).then((result) =>
      navigate('/questions')
    );
  }

  function handleChangeUsername(e) {
    e.preventDefault();
    updateCertainDoc('users', uid, {
      username: updatedUsername,
      wasOnboarded: true,
    }).then((result) => window.location.reload());
  }

  useEffect(
    function () {
      async function userInfoDetailed() {
        let info;
        await getUserDocFromUid(uid).then((userInfo) => (info = userInfo));
        setUserInfo(info);
      }
      userInfoDetailed();
    },
    [uid]
  );

  useEffect(
    function () {
      if (userInfo) {
        if (userInfo.wasOnboarded) {
          // User already onboarded, shouldn't be here
          console.log('USER SHOULDNT BE HERE!!!!!!!');
          navigate('/questions');
        }
      }
    },
    [userInfo, navigate]
  );

  return (
    <div className={`${styles.centerWrapper} container`}>
      <h1>Welcome, {userInfo ? userInfo.firstName : 'loading...'}!</h1>
      <p>
        To finish signing up, enter a custom username, or keep your generated
        username:{' '}
        <span className={styles.generatedUserName}>
          {userInfo ? userInfo.username : 'loading...'}
        </span>
      </p>
      <form
        className={`${styles.updateUsernameForm} container`}
        onSubmit={handleChangeUsername}
      >
        <input
          className={`${styles.usernameInput} form-control`}
          placeholder='Username'
          type='text'
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          required
        />
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
        <p style={{ margin: 0 }}>Or</p>
        <button
          className='btn btn-secondary'
          type='button'
          onClick={handleKeepUsername}
        >
          Keep generated username
        </button>
      </form>
    </div>
  );
}

export default SignUpOnboarding;
