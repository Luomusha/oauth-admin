import { Button, Flex, Input, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { get } from '../../../common/fetch';
import { Link } from 'react-router-dom';
import { User } from '../../../types';

export default () => {
    const { data, error, isLoading } = useSWR('/api/users', get)

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
    }, {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar: string) => <img height={22} src={avatar} className='block' />

    }, {
        title: 'Action',
        render: (row: User) => <Space size="middle">
            <Link to={row.id.toString()}>Detail</Link>
        </Space>
    },];
    return <div className='bg-white rounded px-3 py-2'>
        <Flex gap="middle" justify="space-between">
            <Typography.Title level={3} className='m-0'>Users</Typography.Title>
            <Space align='start'>
                <Input.Search placeholder="input search text" style={{ width: 200 }} />
                <Link to='new'><Button type="primary">New User</Button></Link>
            </Space>
        </Flex>
        <Table dataSource={data?.users} columns={columns} loading={isLoading} rowKey={r => r.id} size='small' />
    </div>
};
