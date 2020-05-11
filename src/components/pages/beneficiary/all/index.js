import React, {useState, useContext, useEffect} from 'react';
import {Card, Table, Spin, Modal, Form, Input, Checkbox} from 'antd';
import { LoadingOutlined, EditOutlined, ExclamationCircleOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, Zoom} from 'react-toastify';
import BeneficiaryContext from '../../../../context/beneficiary/BeneficiaryContext';
import CreateBeneficiary from "../create";

const AllBeneficiary = () => {
    const [form] = Form.useForm();
    const [beneficiary, setBeneficiary] = useState({});
    const [checked, setChecked] = useState(null);
    const [created, setCreated] = useState(false);
    const [visible, setVisible] = useState(false);
    const beneficiaryContext = useContext(BeneficiaryContext);
    
    const {beneficiaries, getBeneficiaries, editBeneficiary, deleteBeneficiary, clearErrors, error, loading, setLoading} = beneficiaryContext;

    const { confirm } = Modal;

    useEffect(() => {
        getBeneficiaries();

        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        clearErrors();
        //eslint-disable-next-line
    },[created]);

    const showDeleteConfirm = (data) => {
        confirm({
          title: 'Are you sure delete this beneficiary ?',
          icon: <ExclamationCircleOutlined />,
          content: `Beneficiary #${data.id} -- ${data.firstName} / ${data.lastName}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteBeneficiary(data.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showModal = data => {
        setVisible(true);
        setBeneficiary(data)
    }

    const editBenefiaciaryForm = async () => {
        try {
            setLoading();
            const values = await form.validateFields();

            if(values.id === undefined) delete values.id;
            if(values.firstName === undefined) delete values.firstName;
            if(values.lastName === undefined) delete values.lastName;
            if(values.phoneNumber === undefined) delete values.phoneNumber;
            if(values.idNumber === undefined) delete values.idNumber;
            if(checked) values.isActive = checked;
            if(!checked) delete values.isActive;
            if(values.extradata === undefined) delete values.extradata;

            const updated = {...beneficiary, ...values};
            editBeneficiary(updated);
            setVisible(false);
            form.resetFields();

        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    }

    const handleChange = e => setChecked(e.target.checked);

    const columns = [
        {
            title: 'I.D',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            align: 'center'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            align: 'center'
        },
        {
            title: 'I.D Number',
            dataIndex: 'idNumber',
            key: 'idNumber',
            align: 'center'
        },
        {
            title: 'Is Active',
            dataIndex: 'isActive',
            key: 'isActive',
            align: 'center',
            render: val => val === true ? <p style={{color: '#34bd7c'}}>TRUE</p> : val === false ? <p style={{color: '#de2f40'}}>FALSE</p> : null
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
            beneficiaries
        </span>
    )

    const modalTitle = (
        <span style={{color: '#1890ff'}}>
            <EditOutlined/>{' '}
            Edit Beneficiaries
        </span>
    )

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    return (
        <Spin tip="Fetching all beneficiaries..." indicator={antIcon} spinning={loading}>

            <Card title={cardTitle} headStyle={headerStyles}> 
                <CreateBeneficiary setCreated={callback => setCreated(callback)}/>
                <Table columns={columns} dataSource={beneficiaries && beneficiaries} bordered pagination={false}/>
            </Card>

            <Modal
                title={modalTitle}
                visible={visible}
                okText="Edit"
                onOk={editBenefiaciaryForm}
                onCancel={handleCancel}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="I.D" name="id">
                        <Input placeholder={beneficiary && beneficiary.id} disabled/>
                    </Form.Item>
                    <Form.Item label="First Name" name="firstName">
                        <Input placeholder={beneficiary && beneficiary.firstName} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                        <Input placeholder={beneficiary && beneficiary.lastName}/>
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber">
                        <Input placeholder={beneficiary && beneficiary.phoneNumber}/>
                    </Form.Item>
                    <Form.Item label="I.D Number" name="idNumber">
                        <Input placeholder={beneficiary && beneficiary.idNumber}/>
                    </Form.Item>
                    <Form.Item label="Is Active" name="isActive">
                        <Checkbox onChange={handleChange}/>
                    </Form.Item>
                    <Form.Item label="Extra Data" name="extradata">
                        <Input placeholder={beneficiary && beneficiary.extradata}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    )
}

export default AllBeneficiary
