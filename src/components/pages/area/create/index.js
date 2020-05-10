import React, {useState, useContext} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import AreaContext from '../../../../context/area/AreaContext';
import styles from './area.module.css';
const {Option} = Select;

const CreateArea = ({setCreated, locals, metros}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const areaContext = useContext(AreaContext);

    const {createArea, loading, setLoading, error} = areaContext;

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
        createArea(values);
   
        if(!error) {
            toast.success(`Area -- ${values.name} has been created`, {autoClose: 4000, transition: Zoom});
            hideModal();
            setCreated(false);
        }
        else {
            return toast.error(error, {autoClose: 4000, transition: Zoom});
        }
    }

    const handleOptions = params => {
        let options = [];
        params && params.length> 0 && params.forEach(param => {
            return options.push(
                <Option key={param.id} value={param.id}>
                    {param.name}
                </Option>
            )
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
            Create Area
        </span>
    )
    return (
        <div className={styles.wrapper}>
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
                Create Area
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

                    <Form.Item label="Local" name="localId" rules={[{required: true, message: 'A local district is required'}]}>
                        <Select placeholder="Select a local district" showSearch optionFilterProp="children" filterOption>
                            {handleOptions(locals)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Metro" name="metroId" rules={[{required: true, message: 'A metro district is required'}]}>
                        <Select placeholder="Select a metro district" showSearch optionFilterProp="children" filterOption>
                            {handleOptions(metros)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Area Type" name="areaType" rules={[{required: true, message: 'A area type is required'}]}>
                        <Select placeholder="Select an area type" showSearch optionFilterProp="children" filterOption>
                            <Option key={1} value="METROPOLITAN">METROPOLITAN</Option>
                            <Option key={2} value="LOCAL">LOCAL</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{required: true, message: 'Description is required'}]}>
                        <Input placeholder="Enter description"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateArea
