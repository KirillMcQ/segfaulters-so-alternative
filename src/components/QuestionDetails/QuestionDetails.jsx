import { useEffect, useState } from 'react';
import {
  getDocById,
  getAnswersForCertainQuestion,
  appendToArrInDoc,
  getUserDocFromUid,
  updateCertainDoc,
  removeValFromArrInDoc,
} from '../../firebaseHelpers';
import styles from './QuestionDetails.module.css';
import TagItem from './TagItem/TagItem';
import AnswerForm from './AnswerForm/AnswerForm';
import AnswersList from './AnswersList/AnswersList';
import QuestionUpvote from './QuestionUpvote/QuestionUpvote';
import moderatorShield from '../../assets/moderatorShield.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

function QuestionDetails({ user, questionID }) {
  const [questionInfo, setQuestionInfo] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [edittedQuestionBody, setEdittedQuestionBody] = useState(
    questionInfo?.body
  );
  const didSignedInUserCreateCurQuestion =
    questionInfo?.uidCreated === user?.uid;

  useEffect(
    function () {
      // Get the question details from firestore
      async function getQuestionDetails() {
        const res = await getDocById('questions', questionID);
        setQuestionInfo(res);
        setEdittedQuestionBody(res.body);
      }

      // Get the answers for the questions
      async function getAnswers() {
        const res = await getAnswersForCertainQuestion(questionID);
        setQuestionAnswers(res);
      }

      async function getUserInfo() {
        if (user) {
          const res = await getUserDocFromUid(user.uid);
          setUserInfo(res);
        }
      }

      console.log('Querying');

      getQuestionDetails();
      getAnswers();
      getUserInfo();
    },
    [questionID, user?.uid, user]
  );

  function handleSubmitComment(e) {
    e.preventDefault();
    appendToArrInDoc('questions', questionID, 'comments', {
      commentBody,
      userCreated: userInfo.username,
      uidCreated: user.uid,
      commentID: crypto.randomUUID(),
    }).then((result) => window.location.reload());
  }

  function handleAddCommentText(e) {
    let text = e.target.value;
    if (text.length < 300) {
      setCommentBody(text);
    } else if (text.length < commentBody) {
      setCommentBody(text);
    }
  }

  function handleCancelEditBtnClick() {
    setIsUserEditing(false);
  }

  function handleSubmitEditQuestion() {
    console.log('Submit editted question');
    console.log(edittedQuestionBody);
    updateCertainDoc('questions', questionInfo.questionID, {
      edits: [
        ...questionInfo.edits,
        {
          beforeEdit: questionInfo.body,
          afterEdit: edittedQuestionBody,
          userUid: user.uid,
          username: userInfo.username,
          dateEdited: new Date(),
        },
      ],
    }).then((result) => {
      updateCertainDoc('questions', questionInfo.questionID, {
        body: edittedQuestionBody,
      }).then((result) => window.location.reload());
    });
  }

  function handleDeleteComment(comment) {
    removeValFromArrInDoc(
      'questions',
      questionInfo.questionID,
      'comments',
      comment
    ).then((result) => window.location.reload());
  }

  if (!questionInfo) {
    return <p>Loading...</p>;
  }
  return (
    <div className={`${styles.centerEverything} container`}>
      <QuestionUpvote
        user={user}
        questionInfo={questionInfo}
        isUserEditing={isUserEditing}
        setIsUserEditing={setIsUserEditing}
        userInfo={userInfo}
      />
      <div className={`${styles.allWrapper}`}>
        <div className={styles.questionDetailsWrapper}>
          <h1 className={styles.questionTitle}>{questionInfo.title}</h1>
          {isUserEditing ? (
            <div className={styles.editQuestionWrapper}>
              <ReactQuill
                value={edittedQuestionBody}
                onChange={setEdittedQuestionBody}
                theme='snow'
              />
              <button
                className={`${styles.submitEditBtn} btn btn-success`}
                onClick={handleSubmitEditQuestion}
              >
                Submit
              </button>
              <button
                className={`${styles.cancelEditBtn} btn btn-danger`}
                onClick={handleCancelEditBtnClick}
              >
                Cancel
              </button>
            </div>
          ) : (
            <ReactQuill
              value={questionInfo.body}
              readOnly={true}
              theme='bubble'
            />
          )}

          <div className={styles.questionTagsWrapper}>
            {questionInfo.tags.map((tag) => (
              <TagItem key={crypto.randomUUID()}>{tag}</TagItem>
            ))}
          </div>
        </div>
        <div className={styles.userCreatedInfo}>
          <p>
            {questionInfo?.usernameCreated}{' '}
            {questionInfo?.userModCreated ? (
              <img
                src={moderatorShield}
                className={styles.modShield}
                alt='Moderator Shield'
              />
            ) : (
              ''
            )}
          </p>
          <p>{questionInfo?.experienceLevelCreated}</p>
        </div>
        {user ? (
          <div className={styles.commentsWrapper}>
            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <input
                className={styles.commentInput}
                placeholder='Add a comment'
                value={commentBody}
                onChange={(e) => handleAddCommentText(e)}
                required
              />
              <button className={styles.addCommentBtn}>Add Comment</button>
            </form>
          </div>
        ) : (
          ''
        )}
        <div className={styles.commentListWrapper}>
          {questionInfo
            ? questionInfo.comments.map((comment) => (
                <p key={comment.commentBody} className={styles.commentItem}>
                  {comment.commentBody} -{' '}
                  <span className={styles.colorBlue}>
                    {comment.userCreated}
                  </span>
                  {user?.uid === comment.uidCreated ? (
                    <p
                      className={styles.deleteCommentBtn}
                      onClick={() => handleDeleteComment(comment)}
                    >
                      Delete
                    </p>
                  ) : (
                    ''
                  )}
                </p>
              ))
            : ''}
        </div>
        <AnswersList
          answers={questionAnswers}
          signedInUserCreated={didSignedInUserCreateCurQuestion}
          user={user}
        />
        {user ? (
          <AnswerForm user={user} questionID={questionID} />
        ) : (
          <p style={{ textAlign: 'center' }}>Please sign in to answer</p>
        )}
      </div>
    </div>
  );
}

export default QuestionDetails;
