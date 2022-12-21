import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarText,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Layout({ user, onChangeUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);


    const toggle = () => setIsOpen(!isOpen);

    const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

    // Sử dụng useNavigate từ router-dom và sử dụng Button
    const navigate = useNavigate();
    const onClickBtn = (e) => {
        navigate('login');
    }

    const onLogOutBtn = (userId) => {
        localStorage.clear();
        onChangeUser(null);
        navigate('login');
    }




    return <div>
        <Navbar expand={'md'} color='dark' dark>
            <NavbarText> <Link className='nav-link' to="/">ReactStrap</Link> </NavbarText>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to='posts' className='nav-link'>
                            Posts
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className='nav-link'>
                            GitHub
                        </Link>
                    </NavItem>
                </Nav>
                {user ? <Dropdown isOpen={isOpenDropdown} toggle={toggleDropdown} direction='down'>
                    <DropdownToggle>{user.username}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => { onLogOutBtn(user.id) }}>Log out </DropdownItem>
                    </DropdownMenu>
                </Dropdown> : <Button onClick={onClickBtn} outline className='primary'>Login</Button>}
                {/* Sử dụng link thay vì dùng button và gắn sự kiện onClick cho nó */}
                {/* {user ? <NavbarText>{user.username}</NavbarText> : <Link to="login" className='login-btn'>
                    Login
                </Link>} */}
            </Collapse>
        </Navbar>
        <Outlet></Outlet>
    </div >
};

export default Layout;