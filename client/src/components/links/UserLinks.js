import { useContext } from 'react';
import KorisnikContext from '../../context/korisnikContext';
import { NavLink } from 'react-router-dom';

import { FaRegUser, FaRegListAlt } from 'react-icons/fa';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { ImInfo } from 'react-icons/im';

const UserLinks = () => {
    const korisnikContext = useContext(KorisnikContext);
    const { user } = korisnikContext;

    return (
        <ul className='list'>
            {homeLink}
            {user.ime !== 'admin' ? <></> : adminLinks}
            {aboutAndLogout}
        </ul>
    );
};

const phone = window.innerWidth < 700;
const activeStyle = { borderBottom: '1px solid rgba(255,255,255,.7)' };
const icons = { height: '1.5em', width: '1.5em' };

const homeLink = (
    <li>
        <NavLink activeStyle={activeStyle} exact to='/home'>
            {phone ? <FiHome style={icons} /> : 'Дома'}
        </NavLink>
    </li>
);

const aboutAndLogout = (
    <>
        <li>
            <NavLink activeStyle={activeStyle} exact to='/about'>
                {phone ? <ImInfo style={icons} /> : 'За Сајтот'}
            </NavLink>
        </li>
        <li>
            <NavLink activeStyle={activeStyle} exact to='/logout'>
                {phone ? <FiLogOut style={icons} /> : 'Одјави Се'}
            </NavLink>
        </li>
    </>
);

const adminLinks = (
    <>
        <li>
            <NavLink activeStyle={activeStyle} exact to='/user-profile'>
                {phone ? <FaRegUser style={icons} /> : 'Профил'}
            </NavLink>
        </li>
        <li>
            <NavLink activeStyle={activeStyle} exact to='/lists'>
                {phone ? <FaRegListAlt style={icons} /> : 'Листи'}
            </NavLink>
        </li>
    </>
);

export default UserLinks;
