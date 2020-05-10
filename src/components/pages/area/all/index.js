import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input, Select} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import AreaContext from '../../../../context/area/AreaContext';
import LocalContext from '../../../../context/local/LocalContext';
import MetroContext from '../../../../context/metro/MetroContext';
import CreateArea from "../create";
const {Option} = Select;

const AllAreas = () => {
    const [form] = Form.useForm();
    const [area, setArea] = useState({});
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);

    const areaContext = useContext(AreaContext);
    const localContext = useContext(LocalContext);
    const metroContext = useContext(MetroContext);
    
    const {areas, getAreas, editArea, deleteArea, clearErrors, error, loading, setLoading} = areaContext;
    const {getMetros, metros} = metroContext;
    const {getLocals, locals} = localContext

    const { confirm } = Modal;
    
    useEffect(() => {
        getAreas();
        getMetros();
        getLocals();
        
        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this area ?',
          icon: <ExclamationCircleOutlined />,
          content: `Area #${data.id} -- ${data.name} / ${data.areaType}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteArea(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setArea(data)
    }

    const editAreaForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.name === undefined) delete values.name;
            if(values.areaType === undefined) delete values.areaType;
            if(values.extradata === undefined) delete values.extradata;
            if(values.description === undefined) delete values.description;

            const updated = {...area, ...values};
            editArea(updated);
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
            title: 'Area Type',
            dataIndex: 'areaType',
            key: 'areaType',
            align: 'center'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
            areas
        </span>
    )

    const modalTitle = (
        <span style={{color: '#1890ff'}}>
            <EditOutlined/>{' '}
            Edit Areas
        </span>
    )

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    return (
        <Spin tip="Fetching all areas..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateArea locals={locals} metros={metros} setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={areas && areas} bordered pagination={false}/>
            </Card>

            <Modal
                title={modalTitle}
                visible={visible}
                okText="Edit"
                onOk={editAreaForm}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="I.D" name="id">
                        <Input placeholder={area && area.id} disabled/>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder={area && area.name} />
                    </Form.Item>
                    <Form.Item label="Area Type" name="areaType">
                        <Select placeholder="Select an area type" defaultValue={area && area.areaType} showSearch optionFilterProp="children" filterOption>
                            <Option key={1} value="METROPOLITAN">METROPOLITAN</Option>
                            <Option key={2} value="LOCAL">LOCAL</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Extra Data" name="extradata">
                        <Input placeholder={area && area.extradata} disabled/>
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder={area && area.description}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default AllAreas
