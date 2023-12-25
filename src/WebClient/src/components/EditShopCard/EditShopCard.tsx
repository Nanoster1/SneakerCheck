import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Flex, Form, Input, Modal, Row, Select, Upload, UploadFile, UploadProps} from 'antd';
import ImgCrop from 'antd-img-crop';
import {EditOutlined} from '@ant-design/icons';
import IShop from '../../models/IShop';
import cls from './EditShopCard.module.scss'
import ShopCard from "../ShopCard";
import socialNameEnum from "../../models/SocialNameEnum";
import {createShop, updateShop} from "../../services/ShopsService";
import getBase64 from '../../utils/getBase64'

const {Option} = Select;

const EditShopCard = ({content, isLoading, onSave}: { content?: IShop | null, isLoading: boolean, onSave: () => void}) => {

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setEditMode(!content)
    }
  }, [content])

  const [fileList, setFileList] = useState<UploadFile[]>(content?.icon ? [{
    uid: '-1',
    name: content.icon.format,
    status: 'done',
    url: content.icon.bytes,
  } as any] : [])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as Blob)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleCancelEdit = () => {
    setEditMode(false)
  }

  const handleSave = async (values: {
    shopName: string
    description: string
    city: string
    address: string
    icon: string
    socials: {
      name: string
      url: string
    }[]
  }) => {
    setEditMode(false);

    console.log({values, fileList})

    const base64Full = await getBase64(fileList[0].originFileObj as Blob)
    const bytesStarts = base64Full.indexOf(',')
    const base64 = base64Full.slice(bytesStarts + 1)

    console.log({
      base64Full,
      base64,
      bytesStarts
    })


    const shop: IShop = {
      city: values.city,
      address: values.address,
      name: values.shopName,
      description: values.description,
      icon: {
        bytes: base64,
        format: fileList[0]?.originFileObj?.type ?? ''
      },
      shopUrls:values.socials,
    }

    if (content?.id) {
      await updateShop(content.id, shop).then(() => onSave())
    } else {
      await createShop(shop).then(() => onSave())
    }
  };

  const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList.map(f => {
      f.status = "done"
      return f
    }))
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
            <Form.Item name='icon' rules={[
              {
                message: 'Загрузите аватар магазина', required: true,
                validator: () => {
                  return fileList.length > 0 ? Promise.resolve() : Promise.reject('э')
                },
                validateTrigger: 'onSubmit'
              }]}>
              <ImgCrop>
                <Upload fileList={fileList}
                        maxCount={1}
                        onPreview={handlePreview}
                        beforeUpload={() => false}
                        onChange={onChange}
                        className={cls.upload}
                        style={{width: '100%', height: '100%'}}
                        listType="picture-card">{fileList.length === 0 && '+ Аватар'}</Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Название магазина" name="shopName"
                       rules={[{required: true, message: 'Введите название магазина'}]}>
              <Input/>
            </Form.Item>
            <Form.Item label="Описание" name="description"
                       rules={[{required: true, message: 'Введите описание магазина'}]}>
              <Input.TextArea/>
            </Form.Item>
            <Form.Item label="Город" name="city"
                       rules={[{required: true, message: 'Введите город, где расположен магазин'}]}>
              <Input/>
            </Form.Item>
            <Form.Item label="Адрес" name="address"
                       rules={[{required: true, message: 'Введите адрес, где расположен магазин'}]}>
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
                          name={[name, 'name']}
                          fieldKey={[fieldKey, 'name']}
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
};

export default EditShopCard;
