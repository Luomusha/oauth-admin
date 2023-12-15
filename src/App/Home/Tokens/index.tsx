import { Button, Flex, Input, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { get } from '../../../common/fetch';
import { Link } from 'react-router-dom';
import { Token, User } from '../../../types';

export default () => {
    const { data, error, isLoading } = useSWR('/api/tokens', get)

    const columns = [{
        title: 'Token',
        dataIndex: 'accessToken',
        key: 'accessToken',
    }, {
        title: 'Expired',
        dataIndex: 'accessTokenExpiresAt',
        key: 'accessTokenExpiresAt',
    }, {
        title: 'Scope',
        dataIndex: 'scope',
        key: 'scope',

    }, {
        title: 'User',
        dataIndex: ['User', 'username'],
        key: 'user',
    }, {

        title: 'Client',
        dataIndex: ['Client', 'name'],
        key: 'client',
    }, {
        title: 'Action',
        render: (row: Token) => <Space size="middle">
            <Link to={row.accessToken.toString()}>Detail</Link>
        </Space>
    },];
    return <div className='bg-white rounded px-3 py-2'>
        <Flex gap="middle" justify="space-between">
            <Typography.Title level={3} className='m-0'>Tokens</Typography.Title>
            <Space align='start'>
                <Input.Search placeholder="input search text" style={{ width: 200 }} />
            </Space>
        </Flex>
        <Table dataSource={data?.tokens} columns={columns} loading={isLoading} rowKey={r => r.accessToken} size='small' />
    </div>
};
