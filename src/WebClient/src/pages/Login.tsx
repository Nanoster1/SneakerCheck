import React, { FC } from 'react'
import { Card, Layout } from 'antd'
import { GoogleLogin } from '@react-oauth/google'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector'
import { login } from '../store/auth/authSlice'
import GradientText from '../components/GradientText';

const Login: FC = () => {
  const currentState = useAppSelector(state => state.auth)
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
        <GradientText text={'Войти с помощью Google'} />
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const token = credentialResponse.credential;
                        localStorage.setItem('token', token?.toString());
                        if (token) {
                            dispatch(login(currentState))
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
