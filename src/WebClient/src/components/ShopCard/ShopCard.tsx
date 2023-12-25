import React from 'react'
import { Card, Col, Image, Rate, Row } from 'antd'
import IShop from '../../models/IShop'
import getSocialUrl from '../../utils/getSocialUrl'

const ShopCard = ({ content }: { content: IShop }) => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Image src={content.imageLink} />
        </Col>
        <Col span={12}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <h3>{content.name}</h3>
            </Col>
            <Col span={24}>
              Город: {content.address.city}
              <br />
              Адрес: {`Регион ${content.address.region}, ул. ${content.address.street}, дом ${content.address.house}`}
            </Col>
            <Col span={24}>
              <Rate disabled allowHalf defaultValue={content.shopRating.value} />
            </Col>
            <Col span={24}>
              <p>{content.description}</p>
            </Col>
          </Row>
        </Col>
        <Col offset={2} span={2}>
          {content.socials.map((social) => (
            <Row key={social.name.toString()}>
              <a href={social.url} target={'_blank'} rel="noreferrer">
                <img width={54} height={54} alt={social.name.toString()} src={getSocialUrl(social.name)} />
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </Card>
  )
}

export default ShopCard
