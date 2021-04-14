import { BrowserRouter as Router } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import KorisnikContext from '../../context/korisnikContext';

import Spinner from './Spinner';
import Navbar from './Navbar';
import Footer from './Footer';
import GuestRoutes from '../links/GuestRoutes';
import AdminRoutes from '../links/AdminRoutes';
import UserRoutes from '../links/UserRoutes';

const Permisions = () => {
    const authContext = useContext(AuthContext);
    const korisnikContext = useContext(KorisnikContext);
    const { logout, loadUser, checkExpiredToken, error, userID } = authContext;
    const { errorKorisnik, getUser, user, clearUser } = korisnikContext;

    useEffect(() => {
        if (errorKorisnik) logout();
        if (localStorage.token) {
            checkExpiredToken();
            loadUser();
        }
        if (userID && localStorage.token) getUser(userID);
        if (!userID) clearUser();
        // eslint-disable-next-line
    }, [userID, errorKorisnik]);

    return (
        <Router>
            {!localStorage.token ? (
                <>
                    <Navbar userID={userID} errors={error} />
                    <GuestRoutes />
                </>
            ) : user.ime === 'admin' ? (
                <>
                    <Navbar userID={userID} />
                    <AdminRoutes />
                </>
            ) : user ? (
                <>
                    <Navbar userID={userID} />
                    <UserRoutes />
                </>
            ) : (
                <>
                    <Navbar />
                    <Spinner />
                </>
            )}
            <Footer userID={userID} />
        </Router>
    );
};

export default Permisions;
