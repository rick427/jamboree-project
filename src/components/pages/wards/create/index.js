import React, {useState, useContext} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import WardContext from '../../../../context/ward/WardContext';
import styles from './ward.module.css';
const {Option} = Select;

const CreateWard = ({setCreated}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const wardContext = useContext(WardContext);

    const {createWard, loading, setLoading, error} = wardContext;

    const showModal = () => {
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
        form.resetFields();
    }

    const submitForm = async () => {
        setLoading(true);
        setCreated(true)
        const values = await form.validateFields();
        createWard(values);
   
        if(!error) {
            toast.success(`Ward -- ${values.name} has been created`, {autoClose: 4000, transition: Zoom});
            hideModal();
            setCreated(false);
        }
        else {
            return toast.error(error, {autoClose: 4000, transition: Zoom});
        }
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    const headerStyles = (
        <span style={{color: '#3DA7FF'}}>
            <FormOutlined />{' '}
            Create Ward
        </span>
    )

    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Ward
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
                    <Form.Item label="Name" name="name" rules={[{required: true, message: 'Ward name is required'}]}>
                        <Input placeholder="Enter metro name" />
                    </Form.Item>

                    <Form.Item label="Number" name="number" rules={[{required: true, message: 'Ward code is required'}]}>
                        <InputNumber placeholder="Enter Number" style={{width: 370}}/>
                    </Form.Item>

                    <Form.Item label="Extra Data" name="extradata" rules={[{required: true, message: 'Extra data is required'}]}>
                        <Input placeholder="Enter extra data"/>
                    </Form.Item>

                    <Form.Item label="Ward Type" name="wardType" rules={[{required: true, message: 'A ward type is required'}]}>
                        <Select placeholder="Select a ward type" showSearch optionFilterProp="children" filterOption>
                            <Option key={1} value="METROPOLITAN">METROPOLITAN</Option>
                            <Option key={2} value="LOCAL">LOCAL</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default CreateWard;
