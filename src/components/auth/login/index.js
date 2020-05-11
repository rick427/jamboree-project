import React,{useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Col, Card, Form, Input, Checkbox, Button, Alert} from 'antd';
import {toast, Slide} from 'react-toastify';
import { UserOutlined, LockOutlined, PoweroffOutlined} from '@ant-design/icons';
import styles from './login.module.css';
import logo from '../../assets/jamboree_logo.png';
import AuthContext from '../../../context/auth/authContext';

const Login = ({history}) => {
    const authContext = useContext(AuthContext);
    const {
        login, 
        error, 
        clearErrors, 
        isAuthenticated, 
        user, 
        loading, 
        setLoading
    } = authContext;
    

    useEffect(() => {
        if(user){
            if(user.authorities.length > 1 && user.authorities.includes('ROLE_ADMIN')){
                history.push('/main/dashboard/admin');
            }
            else{
                history.push('/main/dashboard/user');
            }
        }

        if(error) {
            toast.error(error, {autoClose: 4000, transition: Slide});
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, user, isAuthenticated, history]);

    const headerStyles = {
        textAlign: 'center',
        color: '#1890FF',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    }

    const onFinish = values => {
        setLoading(true);
        login(values);
    }
    
    return (
        <div className={styles.container}>
            {isAuthenticated && 
            <div className={styles.alert}>
                <Alert message="Loading neccessary assets. Redirecting..." type="success" showIcon />
            </div>}

            <div className={styles.wrapper}>
                <Col lg={6} md={12} sm={24} xs={24} className={styles.col_space}>
                    <div className={styles.logo_box}>
                        <img src={logo} alt="logo" className={styles.logo} onClick={() => history.push('/')}/>
                    </div>

                    <Card title="sign in" headStyle={headerStyles} className={styles.card_right}>
                        <Form name="login_form" initialValues={{remember: true}} onFinish={onFinish}>
                            <Form.Item 
                            label="username"
                            name="username" 
                            rules={[{required: true, message: 'Please input your username'}]}
                            >
                                <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Username" 
                                disabled={loading ? true : false} 
                                />
                            </Form.Item>

                            <Form.Item 
                            label="password"
                            name="password" 
                            rules={[{required: true, message: 'Please input your password'}]}
                            >
                                <Input.Password 
                                prefix={<LockOutlined className="site-form-item-icon" />} 
                                placeholder="Password" 
                                disabled={loading ? true : false} 
                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <p className={styles.forgot_password} href="#">
                                    Forgot password
                                </p>
                            </Form.Item>
                            
                            <Form.Item>
                                <Button type="primary" icon={<PoweroffOutlined/>} htmlType="submit" block loading={loading}>
                                Authenticate
                                </Button>
                                Or <Link to="/register">register now!</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </div>
       </div>
    )
}

export default Login
