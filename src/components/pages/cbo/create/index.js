import React, {useState, useContext, useEffect} from 'react';
import {Button, Form, Input, Checkbox, Select, Card} from 'antd';
import {FormOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import AreaContext from '../../../../context/area/AreaContext';
import CboContext from '../../../../context/cbo/CboContext';
import styles from './cbo.module.css';
const {Option} = Select;

const CreateCbo = ({history}) => {
    const [checked, setChecked] = useState();
    const areaContext = useContext(AreaContext);
    const cboContext = useContext(CboContext);

    const {areas, getAreas} = areaContext;
    const {createCbo, setLoading, error} = cboContext;

    useEffect(() => {
        getAreas();
        
        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});
        //eslint-disable-next-line
    },[error]);

    const handleFormSubmit = (values) => {
        setLoading();
        values.isVerified = checked;
        createCbo(values);
        if(!error){
            toast.success('Cbo created.', {autoClose: 4000, transition: Zoom});
            history.push('/main/cbo/all');
        }
    }

    const handleOptions = params => {
        let options = [];
        params && params.length > 0 && params.forEach(param => {
            return options.push(
                <Option key={param.id} value={param.id}>
                    {param.name}-{param.extradata}
                </Option>
            );
        });
        return options;
    }

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleCancel = () => history.goBack();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const cardTitle = (
        <span>
            <FormOutlined />{' '}
            create cbo
        </span>
    )

    const headerStyles = {
        color: '#1890ff',
        textTransform: 'capitalize'
    }

    // const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;

    return (
        <div className={styles.wrapper}>
            <Card title={cardTitle} headStyle={headerStyles} className={styles.card}>

                
                    <Form {...layout} onFinish={handleFormSubmit}>
                        <Form.Item label="Name" name="name" rules={[{required: true, message: 'Ward name is required'}]}>
                            <Input placeholder="Enter metro name" />
                        </Form.Item>

                        <Form.Item label="City" name="city" rules={[{required: true, message: 'City is required'}]}>
                            <Input placeholder="Enter city"/>
                        </Form.Item>

                        <Form.Item label="Postal Code" name="postalCode" rules={[{required: true, message: 'Postal code is required'}]}>
                            <Input placeholder="Enter postal code"/>
                        </Form.Item>

                        <Form.Item label="Street Address" name="streetAddress" rules={[{required: true, message: 'Address is required'}]}>
                            <Input placeholder="Enter street address"/>
                        </Form.Item>

                        <Form.Item label="Device I.D" name="deviceId" rules={[{required: true, message: 'Device I.d is required'}]}>
                            <Input placeholder="Enter device I.d"/>
                        </Form.Item>

                        <Form.Item label="Contact First Name" name="contactFirstName" rules={[{required: true, message: 'Contact First name is required'}]}>
                            <Input placeholder="Enter contact first name"/>
                        </Form.Item>

                        <Form.Item label="Contact Last Name" name="contactLastName" rules={[{required: true, message: 'Contact Last name is required'}]}>
                            <Input placeholder="Enter contact last name"/>
                        </Form.Item>

                        <Form.Item label="Contact Number" name="contactNumber" rules={[{required: true, message: 'Contact number is required'}]}>
                            <Input placeholder="Enter contact number"/>
                        </Form.Item>

                        <Form.Item label="Contact I.D" name="contactId" rules={[{required: true, message: 'Contact I.d is required'}]}>
                            <Input placeholder="Enter contact I.d"/>
                        </Form.Item>

                        <Form.Item label="Contact Email" name="contactEmail" rules={[{required: true, message: 'Contact email is required'}]}>
                            <Input placeholder="Enter contact email"/>
                        </Form.Item>

                        <Form.Item label="Contact Verification code" name="contactVerificationCode" rules={[{required: true, message: 'Contact verification code is required'}]}>
                            <Input placeholder="Enter contact verificaton code"/>
                        </Form.Item>

                        <Form.Item label="Is Verified" name="isVerified" rules={[{required: false, message: 'Verification confirmation is required'}]}>
                            <Checkbox onChange={handleChange}/>
                        </Form.Item>

                        <Form.Item label="Mthl Otp" name="mthlOtp" rules={[{required: true, message: 'Mthl otp is required'}]}>
                            <Input placeholder="Enter mthl otp"/>
                        </Form.Item>

                        <Form.Item label="Extra Data" name="extradata" rules={[{required: false, message: 'Extra data is required'}]}>
                            <Input placeholder="Enter extra data"/>
                        </Form.Item>

                        <Form.Item label="Notes" name="notes" rules={[{required: true, message: 'Extra data is required'}]}>
                            <Input placeholder="Enter a note"/>
                        </Form.Item>

                        <Form.Item label="Cbo Type" name="cboType" rules={[{required: true, message: 'Cbo type is required'}]}>
                            <Select placeholder="Select a cbo type" showSearch optionFilterProp="children" filterOption>
                                <Option key={1} value="ECD">ECD</Option>
                                <Option key={2} value="SPAZA">SPAZA</Option>
                                <Option key={3} value="CHURCH">CHURCH</Option>
                                <Option key={4} value="OTHER">OTHER</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Area" name="areaId" rules={[{required: true, message: 'Area is required'}]}>
                            <Select placeholder="Select a area" showSearch optionFilterProp="children" filterOption>
                                {handleOptions(areas)}
                            </Select>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button icon={<CheckOutlined />} type="primary" htmlType="submit"  className={styles.btn}>
                                Create
                            </Button>

                            <Button icon={<CloseOutlined />} type="danger" onClick={handleCancel} className={styles.btn}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
            
            </Card>
        </div>
    )
}

export default CreateCbo
