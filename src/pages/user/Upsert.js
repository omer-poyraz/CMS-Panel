import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Form, Row } from 'reactstrap'
import InputElement from '../../components/Input'
import { fetchRegister } from '../../redux/slices/registerSlice'
import { clearUserId } from '../../redux/slices/userIdSlice'
import { fetchUsers } from '../../redux/slices/usersSlice'
import { fetchUserUpdate } from '../../redux/slices/userUpdateSlice'
import { CardModel, PButtonModel } from '../../utilities/Models'
import { UserSchema } from '../../utilities/Schemas'

const Upsert = ({ setModal, isUpdate }) => {
    const dispatch = useDispatch()
    const [isSave, setIsSave] = useState(false)
    const [users, setUsers] = useState({})
    const { handleSubmit, reset, formState: { errors }, control, setValue, watch } = useForm({
        resolver: yupResolver(UserSchema),
        defaultValues: { userId: null, firstName: "", lastName: "", email: "", phoneNumber: "", password: "" }
    })
    const [formData, setFormData] = useState({})
    const theme = useSelector((state) => state.theme.theme)
    const data = useSelector((state) => state.users.data)
    const user = useSelector((state) => state.userId.data)

    const onSubmit = async (form) => {
        try {
            const payload = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                password: form.password
            }

            let res

            if (user?.id) {
                payload.id = user.id
                res = await dispatch(fetchUserUpdate({ data: payload }))
            } else {
                res = await dispatch(fetchRegister({ data: payload }))
            }

            if (res?.payload?.id) {
                dispatch(fetchUsers())
            }
            setModal(false)
        } catch (error) {
            toast.error("Hata: " + error)
        }
    }

    useEffect(() => {
        if (!isUpdate) {
            const clear = async () => {
                await dispatch(clearUserId());
                reset({ userId: null, firstName: "", lastName: "", email: "", phoneNumber: "", password: "" });
            }
            clear();
        }
    }, [isUpdate]);

    useEffect(() => {
        if (user?.userId) {
            setValue("userId", user.userId)
            setValue("firstName", user.firstName)
            setValue("lastName", user.lastName)
            setValue("email", user.email)
            setValue("phoneNumber", user.phoneNumber)
        }
    }, [user])

    return (
        <Card className={CardModel(theme)}>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={12}>
                            <InputElement
                                id="firstName"
                                type="text"
                                control={control}
                                errors={errors.firstName?.message}
                                label={`İsim`}
                                icon={<FontAwesomeIcon icon={faUser} color='#c1beea' size='1x' />}
                                value={watch("firstName")}
                                onChangeExtra={(value) => {
                                    setValue("firstName", value)
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <InputElement
                                id="lastName"
                                type="text"
                                control={control}
                                errors={errors.lastName?.message}
                                label={`Soyisim`}
                                icon={<FontAwesomeIcon icon={faUser} color='#c1beea' size='1x' />}
                                value={watch("lastName")}
                                onChangeExtra={(value) => {
                                    setValue("lastName", value)
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <InputElement
                                id="email"
                                type="email"
                                control={control}
                                errors={errors.email?.message}
                                label={`E-Mail`}
                                icon={<FontAwesomeIcon icon={faEnvelope} color='#c1beea' size='1x' />}
                                value={watch("email")}
                                onChangeExtra={(value) => {
                                    setValue("email", value)
                                }}
                            />
                        </Col>
                        <Col md={12}>
                            <InputElement
                                id="phoneNumber"
                                type="text"
                                control={control}
                                errors={errors.phoneNumber?.message}
                                label={`Telefon`}
                                icon={<FontAwesomeIcon icon={faPhone} color='#c1beea' size='1x' />}
                                value={watch("phoneNumber")}
                                onChangeExtra={(value) => {
                                    setValue("phoneNumber", value)
                                }}
                            />
                        </Col>
                        <Col md={12} className='d-flex justify-content-end'>
                            <Button className={PButtonModel} type='submit'>{user ? "Güncelle" : "Ekle"}</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Upsert
