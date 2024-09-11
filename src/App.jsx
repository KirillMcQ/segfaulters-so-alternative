import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserDocFromUid } from './firebaseHelpers';
import app from './firebase';
import Home from './pages/Home';
import About from './pages/About';
import Questions from './pages/Questions';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import AskQuestion from './pages/AskQuestion';
import QuestionDetailed from './pages/QuestionDetailed';
import TagQuestionList from './pages/TagQuestionList';
import ReputationSystemExplain from './pages/ReputationSystemExplain';
import Onboarding from './pages/Onboarding';
import ResourceCenter from './components/ResourceCenter/ResourceCenter';
import GoodTitle from './components/ResourceCenter/goodTitle/goodTitle';
import GoodQuestion from './components/ResourceCenter/GoodQuestion/GoodQuestion';
import GoodAnswer from './components/ResourceCenter/GoodAnswer/GoodAnswer';
import QuestionEdits from './pages/QuestionEdits';
import GotSuggestion from './components/ResourceCenter/GotSuggestion/GotSuggestion';
import SameQuestion from './components/ResourceCenter/SameQuestion/SameQuestion';
import AskingSomeonesQuestion from './components/ResourceCenter/AskingSomeonesQuestion/AskingSomeonesQuestion';
import SearchedQuestions from './pages/SearchedQuestions';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      console.log('Not Signed In');
    }
  });
  useEffect(function () {
    console.log(
      '------------------------------\nGot Feedback?\nsegfaultersfeedback@gmail.com\n------------------------------'
    );
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar user={user} getUserInfo={getUserDocFromUid} />
        <Routes>
          <Route exact path='/' element={<Home user={user} />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route
            exact
            path='/questions'
            element={<Questions user={user} />}
          ></Route>
          <Route exact path='/signup' element={<SignUp user={user} />}></Route>
          <Route exact path='/login' element={<Login user={user} />}></Route>
          <Route exact path='/logout' element={<Logout />}></Route>
          <Route
            exact
            path='/profile'
            element={<Profile user={user} />}
          ></Route>
          <Route
            exact
            path='/askQuestion'
            element={<AskQuestion user={user} />}
          ></Route>
          <Route
            exact
            path='/about/repSystem'
            element={<ReputationSystemExplain />}
          ></Route>
          <Route
            path='/question/:questionID'
            element={<QuestionDetailed user={user} />}
          ></Route>
          <Route path='/tag/:tagName' element={<TagQuestionList />}></Route>
          <Route path='/onboard/:uid' element={<Onboarding />}></Route>
          <Route
            exact
            path='/resourceCenter'
            element={<ResourceCenter />}
          ></Route>
          <Route
            exact
            path='/resources/goodTitle'
            element={<GoodTitle />}
          ></Route>
          <Route
            exact
            path='/resources/goodQuestion'
            element={<GoodQuestion />}
          ></Route>
          <Route
            exact
            path='/resources/goodAnswer'
            element={<GoodAnswer />}
          ></Route>
          <Route
            path='/edits/:questionID/:answerID?'
            element={<QuestionEdits />}
          ></Route>
          <Route
            exact
            path='/resources/gotSuggestion'
            element={<GotSuggestion />}
          ></Route>
          <Route
            exact
            path='/resources/sameQuestion'
            element={<SameQuestion />}
          ></Route>
          <Route
            exact
            path='/resources/askingSomeonesQuestion'
            element={<AskingSomeonesQuestion />}
          ></Route>
          <Route
            path='/query/:query'
            element={<SearchedQuestions user={user} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
