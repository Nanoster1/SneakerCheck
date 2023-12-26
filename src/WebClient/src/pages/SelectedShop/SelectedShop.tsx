import React from 'react'
import { Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getShop } from '../../services/ShopsService'
import GradientText from '../../components/GradientText'
import ShopCard from '../../components/ShopCard'
import { useParams } from 'react-router-dom'


const SelectedShop = () => {
  const { shopId } = useParams()
  const shop = useFetch(getShop, shopId ?? '0')

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Выбранный магазин'} />
      {shop.loading ? (
        <Spin />
      ) : (
        shop.data ? <ShopCard content={shop.data} /> : 'Магазин не найден'
      )}
    </Flex>
  )
}

export default SelectedShop
