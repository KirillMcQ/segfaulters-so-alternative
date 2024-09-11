import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moderatorShield from '../../assets/moderatorShield.svg';
import { CgMenuLeftAlt, CgMenu } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import logo from '../../assets/logo.png';
import SearchModal from './SearchModal/SearchModal';

function Navbar({ user, getUserInfo }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const active = useLocation().pathname;
  let [curNavIcon, setCurNavIcon] = useState('CgMenu');

  useEffect(
    function () {
      async function userInfoDetailed() {
        if (user) {
          let info;
          await getUserInfo(user.uid).then((userInfo) => (info = userInfo));
          setUserInfo(info);
        }
      }
      userInfoDetailed();
    },
    [user, getUserInfo]
  );

  function handleUserClickNavIcon() {
    if (curNavIcon === 'CgMenu') {
      setCurNavIcon('CgMenuLeftAlt');
    } else if (curNavIcon === 'CgMenuLeftAlt') {
      setCurNavIcon('CgMenu');
    }
  }

  function openSearchModal() {
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  return (
    <>
      {isSearchModalOpen && (
        <SearchModal setIsModalOpen={setIsSearchModalOpen} />
      )}
      <nav className='navbar navbar-light navbar-expand-md bg-faded justify-content-center border-bottom mb-1'>
        <div className='container'>
          <Link
            to='/'
            className={`${styles.navlink} ${styles.logo} navbar-brand d-flex w-50 me-auto`}
          >
            <img src={logo} alt='Segfaulters logo' />
            Seg<strong>Faulters</strong>
          </Link>
          <button
            className={`navbar-toggler ${styles.navbarToggler}`}
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapsingNavbar3'
          >
            {curNavIcon === 'CgMenu' ? (
              <CgMenu
                size={30}
                className={styles.navbarTogglerIcon}
                onClick={handleUserClickNavIcon}
              />
            ) : (
              <CgMenuLeftAlt
                size={30}
                className={styles.navbarTogglerIcon}
                onClick={handleUserClickNavIcon}
              />
            )}
          </button>
          <div
            className='navbar-collapse collapse w-100'
            id='collapsingNavbar3'
          >
            <ul className='navbar-nav w-100 justify-content-center'>
              {!user && (
                <li className='nav-item active'>
                  <Link
                    to='/'
                    className={`${styles.navlink} ${
                      active === '/' ? 'active' : ''
                    } nav-link`}
                  >
                    Home
                  </Link>
                </li>
              )}
              <li className='nav-item'>
                <Link
                  to='/questions'
                  className={`${styles.navlink} ${
                    active === '/questions' ? 'active' : ''
                  } nav-link`}
                >
                  Questions
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/resourceCenter'
                  className={`${styles.navlink} ${
                    active === '/resourceCenter' ? 'active' : ''
                  } nav-link`}
                >
                  Resources
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className={`${styles.navlink} ${
                    active === '/about' ? 'active' : ''
                  } nav-link`}
                >
                  About
                </Link>
              </li>
            </ul>

            <ul className='nav navbar-nav ms-auto w-100 justify-content-end'>
              <li
                className={`nav-item ${styles.searchIcon}`}
                onClick={openSearchModal}
              >
                <CiSearch size={30} />
              </li>
              <ul className={`nav-item ${user ? styles.test : ''}`}>
                {user ? (
                  <li className={`nav-item dropdown ${styles.noDecoration}`}>
                    <Link
                      className={`${styles.navlink} ${styles.userProfileLink} dropdown-toggle nav-link`}
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {userInfo ? userInfo.username : 'Loading...'}
                      {userInfo && userInfo.isModerator ? (
                        <img
                          src={moderatorShield}
                          className={styles.modShield}
                          alt='Moderator Shield'
                        />
                      ) : (
                        ''
                      )}
                    </Link>
                    <ul className='dropdown-menu dropdown-menu-light'>
                      <li>
                        <Link className='dropdown-item' to='/profile'>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${styles.logoutLink} dropdown-item`}
                          to='/logout'
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className='nav-item'>
                    <Link to='/login' className={`${styles.navlink} nav-link`}>
                      <button className='btn btn-secondary'>Log in</button>
                    </Link>
                  </li>
                )}
              </ul>
              {!user && (
                <li className='nav-item'>
                  <Link to='/signup' className={`${styles.navlink} nav-link`}>
                    <button className='btn btn-secondary'>Sign up</button>
                  </Link>
                </li>
              )}
              <li className='nav-item'>
                <Link
                  to='/askQuestion'
                  className={`${styles.navlink} nav-link`}
                >
                  <button className='btn btn-primary'>Ask Question</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
