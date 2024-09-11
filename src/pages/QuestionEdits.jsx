import { useParams } from 'react-router-dom';
import EditsDetailed from '../components/EditsDetails/EditsDetailed';
import { getDocById } from '../firebaseHelpers';
import { useState, useEffect } from 'react';

function QuestionEdits() {
  const [questionInfo, setQuestionInfo] = useState(null);
  const [answerInfo, setAnswerInfo] = useState(null);
  const { questionID, answerID } = useParams();
  useEffect(
    function () {
      async function getQuestionInfo() {
        const res = await getDocById('questions', questionID);
        setQuestionInfo(res);
      }

      async function getAnswerInfo() {
        const res = await getDocById('answers', answerID);
        setAnswerInfo(res);
      }
      if (answerID) {
        getAnswerInfo();
      } else {
        getQuestionInfo();
      }
    },
    [questionID, answerID]
  );
  return <EditsDetailed questionInfo={questionInfo} answerInfo={answerInfo} />;
}

export default QuestionEdits;
