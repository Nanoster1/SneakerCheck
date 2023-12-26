import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Badge, Card, Col, Flex, Image, Row, Spin, Typography } from 'antd'
import { DislikeFilled, LikeFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../components/AppRouter'
import useFetch from '../../hooks/useFetch'
import InstructionContentCard from '../../components/InstructionContentCard'
import cls from '../../components/InstructionCard/InstructionCard.module.scss'
import GradientText from '../../components/GradientText'
import { getInstruction } from '../../services/InstructionService'
import { getShop } from '../../services/ShopsService'

const Instruction = () => {
  const { instructionId } = useParams()

  const navigate = useNavigate()
  useEffect(() => {
    if (!instructionId) navigate(RouteNames.SEARCH)
  }, [instructionId])

  const product = useFetch(getInstruction, instructionId ?? '0')
  const shop = useFetch(getShop, product.data?.shopId ?? '0')

  console.log({ model: product })

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      {product.loading ? (
        <Spin />
      ) : (
        <>
          <Flex justify={'center'}>
            <GradientText text={product?.data?.productName ?? ''} />
          </Flex>

          <Card>
            <Link to={`${RouteNames.SHOPS}/${shop.data?.id}`}>
              <Row>
                <Col span={2}>
                  <Image preview={false} src={shop.data?.iconUrl ?? ''} width={45} style={{ borderRadius: '4px' }} />
                </Col>
                <Col span={22}>
                  <Typography.Title style={{ margin: '0' }} level={3}>
                    {shop.data?.name}
                  </Typography.Title>
                </Col>
              </Row>
            </Link>

            <Row style={{ margin: '12px 0' }}>
              <Col>
                <Badge
                  count={(product?.data?.likes ?? 0) + 1}
                  offset={[19, 18]}
                  overflowCount={9999}
                  style={{ backgroundColor: '#28C98E', color: '#4b4e56', fontWeight: 'bold' }}>
                  <Avatar shape={'square'} size={'large'} src={<LikeFilled />} />
                </Badge>
              </Col>
              <Col offset={2}>
                <Badge
                  count={(product?.data?.dislikes ?? 0) + 1}
                  offset={[19, 18]}
                  overflowCount={9999}
                  style={{ backgroundColor: '#ED522F', color: '#37393f', fontWeight: 'bold' }}>
                  <Avatar shape={'square'} size={'large'} src={<DislikeFilled />} />
                </Badge>
              </Col>
            </Row>

            <Row>
              <Image src={product?.data?.previewImageUrl ?? ''} />
            </Row>

            <Row style={{ margin: '12px 0' }}>
              <Typography.Text className={cls.descriptionText}>{product?.data?.description}</Typography.Text>
            </Row>
          </Card>
          {product?.data?.content?.map((c, idx) => <InstructionContentCard key={idx}
                                                                           content={c} /> ?? 'Нет контента у инструкции')}
        </>
      )}
    </Flex>
  )
}

export default Instruction
