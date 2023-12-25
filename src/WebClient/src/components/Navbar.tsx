import React, { FC } from 'react'
import { Flex, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { RouteNames } from './AppRouter'

const Navbar: FC = () => {
  return (
    <Layout.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <a style={{ padding: '0 12px' }} href={RouteNames.LANDING}>
          SneakersApp
        </a>
      </div>
      <Flex gap={4}>
        <a style={{ padding: '0 12px' }} href={RouteNames.PROFILE}>
          <UserOutlined />
        </a>
      </Flex>
    </Layout.Header>
  )
}

export default Navbar
