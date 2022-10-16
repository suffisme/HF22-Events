import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButon from '../Authentication/LogoutButton';
import classes from './NavBar.module.css'

const NavBar = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={require('../../asset/logo.jpg')} />
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/home' activeClassName={classes.active}>Home</NavLink>
                    </li>
                    { user && user.role !== 'Unassigned' && <li><NavLink activeClassName={classes.active} to='/addBug'>Add Bug</NavLink></li>}

                    { user && user.role === 'Tester' &&  <li><NavLink activeClassName={classes.active} to='/verifyBug'>Verify Bug</NavLink></li>}

                    { user && user.role === 'Tester' &&  <li><NavLink activeClassName={classes.active} to='/verifyPatch'>Verify Patch</NavLink></li>}

                    { user && user.role === 'Developer' &&  <li><NavLink activeClassName={classes.active} to='/improveBug'>Improve Bug</NavLink></li>}

                    { user && user.role === 'Admin' &&  <li><NavLink activeClassName={classes.active} to='/assignTester'>Assign Tester</NavLink></li>}

                    { user && user.role === 'Admin' &&  <li><NavLink activeClassName={classes.active} to='/assignDev'>Assign Developer</NavLink></li>}
                    
                    { user && user.role === 'Admin' &&  <li><NavLink activeClassName={classes.active} to='/assignRoles'>Assign Roles</NavLink></li>}
                </ul>
                <ul>
                    { user && user.role && <li><NavLink activeClassName={classes.active} to='/yourBugs'>Bugs Reported by You</NavLink></li>}

                    { !isAuthenticated && <li><NavLink activeClassName={classes.active} to='/login'>LOGIN</NavLink></li>}

                    { !isAuthenticated && <li><NavLink activeClassName={classes.active} to='/signup'>SIGN UP</NavLink></li>}

                    { isAuthenticated && <li><LogoutButon /></li>}
        
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;