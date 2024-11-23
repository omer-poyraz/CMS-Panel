import { faList, faSearchPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { BButtonModel, CardModel, PButtonModel } from '../../utilities/Models'

const Upsert = () => {
    const lng = useSelector((state) => state.lang.lang)
    const theme = useSelector((state) => state.theme.theme)
    const [formData, setFormData] = useState({ id: null, TitleTR: '', TitleEN: '', TitleAR: '', DescriptionTR: '', DescriptionEN: '', DescriptionAR: '', KeywordsTR: '', KeywordsEN: '', KeywordsAR: '', AuthorTR: '', AuthorEN: '', AuthorAR: '' })

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className='bg-transparent border-0'>
                <div><h3>Seo {formData.id ? 'Güncelle' : 'Ekle'}</h3></div>
                <div><span className='text-s'>Sayfalarınız için seo ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={6} className='mb-3'>
                        <InputElement
                            label={`Başlık - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faList} color='#ccc' size='1x' />}
                            value={formData[`Title${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Title${lng}`]: e.target.value }))}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <InputElement
                            label={`Açıklama - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faList} color='#ccc' size='1x' />}
                            value={formData[`Description${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Description${lng}`]: e.target.value }))}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <InputElement
                            label={`Anahtar Kelimeler - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faSearchPlus} color='#ccc' size='1x' />}
                            value={formData[`Keywords${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Keywords${lng}`]: e.target.value }))}
                        />
                    </Col>
                    <Col md={6} className='mb-3'>
                        <InputElement
                            label={`Yazar - ${lng}`}
                            type="text"
                            icon={<FontAwesomeIcon icon={faUser} color='#ccc' size='1x' />}
                            value={formData[`Author${lng}`]}
                            onchange={(e) => setFormData(prev => ({ ...prev, [`Author${lng}`]: e.target.value }))}
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
