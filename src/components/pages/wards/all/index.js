import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input, InputNumber} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import WardContext from '../../../../context/ward/WardContext';
import CreateWard from "../create";

const AllWards = () => {
    const [form] = Form.useForm();
    const [ward, setWard] = useState({});
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);
    const wardContext = useContext(WardContext);
    
    const {wards, getWards, editWard, deleteWard, clearErrors, error, loading, setLoading} = wardContext;

    const { confirm } = Modal;
    
    useEffect(() => {
        getWards();

        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this ward ?',
          icon: <ExclamationCircleOutlined />,
          content: `Ward #${data.id} -- ${data.name} / ${data.code}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteWard(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setWard(data)
    }

    const editWardForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.number === undefined) delete values.number;
            if(values.name === undefined) delete values.name;
            if(values.extradata === undefined) delete values.extradata;

            const updated = {...ward, ...values};
            editWard(updated);
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'code',
            align: 'center'
        },
        {
            title: 'Extra Data',
            dataIndex: 'extradata',
            key: 'extradata',
            align: 'center'
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
            wards
        </span>
    )

    const modalTitle = (
        <span style={{color: '#1890ff'}}>
            <EditOutlined/>{' '}
            Edit Ward
        </span>
    )

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    return (
        <Spin tip="Fetching all wards..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateWard setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={wards && wards} bordered pagination={false}/>
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
                        <Input placeholder={ward && ward.id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={ward && ward.name} />
                    </Form.Item>
                    <Form.Item label="Number" name="number">
                        <InputNumber placeholder={ward && ward.number} style={{width: 370}}/>
                    </Form.Item>
                    <Form.Item label="Extra Data" name="extradata">
                        <Input placeholder={ward && ward.extradata}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default AllWards
