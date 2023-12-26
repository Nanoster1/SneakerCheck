import React from 'react'
import { Layout, Row } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AppContainer = () => {
  return (
    <Layout>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content style={{ minHeight: 'calc(100vh - 64px - 75px)' }}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer style={{ height: '75px' }}>
        <Row justify={'center'}>Legit Check @2023 Created by Muzhiki</Row>
      </Layout.Footer>
    </Layout>
  )
}

export default AppContainer
