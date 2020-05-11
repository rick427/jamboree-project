import React, {useState, useContext, useEffect} from 'react';
import { Layout, Menu} from 'antd';
import { UserOutlined, LaptopOutlined, DashboardTwoTone, ControlTwoTone, ClusterOutlined} from '@ant-design/icons';
//import {Link} from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import AuthContext from '../../context/auth/authContext';
import Navbar from '../navbar/Navbar';
import AppPages from '../pages';
import logo from '../assets/jamboree_logo.png';
import styles from './layout.module.css';

const { SubMenu } = Menu;
const {Content, Sider } = Layout;


const AppLayout = ({match, history}) => {
   const [collapsed, setCollapsed] = useState(false);
   const authContext = useContext(AuthContext);

   const {loadUser, error, clearErrors, user} = authContext;

   useEffect(() => {
      loadUser();

      if(error){
         toast.error(error, {autoClose: 4000, transition: Slide});
         clearErrors();
      }
      //eslint-disable-next-line
   },[]);

   const toggle = () => setCollapsed(!collapsed);

   const goToAdminDashboard = () => history.push('/main/dashboard/admin');
   const goToUserDashboard = () => history.push('/main/dashboard/user');
   const goToProvince = () => history.push('/main/province/all');
   const goToMetroDistict = () => history.push('/main/metro/municipality/all');
   const goToLocalDistict = () => history.push('/main/local/municipality/all');
   const goToWards = () => history.push('/main/wards/all');
   const goToArea = () => history.push('/main/area/all');
   const goToCbo = () => history.push('/main/cbo/all');
   const goToBeneficiary = () => history.push('/main/beneficiary/all');
   const gotToDevices = () => history.push('/main/device/all')

   const defaultOpenKeys = history.location.pathname.split('/')[2];
   const selectedKeys = history.location.pathname.substr(1);

   const adminLinks = () => {
      if(user && user.authorities.includes('ROLE_ADMIN')){
         return (
            <SubMenu key="admin" icon={<UserOutlined />} title="Administration">
               <Menu.Item key="user_mgmt" icon={<LaptopOutlined />}>
                  User Management
               </Menu.Item>
               <Menu.Item key="metrics" icon={<LaptopOutlined />}>
                  Metrics
               </Menu.Item>
               <Menu.Item key="health" icon={<LaptopOutlined />}>
                  Health
               </Menu.Item>
               <Menu.Item key="config" icon={<LaptopOutlined />}>
                  Configurations
               </Menu.Item>
               <Menu.Item key="audits" icon={<LaptopOutlined />}>
                  Audits
               </Menu.Item>
               <Menu.Item key="logs" icon={<LaptopOutlined />}>
                  Logs
               </Menu.Item>
               <Menu.Item key="api" icon={<LaptopOutlined />}>
                  Api
               </Menu.Item>
            </SubMenu>
         )
      }
   } 

   return (
      <Layout>
         <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo_box}>
               <img src={logo} alt="logo" className={styles.logo}/>
               <p className={collapsed ? styles.hidden : null}>JAMBOREE</p>
            </div>
            
            <Menu theme="light" mode="inline" defaultOpenKeys={[defaultOpenKeys]} selectedKeys={[selectedKeys]}>
               <div className={styles.space}/>

               {user && user.authorities.includes('ROLE_ADMIN') &&
               <Menu.Item key="main/dashboard/admin" icon={<DashboardTwoTone />} onClick={goToAdminDashboard}>
                  Admin Dashboard
               </Menu.Item>}

               {user && user.authorities.includes('ROLE_USER') &&
               <Menu.Item key="main/dashboard/user" icon={<DashboardTwoTone />} onClick={goToUserDashboard}>
                  User Dashboard
               </Menu.Item>}

               <Menu.Divider/>

               <SubMenu key="entities" icon={<ControlTwoTone />} title="Entities">
                  <Menu.Item key="main/province/all" icon={<ClusterOutlined />} onClick={goToProvince}>
                     Province
                  </Menu.Item>
                  <Menu.Item key="main/metro/municipality/all" icon={<ClusterOutlined />} onClick={goToMetroDistict}>
                     Metro Districts
                  </Menu.Item>
                  <Menu.Item key="main/local/municipality/all" icon={<ClusterOutlined />} onClick={goToLocalDistict}>
                     Local Districts
                  </Menu.Item>
                  <Menu.Item key="main/wards/all" icon={<ClusterOutlined />} onClick={goToWards}>
                     Ward
                  </Menu.Item>
                  <Menu.Item key="main/area/all" icon={<ClusterOutlined />} onClick={goToArea}>
                     Area
                  </Menu.Item>
                  <Menu.Item key="main/cbo/all" icon={<ClusterOutlined />} onClick={goToCbo}>
                     CBO
                  </Menu.Item>
                  <Menu.Item key="main/beneficiary/all" icon={<ClusterOutlined />} onClick={goToBeneficiary}>
                     Beneficiary
                  </Menu.Item>
                  <Menu.Item key="main/device/all" icon={<ClusterOutlined />} onClick={gotToDevices}>
                     Device
                  </Menu.Item>
               </SubMenu>

               <SubMenu key="voucher" icon={<UserOutlined />} title="Vouchers">
                  <Menu.Item key="vouchers" icon={<LaptopOutlined />}>
                     Voucher Management
                  </Menu.Item>
                  <Menu.Item key="voucher_by_ecd" icon={<LaptopOutlined />}>
                     Create Voucher / ECD
                  </Menu.Item>
               </SubMenu>

               {adminLinks()}
            </Menu>
            <div className={styles.space}/>
         </Sider>

         <Layout style={{height: '100vh', overflow: 'hidden'}}>
            <Navbar collapsed={collapsed} toggle={toggle} history={history}/>

            <Layout className={styles.layoutWrapper}>
               <Content className={styles.content}>
                  <AppPages match={match}/>
               </Content>
            </Layout>
         </Layout>
      </Layout>
   )
}

export default AppLayout;
