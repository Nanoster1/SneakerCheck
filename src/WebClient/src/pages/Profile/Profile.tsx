import React from 'react'
import { Button, Checkbox, Flex, Form, Row, Spin, Typography } from 'antd'
import GradientText from '../../components/GradientText'
import CitySelector from '../../components/CitySelector'
import useFetch from '../../hooks/useFetch'
import { becomeSeller, changeUserCity, getUserProfile } from '../../services/UserService'
import InstructionCard from '../../components/InstructionCard'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { login, logout } from '../../store/auth/authSlice'
import { RouteNames } from '../../components/AppRouter'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getSellerShop, getShops } from '../../services/ShopsService'
import ShopCard from '../../components/ShopCard'
import { getInstructions } from '../../services/InstructionService'
import { ICity } from '../../models/IRegion'

const Profile = () => {
  const {user} = useAppSelector(state => state.auth)
  const navigation = useNavigate()


  const shops = useFetch(getShops)
  const myShop = useFetch(getSellerShop, user?.id ?? '')
  const instructions = useFetch(getInstructions)
  const userDto = useFetch(getUserProfile)

  async function changeUserCityHandler(city: ICity) {
    await changeUserCity(city.city)
  }

  const userProfileList = [
    {
      title: 'Город:',
      element: <CitySelector defaultCity={userDto.data?.city} onSelect={changeUserCityHandler} />
    }
  ]
  console.log({
    Profile: 'Логи из профиля о стейте',
    user,
    myShop: myShop.data,
    userDto: userDto.data
  })
  if (user?.role === "Seller") {
    if (myShop.data) {
      userProfileList.push({
        title: 'Мой магазин',
        element: <ShopCard content={myShop.data} />
      })
      if (instructions.data?.filter((i) => i.shopId === myShop.data?.id).length) {
        userProfileList.push({
          title: 'Ваши инструкции',
          element: (
            <Flex vertical gap={16} style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
              <Button
                onClick={() => navigation(RouteNames.CREATE_INSTRUCTION)}
                size={'large'}
                type="primary"
                icon={<PlusOutlined />}>
                Создать инструкцию
              </Button>
              {instructions.data?.filter((i) => i.shopId === myShop.data?.id).map((instr) => <InstructionCard key={instr.id} content={instr} />)}
            </Flex>
          )
        })
      }
      else {
        userProfileList.push({
          title: 'У вашего магазина нет ни одной инструкции',
          element: (
            <Flex vertical gap={16} style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
              <Button
                onClick={() => navigation(RouteNames.CREATE_INSTRUCTION)}
                size={'large'}
                type="primary"
                icon={<PlusOutlined />}>
                Создать первую инструкцию
              </Button>
              {instructions.data?.filter((i) => i.shopId === myShop.data?.id).map((instr) => <InstructionCard key={instr.id} content={instr} />)}
            </Flex>
          )
        })
      }
    }
    else {
      userProfileList.push({
        title: 'Создайте ваш магазин, чтобы получить доступ к инструкциям',
        element: (
          <Flex vertical gap={16} style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
            <Button
              onClick={() => navigation(RouteNames.SHOPS_CREATE_EDIT)}
              size={'large'}
              type="primary"
              icon={<PlusOutlined />}>
              Создать магазин
            </Button>
          </Flex>
        )
      })
    }
  }
  else {
    userProfileList.push({
      title: 'Станьте продавцом!',
      element: (
        <Form onFinish={async () => {
          const newToken = await becomeSeller()
          dispatch(login({jwtToken: newToken}))
        }}>
          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласиться с условиями')),
              },
            ]}
          >
            <Checkbox>
              Я подтверждаю, что ознакомился и полностью согласен с условиями использования сервиса. Я обязуюсь предоставлять только достоверную информацию и подлинные инструкции по определению оригинальности товаров. Я понимаю, что за размещение недостоверной информации или поддельных инструкций могут последовать штрафные санкции. Также я согласен с взиманием платы в размере 300$ за вступление в ряды продавцов сервиса, что позволит мне пользоваться всеми преимуществами и инструментами для продвижения и защиты своих товаров.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 16 }}
            >
              Стать продавцом
            </Button>
          </Form.Item>
        </Form>
      )
    })
  }
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  const loading = shops.loading && myShop.loading && instructions.loading

  return (
    <Flex justify={'center'} gap={48} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Ваш профиль'} />
      { loading ? (
        <Spin size={'large'} />
      ) : (
        <>
          <Row>
            <Typography.Title style={{ margin: 0 }} level={3}>
              {user?.name ?? 'Не удалось получить имя'}
            </Typography.Title>
            <Button onClick={handleLogout} style={{ marginLeft: 'auto' }} type="primary" danger>
              Выйти
            </Button>
          </Row>
          {userProfileList.map((component, idx) => (
            <div key={idx}>
              <Row>{component.title}</Row>
              <Row style={{ marginTop: '16px' }}>{component.element}</Row>
            </div>
          ))}
        </>
      )}
    </Flex>
  )
}

export default Profile

// {
//     "Profile": "Логи из профиля о стейте",
//     "user": {
//         "role": "Customer",
//         "name": "Maxim Chuikov",
//         "id": "87de28ab-e8fc-4ecc-9480-2da43ee1bcf1"
//     },
//     "myShop": null,
//     "userDto": null
// }
