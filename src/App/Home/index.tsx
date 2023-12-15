import { useEffect, useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined, HomeOutlined, UnlockOutlined, BarChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Breadcrumb, Flex, Layout, Menu } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import useSWR from 'swr'
import axios from 'axios'
import { storage } from '../../common/fetch'
import { Token } from '../../types'

const { Header, Content, Sider } = Layout

const items1: MenuProps['items'] = ['1', '2', '3', '4', '5'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const items2: MenuProps['items'] = [{
  key: "dashboard",
  label: "Dashboard",
  icon: <Link to={"/"}><BarChartOutlined /></Link>,
}, {
  key: "user",
  label: "User",
  icon: <Link to={"/users"}><UserOutlined /></Link>,
}, {
  key: "client",
  label: "Client",
  icon: <Link to={"/clients"}><LaptopOutlined /></Link>,
}, {
  key: "token",
  label: "Token",
  icon: <Link to={"/tokens"}><UnlockOutlined /></Link>,
}, {
  key: "message",
  label: "Message",
  icon: <Link to={"/message"}><NotificationOutlined /></Link>
}]

export default () => {
  const location = useLocation()
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemType[]>([{ title: <HomeOutlined />, }])
  const navigator = useNavigate()
  const { data, isLoading, error } = useSWR<Token>("TOKEN", storage)

  useEffect(() => {
    const a = location.pathname.split("/")
    const base: BreadcrumbItemType[] = [{
      href: "",
      title: <HomeOutlined />,
    }]
    a.filter(path => !!path).forEach(path => {
      console.log(path)
      const crumb = {
        href: undefined,
        title: path
      }
      base.push(crumb)
    })
    setBreadcrumb(base)
  }, [location])

  useEffect(() => {
    if (isLoading) return
    console.log(data)
    if (data) axios.defaults.headers.common['Authorization'] = "Bearer " + data.accessToken
    else navigator("/login")
  }, [isLoading])


  return <Layout>
    <Header>
      <Flex align='center'>
        <img src={data?.client?.logo} height={32} />
        <h1 className='text-white m-0'>
          Oauth2.0
        </h1>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} className={"flex-1"} />
        <Avatar src={data?.user?.avatar} />
      </Flex>
    </Header>
    <Layout>
      <Sider width={200}>
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} className={"h-full"} items={items2} />
      </Sider>
      <Layout>
        <Content className='px-4 py-2'>
          <Breadcrumb className="mb-2" items={breadcrumb} />
          {!isLoading && <Outlet />}
        </Content>
      </Layout>
    </Layout>
  </Layout >
}

