import styles from './TagDetailedList.module.css';
import QuestionList from '../QuestionList/QuestionList';

function TagDetailedList({ tag }) {
  return <QuestionList tagNameFilter={tag} />;
}

export default TagDetailedList;
