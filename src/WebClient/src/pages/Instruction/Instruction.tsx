import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Badge, Card, Col, Flex, Image, Row, Spin, Typography } from 'antd'
import { DislikeFilled, LikeFilled } from '@ant-design/icons'
import { RouteNames } from '../../components/AppRouter'
import useFetch from '../../hooks/useFetch'
import InstructionContentCard from '../../components/InstructionContentCard'
import cls from '../../components/InstructionCard/InstructionCard.module.scss'
import GradientText from '../../components/GradientText'
import { getInstruction } from '../../services/InstructionService'

const Instruction = () => {
  const { instructionId } = useParams()

  const navigate = useNavigate()
  useEffect(() => {
    if (!instructionId) navigate(RouteNames.SEARCH)
  }, [instructionId])

  const model = useFetch(getInstruction, instructionId)

  const instr = model.data?.[0]

  console.log({ model })

  return (
    <Flex size={'large'} justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      {model.loading ? (
        <Spin />
      ) : (
        <>
          <Flex justify={'center'}>
            <GradientText text={instr?.modelName ?? ''} />
          </Flex>

          <Card>
            <Row>
              <Col span={2}>
                <Image src={instr?.shop.imageLink ?? ''} width={45} style={{ borderRadius: '4px' }} />
              </Col>
              <Col span={22}>
                <Typography.Title style={{ margin: '0' }} level={3}>
                  {instr?.shop.name}
                </Typography.Title>
              </Col>
            </Row>

            <Row style={{ margin: '12px 0' }}>
              <Col>
                <Badge
                  count={instr?.likes}
                  offset={[19, 18]}
                  overflowCount={9999}
                  style={{ backgroundColor: '#28C98E', color: '#4b4e56', fontWeight: 'bold' }}>
                  <Avatar shape={'square'} size={'large'} src={<LikeFilled />} />
                </Badge>
              </Col>
              <Col offset={2}>
                <Badge
                  count={instr?.dislikes}
                  offset={[19, 18]}
                  overflowCount={9999}
                  style={{ backgroundColor: '#ED522F', color: '#37393f', fontWeight: 'bold' }}>
                  <Avatar shape={'square'} size={'large'} src={<DislikeFilled />} />
                </Badge>
              </Col>
            </Row>

            <Row>
              <Image src={instr?.previewImageUrl ?? ''} />
            </Row>

            <Row style={{ margin: '12px 0' }}>
              <Typography.Text className={cls.descriptionText}>{instr?.description}</Typography.Text>
            </Row>
          </Card>
          {instr?.content?.map((c, idx) => <InstructionContentCard key={idx} content={c} /> ?? 'я пустой')}
        </>
      )}
    </Flex>
  )
}

export default Instruction
