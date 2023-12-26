import React from 'react'
import { Button, Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getShops } from '../../services/ShopsService'
import GradientText from '../../components/GradientText'
import ShopCard from '../../components/ShopCard'
import { getUserProfile } from '../../services/UserService'
import { RouteNames } from '../../components/AppRouter'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Shops = () => {
  const shops = useFetch(getShops)
  const user = useFetch(getUserProfile)
  const navigate = useNavigate()
  if (!user.data?.city) {
    return (
      <Flex vertical gap={'large'} justify={'center'} style={{ marginTop: '80px' }}>
        <Flex justify={'center'} style={{ marginTop: '5vh' }}>
          <GradientText text={'Вы не выбрали город для поиска, перейдите в профиль'} />
        </Flex>
        <Flex justify={'center'} style={{ marginTop: '5vh' }}>
          <Button onClick={() => navigate(RouteNames.PROFILE)} size={'large'} type="primary" icon={<UserOutlined />}>
            Перейти в профиль
          </Button>
        </Flex>
      </Flex>
    )
  }


  const filteredShops = shops.data?.filter(sh => sh.city === user.data?.city)

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Список магазинов в вашем городе'} />
      {shops.loading ? (
        <Spin />
      ) : (
        filteredShops?.length ? shops.data?.map((c) => <ShopCard content={c} key={c.id} />) : 'Список магазинов пуст'
      )}
    </Flex>
  )
}

export default Shops
