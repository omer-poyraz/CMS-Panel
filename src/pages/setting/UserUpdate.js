import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { CardHModel, CardModel, EndModel, PButtonModel } from '../../utilities/Models'
import { useDispatch, useSelector } from 'react-redux'
import InputElement from '../../components/Input'
import { Key, Mail, Phone, User } from 'react-feather'
import { fetchUserUpdate } from '../../redux/slices/userUpdateSlice'
import { fetchUser } from '../../redux/slices/userSlice'
import { toast } from 'react-toastify'

const UserUpdate = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme)
    const user = useSelector((state) => state.user.data)
    const [formData, setFormData] = useState({ firstName: "", lastName: "", userName: "", email: "", phoneNumber: "" })

    const getData = () => {
        setFormData({ firstName: user.firstName, lastName: user.lastName, userName: user.userName, email: user.email, phoneNumber: user.phoneNumber })
    }

    const Update = async () => {
        var data = await dispatch(fetchUserUpdate({ firstName: formData.firstName, lastName: formData.lastName, userName: formData.userName, email: formData.email, phoneNumber: formData.phoneNumber }))
        if (data.payload) {
            toast.success("Başarıyla Güncellendi.")
            dispatch(fetchUser())
        } else {
            toast.error("Bir sorunla karşılaşıldı!")
        }
    }

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (user)
            getData();
    }, [user]);

    return (
        user ? <Card className={CardModel(theme)}>
            <CardHeader className={CardHModel} tag="h4">Hesabı Düzenle</CardHeader>
            <CardBody>
                <InputElement
                    label="İsim"
                    icon={<User color='#ccc' size={20} />}
                    value={formData.firstName}
                    onchange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
                <InputElement
                    label="Soyisim"
                    icon={<User color='#ccc' size={20} />}
                    value={formData.lastName}
                    onchange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
                <InputElement
                    label="Kullanıcı Adı"
                    icon={<Key color='#ccc' size={20} />}
                    value={formData.userName}
                    onchange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                />
                <InputElement
                    label="Telefon"
                    icon={<Phone color='#ccc' size={20} />}
                    value={formData.phoneNumber}
                    onchange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
                <InputElement
                    label="Mail"
                    icon={<Mail color='#ccc' size={20} />}
                    value={formData.email}
                    onchange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                <div className={EndModel}>
                    <Button className={PButtonModel} onClick={Update}>Güncelle</Button>
                </div>
            </CardBody>
        </Card> : null
    )
}

export default UserUpdate
