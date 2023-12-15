import { Button, Flex, Input, Modal, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { get } from '../../../common/fetch';
import { Link } from 'react-router-dom';
import { Client } from '../../../types';
import { OAUTH_URI } from '../../../common/config';

export default () => {
    const { data, error, isLoading } = useSWR('/api/clients', get)

    const columns = [{
        title: 'Logo',
        dataIndex: 'logo',
        key: 'logo',
        render: (logo: string) => <img height={22} className='block' src={logo} />
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: 'Action',
        render: (row: Client) => <Space size="middle">
            <Link to={row.id}>Detail</Link>
        </Space>
    },];

    return <div className='bg-white rounded px-3 py-2'>
        <Flex gap="middle" justify="space-between">
            <Typography.Title level={3} className='m-0'>Clients</Typography.Title>
            <Space align='start'>
                <Input.Search placeholder="input search text" style={{ width: 200 }} />
                <Link to='new'><Button type="primary">New Client</Button></Link>
            </Space>
        </Flex>
        <Table dataSource={data?.clients} columns={columns} loading={isLoading} rowKey={r => r.id} size='small' />
        <Modal open={error} title="Sign expired" footer={<Button key="link" href={OAUTH_URI} type="primary">
            Sign In
        </Button>} >

        </Modal>
    </div>
}
