import React, {useState, useContext, useEffect} from 'react';
import {Button, Form, Input, Checkbox, Select, Card, Skeleton} from 'antd';
import {FormOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { toast, Zoom } from 'react-toastify';
import AreaContext from '../../../../context/area/AreaContext';
import CboContext from '../../../../context/cbo/CboContext';
import styles from './edit.module.css';
const {Option} = Select;

const EditCbo = ({history, match}) => {
    const [form] = Form.useForm();
    const [checked, setChecked] = useState();
    const areaContext = useContext(AreaContext);
    const cboContext = useContext(CboContext);

    const {areas, getAreas} = areaContext;
    const {editCbo, getCboById, cbo, setLoading, loading, error} = cboContext;

    useEffect(() => {
        getAreas();
        getCboById(match.params.id)
        
        if(error) toast.error(error, {autoClose: 4000, transition: Zoom});

        //eslint-disable-next-line
    },[error]);

    const handleFormSubmit = (values) => {
        setLoading();
        if(values.name === undefined) delete values.name;
        if(values.city === undefined) delete values.city;
        if(values.postalCode === undefined) delete values.postalCode;
        if(values.streetAddress === undefined) delete values.streetAddress;
        if(values.deviceId === undefined) delete values.deviceId;
        if(values.contactFirstName === undefined) delete values.contactFirstName;
        if(values.contactLastName === undefined) delete values.contactLastName;
        if(values.contactNumber === undefined) delete values.contactNumber;
        if(values.contactEmail === undefined) delete values.contactEmail;
        if(values.contactId === undefined) delete values.contactId;
        if(values.contactVerificationCode === undefined) delete values.contactVerificationCode;
        if(form.isFieldTouched(values.isVerified)) values.isVerified = checked;
        if(!form.isFieldTouched(values.isVerified)) delete values.isVerified;
        if(values.mthlOtp === undefined) delete values.mthlOtp;
        if(values.extradata === undefined) delete values.extradata;
        if(values.notes === undefined) delete values.notes;
        if(values.cboType === undefined) delete values.cboType;
        if(values.areaId === undefined) delete values.areaId;

        const updated = {...cbo, ...values};
        console.log(updated);
        editCbo(updated);

        if(!error){
            toast.success('Edited.', {autoClose: 4000, transition: Zoom});
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
            edit redemption partner
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
                    <Skeleton loading={loading} paragraph={{rows: 15}} active>
                        <Form {...layout} form={form} onFinish={handleFormSubmit}>
                            <Form.Item label="Name" name="name">
                                <Input placeholder={cbo && cbo.name} />
                            </Form.Item>

                            <Form.Item label="City" name="city">
                                <Input placeholder={cbo && cbo.city}/>
                            </Form.Item>

                            <Form.Item label="Postal Code" name="postalCode">
                                <Input placeholder={cbo && cbo.postalCode}/>
                            </Form.Item>

                            <Form.Item label="Street Address" name="streetAddress">
                                <Input placeholder={cbo && cbo.streetAddress}/>
                            </Form.Item>

                            <Form.Item label="Device I.D" name="deviceId">
                                <Input placeholder={cbo && cbo.deviceId}/>
                            </Form.Item>

                            <Form.Item label="Contact First Name" name="contactFirstName">
                                <Input placeholder={cbo && cbo.contactFirstName}/>
                            </Form.Item>

                            <Form.Item label="Contact Last Name" name="contactLastName">
                                <Input placeholder={cbo && cbo.contactLastName}/>
                            </Form.Item>

                            <Form.Item label="Contact Number" name="contactNumber">
                                <Input placeholder={cbo && cbo.contactNumber}/>
                            </Form.Item>

                            <Form.Item label="Contact I.D" name="contactId">
                                <Input placeholder={cbo && cbo.contactId}/>
                            </Form.Item>

                            <Form.Item label="Contact Email" name="contactEmail">
                                <Input placeholder={cbo && cbo.contactEmail}/>
                            </Form.Item>

                            <Form.Item label="Contact Verification code" name="contactVerificationCode">
                                <Input placeholder={cbo && cbo.contactId}/>
                            </Form.Item>

                            <Form.Item label="Is Verified" name="isVerified">
                                <Checkbox checked={cbo && cbo.isVerified} onChange={handleChange}/>
                            </Form.Item>

                            <Form.Item label="Mthl Otp" name="mthlOtp">
                                <Input placeholder={cbo && cbo.mthlOtp}/>
                            </Form.Item>

                            <Form.Item label="Extra Data" name="extradata" >
                                <Input placeholder={cbo && cbo.extradata}/>
                            </Form.Item>

                            <Form.Item label="Notes" name="notes">
                                <Input placeholder={cbo && cbo.notes}/>
                            </Form.Item>

                            <Form.Item label="Cbo Type" name="cboType">
                                <Select defaultValue={cbo && cbo.cboType} placeholder="Select a cbo type" showSearch optionFilterProp="children" filterOption>
                                    <Option key={1} value="ECD">ECD</Option>
                                    <Option key={2} value="SPAZA">SPAZA</Option>
                                    <Option key={3} value="CHURCH">CHURCH</Option>
                                    <Option key={4} value="OTHER">OTHER</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Area" name="areaId">
                                <Select defaultValue={cbo && cbo.areaId} placeholder="Select a area" showSearch optionFilterProp="children" filterOption>
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
                    </Skeleton>
                </Card>
        </div>
    )
}
export default EditCbo
