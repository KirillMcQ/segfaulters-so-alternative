import { Link } from 'react-router-dom';
import './FrontContent.css';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FcAbout } from 'react-icons/fc';
import { useEffect } from 'react';
import { HiDocumentDuplicate, HiUserGroup } from 'react-icons/hi';
import { AiTwotoneHeart, AiTwotoneStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function FrontContent({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Code for fading in the elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  useEffect(
    function () {
      if (user) {
        navigate('/questions');
      }
    },
    [user, navigate]
  );
  return (
    <div className='center'>
      <div className='frontContent logos more-padding-on-mobile'>
        <h1 className='hidden logo'>
          The <span className='wordChange'>professional</span> developer
          community
        </h1>
        <p className='desc hidden logo'>
          Coding is hard, we get that. That is why we created an inclusive
          developer community that will get your questions answered. Unlike
          other forum sites, we welcome beginners, and have an intuitive
          reputation system, <strong>geared toward helping people learn</strong>
          .
        </p>

        {/* Home card group */}
        <div className='card-group logos margin-bottom-on-mobile'>
          <div
            className={`card introCardSignUp logo1 hidden`}
            style={{ width: '18rem' }}
          >
            <div className='card-body text-center'>
              <AiOutlineQuestionCircle size={40} />
              <h5 className='card-title'>
                <strong>Got a question? We&apos;ve got the answer.</strong>
              </h5>
              <p className='card-text'>
                Get started by signing up for the community.
              </p>
              <Link to='/signup' className={`fullWidthBtn`}>
                <button type='button' className='btn btn-primary'>
                  Join the Community
                </button>
              </Link>
            </div>
          </div>
          <div
            className={`card introCardAnswer logo2 hidden`}
            style={{ width: '18rem' }}
          >
            <div className='card-body text-center'>
              <BiSolidSearchAlt2 size={40} />
              <h5 className='card-title'>
                <strong>Want to answer? We&apos;ve got the questions.</strong>
              </h5>
              <p className='card-text'>
                Check out the questions and begin answering now.
              </p>
              <Link to='/questions' className='fullWidthBtn'>
                <button type='button' className='btn btn-primary'>
                  Questions
                </button>
              </Link>
            </div>
          </div>
          <div
            className={`card introCardAbout logo3 hidden`}
            style={{ width: '18rem' }}
          >
            <div className='card-body text-center'>
              <FcAbout size={40} />
              <h5 className='card-title'>
                <strong>Wondering why should you use our site?</strong>
              </h5>
              <p className='card-text'>
                Check out the about us page for more information.
              </p>
              <Link to='/about' className={`fullWidthBtn`}>
                <button type='button' className='btn btn-primary'>
                  About Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
      {/* Start of the next content */}
      {/* <div className='sitePreview hidden'>
        <h1>Our platform</h1>
        <div className='card-group logos'>
          <div
            className='card border rounded logo hidden'
            style={{ width: '18rem' }}
          >
            <div className='card-body'>
              <h5 className={`card-title`}>Duplicates aren&apos;t closed</h5>
            </div>
          </div>
          <div
            className='card border rounded logo hidden'
            style={{ width: '18rem' }}
          >
            <div className='card-body'>
              <h5 className={`card-title colorBlue`}>No down voting</h5>
            </div>
          </div>
          <div
            className='card border rounded logo hidden'
            style={{ width: '18rem' }}
          >
            <div className='card-body'>
              <h5 className={`card-title colorOrange`}>No reputation points</h5>
            </div>
          </div>
          <div
            className='card border rounded logo hidden'
            style={{ width: '18rem' }}
          >
            <div className='card-body'>
              <h5 className={`card-title differentColor`}>
                Everyone can comment
              </h5>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default FrontContent;
