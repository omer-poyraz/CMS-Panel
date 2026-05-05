import { Button as Button2, Popconfirm, Tooltip } from "antd";
import { Edit2, List, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLanguageDelete } from "../redux/slices/languageDeleteSlice";
import { fetchLanguageId } from "../redux/slices/languageIdSlice";
import { fetchLanguages } from "../redux/slices/languagesSlice";
import { fetchMenuDelete } from "../redux/slices/menuDeleteSlice";
import { fetchMenuGroupDelete } from "../redux/slices/menuGroupDeleteSlice";
import { fetchMenuGroupId } from "../redux/slices/menuGroupIdSlice";
import { fetchMenuId } from "../redux/slices/menuIdSlice";
import { fetchPageDelete } from "../redux/slices/pageDeleteSlice";
import { fetchPageId } from "../redux/slices/pageIdSlice";
import { fetchPages } from "../redux/slices/pagesSlice";
import { fetchUserDelete } from "../redux/slices/userDeleteSlice";
import { fetchUserId } from "../redux/slices/userIdSlice";
import { fetchUsers } from "../redux/slices/usersSlice";
import { UserDeleteService } from "../service";
import { randomColor } from "./General";

export const MenuColumns = (setUpsert, setIsUpdate) => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return [
        {
            title: <span className="text-s">ID</span>,
            key: "id",
            render: (e) => <span className="text-s">{e.id}</span>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "title",
            render: (e) => {
                const title = e.translations[0]?.title;
                return <span className="text-s">{typeof title === 'string' ? title : ''}</span>;
            },
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => { dispatch(fetchMenuId({ id: e.id, lang: lng })); setUpsert(true); setIsUpdate(true); }} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={() => dispatch(fetchMenuDelete({ id: e.id }))}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}

export const MenuGroupColumns = (setUpsert, setIsUpdate) => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return [
        {
            title: <span className="text-s">ID</span>,
            key: "id",
            render: (e) => <Link to={`/menu/${e.id}`}><span className="text-s">{e.id}</span></Link>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "title",
            render: (e) => {
                const title = e.translations[0]?.title;
                return <Link to={`/menu/${e.id}`} className="text-decoration-none"><span className="text-s">{typeof title === 'string' ? title : ''}</span></Link>;
            },
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => { dispatch(fetchMenuGroupId({ id: e.id, lang: lng })); setUpsert(true); setIsUpdate(true); }} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Tooltip title="Menüler">
                            <Button2 className='border-info bg-transparent text-info' icon={<List size={20} className='text-info' />} onClick={() => navigate(`/menu/${e.id}`)} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={() => dispatch(fetchMenuGroupDelete({ id: e.id }))}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}

export const PageColumns = () => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return [
        {
            title: <span className="text-s">ID</span>,
            key: "id",
            render: (e) => <span className="text-s">{e.id}</span>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "titleTR",
            render: (e) => <span className="text-s">{e[`title${lng}`]}</span>,
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2' key={`edit-${e.id}`}>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchPageId({ id: e.id }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2' key={`delete-${e.id}`}>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={async () => { await dispatch(fetchPageDelete({ id: e.id })); await dispatch(fetchPages()) }}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}

export const UserColumns = (setUpsert, setIsUpdate) => {
    const dispatch = useDispatch()

    return [
        {
            title: "",
            key: "userId",
            render: (e) => <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.firstName ? e.firstName[0] : ''}</div>,
            width: 50
        },
        {
            title: <span className="text-s">İsim Soyisim</span>,
            key: "firstName",
            render: (e) => <span className="text-s">{e.firstName} {e.lastName}</span>,
        },
        {
            title: <span className="text-s">E-Mail</span>,
            key: "email",
            render: (e) => <span className="text-s">{e.email}</span>,
        },
        {
            title: <span className="text-s">Telefon</span>,
            key: "phoneNumber",
            render: (e) => <span className="text-s">{e.phoneNumber}</span>,
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2' key={`edit-${e.userId}`}>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => { dispatch(fetchUserId({ id: e.userId })); setUpsert(true); setIsUpdate(true); }} />
                        </Tooltip>
                    </div>
                    <div className='ml-2' key={`delete-${e.userId}`}>
                        <Popconfirm
                            title="Bu kullanıcıyı istediğinizden emin misiniz?"
                            onConfirm={async () => { await dispatch(fetchUserDelete({ id: e.userId })); await dispatch(fetchUsers()) }}
                            okText="Evet"
                            cancelText="Hayır"
                            okButtonProps={{ className: 'primary border-0' }}
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}

export const OrderColumns = () => {
    const dispatch = useDispatch()

    return [
        {
            title: "",
            key: "orderID",
            render: (e) => <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.firstName ? e.firstName[0] : ''}</div>,
            width: 50
        },
        {
            title: <span className="text-s">ID</span>,
            key: "orderID",
            render: (e) => <span className="text-s">{e.orderID}</span>,
        },
        {
            title: <span className="text-s">Kod</span>,
            key: "email",
            render: (e) => <span className="text-s">{e.code}</span>,
        },
        {
            title: <span className="text-s">Müşteri</span>,
            key: "client",
            render: (e) => <span className="text-s">{e.client}</span>,
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2' key={`edit-${e.orderID}`}>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchUserId({ id: e.userId }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2' key={`delete-${e.orderID}`}>
                        <Popconfirm
                            title="Bu kullanıcıyı istediğinizden emin misiniz?"
                            onConfirm={async () => { await UserDeleteService(e.userId); await dispatch(fetchUsers()) }}
                            okText="Evet"
                            cancelText="Hayır"
                            okButtonProps={{ className: 'primary border-0' }}
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}

export const LanguageColumns = (setUpsert, setIsUpdate) => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return [
        {
            title: <span className="text-s">ID</span>,
            key: "id",
            render: (e) => <span className="text-s">{e.id}</span>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "title",
            render: (e) => {
                const title = e.translations[0]?.title;
                return <span className="text-s">{typeof title === 'string' ? title : ''}</span>;
            },
        },
        {
            title: <span className="text-s">Kod</span>,
            key: "code",
            render: (e) => {
                const code = e.translations[0]?.code;
                return <span className="text-s">{typeof code === 'string' ? code : ''}</span>;
            },
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => { dispatch(fetchLanguageId({ id: e.id, lang: lng })); setUpsert(true); setIsUpdate(true); }} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={async () => { await dispatch(fetchLanguageDelete({ id: e.id })); await dispatch(fetchLanguages({ lang: lng })) }}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 className="bg-transparent" icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}