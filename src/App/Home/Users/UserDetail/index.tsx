import { Button, Card, Descriptions, DescriptionsProps, Flex, Input, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../../../common/fetch';
import { User } from '../../../../types';

export default () => {
    const { id } = useParams();
    const { data, error, isLoading } = useSWR<User>(`/api/users/${id}`, get)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: data?.username,
        },
        {
            key: '2',
            label: 'Telephone',
            children: '1810000000',
        },
        {
            key: '3',
            label: 'Live',
            children: 'Hangzhou, Zhejiang',
        },
        {
            key: '4',
            label: 'Remark',
            children: 'empty',
        },
        {
            key: '5',
            label: 'Address',
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
    ];


    const columns = [{
        title: 'Identity Type',
        dataIndex: 'identityType',
        key: 'identityType',
    }, {
        title: 'identifier',
        dataIndex: 'identifier',
        key: 'identifier',
    }, {
        title: 'Certificate',
        dataIndex: 'certificate',
        key: 'certificate',
    }, {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    }, {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    }, {
        title: 'Action',
        render: (row: User) => <Space size="middle">
            <Link to={`/users/${row.id.toString()}`}>Detail</Link>
        </Space>
    },];

    return <div>
        <Card>
            <Descriptions title="User Info" items={items} />
        </Card>
        <Card className='mt-4'>
            <Table dataSource={data?.accounts} columns={columns} loading={isLoading} rowKey={r => r.id} size='small' />
        </Card>
    </div>
}
