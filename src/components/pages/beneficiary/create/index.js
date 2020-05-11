import React, {useState, useContext, useEffect} from 'react';
import {Button, Form, Input, Modal, Select, Checkbox} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import AreaContext from '../../../../context/area/AreaContext';
import CboContext from '../../../../context/cbo/CboContext';
import BeneficiaryContext from '../../../../context/beneficiary/BeneficiaryContext';
import styles from './beneficiary.module.css';
const {Option} = Select;

const CreateBeneficiary = ({setCreated}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const areaContext = useContext(AreaContext);
    const cboContext = useContext(CboContext);
    const beneficiaryContext = useContext(BeneficiaryContext);

    const {getAreas, areas} = areaContext;
    const {getCbos, cbos} = cboContext;
    const {createBeneficiary, loading, setLoading, error} = beneficiaryContext;

    useEffect(() => {
        getAreas();
        getCbos();

        //eslint-disable-next-line
    },[])

    const showModal = () => {
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
        form.resetFields();
    }

    const submitForm = async () => {
        setLoading(true);
        setCreated(true);
        const values = await form.validateFields();
        values.isActive = checked;

        createBeneficiary(values);
   
        if(!error) {
            toast.success(`Beneficiary -- ${values.firstName} has been created`, {autoClose: 4000, transition: Zoom});
            hideModal();
            setCreated(false);
        }
        else {
            return toast.error(error, {autoClose: 4000, transition: Zoom});
        }
    }

    const handleOptions = params => {
        let options = [];
        params && params.length > 0 && params.forEach(param => {
            return options.push(
                <Option key={param.id} value={param.id}>
                    {param.name}
                </Option>
            );
        });
        return options;
    }

    const handleChange = e => setChecked(e.target.checked);

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const headerStyles = (
        <span style={{color: '#3DA7FF'}}>
            <FormOutlined />{' '}
            Create Beneficiary
        </span>
    )

    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Beneficiary
            </Button>

            <Modal 
                title={headerStyles} 
                okText="Create" 
                onOk={submitForm} 
                visible={visible} 
                onCancel={hideModal}
                confirmLoading={loading}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="First Name" name="firstName" rules={[{required: true, message: 'First name is required'}]}>
                        <Input placeholder="Enter first name" />
                    </Form.Item>

                    <Form.Item label="Last Name" name="lastName" rules={[{required: true, message: 'Last name is required'}]}>
                        <Input placeholder="Enter last name" />
                    </Form.Item>

                    <Form.Item label="Phone Number" name="phoneNumber" rules={[{required: true, message: 'Phone number is required'}]}>
                        <Input placeholder="Enter phone number"/>
                    </Form.Item>

                    <Form.Item label="I.D Number" name="idNumber" rules={[{required: true, message: 'I.d number is required'}]}>
                        <Input placeholder="Enter extra data"/>
                    </Form.Item>

                    <Form.Item label="Is Active" name="isActive" rules={[{required: false, message: 'Is active is required'}]}>
                        <Checkbox onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item label="Extra Data" name="extradata" rules={[{required: true, message: 'Extra data is required'}]}>
                        <Input placeholder="Enter extra data"/>
                    </Form.Item>

                    <Form.Item label="Area" name="areaId" rules={[{required: true, message: 'Area is required'}]}>
                        <Select placeholder="Select an area" showSearch optionFilterProp="children" filterOption>
                            {handleOptions(areas)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Cbo" name="cboId" rules={[{required: true, message: 'Cbo is required'}]}>
                        <Select placeholder="Select a cbo" showSearch optionFilterProp="children" filterOption>
                            {handleOptions(cbos)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default CreateBeneficiary;
