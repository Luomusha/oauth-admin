

import { Card, Col, Row, Statistic, Table } from 'antd';
import useSWR from 'swr';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LikeOutlined } from '@ant-design/icons';
import { get } from '../../../common/fetch';

export default () => {
    const { data } = useSWR("/api/statistic", get)
    return <div>
        <Row gutter={[16, 8]} className='box-border'>
            <Col span={6}  >
                <Card bordered={false}>
                    <Statistic title="Clients" value={data?.clients} prefix={<LikeOutlined />} />
                </Card>
            </Col>
            <Col span={6}  >
                <Card bordered={false}>
                    <Statistic title="Users" value={data?.users} suffix="/ 100" />
                </Card>
            </Col>
            <Col span={6} >
                <Card bordered={false}>
                    <Statistic title="Tokens" value={data?.tokens} prefix={<LikeOutlined />} />
                </Card>
            </Col>
            <Col span={6} >
                <Card bordered={false}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Card>
            </Col>
            <Col span={6}  >
                <Card bordered={false}>
                    <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                </Card>
            </Col>
            <Col span={6}  >
                <Card bordered={false}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Card>
            </Col>
            <Col span={6} >
                <Card bordered={false}>
                    <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                </Card>
            </Col>
            <Col span={6} >
                <Card bordered={false}>
                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Card>
            </Col>
        </Row>
    </div>

}
