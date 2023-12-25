import React from 'react'
import { Button, Flex, Row, Spin, Typography } from 'antd'
import GradientText from '../../components/GradientText'
import CitySelector from '../../components/CitySelector'
import useFetch from '../../hooks/useFetch'
import { getUserProfile } from '../../services/UserService'
import InstructionCard from '../../components/InstructionCard'
import { useAppDispatch } from '../../hooks/useTypedSelector'
import { logout } from '../../store/auth/authSlice'

const Profile = () => {
  const user = useFetch(getUserProfile)

  const userProfileList = [
    {
      title: 'Город:',
      element: <CitySelector defaultCity={user.data?.city.city || ''} onSelect={(a) => console.log(a)} />
    },
    {
      title: 'Понравившиеся инструкции:',
      element: (
        <Flex vertical gap={16} style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
          {user.data?.likedInstructions.map((instr) => <InstructionCard key={instr.instructionId} content={instr} />)}
        </Flex>
      )
    }
  ]

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Flex size={'large'} justify={'center'} gap={48} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Ваш профиль'} />
      {user.loading ? (
        <Spin size={'large'} />
      ) : (
        <>
          <Row>
            <Typography.Title style={{ margin: 0 }} level={3}>
              {user.data?.name} {user.data?.surname}
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
