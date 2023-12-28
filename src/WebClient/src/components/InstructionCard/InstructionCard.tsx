import React from 'react'
import { Avatar, Badge, Card, Col, Divider, Image, notification, Row, Typography } from 'antd'
import { LikeFilled, DislikeFilled } from '@ant-design/icons'
import { RouteNames } from '../AppRouter'
import cls from './InstructionCard.module.scss'
import { IInstructionDataDTO } from '../../pages/CreateInstruction/types'
import useFetch from '../../hooks/useFetch'
import { getShop } from '../../services/ShopsService'

const InstructionCard = ({ content }: { content: IInstructionDataDTO }) => {
  console.log({
    content
  })

  const shop = useFetch(getShop, content.shopId ?? '0')

  return (

    <Card>
      <a href={`${RouteNames.INSTRUCTIONS}/${content.id}`}>
        <Row>
          <Col span={2}>
            <Image preview={false} src={shop.data?.iconUrl} width={45} style={{ borderRadius: '4px' }} />
          </Col>
          <Col span={22}>
            <Typography.Title style={{ margin: '0' }} level={3}>
              {shop.data?.name}
            </Typography.Title>
          </Col>
        </Row>


        <Row style={{ margin: '8px 0' }}>
          <Typography.Text className={cls.descriptionText}>{content.description}</Typography.Text>
        </Row>
      </a>

      <Row>
        <Col style={{cursor: 'pointer'}} onClick={(e) => {
          e.preventDefault()
          notification.error({
            message: 'Функция лайка в демонстрационной версии не доступна'
          })
        }}>
          <Badge
            count={content.likes}
            offset={[19, 18]}
            overflowCount={9999}
            showZero={true}
            style={{ backgroundColor: '#28C98E', color: '#4b4e56', fontWeight: 'bold' }}>
            <Avatar shape={'square'} size={'large'} src={<LikeFilled />} />
          </Badge>
        </Col>
        <Col style={{cursor: 'pointer'}} offset={2} onClick={(e) => {
          e.preventDefault()
          notification.error({
            message: 'Функция дизлайка в демонстрационной версии не доступна'
          })
        }}>
          <Badge
            count={content.dislikes}
            offset={[19, 18]}
            showZero={true}
            overflowCount={9999}
            style={{ backgroundColor: '#ED522F', color: '#37393f', fontWeight: 'bold' }}>
            <Avatar shape={'square'} size={'large'} src={<DislikeFilled />} />
          </Badge>
        </Col>
      </Row>

      <Row>
        <Image preview={false} src={content.previewImageUrl} />
      </Row>

      <Divider />

      <Row>
        <Typography.Text type={'secondary'}>{content.productName}</Typography.Text>
      </Row>
    </Card>

  )
}

export default InstructionCard
