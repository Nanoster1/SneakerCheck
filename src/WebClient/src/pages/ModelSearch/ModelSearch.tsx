import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AutoComplete, Card, Col, Flex, Row } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getSneakersModels } from '../../services/SneakersSearchService'
import { RouteNames } from '../../components/AppRouter'
import GradientText from '../../components/GradientText'
import { searchMatching } from '../../utils/SearchEngine'
import cx from './ModelSearch.module.scss'

const categories = [
  { key: 'sneakers', label: 'Кроссовки' },
    { key: 'clothes', label: 'Одежда' },
    { key: 'bags', label: 'Сумки' },
    { key: 'electronics', label: 'Электроника' },
]

const ModelSearch = () => {
  const navigate = useNavigate()
  const models = useFetch(getSneakersModels)

  const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (categoryKey) => {
        setSelectedCategory(categoryKey);
    };

  function handleSearch(inputValue: string, option: { modelName: string }) {
        return searchMatching([option], (i) => i.modelName, inputValue).length > 0
    }

  const handleModelClick = (modelId: string) => {
        console.log({modelId})
        navigate(`${RouteNames.INSTRUCTIONS}?model=${modelId}`)
    }

  function getOptions(): any {
        return models.data ? models?.data?.map((model) => {
            return {
                value: model.modelId.toString(),
                modelName: model.modelName,
                label: (
              <div>
            <img style={{width: '40px', marginRight: '8px'}} alt={'IMG'} src={model.imageUrl}/>
                        {model.modelName}
                    </div>
                )
            }
        })
      : []
  }

  return (
        <Flex style={{height: '70vh'}} vertical gap={30} justify={'center'} align={'center'}>

      <GradientText text={'Выберите категорию'}/>
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

      <GradientText text={'Давайте найдем вашу модель'}/>
            <AutoComplete
                placeholder={'Введите название модели...'}
                size={'large'}
                loading={models.loading}
                style={{width: '60vw'}}
                filterOption={handleSearch}
                popupMatchSelectWidth={false}
                onSelect={handleModelClick}
                options={getOptions()}/>
      />
    </Flex>

    )
}
export default ModelSearch
