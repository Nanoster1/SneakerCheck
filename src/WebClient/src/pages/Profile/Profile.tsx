import React from 'react'
import { Button, Checkbox, Flex, Row, Spin, Typography } from 'antd'
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
  }
  else {
    userProfileList.push({
      title: 'Станьте продавцом!',
      element: (
        <div>
          <Checkbox>
            Я ознакомился с декларацией прав потребителя и принимаю все правила и готов заплатить 300$ мужикам.
          </Checkbox>
          <Button
            type="primary"
            onClick={handleBecomeSeller}
            style={{ marginTop: 16 }}
          >
            Стать продавцом
          </Button>
        </div>
      )
    })
  }
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  async function handleBecomeSeller() {
    const newToken = await becomeSeller()
    dispatch(login({jwtToken: newToken}))
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
