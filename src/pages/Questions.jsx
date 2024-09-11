import QuestionList from '../components/QuestionList/QuestionList';

function Questions({ user }) {
  return (
    <>
      <QuestionList user={user} />
    </>
  );
}

export default Questions;
