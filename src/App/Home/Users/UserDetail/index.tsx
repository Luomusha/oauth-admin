import { Button, Descriptions, DescriptionsProps, Flex, Input, Space, Table, Typography } from 'antd';
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

    return <div className='bg-white rounded px-3 py-2'>
        <Descriptions title="User Info" items={items} />
    </div>
}
