import { useContext, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/mk';
import KorisnikContext from '../../context/korisnikContext';

const UserProfile = () => {
    const korisnikContext = useContext(KorisnikContext);
    const { userID, getUser } = korisnikContext;

    useEffect(() => {
        getUser('5fcaa7d111edec2d44ed8258');

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {!userID ? (
                <p>You dont have info provided...</p>
            ) : (
                <div>
                    <p>
                        <span className='text-primary'>_id: </span>
                        {userID._id}
                    </p>
                    <h1>
                        <span className='text-primary lead'>име: </span>
                        {userID.ime}
                    </h1>
                    <p>
                        <span className='text-primary'>password од DB: </span>
                        {userID.password}
                    </p>
                    <p>
                        <span className='text-primary'>позиција: </span>
                        {userID.pozicija}
                    </p>
                    <p>
                        <span className='text-primary'>профил креиран на </span>
                        {moment(userID.date)
                            .locale('mk')
                            .format('Do MMMM YYYYгод. dddd')}
                        <span className='text-primary'> во </span>
                        {moment(userID.date).locale('mk').format('HH:mm:ss')}
                        <span className='text-primary'> часот.</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
