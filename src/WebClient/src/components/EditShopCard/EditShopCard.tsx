import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Flex, Form, Input, Modal, Row, Select, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { EditOutlined } from '@ant-design/icons'
import IShop from '../../models/IShop'
import ShopCard from "../ShopCard";
import socialNameEnum from "../../models/SocialNameEnum";
import {createShop, updateShop} from "../../services/ShopsService";
import cls from './EditShopCard.module.scss'

const { Option } = Select

const EditShopCard = ({
  content,
  isLoading,
  onSave
}: {
  content?: IShop | null
  isLoading: boolean
  onSave: () => void
}) => {

    const [editMode, setEditMode] = useState(false);

  useEffect(() => {
        if (!isLoading) {
            setEditMode(!content)
        }
    }, [content])

  const [fileList, setFileList] = useState<UploadFile[]>(content?.imageLink ? [{
        uid: '-1',
        name: 'image.png',
            status: 'done',
    url: content.imageLink,
    } as any] : [])
  )
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

  const handleCancelEdit = () => {
        setEditMode(false);
    };

  const handleSave = async (values: {
        address: string
    description: string
    shopAvatar: undefined
    shopName: string
    city: string
    street: string
    house: string
    socials: {
      socialName: string
      url: string
    }[]
  }) => {
    console.log('Saved values:', values);
        setEditMode(false);

    const shop: IShop = {
            address: {
                country: 'Россия',
                city: values.city,
                street: values.street,
        house: values.house,
        region: 'Челябинская обл.',
                regionNumber: '74'
      },
            name: values.shopName,
            description: values.description,
            imageLink: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbloknot-novorossiysk.ru%2Fnews%2Fden-milykh-i-pushistykh-kak-vyglyadyat-kotiki-chit-1633783&psig=AOvVaw34Yh5jFvqnNb5yia4bEc4D&ust=1703249737952000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCi9fLJoIMDFQAAAAAdAAAAABAE',
            socials: values.socials.map((soc) => ({
                name: soc.socialName as any,
                url: soc.url
            })),
            shopRating: {
                value: '4.5',
      }
    }

    if (content?.id) {
            await updateShop(content.id, shop).then(() => onSave())
        } else {
            await createShop(shop).then(() => onSave())
        }
  }

  const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

  return !editMode && content ? (
    <Flex vertical gap={8}>
      <Button style={{marginLeft: 'auto'}} icon={<EditOutlined/>} onClick={() => setEditMode(true)}>
                Редактировать
            </Button>
            {
                content && <ShopCard content={content}/>
            }
        </Flex>
    ) : (
        <Card>
            <Form
                onFinish={handleSave}
                initialValues={{
                    shopName: content?.name,
                    description: content?.description,
                    city: content?.address?.city,
                    street: content?.address?.street,
                    house: content?.address?.house,
                    socials: content?.socials?.map((social) => ({
                        socialName: social?.name,
                        url: social?.url
                    }))
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
            <Form.Item
              name="shopAvatar"
              {
                                message: 'Загрузите аватар магазина', required: true,
                                validator: () => {
                                    return fileList.length > 0 ? Promise.resolve() : Promise.reject('э')
                                },
                  validateTrigger: 'onSubmit'
              }]}>
                            <ImgCrop>
                <Upload
                  fileList={fileList}
                  maxCount={1}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                                        onChange={onChange}
                                        className={cls.upload}
                  style={{ width: '100%', height: '100%' }}
                  listType="picture-card">{fileList.length === 0 && '+ Аватар'}</Upload>
                </Upload>
              </ImgCrop>
            </Form.Item>
                    </Col>
                    <Col span={12}>
            <Form.Item
              label="Название магазина"
              name="shopName"
              rules={[{required: true, message: 'Введите название магазина'}]}>
                            <Input/>
                        </Form.Item>
            <Form.Item
              label="Описание"
              name="description"
              rules={[{required: true, message: 'Введите описание магазина'}]}>
                            <Input.TextArea/>
                        </Form.Item>
            <Form.Item
              label="Город"
              rules={[{required: true, message: 'Введите город, где расположен магазин'}]}>
                            <Input/>
                        </Form.Item>
            <Form.Item
              label="Улица"
              rules={[{required: true, message: 'Введите улицу, где расположен магазин'}]}>
                            <Input/>
                        </Form.Item>
            <Form.Item
              label="Дом"
              rules={[{required: true, message: 'Введите дом, где расположен магазин'}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

        <Row style={{marginTop: '16px'}}>
                    <Col>
                        <Form.List name="socials">
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, fieldKey, ...restField}) => (
                                        <Row key={key} gutter={[8, 8]}>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'socialName']}
                                                    fieldKey={[fieldKey, 'socialName']}
                                                    rules={[{required: true, message: 'Выберите социальную сеть'}]}
                                                >
                                                    <Select placeholder="Социальная сеть">
                                                        {
                                                            Object.values(socialNameEnum).map((social) => (
                              <Option key={social} value={social}>
                                  {social}
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'url']}
                                                    fieldKey={[fieldKey, 'url']}
                                                    rules={[{required: true, message: 'Введите URL'}]}
                                                >
                                                    <Input placeholder={'URL'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Button onClick={() => remove(name)}>Удалить</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()}>
                                            Добавить социальную сеть
                                        </Button>
                  </Form.Item>
                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                            <Button onClick={handleCancelEdit}>Отмена</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default EditShopCard
