import React, {useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Button} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import CboContext from '../../../../context/cbo/CboContext';

const AllCbos = ({history}) => {
    const cboContext = useContext(CboContext);
    
    const {cbos, getCbos, deleteCbo, clearErrors, error, loading} = cboContext;

    const { confirm } = Modal;

    useEffect(() => {
        getCbos();

        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[error]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this cbo ?',
          icon: <ExclamationCircleOutlined />,
          content: `Cbo #${data.id} -- ${data.name} / ${data.city}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteCbo(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const columns = [
        {
            title: 'I.D',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Street Address',
            dataIndex: 'streetAddress',
            key: 'streetAddress',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Postal Code',
            dataIndex: 'postalCode',
            key: 'postalCode',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Device',
            dataIndex: 'deviceId',
            key: 'deviceId',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Contact First Name',
            dataIndex: 'contactFirstName',
            key: 'contactFirstName',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Contact Last Name',
            dataIndex: 'contactLastName',
            key: 'contactLastName',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Contact Email',
            dataIndex: 'contactEmail',
            key: 'contactEmail',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Contact Verification Code',
            dataIndex: 'contactVerificationCode',
            key: 'contactVerificationCode',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Is Verified',
            dataIndex: 'isVerified',
            key: 'isVerified',
            align: 'center',
            render: val => val === true ? <p style={{color: '#34bd7c'}}>true</p> : <p style={{color: '#de2f40'}}>false</p>
        },
        {
            title: 'Mthl OTP',
            dataIndex: 'mthlOtp',
            key: 'mthlOtp',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Extra Data',
            dataIndex: 'extradata',
            key: 'extradata',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'CBO Type',
            dataIndex: 'cboType',
            key: 'cboType',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Edit',
            key: 'edit',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: data => <EditOutlined style={editStyles} onClick={() => history.push(`/main/cbo/edit/${data.id}`)}/>
        },
        {
            title: 'Delete',
            key: 'delete',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: data => <DeleteOutlined style={deleteStyles} onClick={() => showDeleteConfirm(data)}/>
        },
    ];

    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;

    const editStyles = {color: '#1890ff'}
    const deleteStyles = {color: '#de2f40'}

    const headerStyles = {
        color: '#3DA7FF', 
        textTransform: 'capitalize'
    }

    const cardTitle = (
        <span>
            <UnorderedListOutlined />{' '} 
            redemption partners
        </span>
    )

    return (
        <Spin tip="Fetching all cbos..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}>
                <Button type="primary" icon={<PlusOutlined/>} style={{marginBottom: '1rem'}} onClick={() => history.push('/main/cbo/create')}>
                    Create Redemption Partner
                </Button> 
                <Table 
                  columns={columns} 
                  dataSource={cbos && cbos} 
                  bordered 
                  pagination={false}
                  scroll={{x: 3500}}
                />
            </Card>
        </Spin>
    )
}

export default AllCbos;
