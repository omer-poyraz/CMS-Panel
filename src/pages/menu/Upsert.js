import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope, faList } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { BButtonModel, CardModel, PButtonModel } from '../../utilities/Models'

const Upsert = () => {
    const lng = useSelector((state) => state.lang.lang)
    const theme = useSelector((state) => state.theme.theme)
    const [formData, setFormData] = useState({ id: null, TitleTR: "", TitleEN: "", TitleAR: "", UrlTR: "", UrlEN: "", UrlAR: "" })

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0'>
                <div><h5>Menü {formData.id ? "Güncelle" : "Ekle"}</h5></div>
                <div className='subtitle'><span className='text-s'>Menü elemanlarını ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={6}>
                        <InputElement
                            label={`Başlık - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faList} color='#c1beea' size='1x' />}
                            value={formData[`Title${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Title${lng}`]: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label={`URL - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faGlobeEurope} color='#c1beea' size='1x' />}
                            value={formData[`Url${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Url${lng}`]: e.target.value }))}
                        />
                    </Col>
                    <Col md={12} className='d-flex justify-content-end'>
                        <Button className={BButtonModel}>Kaydet - {lng}</Button>
                        <Button className={PButtonModel}>{formData.id ? "Güncelle" : "Ekle"}</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Upsert
