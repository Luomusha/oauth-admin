import { Button, Checkbox, Form, Input, Space, Upload } from 'antd';
import useSWRMutation from 'swr/mutation';
import { post } from '../../../../common/fetch';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
    const { trigger, error } = useSWRMutation('/api/clients', post)

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
    const afterUpload = (v: any) => {
        console.log(v)
        return "http://localhost:3000/logo.png"
    }

    return <div className='bg-white rounded px-3 py-2'>
        <pre><code>{JSON.stringify(error?.response.data, null, "\t")}</code></pre>
        <Form onFinish={onFinish} autoComplete="off" labelCol={labelCol} wrapperCol={wrapperCol}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Logo" name="logo" valuePropName='file' getValueFromEvent={afterUpload} rules={[{ required: true, message: 'Please input your password!' }]} >
                <Upload action="/upload.do" listType="picture" accept='image/*' multiple={false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input />
            </Form.Item>

            <Form.List name="redirectUris" initialValue={[""]}>
                {(fields) => <>
                    {fields.map((field) => <Form.Item {...field} label="RedirectUris" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input />
                    </Form.Item>)}
                </>
                }
            </Form.List>

            <Form.Item label="Grants" name="grants" initialValue={[""]}>
                <Checkbox.Group>
                    <Space wrap>
                        <Checkbox value="authorization_code" >Code</Checkbox>
                        <Checkbox value="client_credentials" >Credentials</Checkbox>
                        <Checkbox value="refresh_token" >Refresh</Checkbox>
                        <Checkbox value="implicit" >Implicit</Checkbox>
                        <Checkbox value="password" >Password</Checkbox>
                    </Space>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item wrapperCol={wrapCol}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    </div>
}
