import { Link, useLocation } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';
import LocaleTime from './LocaleTime';
import { useContext } from 'react';
import KorisnikContext from '../../context/korisnikContext';

const Footer = ({ userID }) => {
    const korisnikContext = useContext(KorisnikContext);
    const {
        user: { ime },
    } = korisnikContext;

    const { pathname } = useLocation();

    document.title = `${ime ? ime : 'MERN App'} | ${pathname.slice(1)}`;

    const goBackBtn = (
        <>
            <Link className='go-home-icon' to='/'>
                <RiArrowGoBackLine />{' '}
            </Link>
            <Link className='go-home-span-link' to='/'>
                <span className='go-home-span'>
                    {!userID ? 'login ' : 'home '}
                </span>
            </Link>
        </>
    );

    const noBlur =
        pathname === '/login' ||
        pathname === '/logout' ||
        pathname === '/about' ||
        pathname === '/register';

    return (
        <div
            className={`timebar grid-2 ${noBlur ? '' : 'blur'}`}
            style={{
                gridTemplateColumns: '3fr auto',
            }}>
            <div>
                {pathname === '/login' || pathname === '/home' ? (
                    <div style={{ marginBottom: '1.6rem' }}></div>
                ) : (
                    goBackBtn
                )}
            </div>
            <LocaleTime />
        </div>
    );
};

export default Footer;
