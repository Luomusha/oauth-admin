import { Button, Flex, Form, Input, Select, Space, Table, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { post } from '../../../../common/fetch';
import useSWRMutation from 'swr/mutation';

export default () => {
    const { trigger, error } = useSWRMutation('/api/users', post)

    const onFinish = (v: any) => {
        console.log(v)
        trigger(v)
    }
    const labelCol = {
        xs: { span: 24 },
        sm: { span: 4 },
    }
    const wrapperCol = { span: 16 }
    const wrapCol = {
        xs: { offset: 0 },
        sm: { offset: 4 },
    }
    const afterUpload = () => {
        return "http://localhost:3000/logo.png"
    }

    return <div className='bg-white rounded px-3 py-2'>
        <Form onFinish={onFinish} autoComplete="off" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar" valuePropName='file' rules={[{ required: true, message: 'Please input your password!' }]} getValueFromEvent={afterUpload}>
                <Upload action="/upload.do" listType="picture" accept='image/*'>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Identity Type" name="identityType" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Select>
                    <Select.Option value="email">Email</Select.Option>
                    <Select.Option value="mobile">Mobile</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Identifier" name="identifier" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Certificate" name="certificate" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={wrapCol}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    </div>
};
