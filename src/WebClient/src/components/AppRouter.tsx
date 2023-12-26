import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Typography } from 'antd'
import Login from '../pages/Login'
import AppContainer from '../pages/AppContainer'
import Landing from '../pages/Landing'
import ModelSearch from '../pages/ModelSearch'
import Instruction from '../pages/Instruction'
import Shops from '../pages/Shops'
import InstructionsPreviews from '../pages/InstructionsPreviews'
import CreateInstruction from '../pages/CreateInstruction'
import Profile from '../pages/Profile'
import EditShop from '../pages/EditShop'
import { useAppSelector } from '../hooks/useTypedSelector'
import SelectedShop from '../pages/SelectedShop'

export enum RouteNames {
  SEARCH = '/search',
  INSTRUCTIONS = '/instructions',
  CREATE_INSTRUCTION = '/create-instruction',
  SHOPS = '/shops',
  LANDING = '/',
  PROFILE = '/profile',
  SHOPS_CREATE_EDIT = '/shop-edit'
}

export enum Params {
  instructionId = '/:instructionId',
  shopId = '/:shopId'
}

const AppRouter = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  console.log({ isLoggedIn })

  if (!isLoggedIn)
    return (
      <Routes>
        <Route element={<AppContainer />}>
          <Route path={'*'} element={<Login />} />
        </Route>
      </Routes>
    )

  return (
    <Routes>
      <Route element={<AppContainer />}>
        <Route path={RouteNames.LANDING} element={<Landing />} />
        <Route path={RouteNames.SEARCH} element={<ModelSearch />} />
        <Route path={RouteNames.PROFILE} element={<Profile />} />

        <Route path={RouteNames.INSTRUCTIONS} element={<InstructionsPreviews />} />
        <Route path={`${RouteNames.INSTRUCTIONS}${Params.instructionId}`} element={<Instruction />} />
        <Route path={RouteNames.CREATE_INSTRUCTION} element={<CreateInstruction />} />

        <Route path={RouteNames.SHOPS} element={<Shops />} />
        <Route path={`${RouteNames.SHOPS}${Params.shopId}`} element={<SelectedShop />} />
        <Route path={RouteNames.SHOPS_CREATE_EDIT} element={<EditShop />} />
        <Route path={`${RouteNames.SHOPS_CREATE_EDIT}${Params.shopId}`} element={<EditShop />} />

        <Route path={'*'} element={<Typography>Не найдена страница 404</Typography>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
