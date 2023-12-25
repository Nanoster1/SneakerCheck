import React from 'react'
import { Flex, Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { getShop } from '../../services/ShopsService'
import EditShopCard from '../../components/EditShopCard'

const EditShop = () => {
  const { shopId } = useParams()

  const shopData = useFetch(getShop, shopId)

  return (
    <Flex size={'large'} justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      {shopData.loading && !shopData.data ? (
        <Skeleton active paragraph={{ width: '100%', rows: 6 }} />
      ) : (
        <EditShopCard content={shopData.data} isLoading={shopData.loading} onSave={shopData.refresh} />
      )}
    </Flex>
  )
}

export default EditShop
