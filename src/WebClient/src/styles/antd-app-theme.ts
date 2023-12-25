import { ThemeConfig } from 'antd'

const appTheme: ThemeConfig = {
  components: {
    Form: {
      controlHeightLG: 60,
      controlOutlineWidth: 22,
      fontSizeLG: 26
    },
    Button: {
      dangerShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      colorTextLightSolid: 'rgb(37, 38, 43)',
      defaultGhostColor: 'rgb(75, 78, 86)',
      defaultGhostBorderColor: 'rgb(75, 78, 86)'
    },
    Drawer: {
      colorIcon: 'rgba(192, 196, 208, 0.7)'
    },
    Notification: {
      colorBgElevated: 'rgb(75, 78, 86)'
    },
    Tooltip: {
      colorBgSpotlight: 'rgb(75, 78, 86)'
    },
    Popover: {
      colorBgElevated: 'rgb(75, 78, 86)'
    },
    Calendar: {
      controlItemBgActive: 'rgb(75, 78, 86)'
    },
    Transfer: {
      controlItemBgActive: 'rgba(240, 255, 247, 0)',
      controlItemBgHover: 'rgba(75, 78, 86, 0.55)',
      controlItemBgActiveHover: 'rgba(214, 255, 235, 0.3)'
    },
    Slider: {
      colorPrimaryBorder: 'rgb(47, 238, 168)'
    },
    Select: {
      optionSelectedBg: 'rgba(75, 78, 86, 0.5)',
      multipleItemBg: 'rgba(0, 0, 0, 0)',
      controlOutline: 'rgba(240, 255, 247, 0)',
      colorErrorOutline: 'rgba(255, 242, 240, 0)',
      colorWarningOutline: 'rgba(255, 254, 240, 0)',
      controlOutlineWidth: 0
    },
    Radio: {
      colorTextLightSolid: 'rgb(37, 38, 43)',
      colorWhite: 'rgb(37, 38, 43)'
    },
    Input: {
      controlOutlineWidth: 0
    },
    DatePicker: {
      colorTextLightSolid: 'rgb(37, 38, 43)'
    },
    Checkbox: {
      colorWhite: 'rgb(37, 38, 43)'
    },
    Cascader: {
      controlItemBgActive: 'rgba(75, 78, 86, 0.5)'
    },
    Steps: {
      colorTextLightSolid: 'rgb(37, 38, 43)',
      colorPrimary: 'rgb(47, 238, 168)',
      colorSplit: 'rgba(75, 78, 86, 0.75)',
      controlItemBgActive: 'rgba(47, 238, 168, 0.15)'
    },
    Menu: {
      controlItemBgActive: 'rgb(75, 78, 86)',
      dangerItemSelectedBg: 'rgba(255, 242, 240, 0.15)'
    }
  },
  token: {
    colorPrimary: '#2feea8',
    colorInfo: '#2feea8',
    colorWarning: '#f2c028',
    colorBgBase: '#25262b',
    colorTextBase: '#c0c4d0',
    fontSize: 18,
    sizeStep: 6,
    sizeUnit: 4,
    borderRadius: 8,
    boxShadow: 'none',
    boxShadowSecondary: 'none'
  }
}

export default appTheme
