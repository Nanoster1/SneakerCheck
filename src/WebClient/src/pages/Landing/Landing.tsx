import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../../components/AppRouter'
import GradientText from '../../components/GradientText'
import cls from './Landing.module.scss'

const Landing = () => {
  const navigation = useNavigate()

  return (
    <Flex vertical gap={'large'} justify={'center'} style={{ marginTop: '80px' }}>
      <Flex className={cls.titleSneakersContainer} justify={'center'}>
        <Col span={12}>
          <GradientText text={'Legit Check - новый сервис проверки ваших кроссовок и не только.'} />
        </Col>
        <Col span={12}>
          <div className={cls.sneakers}>
            <img alt={'Кроссовок'} src={'/assets/AirJordan.png'} />
          </div>
        </Col>
      </Flex>

      <Flex span={15} justify={'center'} style={{ marginTop: '5vh' }}>
        <Button onClick={() => navigation(RouteNames.SEARCH)} size={'large'} type="primary" icon={<SearchOutlined />}>
          Найти модель, одежду, сумку, электронику
        </Button>
      </Flex>

      <Flex span={24} justify={'center'} style={{ marginTop: '5vh' }}>
        <GradientText text={'Посмотрите магазины в вашем городе'} />
      </Flex>
      <Flex span={15} gap={25} justify={'center'} style={{ marginTop: '5vh' }}>
        <Button onClick={() => navigation(RouteNames.SHOPS)} size={'large'} type="primary" icon={<SearchOutlined />}>
          Посмотреть магазины
        </Button>
      </Flex>
    </Flex>
  )
}

export default Landing
