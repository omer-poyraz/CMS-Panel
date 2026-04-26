import axios from "axios";
import { toast } from "react-toastify";
import { LOGINURL, MENUCREATEURL, MENUDELETEURL, MENUGETALLBYGROUPURL, MENUGETALLURL, MENUGETURL, MENUGROUPCREATEURL, MENUGROUPDELETEURL, MENUGROUPGETALLURL, MENUGROUPGETURL, MENUGROUPUPDATEURL, MENUSORTURL, MENUUPDATEURL, PAGECREATEURL, PAGEDELETEURL, PAGEGETALLURL, PAGEGETSLUGURL, PAGEGETURL, PAGEUPDATEURL, REGISTERURL, USERDELETEURL, USERGETALLURL, USERGETURL, USERUPDATEURL } from "../api";

const token = localStorage.getItem("auth") !== undefined && localStorage.getItem("auth") !== null ? JSON.parse(localStorage.getItem("auth")).accessToken : null
const header = { headers: { "Authorization": `Bearer ${token}` } }


// AUTHENTICATION
export async function LoginService(username, password) {
    const data = {
        "username": username,
        "password": password
    }
    return await axios.post(LOGINURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Lütfen bilgilerinizi kontrol ediniz!"))
}

export async function RegisterService(data) {
    return await axios.post(REGISTERURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error("Kayıt sırasında bir sorun oluştu!"))
}
// AUTHENTICATION END


// MENU GROUP
export async function MenuGroupGetAllService(lang) {
    return await axios.get(`${MENUGROUPGETALLURL}?lang=${lang}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGroupGetService(id, lang) {
    return await axios.get(`${MENUGROUPGETURL}/${id}?lang=${lang}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGroupCreateService(data) {
    return await axios.post(MENUGROUPCREATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGroupUpdateService(data) {
    return await axios.put(MENUGROUPUPDATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGroupDeleteService(id) {
    return await axios.delete(`${MENUGROUPDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// MENU GROUP END


// MENU 
export async function MenuGetAllService(lang) {
    return await axios.get(`${MENUGETALLURL}?lang=${lang}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGetAllByGroupService(id, lang) {
    return await axios.get(`${MENUGETALLBYGROUPURL}/${id}?lang=${lang}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuGetService(id, lang) {
    return await axios.get(`${MENUGETURL}/${id}?lang=${lang}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuCreateService(data) {
    return await axios.post(MENUCREATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuUpdateService(data) {
    return await axios.put(MENUUPDATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuSortService(id, sort) {
    return await axios.put(`${MENUSORTURL}/${id}/${sort}`, {}, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function MenuDeleteService(id) {
    return await axios.delete(`${MENUDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// MENU END


// PAGE
export async function PageGetAllService() {
    return await axios.get(PAGEGETALLURL, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function PageGetService(id) {
    return await axios.get(`${PAGEGETURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function PageGetSlugService(slug) {
    return await axios.get(`${PAGEGETSLUGURL}/${slug}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function PageCreateService(data) {
    return await axios.post(PAGECREATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function PageUpdateService(data) {
    return await axios.put(PAGEUPDATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function PageDeleteService(id) {
    return await axios.delete(`${PAGEDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// PAGE END


// USER
export async function UserGetAllService(pageNumber, pageSize) {
    return await axios.get(`${USERGETALLURL}?PageNumber=${pageNumber}&PageSize=${pageSize}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserGetService(id) {
    return await axios.get(`${USERGETURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserUpdateService(data) {
    return await axios.put(USERUPDATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserDeleteService(id) {
    return await axios.delete(`${USERDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// USER END