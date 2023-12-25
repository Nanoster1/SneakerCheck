import SocialNameEnum from '../models/SocialNameEnum'

export default function getSocialUrl(social: SocialNameEnum) {
  const path = '/assets/socialsIcons/'
  switch (social) {
    case SocialNameEnum.telegram:
      return `${path}telegram.png`
    case SocialNameEnum.instagram:
      return `${path}instagram.png`
    case SocialNameEnum.vk:
      return `${path}vk.png`
    default:
      return `${path}website.png`
  }
}
