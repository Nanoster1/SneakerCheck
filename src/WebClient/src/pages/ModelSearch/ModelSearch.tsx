import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AutoComplete, Button, Card, Col, Flex, Row } from 'antd'
import useFetch from '../../hooks/useFetch'
import { RouteNames } from '../../components/AppRouter'
import GradientText from '../../components/GradientText'
import { searchMatching } from '../../utils/SearchEngine'
import cx from './ModelSearch.module.scss'
import { getInstructions } from '../../services/InstructionService'
import { getUserProfile } from '../../services/UserService'
import { UserOutlined } from '@ant-design/icons'

const categories = [
  { key: 0, label: 'Кроссовки' },
  { key: 1, label: 'Одежда' },
  { key: 2, label: 'Сумки' },
  { key: 3, label: 'Электроника' }
]

const ModelSearch = () => {
  const navigate = useNavigate()
  // const models = useFetch(getSneakersModels)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0)
  const allInstructions = useFetch(getInstructions)
  const user = useFetch(getUserProfile)

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

  const names = Array.from(new Set(allInstructions.data?.filter(i => i.category === selectedCategory).map(i => i.productName)))



  const handleCategoryClick = (categoryKey: number) => {
    setSelectedCategory(categoryKey)
  }

  function handleSearch(inputValue: string, option: { modelName: string }) {
    return searchMatching([option], (i) => i.modelName, inputValue).length > 0
  }

  const handleModelClick = (modelId: string) => {
    console.log({ modelId })
    navigate(`${RouteNames.INSTRUCTIONS}?model=${modelId}&category=${selectedCategory}`)
  }

  function getOptions(): any {
    return names.map((model) => {
        return {
          value: model,
          modelName: model,
          label: (
            <div>
              {/* <img style={{ width: '40px', marginRight: '8px' }} alt={'IMG'} src={model.imageUrl} /> */}
              {model}
            </div>
          )
        }
      })
  }

  return (
    <Flex style={{ height: '70vh' }} vertical gap={30} justify={'center'} align={'center'}>

      <GradientText text={'Выберите категорию'} />
      <Row gutter={16}>
        {categories.map((category) => (
          <Col key={category.key} span={6}>
            <Card
              className={selectedCategory === category.key ? cx.selectedCard : cx.categoryCard}
              onClick={() => handleCategoryClick(category.key)}>
              {category.label}
            </Card>
          </Col>
        ))}
      </Row>

      <GradientText text={'Давайте найдем вашу модель'} />
      <AutoComplete
        placeholder={'Введите название модели...'}
        size={'large'}
        loading={allInstructions.loading}
        style={{ width: '60vw' }}
        // @ts-ignore
        filterOption={handleSearch}
        popupMatchSelectWidth={false}
        onSelect={handleModelClick}
        options={getOptions()} />
    </Flex>

  )
}
export default ModelSearch
