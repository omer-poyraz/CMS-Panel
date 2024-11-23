import React from 'react'
import North from '../../components/North'
import { Col, Row } from 'reactstrap'
import ClickCart from '../../components/Charts/ClickCart';
import InfoCart from '../../components/Charts/InfoCart';
import { faDollar, faMessage, faMinus, faTableCells, faUser } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
    return (
        <North>
            <Row className='mt-4'>
                <Col md={3} className='mb-4'>
                    <InfoCart
                        title="Form Sayısı"
                        piece="2314"
                        precent="%20"
                        direction="/form"
                        isRise
                        iconTheme="p prim"
                        icon={faMessage} />
                </Col>
                <Col md={3} className='mb-4'>
                    <InfoCart
                        title="Alınacak"
                        piece="5123.00 ₺"
                        precent="%12"
                        direction="/orders"
                        isRise={false}
                        iconTheme="p warn"
                        icon={faDollar} />
                </Col>
                <Col md={3} className='mb-4'>
                    <InfoCart
                        title="Ürün Sayısı"
                        piece="134.245"
                        precent="0"
                        direction="/product"
                        isRise
                        iconTheme="p succ"
                        icon={faTableCells} />
                </Col>
                <Col md={3} className='mb-4'>
                    <InfoCart
                        title="Üye Sayısı"
                        piece="134.245"
                        precent="%10"
                        direction="/user"
                        isRise
                        iconTheme="p dan"
                        icon={faUser} />
                </Col>
                <Col md={4} className='mb-4'>
                    <ClickCart
                        title="Site Ziyaretleri"
                        description="Sitenize ait günlük tıklanmalar"
                        data={[30, 40, 45, 50, 49, 90]} />
                </Col>
                <Col md={4} className='mb-4'>
                    <ClickCart
                        title="Sosyal Medya"
                        description="Sosyal medya günlük tıklanmalar"
                        data={[30, 23, 65, 78, 12, 23]} />
                </Col>
                <Col md={4} className='mb-4'>
                    <ClickCart
                        title="Blog Ziyaretleri"
                        description="Bloglarınıza dışarıdan gelen tıklanmalar"
                        data={[20, 67, 80, 120, 130, 160]} />
                </Col>
            </Row>
        </North>
    )
}

export default DashboardPage
