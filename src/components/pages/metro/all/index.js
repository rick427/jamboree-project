import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import MetroContext from '../../../../context/metro/MetroContext';
import ProvinceContext from '../../../../context/province/provinceContext';
import CreateMetro from "../create";

const MetroDistricts = () => {
    const [form] = Form.useForm();
    const [metro, setMetro] = useState({});
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);

    const provinceContext = useContext(ProvinceContext);
    const metroContext = useContext(MetroContext);
    
    const {metros, getMetros, editMetro, deleteMetro, clearErrors, error, loading, setLoading} = metroContext;
    const {provinces, getProvinces} = provinceContext;

    const { confirm } = Modal;
    
    useEffect(() => {
        getMetros();
        getProvinces();
        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this metro ?',
          icon: <ExclamationCircleOutlined />,
          content: `Metro #${data.id} -- ${data.name} / ${data.code}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteMetro(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setMetro(data)
    }

    const editProvinceForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.code === undefined) delete values.code;
            if(values.name === undefined) delete values.name;
            if(values.extradata === undefined) delete values.extradata;
            if(values.provinceId === undefined) delete values.provinceId;

            const updated = {...metro, ...values};
            editMetro(updated);
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
            title: 'Code',
            dataIndex: 'code',
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
            metro municipalities
        </span>
    )

    const modalTitle = (
        <span style={{color: '#1890ff'}}>
            <EditOutlined/>{' '}
            Edit Metro Municipality
        </span>
    )

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
    
    return (
        <Spin tip="Fetching all metros..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateMetro provinces={provinces} setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={metros && metros} bordered pagination={false}/>
            </Card>

            <Modal
                title={modalTitle}
                visible={visible}
                okText="Edit"
                onOk={editProvinceForm}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="I.D" name="id">
                        <Input placeholder={metro && metro.id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={metro && metro.name} />
                    </Form.Item>
                    <Form.Item label="Code" name="code">
                        <Input placeholder={metro && metro.code}/>
                    </Form.Item>
                    <Form.Item label="Extra Data" name="extradata">
                        <Input placeholder={metro && metro.extradata} disabled/>
                    </Form.Item>
                    <Form.Item label="Province I.D" name="provinceId">
                        <Input placeholder={metro && metro.provinceId} disabled/>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default MetroDistricts
