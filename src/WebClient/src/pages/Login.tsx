import React, { FC } from 'react'
import { Card, Layout } from 'antd'
import { GoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '../hooks/useTypedSelector'
import { login } from '../store/auth/authSlice'
import GradientText from '../components/GradientText'
import { getJwtToken } from '../services/UserService'

const Login: FC = () => {
  const dispatch = useAppDispatch()
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        style={{
          width: 600,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <GradientText text={'Войти с помощью Google'} />
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const googleJwt = credentialResponse.credential
            if (googleJwt) {
              const jwtToken = await getJwtToken(googleJwt)
              if (jwtToken)
                dispatch(login({ jwtToken: jwtToken }))
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </Card>
    </Layout>
  )
}

export default Login
