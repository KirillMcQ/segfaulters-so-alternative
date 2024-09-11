import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDocFromUid } from '../../firebaseHelpers';
import styles from './ProfileDetails.module.css';
import UserQuestions from './UserQuestions/UserQuestions';

async function queryUserData(username) {}

function ProfileDetails({ user }) {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function userInfoDetailed() {
        if (user) {
          let info;
          await getUserDocFromUid(user.uid).then(
            (userInfo) => (info = userInfo)
          );
          setUserInfo(info);
        }
      }
      userInfoDetailed();
    },
    [user]
  );

  useEffect(
    function () {
      if (!user) {
        console.log('USER IS NOT LOGGED IN!!! THEY SHOULDNT BE HERE!!!!');
        navigate('/');
      }
    },
    [user, navigate]
  );

  return (
    <div className={styles.allWrapper}>
      <h1 className={styles.experienceLevelTitle}>
        Experience level:{' '}
        {userInfo ? (
          <span className={styles.experienceLevel}>
            {userInfo.experienceLevel}
          </span>
        ) : (
          <span>Loading...</span>
        )}
      </h1>
      <div className={styles.centerWrapper}>
        <div className={styles.amtUpvotesWrapper}>
          <h1>
            {userInfo ? (
              <span className={styles.highlightNumberBlue}>
                {userInfo.amtUpvotes}
              </span>
            ) : (
              <span>Loading...</span>
            )}
          </h1>
          <h1>Upvotes</h1>
        </div>
        <div className={styles.amtSuggestionsWrapper}>
          <h1>
            {userInfo ? (
              <span className={styles.highlightNumberOrange}>
                {userInfo.amtSuggestions}
              </span>
            ) : (
              <span>Loading...</span>
            )}
          </h1>
          <h1>Suggestions</h1>
        </div>
      </div>
      <div className={styles.userQuestions}>
        <h1>Your questions</h1>
      </div>
      <div className={styles.userQuestionsWrapper}>
        <UserQuestions uid={user?.uid} />
      </div>
    </div>
  );
}

export default ProfileDetails;
