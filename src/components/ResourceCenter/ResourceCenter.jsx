import { Link } from 'react-router-dom';
import styles from './ResourceCenter.module.css';

function ResourceCenter() {
  return (
    <div className={styles.allWrapper}>
      <h1>Resource Center</h1>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2  g-2 gy-3 w-75'>
        <div className='col-sm-6 mb-3 mb-sm-0'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorBlueTitle}`}>
                Asking a Question
              </h5>
              <hr />
              <p className='card-text'>
                <ul className={styles.askingQuestionList}>
                  <li>
                    <Link to='/resources/goodTitle'>Created a good title</Link>
                  </li>
                  <li>
                    <Link to='/resources/goodQuestion'>
                      Asking a good question
                    </Link>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorOrangeTitle}`}>
                Answering
              </h5>
              <hr />
              <p className='card-text'>
                <ul className={styles.answerQuestionList}>
                  <li>
                    <Link to='/resources/goodAnswer'>
                      What makes a good answer?
                    </Link>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorBlueTitle}`}>
                Frequently Asked Questions
              </h5>
              <hr />
              <p className='card-text'>
                <div className={styles.faqsStyleWrapper}>
                  <Link to='/resources/gotSuggestion'>
                    What if my question received a suggestion?
                  </Link>
                  <Link to='/resources/sameQuestion'>
                    Can I ask the same question multiple times?
                  </Link>
                  <Link to='/resources/askingSomeonesQuestion'>
                    Can I ask a question someone else has asked?
                  </Link>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceCenter;
