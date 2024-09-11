import { useEffect, useState } from 'react';
import styles from './QuestionList.module.css';
import {
  getEntireCollection,
  getAmtOfDocsWhereArrayContainsValue,
} from '../../firebaseHelpers';
import QuestionItem from './QuestionItem/QuestionItem';
import TagItem from './TagItem/TagItem';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

function QuestionList({ user, tagNameFilter = false, searchQuery = false }) {
  const [questions, setQuestions] = useState(null);
  const [userInputQuery, setUserInputQuery] = useState(
    searchQuery ? searchQuery : ''
  );
  let tagFilteredQuestions = null;
  let searchQueryFilteredQuestions = null;
  const navigate = useNavigate();

  useEffect(function () {
    async function storeEntireDocs() {
      let res = await getEntireCollection('questions');
      setQuestions(res);
    }
    storeEntireDocs();
  }, []);

  if (questions) {
    // Sort by date
    questions.sort((a, b) => b.dateCreated - a.dateCreated);
  }

  if (tagNameFilter && questions) {
    // Should only show the questions with a certain tag in them
    tagFilteredQuestions = questions.filter((question) =>
      question.tags.includes(tagNameFilter)
    );
  }

  if (searchQuery && questions) {
    searchQueryFilteredQuestions = questions.filter((question) => {
      return question.title.includes(searchQuery);
    });
    let searchedByBody = questions.filter((question) => {
      return question.body.includes(searchQuery);
    });
    searchQueryFilteredQuestions.push(...searchedByBody);
    // Remove duplicates from the array
    searchQueryFilteredQuestions = [...new Set(searchQueryFilteredQuestions)];
  }

  return (
    <div className={`${styles.allWrapper} container`}>
      <div className={`${styles.questionsList} container`}>
        {questions && !tagFilteredQuestions && !searchQueryFilteredQuestions
          ? questions.map((question) => (
              <QuestionItem
                title={question.title}
                body={question.body}
                tags={question.tags}
                questionID={question.questionID}
                isAnswered={question.isAnswered}
                amtUpvotes={question.amtUpvotes}
                key={question.questionID}
              />
            ))
          : (tagFilteredQuestions || searchQueryFilteredQuestions) && questions
          ? ''
          : 'Loading...'}
        {questions && tagFilteredQuestions && !searchQueryFilteredQuestions
          ? tagFilteredQuestions.map((question) => {
              return (
                <QuestionItem
                  title={question.title}
                  body={question.body}
                  tags={question.tags}
                  questionID={question.questionID}
                  isAnswered={question.isAnswered}
                  amtUpvotes={question.amtUpvotes}
                  key={question.questionID}
                />
              );
            })
          : questions && !tagFilteredQuestions
          ? ''
          : 'Loading..'}
        {questions && !tagFilteredQuestions && searchQueryFilteredQuestions
          ? searchQueryFilteredQuestions.map((question) => {
              return (
                <QuestionItem
                  title={question.title}
                  body={question.body}
                  tags={question.tags}
                  questionID={question.questionID}
                  isAnswered={question.isAnswered}
                  amtUpvotes={question.amtUpvotes}
                  key={question.questionID}
                />
              );
            })
          : questions && !searchQueryFilteredQuestions
          ? ''
          : 'Loading.'}
      </div>
    </div>
  );
}

export default QuestionList;
