import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BButtonModel, CardHModel, CardModel, EndModel, PButtonModel } from '../../utilities/Models'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { Key, Lock, Mail, Phone, User, X } from 'react-feather'
import { fetchUserEdit } from '../../redux/slices/userEditSlice'
import { fetchUsers } from '../../redux/slices/usersSlice'

const Upsert = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const data = useSelector((state) => state.userId.data)
    const [formData, setFormData] = useState({ id: null, firstName: "", lastName: "", userName: "", email: "", phoneNumber: "", password: "" })

    const fillData = () => {
        if (data) setFormData({ id: data.userId, firstName: data.firstName, lastName: data.lastName, userName: data.userName, email: data.email, phoneNumber: data.phoneNumber })
    }

    const clearData = () => {
        setFormData({ id: null, firstName: "", lastName: "", userName: "", email: "", phoneNumber: "", password: "" })
    }

    const editUser = async () => {
        await dispatch(fetchUserEdit({ id: formData.id, firstName: formData.firstName, lastName: formData.lastName, userName: formData.userName, email: formData.email, phoneNumber: formData.phoneNumber, password: formData.password }))
        await dispatch(fetchUsers())
        clearData()
    }

    useEffect(() => { fillData() }, [data])

    return (
        <Card className={CardModel(theme)}>
            <CardHeader className={CardHModel}>
                <div><h5>Kullanıcı {formData.id ? "Güncelle" : "Ekle"}</h5></div>
                <div className='subtitle'><span className='text-s'>Kullanıcı ekleyebilir veya düzenleyebilirsiniz.</span></div>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={6}>
                        <InputElement
                            label="İsim"
                            icon={<User color='#c1beea' size={20} />}
                            value={formData.firstName}
                            onchange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Soyisim"
                            icon={<User color='#c1beea' size={20} />}
                            value={formData.lastName}
                            onchange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Kullanıcı Adı"
                            icon={<Key color='#c1beea' size={20} />}
                            value={formData.userName}
                            onchange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Telefon"
                            icon={<Phone color='#c1beea' size={20} />}
                            value={formData.phoneNumber}
                            onchange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                    </Col>
                    <Col md={6}>
                        <InputElement
                            label="Mail"
                            icon={<Mail color='#c1beea' size={20} />}
                            value={formData.email}
                            onchange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Col>
                    {!formData.id ? <Col md={6}>
                        <InputElement
                            label="Şifre"
                            icon={<Lock color='#c1beea' size={20} />}
                            value={formData.password}
                            onchange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Col> : null}
                    <Col md={12} className={EndModel}>
                        {formData.id ? <Button onClick={clearData} className={BButtonModel}><X /></Button> : null}
                        <Button onClick={editUser} className={PButtonModel}>{formData.id ? "Güncelle" : "Ekle"}</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Upsert
