import React from 'react'
import { Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getShop } from '../../services/ShopsService'
import GradientText from '../../components/GradientText'
import ShopCard from '../../components/ShopCard'
import { useParams } from 'react-router-dom'
import { getInstructions } from '../../services/InstructionService'
import InstructionCard from '../../components/InstructionCard'


const SelectedShop = () => {
  const { shopId } = useParams()
  const shop = useFetch(getShop, shopId ?? '0')
  const instructions = useFetch(getInstructions)
  const shopInstructions = instructions.data?.filter(i => i.shopId === shop.data?.id) ?? []

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Выбранный магазин'} />
      {shop.loading ? (
        <Spin />
      ) : (
        shop.data ? <ShopCard content={shop.data} /> : 'Магазин не найден'
      )}
      {
        instructions.loading ? (
          <Spin />
        ) : (
          shopInstructions.length ? (
            <>
              <GradientText text={'Инструкции магазина'} />
              <Flex vertical gap={16}>
                {shopInstructions.map(i => (
                  <InstructionCard key={i.id} content={i} />
                ))}
              </Flex>
            </>
          ) : (
            <div>
              У магазина еще нет инструкций
            </div>
          )

        )
      }
    </Flex>
  )
}

export default SelectedShop
