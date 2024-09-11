import { useParams } from 'react-router-dom';
import QuestionList from '../components/QuestionList/QuestionList';
import './SearchedQuestions.css';

function SearchedQuestions({ user }) {
  const { query } = useParams();
  return (
    <div className='allWrapper container'>
      <QuestionList user={user} searchQuery={query} />
    </div>
  );
}

export default SearchedQuestions;
