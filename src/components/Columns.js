import { Popconfirm, Tooltip, Button as Button2 } from "antd";
import { randomColor } from "./General";
import { Edit2, Trash2 } from "react-feather";
import { HeaderDeleteService, HeaderGetService, SeoGetService, SeoDeleteService, UserGetService, UserDeleteService } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserId } from "../redux/slices/userIdSlice";

export const MenuColumns = () => {
    const lng = useSelector((state) => state.lang.lang)

    return [
        {
            title: "",
            key: "headerID",
            render: (e) => e.fileFullPath ? <div><img src={e.fileFullPath} alt='' style={{ height: 36, width: 36, borderRadius: 18 }} /></div> : <div className='table-logo shadow' style={{ backgroundColor: randomColor() }}>{e.title[0]}</div>,
            width: 50
        },
        {
            title: "ID",
            key: "headerID",
            render: (e) => e.headerID,
            width: 50
        },
        {
            title: "Başlık",
            key: "titleTR",
            render: (e) => e[`title${lng}`],
        },
        {
            title: "URL",
            key: "urlTR",
            render: (e) => e[`title${lng}`],
        },
        {
            title: "İşlemler",
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => HeaderGetService(e.headerID)} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={() => HeaderDeleteService(e.headerID)}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 icon={<Trash2 size={20} className='text-danger' />} danger />
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

    return [
        {
            title: "ID",
            key: "seoID",
            render: (e) => e.seoID,
            width: 50
        },
        {
            title: "Başlık",
            key: "titleTR",
            render: (e) => e[`title${lng}`],
        },
        {
            title: "Anahtar Kelimeler",
            key: "keywordsTR",
            render: (e) => e[`keywords${lng}`],
        },
        {
            title: "İşlemler",
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => SeoGetService(e.seoID)} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu içeriği istediğinizden emin misiniz?"
                            onConfirm={() => SeoDeleteService(e.seoID)}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 icon={<Trash2 size={20} className='text-danger' />} danger />
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
            title: "İsim Soyisim",
            key: "firstName",
            render: (e) => `${e.firstName} ${e.lastName}`,
        },
        {
            title: "E-Mail",
            key: "email",
            render: (e) => e.email,
        },
        {
            title: "Telefon",
            key: "phoneNumber",
            render: (e) => e.phoneNumber,
        },
        {
            title: "İşlemler",
            render: (e) => (
                <div className='d-flex justify-content-start'>
                    <div className='ml-2'>
                        <Tooltip title="Düzenle">
                            <Button2 className='border-warning text-warning' icon={<Edit2 size={20} className='text-warning' />} onClick={() => dispatch(fetchUserId({ id: e.userId }))} />
                        </Tooltip>
                    </div>
                    <div className='ml-2'>
                        <Popconfirm
                            title="Bu kullanıcıyı istediğinizden emin misiniz?"
                            onConfirm={() => UserDeleteService(e.userId)}
                            okText="Evet"
                            cancelText="Hayır"
                        >
                            <Tooltip title="Sil">
                                <Button2 icon={<Trash2 size={20} className='text-danger' />} danger />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                </div>
            )
        }
    ]
}