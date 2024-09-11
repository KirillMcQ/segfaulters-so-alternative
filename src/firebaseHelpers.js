import {
  initializeFirestore,
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  getAdditionalUserInfo,
} from 'firebase/auth';
import app from './firebase';

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

const auth = getAuth(app);

async function createNewDoc(collection, docTitle, data) {
  await setDoc(doc(db, collection, docTitle), data);
}

async function getUserDocFromUid(uid) {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let returnVal = null;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    returnVal = doc.data();
  });
  return returnVal;
}

async function getEntireCollection(col) {
  const snapshot = await getDocs(collection(db, col));
  return snapshot.docs.map((doc) => doc.data());
}

async function getDocById(col, id) {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

async function getAnswersForCertainQuestion(questionID) {
  const q = query(
    collection(db, 'answers'),
    where('forQuestion', '==', questionID)
  );
  const querySnapshot = await getDocs(q);
  let resultArr = [];
  querySnapshot.forEach((doc) => {
    resultArr.push(doc.data());
  });
  return resultArr;
}

async function updateCertainDoc(col, docID, data) {
  const docRef = doc(db, col, docID);

  // Update the data in the doc
  await updateDoc(docRef, data);
}

async function incrementUserUpvotes(uid) {
  const docRef = doc(db, 'users', uid);

  await updateDoc(docRef, {
    amtUpvotes: increment(1),
  });
}

async function decrementUserUpvotes(uid) {
  const docRef = doc(db, 'users', uid);

  await updateDoc(docRef, {
    amtUpvotes: increment(-1),
  });
}

async function incrementAnswerUpvotes(answerID) {
  const docRef = doc(db, 'answers', answerID);

  await updateDoc(docRef, {
    amtUpvotes: increment(1),
  });
}

async function decrementAnswerUpvotes(answerID) {
  const docRef = doc(db, 'answers', answerID);

  await updateDoc(docRef, {
    amtUpvotes: increment(-1),
  });
}

async function incrementQuestionUpvotes(questionID) {
  const docRef = doc(db, 'questions', questionID);

  await updateDoc(docRef, {
    amtUpvotes: increment(1),
  });
}

async function decrementQuestionUpvotes(questionID) {
  const docRef = doc(db, 'questions', questionID);

  await updateDoc(docRef, {
    amtUpvotes: increment(-1),
  });
}

async function appendToArrInDoc(col, docID, arrName, valToBeAppended) {
  const docRef = doc(db, col, docID);

  // Atomically add a new item to the array field.
  await updateDoc(docRef, {
    [arrName]: arrayUnion(valToBeAppended),
  });
}

async function removeValFromArrInDoc(col, docID, arrName, valToBeRemoved) {
  const washingtonRef = doc(db, col, docID);

  // Atomically remove an item from the array field.
  await updateDoc(washingtonRef, {
    [arrName]: arrayRemove(valToBeRemoved),
  });
}

async function getQuestionsFromUid(uid) {
  const q = query(collection(db, 'questions'), where('uidCreated', '==', uid));
  const querySnapshot = await getDocs(q);
  let resultArr = [];
  querySnapshot.forEach((doc) => {
    resultArr.push(doc.data());
  });
  return resultArr;
}

async function getAmtUserUpvotes(uid) {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let returnVal = null;
  querySnapshot.forEach((doc) => {
    returnVal = doc.data().amtUpvotes;
  });
  return returnVal;
}

async function upgradeUserExperienceLevel(uid, amtUpvotes) {
  console.log(amtUpvotes);
  // Check if user should be intermediate
  if (amtUpvotes >= 100 && amtUpvotes < 250) {
    // User has greater than 100 total upvotes, should be moved to intermediate
    console.log('here 100');
    updateCertainDoc('users', uid, {
      experienceLevel: 'intermediate',
    }).then((res) => window.location.reload());
  }
  if (amtUpvotes >= 250 && amtUpvotes < 500) {
    // User should be advanced for 250 total upvotes
    console.log('here 250');
    updateCertainDoc('users', uid, {
      experienceLevel: 'advanced',
    }).then((res) => window.location.reload());
  }
  if (amtUpvotes >= 500) {
    // User should be expert level
    console.log('here 500');
    updateCertainDoc('users', uid, {
      experienceLevel: 'expert',
    }).then((res) => window.location.reload());
  }
}

async function checkIfUserExistsByUsername(username) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const querySnapshot = await getDocs(q);
  let returnVal = false;
  querySnapshot.forEach((doc) => {
    returnVal = true;
  });
  return returnVal;
}

async function handleSignUpWithGoogle(navigate) {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      const [firstName, lastName] = user.displayName.split(' ');
      const uid = user.uid;
      const moreUserInfo = getAdditionalUserInfo(result);
      console.log(moreUserInfo.isNewUser);
      if (moreUserInfo.isNewUser) {
        console.log('hereNewUser');
        createNewDoc('users', user.uid, {
          firstName,
          lastName,
          email: user.email,
          username: 'user' + Math.floor(100000 + Math.random() * 900000),
          uid: user.uid,
          experienceLevel: 'beginner',
          amtUpvotes: 0,
          amtSuggestions: 0,
          isModerator: false,
          wasOnboarded: false,
        }).then((result) => {
          navigate('/onboard/' + uid);
        });
      } else {
        navigate('/questions');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

async function handleSignInWithGoogle(navigate) {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      const [firstName, lastName] = user.displayName.split(' ');
      const uid = user.uid;
      const moreUserInfo = getAdditionalUserInfo(result);
      if (moreUserInfo.isNewUser) {
        console.log('here');
        createNewDoc('users', user.uid, {
          firstName,
          lastName,
          email: user.email,
          username: 'user' + Math.floor(100000 + Math.random() * 900000),
          uid: user.uid,
          experienceLevel: 'beginner',
          amtUpvotes: 0,
          amtSuggestions: 0,
          isModerator: false,
          wasOnboarded: false,
        }).then((result) => {
          navigate('/onboard/' + uid);
        });
      } else {
        navigate('/questions');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

async function handleSignUpWithGithub(navigate) {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      const [firstName, lastName] = ['user', 'user'];
      const uid = user.uid;
      const moreUserInfo = getAdditionalUserInfo(result);
      console.log(moreUserInfo.isNewUser);
      if (moreUserInfo.isNewUser) {
        console.log('hereNewUser');
        createNewDoc('users', user.uid, {
          firstName,
          lastName,
          email: user.email,
          username: 'user' + Math.floor(100000 + Math.random() * 900000),
          uid: user.uid,
          experienceLevel: 'beginner',
          amtUpvotes: 0,
          amtSuggestions: 0,
          isModerator: false,
          wasOnboarded: false,
        }).then((result) => {
          navigate('/onboard/' + uid);
        });
      } else {
        navigate('/questions');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

async function handleSignInWithGithub(navigate, setIsError) {
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      const [firstName, lastName] = ['user', 'user'];
      const uid = user.uid;
      const moreUserInfo = getAdditionalUserInfo(result);
      if (moreUserInfo.isNewUser) {
        console.log('here');
        createNewDoc('users', user.uid, {
          firstName,
          lastName,
          email: user.email,
          username: 'user' + Math.floor(100000 + Math.random() * 900000),
          uid: user.uid,
          experienceLevel: 'beginner',
          amtUpvotes: 0,
          amtSuggestions: 0,
          isModerator: false,
          wasOnboarded: false,
        }).then((result) => {
          navigate('/onboard/' + uid);
        });
      } else {
        navigate('/questions');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsError(errorCode.replace('/', '').replace('auth', ''));
      console.log(errorCode, errorMessage);
    });
}

async function deleteDocFromCollection(coll, docID) {
  await deleteDoc(doc(db, coll, docID));
}

async function getAmtOfDocsWhereArrayContainsValue(col, arrName, val) {
  const q = query(collection(db, col), where(arrName, 'array-contains', val));
  const querySnapshot = await getDocs(q);
  let count = 0;
  querySnapshot.forEach((doc) => {
    count++;
  });
  return count;
}

export {
  createNewDoc,
  getUserDocFromUid,
  getEntireCollection,
  getDocById,
  getAnswersForCertainQuestion,
  updateCertainDoc,
  incrementUserUpvotes,
  decrementUserUpvotes,
  incrementAnswerUpvotes,
  decrementAnswerUpvotes,
  appendToArrInDoc,
  removeValFromArrInDoc,
  getQuestionsFromUid,
  incrementQuestionUpvotes,
  decrementQuestionUpvotes,
  getAmtUserUpvotes,
  upgradeUserExperienceLevel,
  checkIfUserExistsByUsername,
  handleSignUpWithGoogle,
  handleSignInWithGoogle,
  handleSignUpWithGithub,
  handleSignInWithGithub,
  deleteDocFromCollection,
  getAmtOfDocsWhereArrayContainsValue,
};
