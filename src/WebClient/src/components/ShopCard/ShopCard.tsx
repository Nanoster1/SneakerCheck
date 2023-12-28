import React from 'react'
import { Card, Col, Image, Rate, Row } from 'antd'
import IShop from '../../models/IShop'
import getSocialUrl from '../../utils/getSocialUrl'
import SocialNameEnum from '../../models/SocialNameEnum'
import { Link } from 'react-router-dom'
import { RouteNames } from '../AppRouter'

const ShopCard = ({ content }: { content: IShop }) => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Image src={content.iconUrl ?? ''} />
        </Col>
        <Col span={12}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Link to={`${RouteNames.SHOPS}/${content.id}`}>
                <h3>{content.name}</h3>
              </Link>
            </Col>
            <Col span={24}>
              Город: {content.city}
              <br />
              Адрес: {content.address}
            </Col>
            <Col span={24}>
              <Rate disabled allowHalf defaultValue={content.rating} />
            </Col>
            <Col span={24}>
              <p>{content.description}</p>
            </Col>
          </Row>
        </Col>
        <Col offset={2} span={2}>
          {content.shopUrls.map((social) => (
            <Row key={social.name.toString()}>
              <a href={social.url} target={'_blank'} rel="noreferrer">
                <img width={54} height={54} alt={social.name.toString()} src={getSocialUrl(social.name as SocialNameEnum)} />
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </Card>
  )
}

export default ShopCard
