import axios from "axios";
import { HEADERDELETEURL, HEADERGETALLURL, HEADERGETURL, LOGINURL, SEOCREATEURL, SEODELETEURL, SEOGETALLURL, SEOGETURL, SEOUPDATEURL, USERCREATEURL, USERDELETEURL, USERGETALLURL, USERGETURL, USERUPDATEURL } from "../api";
import { toast } from "react-toastify";

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
// AUTHENTICATION END


// HEADER
export async function HeaderGetAllService() {
    return await axios.get(HEADERGETALLURL)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function HeaderGetService(id) {
    return await axios.get(`${HEADERGETURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function HeaderDeleteService(id) {
    return await axios.delete(`${HEADERDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// HEADER END


// SEO
export async function SeoGetAllService() {
    return await axios.get(SEOGETALLURL)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function SeoGetService(id) {
    return await axios.get(`${SEOGETURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function SeoCreateService(data) {
    return await axios.post(SEOCREATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function SeoUpdateService(data) {
    return await axios.put(SEOUPDATEURL, data, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function SeoDeleteService(id) {
    return await axios.delete(`${SEODELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// SEO END


// USER
export async function UserGetAllService(pageNumber, pageSize) {
    return await axios.get(`${USERGETALLURL}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserGetService(id) {
    return await axios.get(`${USERGETURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserCreateService(firstName, lastName, userName, email, phoneNumber, password, roles) {
    return await axios.post(USERCREATEURL, { "firstName": firstName, "lastName": lastName, "userName": userName, "email": email, "phoneNumber": phoneNumber, "password": password, "roles": roles })
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserUpdateService(id, firstName, lastName, userName, email, phoneNumber) {
    return await axios.put(`${USERUPDATEURL}/${id}`, { "firstName": firstName, "lastName": lastName, "userName": userName, "email": email, "phoneNumber": phoneNumber, "userId": id }, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}

export async function UserDeleteService(id) {
    return await axios.delete(`${USERDELETEURL}/${id}`, header)
        .then(res => res.data)
        .catch(er => toast.error(er))
}
// USER END