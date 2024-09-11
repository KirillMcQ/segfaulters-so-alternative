import { useParams } from 'react-router-dom';
import TagDetailedList from '../components/TagDetailedList/TagDetailedList';
function TagQuestionList() {
  const { tagName } = useParams();
  return <TagDetailedList tag={tagName} />;
}

export default TagQuestionList;
