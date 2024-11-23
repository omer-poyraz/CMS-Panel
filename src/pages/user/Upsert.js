import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CardHModel, CardModel, EndModel, PButtonModel } from '../../utilities/Models'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { Key, Lock, Mail, Phone, User } from 'react-feather'

const Upsert = () => {
    const theme = useSelector((state) => state.theme.theme)
    const [formData, setFormData] = useState({ id: null, firstName: "", lastName: "", userName: "", email: "", phoneNumber: "", password: "" })

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className={CardHModel}>
                <div><h4>Kullanıcı {formData.id ? "Güncelle" : "Ekle"}</h4></div>
                <div className=''><span className='text-s'>Kullanıcı ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={6}>
                        <InputElement
                            label="İsim"
                            icon={<User color='#ccc' size={20} />}
                            value={formData.firstName}
                            onchange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Soyisim"
                            icon={<User color='#ccc' size={20} />}
                            value={formData.lastName}
                            onchange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Kullanıcı Adı"
                            icon={<Key color='#ccc' size={20} />}
                            value={formData.userName}
                            onchange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Telefon"
                            icon={<Phone color='#ccc' size={20} />}
                            value={formData.phoneNumber}
                            onchange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Mail"
                            icon={<Mail color='#ccc' size={20} />}
                            value={formData.email}
                            onchange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Şifre"
                            icon={<Lock color='#ccc' size={20} />}
                            value={formData.password}
                            onchange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Col>
                    <Col md={12} className={EndModel}>
                        <Button className={PButtonModel}>{formData.id ? "Güncelle" : "Ekle"}</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Upsert
