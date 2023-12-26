import React, { useState } from 'react'
import { Card, Form, Button, Divider, Flex, Upload, UploadProps, UploadFile, Col, Input } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { PlusOutlined, FileDoneOutlined } from '@ant-design/icons'
import GradientText from '../../components/GradientText'
import CreateInstructionCard from '../../components/CreateInstructionCard'
import { IInstructionCard, IInstructionData, IInstructionDataSave } from './types'
import getBase64, { getBytesFromBase64, getFormatFromBase64 } from '../../utils/getBase64'
import cx from '../ModelSearch/ModelSearch.module.scss'
import { postInstruction } from '../../services/InstructionService'
import { getSellerShop } from '../../services/ShopsService'
import { useAppSelector } from '../../hooks/useTypedSelector'

function emptyCard(): IInstructionCard {
  return { markerState: {}, editedPhotos: {}, imageDescription: '', originalPhotos: {} }
}

const categories = [
  { key: 0, label: 'Кроссовки' },
  { key: 1, label: 'Одежда' },
  { key: 2, label: 'Сумки' },
  { key: 3, label: 'Электроника' }
]

const CreateInstruction = () => {
  const [form] = Form.useForm<string>()
  const {user} = useAppSelector(state => state.auth)
  const [instructionData, setInstructionData] = useState<IInstructionData>({
    category: 0,
    dislikes: 0,
    likes: 0,
    productName: '',
    shopId: '',
    description: ''
  })
  const [content, setContent] = useState<IInstructionCard[]>([emptyCard()])

  async function submitHandler() {
    const myShop = await getSellerShop(user?.id ?? '')

    const request: IInstructionDataSave = {
      content: content.map((c) => ({
        imageDescription: c.imageDescription,
        fakeImage: {
          bytes: getBytesFromBase64(c.editedPhotos.fake?.base64 ?? ''),
          format: getFormatFromBase64(c.editedPhotos.fake?.base64 ?? '')
        },
        originalImage: {
          bytes: getBytesFromBase64(c.editedPhotos.original?.base64 ?? ''),
          format: getFormatFromBase64(c.editedPhotos.original?.base64 ?? '')
        }
      })),
      description: instructionData.description,
      category: instructionData.category,
      productName: instructionData.productName,
      previewImage: {
        bytes: getBytesFromBase64(instructionData.previewImage?.base64 ?? ''),
        format: getFormatFromBase64(instructionData.previewImage?.base64 ?? '')
      },
      dislikes: 0,
      likes: 0,
      shopId: myShop.data?.id ?? ''
    }
    console.log(request, 'SUBMIT')
    const response = await postInstruction(request)
    console.log({
      response
    })
  }

  function saveCallback(data: IInstructionCard, index: number) {
    setContent((prev) => {
      const prevState = [...prev]
      prevState[index] = data
      return prevState
    })
  }

  function deleteCallback(index: number) {
    setContent((prev) => {
      const prevState = [...prev]
      return prevState.slice(0, index).concat(prevState.slice(index + 1))
    })
  }


  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handlePreviewUpload: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList.map(f => {
      f.status = 'done'
      return f
    }))
    if (newFileList.length > 0) {
      const base = await getBase64(newFileList[0].originFileObj as Blob)
      setInstructionData(prevState => ({ ...prevState, previewImage: { base64: base } }))
    }
  }
  const handleCategoryChange = (value: number) => {
    setInstructionData((prevState) => ({ ...prevState, category: value }))
  }

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <Flex justify={'center'}>
        <GradientText text={'Создание инструкции'} />
      </Flex>
      <Form hideRequiredMark form={form} onFinish={submitHandler}>

        <Form.Item
          name='category'
          label='Выбор категории'
        >
          <Flex vertical={false} gap={10}>
            {categories.map((category) => (
              <Col key={category.key} span={6}>
                <Card
                  className={instructionData.category === category.key ? cx.selectedCard : cx.categoryCard}
                  onClick={() => handleCategoryChange(category.key)}>
                  {category.label}
                </Card>
              </Col>
            ))}
          </Flex>

        </Form.Item>

        <Form.Item name='previewImage' label='Превью инструкции'>
          <Upload
            fileList={fileList}
            maxCount={1}
            beforeUpload={() => false}
            onChange={handlePreviewUpload}
            listType='picture-card'
          >
            {fileList.length === 0 && '+ Аватар'}
          </Upload>
        </Form.Item>


        <Form.Item
          name='productName'
          label='Название товара'
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input
            placeholder='Введите название товара'
            onChange={(value) => setInstructionData((prev) => ({ ...prev, productName: value.target.value }))}
          />
        </Form.Item>

        <Form.Item
          name='instructionDescription'
          label='Описание инструкции'
          rules={[{ required: true, message: 'Введите описание инструкции' }]}
        >
          <Input.TextArea
            placeholder='Введите описание инструкции'
            onChange={(value) => setInstructionData((prev) => ({ ...prev, description: value.target.value }))}
          />
        </Form.Item>


        <Flex vertical gap={'large'}>
          {content.map((fv, idx) => (
            <CreateInstructionCard
              deleteCard={() => deleteCallback(idx)}
              formValues={fv}
              saveCallback={(data) => {
                saveCallback(data, idx)
              }}
              cardKey={idx}
              key={idx}
            />
          ))}

          <Divider>
            Добавить карточку
            <Button
              onClick={() => setContent((prevState) => [...prevState, emptyCard()])}
              style={{ marginLeft: '18px' }}
              type='primary'
              icon={<PlusOutlined />}
              size={'large'}
            />
          </Divider>

          <Form.Item>
            <Card>
              <Flex justify={'center'} gap={'large'}>
                <b>Инструкция готова?</b>
                <Button type='primary' htmlType='submit' icon={<FileDoneOutlined />}>
                  Сохранить инструкцию
                </Button>
              </Flex>
            </Card>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  )
}

export default CreateInstruction
