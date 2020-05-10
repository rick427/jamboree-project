import React, {useState, useContext} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import MetroContext from '../../../../context/metro/MetroContext';
import styles from './createMetro.module.css';
const {Option} = Select;

const CreateMetro = ({setCreated, provinces}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const metroContext = useContext(MetroContext);

    const {createMetros, loading, setLoading, error} = metroContext;

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
        createMetros([values]);
   
        if(!error) {
            toast.success(`Metro -- ${values.name} has been created`, {autoClose: 4000, transition: Zoom});
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
            Create Metro
        </span>
    )

    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Metro
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
                    <Form.Item label="Name" name="name" rules={[{required: true, message: 'Metro name is required'}]}>
                        <Input placeholder="Enter metro name" />
                    </Form.Item>

                    <Form.Item label="Code" name="code" rules={[{required: true, message: 'Metro code is required'}]}>
                        <Input placeholder="Enter code"/>
                    </Form.Item>

                    <Form.Item label="Province" name="provinceId" rules={[{required: true, message: 'A province is required'}]}>
                        <Select placeholder="Select a province" showSearch optionFilterProp="children" filterOption>
                            {provinces && provinces.length > 0 && provinces.map(province => {
                                return (
                                    <Option key={province.id} value={province.id}>
                                        {province.name}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateMetro;
