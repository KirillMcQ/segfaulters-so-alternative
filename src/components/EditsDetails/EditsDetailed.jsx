import './EditsDetailed.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

function EditsDetailed({ questionInfo, answerInfo }) {
  let counter = 0;
  if (answerInfo) {
    questionInfo = answerInfo;
  }
  if (!questionInfo) {
    return <p>Loading...</p>;
  }
  return (
    <div className='allWrapper'>
      {!answerInfo && (
        <h1>
          Edits for question:{' '}
          <span className='colorBlue'>{questionInfo.title}</span>
        </h1>
      )}
      <div className='editsListWrapper'>
        {questionInfo.edits.map((edit) => (
          <div
            className='editItem container border rounded'
            key={edit.afterEdit}
          >
            <p>Date: {edit.dateEdited.toDate().toDateString()}</p>
            <p>Edited By: {edit.username}</p>
            <p className='colorOrange'>Before:</p>
            <ReactQuill
              value={edit.beforeEdit}
              readOnly={true}
              theme='bubble'
            />
            <p className='colorBlue'>After:</p>
            <ReactQuill value={edit.afterEdit} readOnly={true} theme='bubble' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditsDetailed;
