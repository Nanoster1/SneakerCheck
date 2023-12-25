import React from 'react'
import { Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import IShop from '../../models/IShop'
import { getShops } from '../../services/ShopsService'
import GradientText from '../../components/GradientText'
import ShopCard from '../../components/ShopCard'

const Shops = () => {
  const shops = useFetch<IShop[]>(getShops)

  return (
    <Flex size={'large'} justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Список магазинов в вашем городе'} />
      {shops.loading ? (
        <Spin />
      ) : (
        shops.data?.map((c) => <ShopCard content={c} key={c.id} /> ?? 'Список магазинов пуст')
      )}
    </Flex>
  )
}

export default Shops
