import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input, InputNumber} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import DeviceContext from '../../../../context/device/DeviceContext';
import CreateDevice from "../create";

const AllDevices = () => {
    const [form] = Form.useForm();
    const [device, setDevice] = useState({});
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);
    const deviceContext = useContext(DeviceContext);
    
    const {devices, getDevices, editDevices, deleteDevices, clearErrors, error, loading, setLoading} = deviceContext;

    const { confirm } = Modal;

    useEffect(() => {
        getDevices();

        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this device ?',
          icon: <ExclamationCircleOutlined />,
          content: `Device #${data.id} -- ${data.deviceId} / ${data.extradata}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteDevices(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setDevice(data)
    }

    const editWardForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.deviceId === undefined) delete values.deviceId;
            if(values.extradata === undefined) delete values.extradata;

            const updated = {...device, ...values};

            editDevices(updated);
            setVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    }

    const columns = [
        {
            title: 'I.D',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'Device I.d',
            dataIndex: 'deviceId',
            key: 'deviceId',
            align: 'center'
        },
        {
            title: 'Extra Data',
            dataIndex: 'extradata',
            key: 'extradata',
            align: 'center',
            render: val => val ? <p>{val}</p> : <p style={{color: '#de2f40'}}>n/a</p>
        },
        {
            title: 'Edit',
            key: 'edit',
            align: 'center',
            render: data => <EditOutlined style={editStyles} onClick={showModal.bind(this, data)}/>
        },
        {
            title: 'Delete',
            key: 'delete',
            align: 'center',
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
            devices
        </span>
    )

    const modalTitle = (
        <span style={{color: '#1890ff'}}>
            <EditOutlined/>{' '}
            Edit Device
        </span>
    )

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    return (
        <Spin tip="Fetching all devices..." indicator={antIcon} spinning={loading}>
            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateDevice setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={devices && devices} bordered pagination={false}/>
            </Card>

            <Modal
                title={modalTitle}
                visible={visible}
                okText="Edit"
                onOk={editWardForm}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="I.D" name="id">
                        <Input placeholder={device && device.id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={device && device.deviceId} />
                    </Form.Item>
                    <Form.Item label="Extra Data" name="extradata">
                        <Input placeholder={device && device.extradata}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default AllDevices;
