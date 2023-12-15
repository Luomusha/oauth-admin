import { Button, Card, Descriptions, DescriptionsProps, Image, Input, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../../../common/fetch';
import { Client, User } from '../../../../types';

export default () => {
    const { id } = useParams();
    const { data, error, isLoading } = useSWR<Client>(`/api/clients/${id}`, get)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Client ID',
            span: 3,
            children: data?.id,
        },
        {
            key: '2',
            label: 'Client Secret',
            span: 3,
            children: data?.secret,
        },
        {
            key: '3',
            label: 'Created At',
            children: data?.createdAt?.toLocaleString(),
        },
        {
            key: '4',
            label: 'Updated At',
            children: data?.updatedAt?.toLocaleString(),
        },
        {
            key: '5',
            label: 'Access Token Lifetime',
            children: data?.accessTokenLifetime,
        },
        {
            key: '6',
            label: 'Refresh Token Lifetime',
            children: data?.refreshTokenLifetime,
        },
        {
            key: '7',
            label: 'Description',
            children: data?.description,
        },
    ];

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
            <Link to={`/users/${row.id.toString()}`}>Detail</Link>
        </Space>
    },];

    return <div>
        <Card bordered={false}>
            <Image width={100} height={100} src={data?.logo} />
        </Card>

        <Card className='mt-4'>
            <Descriptions title={data?.name} items={items} />
        </Card>
        <Card className='mt-4'>
            <Table dataSource={data?.users} columns={columns} loading={isLoading} rowKey={r => r.id} size='small' />
        </Card>
    </div>
}
