import React from 'react';
import {Card, Row, Col} from 'antd';

const AdminDashboard = () => {
    return (
        <Row gutter={20} justify="center">
           <Col lg={6}>
               <Card>ADMIN DASHBOARD</Card>
           </Col>
           <Col lg={8}>
               <Card>STATS</Card>
           </Col>
           <Col lg={8}>
               <Card>GENERAL INFOS</Card>
           </Col>
        </Row>
    )
}

export default AdminDashboard
