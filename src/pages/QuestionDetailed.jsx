import { useParams } from 'react-router-dom';
import QuestionDetails from '../components/QuestionDetails/QuestionDetails';

function QuestionDetailed({ user }) {
  // Get the questionID from the url parameters ('/question/:questionID')
  const { questionID } = useParams();

  return <QuestionDetails questionID={questionID} user={user} />;
}

export default QuestionDetailed;
