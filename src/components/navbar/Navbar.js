import React, {useContext} from 'react';
import {Layout} from 'antd';
import {LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth/authContext';
import styles from './navbar.module.css';

const {Header} = Layout;

const Navbar = ({collapsed, toggle, history}) => {
    const authContext = useContext(AuthContext);
    const {logout, setLoading} = authContext;

    const logoutUser = () => {
        setLoading(true);
        logout();
        history.push('/login');
    };
    
    return (
        <Header className={styles.header}>
            {collapsed ? (
                <MenuUnfoldOutlined className={styles.trigger} onClick={toggle}/>
            ) : (
                <MenuFoldOutlined className={styles.trigger} onClick={toggle}/>
            )}

            <span className={styles.logout} onClick={logoutUser}>
                Sign out <LogoutOutlined />
            </span>
        </Header>
    )
}

export default Navbar
