import { BrowserRouter as Router } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import KorisnikContext from '../../context/korisnikContext';

import Spinner from './Spinner';
import Navbar from './Navbar';
import Footer from './Footer';
import GuestRoutes from '../links/GuestRoutes';
import UserRoutes from '../links/UserRoutes';

const Permisions = () => {
    const authContext = useContext(AuthContext);
    const korisnikContext = useContext(KorisnikContext);
    const { error, userID } = authContext;
    const { getUser } = korisnikContext;

    useEffect(() => {
        if (userID) getUser(userID);
        // eslint-disable-next-line
    }, [userID]);

    return (
        <Router>
            {!localStorage.token ? (
                <>
                    <Navbar userID={userID} errors={error} />
                    <GuestRoutes />
                </>
            ) : localStorage.token && userID ? (
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
