import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AskQuestionForm.module.css';
import Tag from './Tag/Tag';
import { createNewDoc, getUserDocFromUid } from '../../firebaseHelpers';
import ReactQuill from 'react-quill';
import { HiInformationCircle } from 'react-icons/hi';
import 'react-quill/dist/quill.snow.css';

const TITLE_CHAR_MAX = 150; // Max chars for the title
const BODY_CHAR_MAX = 30000; // Max chars for the body (30,000)
const TAGS_MAX = 5; // Maximum of 5 tags

function AskQuestionForm({ user }) {
  const [test, setTest] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [tags, setTags] = useState([]);
  const [noTagsErr, setNoTagsErr] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  console.log(test);

  function handleTitleTextChange(e) {
    let curTitleText = e.target.value;
    if (curTitleText.length < TITLE_CHAR_MAX) {
      setTitle(curTitleText);
    }
  }

  function handleBodyTextChange(val) {
    let curBodyText = val;
    if (curBodyText.length < BODY_CHAR_MAX) {
      setBody(curBodyText);
    }
  }

  function handleTagsTextChange(e) {
    let curTagsText = e.target.value;
    setTagsText(curTagsText);
    const isStringEmpyRegex = /[a-zA-Z]/;
    // Make sure there are letters inside the name of the tag
    if (curTagsText.match(isStringEmpyRegex)) {
      if (curTagsText.endsWith(' ')) {
        if (tags.length < TAGS_MAX) {
          setTags((curTags) => [...curTags, curTagsText.trim().toLowerCase()]);
          setTagsText('');
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tags.length > 0) {
      console.log('Creating question');
      const questionID = crypto.randomUUID();
      createNewDoc('questions', questionID, {
        title,
        body,
        tags,
        usernameCreated: userInfo.username,
        experienceLevelCreated: userInfo.experienceLevel,
        uidCreated: user.uid,
        userModCreated: userInfo.isModerator,
        questionID,
        amtUpvotes: 0,
        amtSuggestions: 0,
        isAnswered: false,
        comments: [],
        upvotedBy: [],
        suggestions: [],
        dateCreated: new Date().getTime(),
        edits: [],
      });
      navigate('/questions');
    } else {
      setNoTagsErr(true);
    }
  }

  useEffect(
    function () {
      if (!user) {
        console.log('USER IS NOT LOGGED IN!!! THEY SHOULDNT BE HERE!!!!');
        navigate('/signup');
      }
      async function getUserInfo() {
        const res = await getUserDocFromUid(user.uid);
        setUserInfo(res);
      }
      getUserInfo();
    },
    [user, navigate]
  );

  return (
    <div className={styles.centerWrapper}>
      <form
        className={`${styles.askQuestionForm} container`}
        onSubmit={handleSubmit}
      >
        <div className='mb-3'>
          <input
            className={`${styles.questionTitle} form-control`}
            placeholder='Title'
            type='text'
            value={title}
            onChange={handleTitleTextChange}
            id='titleInput'
            required
          />
        </div>
        <div className={`mb-3 ${styles.quillWrapper}`}>
          <ReactQuill
            className={styles.questionBody}
            value={body}
            onChange={handleBodyTextChange}
            theme='snow'
          />
        </div>
        <label htmlFor='tagsInput'>
          <HiInformationCircle size={30} /> Press space to add tag
        </label>
        <div className='mb-3'>
          <input
            id='tagsInput'
            className={`${styles.questionTags} form-control`}
            placeholder='Tags (5 max)'
            type='text'
            value={tagsText}
            style={noTagsErr ? { border: '1px solid red' } : {}}
            onChange={handleTagsTextChange}
          />
        </div>
        <div className='mb-3'>
          <div
            className={`container ${styles.tagsList} w-100`}
            style={!tags ? { display: 'none' } : {}}
          >
            {tags.length > 0
              ? tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
              : ''}
          </div>
        </div>
        <button className={`${styles.submitBtn} btn btn-primary`}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AskQuestionForm;
