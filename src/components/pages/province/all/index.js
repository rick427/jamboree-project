import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import ProvinceContext from '../../../../context/province/provinceContext';
import CreateProvince from '../create';

const AllProvince = () => {
    const [form] = Form.useForm();
    const [province, setProvince] = useState({});
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);
    const provinceContext = useContext(ProvinceContext);
    const {provinces, getProvinces, editProvince, deleteProvince, error, clearErrors, loading, setLoading} = provinceContext;

    const { confirm } = Modal;
    
    
    useEffect(() => {
        getProvinces();
        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[error, created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this province?',
          icon: <ExclamationCircleOutlined />,
          content: `Province #${data.id} -- ${data.name} / ${data.code}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteProvince(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setProvince(data);
    }

    const editProvinceForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.code === undefined) delete values.code;
            if(values.name === undefined) delete values.name;

            const updated = {...province, ...values};
            editProvince(updated);
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
            title: 'ID',
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
            provinces
        </span>
    )

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };
    
    return (
        <Spin tip="Fetching all province..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateProvince setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={provinces && provinces} bordered pagination={false}/>
            </Card>

            <Modal
                title="Edit Province"
                visible={visible}
                okText="Edit"
                onOk={editProvinceForm}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="I.D" name="id">
                        <Input placeholder={province.id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={province.name} />
                    </Form.Item>
                    <Form.Item label="code" name="code">
                        <Input placeholder={province.code} />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default AllProvince
