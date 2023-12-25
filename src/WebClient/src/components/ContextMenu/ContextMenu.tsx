import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons'

export enum ContextMenuActions {
  DELETE = 'deleteAction'
}

const Mapper = {
  [ContextMenuActions.DELETE]: {
    label: <div style={{ color: 'red' }}>Удалить</div>,
    icon: <DeleteOutlined />
  }
}

const ContextMenu = ({
  actionsList,
  actionHandler
}: {
  actionsList: ContextMenuActions[]
  actionHandler: (action: ContextMenuActions) => void
}) => {
  const menu = (
    <Menu
      items={actionsList.map((act, idx) => ({
        ...Mapper[act],
        key: act + idx,
        onClick: () => actionHandler(act)
      }))}
    />
  )

  return (
    <Dropdown placement="topLeft" overlay={menu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>
  )
}

export default ContextMenu
