import { Popconfirm, Tooltip, Button as Button2 } from "antd";
import { randomColor } from "./General";
import { Edit2, Trash2 } from "react-feather";
import { UserDeleteService } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserId } from "../redux/slices/userIdSlice";
import { fetchSeoId } from "../redux/slices/seoIdSlice";
import { fetchSeoDelete } from "../redux/slices/seoDeleteSlice";
import { fetchSeos } from "../redux/slices/seosSlice";
import { fetchHeaderId } from "../redux/slices/headerIdSlice";
import { fetchHeaderDelete } from "../redux/slices/headerDeleteSlice";
import { fetchUserDelete } from "../redux/slices/userDeleteSlice";
import { fetchUsers } from "../redux/slices/usersSlice";

export const MenuColumns = () => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return [
        {
            title: "",
            key: "headerID",
            render: (e) => e.fileFullPath ? <div><img src={e.fileFullPath} alt='' style={{ height: 36, width: 36, borderRadius: 18 }} /></div> : <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.title[0]}</div>,
            width: 50
        },
        {
            title: <span className="text-s">ID</span>,
            key: "headerID",
            render: (e) => <span className="text-s">e.headerID</span>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "titleTR",
            render: (e) => <span className="text-s">e[`title${lng}`]</span>,
        },
        {
            title: <span className="text-s">URL</span>,
            key: "urlTR",
            render: (e) => <span className="text-s">e[`title${lng}`]</span>,
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchHeaderId(e.headerID))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={() => dispatch(fetchHeaderDelete(e.headerID))}
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


export const SeoColumns = () => {
    const lng = useSelector((state) => state.lang.lang)
    const dispatch = useDispatch()

    return [
        {
            title: <span className="text-s">ID</span>,
            key: "seoID",
            render: (e) => <span className="text-s">{e.seoID}</span>,
            width: 50
        },
        {
            title: <span className="text-s">Başlık</span>,
            key: "titleTR",
            render: (e) => <span className="text-s">{e[`title${lng}`]}</span>,
        },
        {
            title: <span className="text-s">Anahtar Kelimeler</span>,
            key: "keywordsTR",
            render: (e) => <span className="text-s">{e[`keywords${lng}`]}</span>,
        },
        {
            title: <span className="text-s">İşlemler</span>,
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchSeoId({ id: e.seoID }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={async () => { await dispatch(fetchSeoDelete({ id: e.seoID })); await dispatch(fetchSeos()) }}
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

export const UserColumns = () => {
    const dispatch = useDispatch()

    return [
        {
            title: "",
            key: "userId",
            render: (e) => <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.firstName[0]}</div>,
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
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchUserId({ id: e.userId }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu kullanıcıyı istediğinizden emin misiniz?"
                            onConfirm={() => { dispatch(fetchUserDelete({ id: e.userId })); dispatch(fetchUsers()) }}
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
            render: (e) => <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.firstName[0]}</div>,
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
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning bg-transparent text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchUserId({ id: e.userId }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu kullanıcıyı istediğinizden emin misiniz?"
                            onConfirm={() => UserDeleteService(e.userId)}
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