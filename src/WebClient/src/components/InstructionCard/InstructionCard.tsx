import React from 'react'
import { Avatar, Badge, Card, Col, Divider, Image, Row, Typography } from 'antd'
import { LikeFilled, DislikeFilled } from '@ant-design/icons'
import IInstructionPreview from '../../models/IInstructionPreview'
import { RouteNames } from '../AppRouter'
import cls from './InstructionCard.module.scss'

const InstructionCard = ({ content }: { content: IInstructionPreview }) => {
  console.log({
    content
  })

  return (
    <a href={`${RouteNames.INSTRUCTIONS}/${content.instructionId}`}>
      <Card>
        <Row>
          <Col span={2}>
            <Image preview={false} src={content.shop.imageLink} width={45} style={{ borderRadius: '4px' }} />
          </Col>
          <Col span={22}>
            <Typography.Title style={{ margin: '0' }} level={3}>
              {content.shop.name}
            </Typography.Title>
          </Col>
        </Row>

        <Row style={{ margin: '8px 0' }}>
          <Typography.Text className={cls.descriptionText}>{content.description}</Typography.Text>
        </Row>

        <Row>
          <Col>
            <Badge
              count={content.likes}
              offset={[19, 18]}
              overflowCount={9999}
              style={{ backgroundColor: '#28C98E', color: '#4b4e56', fontWeight: 'bold' }}>
              <Avatar shape={'square'} size={'large'} src={<LikeFilled />} />
            </Badge>
          </Col>
          <Col offset={2}>
            <Badge
              count={content.dislikes}
              offset={[19, 18]}
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
          <Typography.Text type={'secondary'}>{content.modelName}</Typography.Text>
        </Row>
      </Card>
    </a>
  )
}

export default InstructionCard
