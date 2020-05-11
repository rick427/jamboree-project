import React, {useState, useContext, useEffect} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import CboContext from '../../../../context/cbo/CboContext';
import DeviceContext from '../../../../context/device/DeviceContext';
import styles from './device.module.css'
const {Option} = Select;

const CreateDevice = ({setCreated}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const deviceContext = useContext(DeviceContext);
    const cboContext = useContext(CboContext);

    const {createDevices, loading, setLoading, error} = deviceContext;
    const {getCbos, cbos} = cboContext;

    useEffect(() => {
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
        setCreated(true)
        const values = await form.validateFields();
        createDevices(values);
   
        if(!error) {
            toast.success(`Device -- ${values.deviceId} has been created`, {autoClose: 4000, transition: Zoom});
            hideModal();
            setCreated(false);
        }
        else {
            return toast.error(error, {autoClose: 4000, transition: Zoom});
        }
    }

    const handleOption = params => {
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

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    const headerStyles = (
        <span style={{color: '#3DA7FF'}}>
            <FormOutlined />{' '}
            Create Device
        </span>
    )

    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Device
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
                    <Form.Item label="Device Id" name="deviceId" rules={[{required: true, message: 'Device id is required'}]}>
                        <Input placeholder="Enter device id" />
                    </Form.Item>

                    <Form.Item label="Extra Data" name="extradata" rules={[{required: true, message: 'Extra data is required'}]}>
                        <Input placeholder="Enter extra data"/>
                    </Form.Item>

                    <Form.Item label="Cbo" name="cboId" rules={[{required: true, message: 'A cbo is required'}]}>
                        <Select placeholder="Select a cbo" showSearch optionFilterProp="children" filterOption>
                            {handleOption(cbos)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateDevice
