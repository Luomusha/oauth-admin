import { Button, Card, Descriptions, DescriptionsProps, Image, Input, Space, Table, Typography } from 'antd';
import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../../../common/fetch';
import { Client } from '../../../../types';

export default () => {
    const { id } = useParams();
    const { data, error, isLoading } = useSWR<Client>(`/api/clients/${id}`, get)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'App Name',
            children: data?.name,
        },
        {
            key: '2',
            label: 'Logo',
            children: data?.description,
        },
        {
            key: '3',
            label: 'Created',
            children: data?.createdAt?.toLocaleString(),
        },
        {
            key: '4',
            label: 'Secret',
            children: data?.secret,
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
    ];

    return <div>
        <Card bordered={false}>
            <Image width={100} height={100} src={data?.logo} />
        </Card>

        <Card className='mt-4'>
            <Descriptions title="Application Info" items={items} />
        </Card>
    </div>
}
