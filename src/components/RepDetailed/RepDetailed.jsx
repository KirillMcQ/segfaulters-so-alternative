import styles from './RepDetailed.module.css';

function RepDetailed() {
  return (
    <div className={`${styles.centerWrapper} container`}>
      <h1>Our reputation system</h1>
      <p>
        To classify users by their skill level, we use 4 different
        classes:&nbsp;
        <span className={styles.expLevelText}>
          beginner, intermediate, advanced, and expert
        </span>
        . Unlike some other forum websites that use points as a reputation
        system, we want the community to be humble and accepting of all skill
        levels, while maintaining some degree of classification.
      </p>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2  g-2 gy-3 w-75'>
        <div className='col-sm-6 mb-3 mb-sm-0'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorDark}`}>Beginner</h5>
              <hr />
              <h3 className='card-text'>0-100 upvotes</h3>
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorOrange}`}>
                Intermediate
              </h5>
              <hr />
              <h3 className='card-text'>100-250 upvotes</h3>
            </div>
          </div>
        </div>
        <div className='col-sm-6 mb-3 mb-sm-0'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorBlue}`}>Advanced</h5>
              <hr />
              <h3 className='card-text'>250-500 upvotes</h3>
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='card w-100 h-100 mx-auto'>
            <div className='card-body'>
              <h5 className={`card-title ${styles.colorBlueTitle}`}>Expert</h5>
              <hr />
              <h3 className='card-text'>500+ upvotes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepDetailed;
