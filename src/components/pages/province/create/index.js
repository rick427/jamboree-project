import React, {useState, useContext} from 'react';
import ProvinceContext from '../../../../context/province/provinceContext';
import {Button, Form, Input, Modal} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import styles from './createProvince.module.css';
import { toast, Zoom } from 'react-toastify';

const CreateProvince = ({setCreated}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const provinceContext = useContext(ProvinceContext);
    const {createProvince, loading, setLoading, error} = provinceContext;


    const showModal = () => {
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
    }

    const submitForm = async () => {
        setLoading(true);
        setCreated(true)
        const values = await form.validateFields();
        createProvince(values);
        if(error) {
            return toast.error(error, {autoClose: 4000, transition: Zoom});
        }
        else {
            toast.success(`Province ${values.name} has been created`, {autoClose: 4000, transition: Zoom});
            hideModal();
            form.resetFields();
            setCreated(false);
        }
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    const headerStyles = (
        <span style={{color: '#3DA7FF'}}>
            <FormOutlined />{' '}
            Create Province
        </span>
    )

    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Province
            </Button>

            <Modal 
              title={headerStyles} 
              okText="create" 
              onOk={submitForm} 
              visible={visible} 
              onCancel={hideModal}
              confirmLoading={loading}
            >
                <Form {...layout} form={form}>
                    <Form.Item label="Name" name="name" rules={[{required: true, message: 'Province name is required'}]}>
                        <Input placeholder="Enter province name" />
                    </Form.Item>

                    <Form.Item label="code" name="code" rules={[{required: true, message: 'Province code is required'}]}>
                        <Input placeholder="Enter province code"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateProvince
