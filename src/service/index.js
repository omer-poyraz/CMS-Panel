import axios from "axios";
import { toast } from "react-toastify";
import { FILECREATEURL, LANGUAGECREATEURL, LANGUAGEDELETEURL, LANGUAGEGETALLURL, LANGUAGEGETURL, LANGUAGEUPDATEURL, LOGINURL, MENUCREATEURL, MENUDELETEURL, MENUGETALLBYGROUPURL, MENUGETALLURL, MENUGETURL, MENUGROUPCREATEURL, MENUGROUPDELETEURL, MENUGROUPGETALLURL, MENUGROUPGETURL, MENUGROUPUPDATEURL, MENUSORTURL, MENUUPDATEURL, PAGECREATEURL, PAGEDELETEURL, PAGEGETALLURL, PAGEGETSLUGURL, PAGEGETURL, PAGEUPDATEURL, REFRESHTOKENURL, REGISTERURL, SETTINGSGETURL, SETTINGSUPDATEURL, USERDELETEURL, USERGETALLURL, USERGETURL, USERUPDATEURL } from "../api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


// refresh işlemleri için ayrı bir axios instance
const refreshAxios = axios.create();

// refreshAxios ile yapılan isteklerde de 401 alınırsa login'e yönlendir
refreshAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem("auth");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (originalRequest.url?.includes("refresh")) {
                sessionStorage.removeItem("auth");
                window.location.href = "/login";
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            let auth = JSON.parse(sessionStorage.getItem("auth") || "null");

            if (!auth?.accessToken || !auth?.refreshToken) {
                sessionStorage.removeItem("auth");
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await RefreshTokenService(auth.accessToken, auth.refreshToken);

                auth.accessToken = res.accessToken;
                auth.refreshToken = res.refreshToken;
                sessionStorage.setItem("auth", JSON.stringify(auth));

                // Tüm axios instance'larının Authorization header'ını güncelle
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.accessToken;
                refreshAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.accessToken;

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = 'Bearer ' + res.accessToken;
                processQueue(null, res.accessToken);
                return axios(originalRequest);

            } catch (err) {
                processQueue(err, null);

                sessionStorage.removeItem("auth");
                window.location.href = "/login";

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response?.status === 403) {
            toast.error("Yetkiniz yok");
        } else if (!error.response) {
            toast.error("Sunucuya ulaşılamadı");
        }

        return Promise.reject(error);
    }
);

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
    return await axios.post(REGISTERURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Kayıt sırasında bir sorun oluştu!"))
}

export async function RefreshTokenService(accessToken, refreshToken) {
    const data = {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
    return await refreshAxios.post(REFRESHTOKENURL, data)
        .then(res => res.data)
        .catch(er => {
            toast.error("Oturum yenileme başarısız!");
            throw er;
        });
}
// AUTHENTICATION END


// FILE
export async function FileCreateService(file) {
    const formData = new FormData()
    formData.append('file', file)

    return await axios.post(FILECREATEURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => res.data)
        .catch(er => {
            toast.error('Dosya yuklenirken bir sorun olustu!')
            throw er
        })
}
// FILE END


// LANGUAGE
export async function LanguageGetAllService(lang) {
    return await axios.get(`${LANGUAGEGETALLURL}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Diller listelenirken bir sorun oluştu!"))
}

export async function LanguageGetService(id, lang) {
    return await axios.get(`${LANGUAGEGETURL}/${id}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Dil getirilirken bir sorun oluştu!"))
}

export async function LanguageCreateService(data) {
    return await axios.post(LANGUAGECREATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Dil oluşturulurken bir sorun oluştu!"))
}

export async function LanguageUpdateService(data) {
    return await axios.put(LANGUAGEUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Dil güncellenirken bir sorun oluştu!"))
}

export async function LanguageDeleteService(id) {
    return await axios.delete(`${LANGUAGEDELETEURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Dil silinirken bir sorun oluştu!"))
}
// LANGUAGE END


// MENU GROUP
export async function MenuGroupGetAllService(lang) {
    return await axios.get(`${MENUGROUPGETALLURL}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Menü Grupları listelenirken bir sorun oluştu!"))
}

export async function MenuGroupGetService(id, lang) {
    return await axios.get(`${MENUGROUPGETURL}/${id}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Menü Grubu getirilirken bir sorun oluştu!"))
}

export async function MenuGroupCreateService(data) {
    return await axios.post(MENUGROUPCREATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Menü Grubu oluşturulurken bir sorun oluştu!"))
}

export async function MenuGroupUpdateService(data) {
    return await axios.put(MENUGROUPUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Menü Grubu güncellenirken bir sorun oluştu!"))
}

export async function MenuGroupDeleteService(id) {
    return await axios.delete(`${MENUGROUPDELETEURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Menü Grubu silinirken bir sorun oluştu!"))
}
// MENU GROUP END


// MENU 
export async function MenuGetAllService(lang) {
    return await axios.get(`${MENUGETALLURL}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Menüler listelenirken bir sorun oluştu!"))
}

export async function MenuGetAllByGroupService(id, lang) {
    return await axios.get(`${MENUGETALLBYGROUPURL}/${id}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Menüler gruba göre listelenirken bir sorun oluştu!"))
}

export async function MenuGetService(id, lang) {
    return await axios.get(`${MENUGETURL}/${id}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Menü getirilirken bir sorun oluştu!"))
}

export async function MenuCreateService(data) {
    return await axios.post(MENUCREATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Menü oluşturulurken bir sorun oluştu!"))
}

export async function MenuUpdateService(data) {
    return await axios.put(MENUUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Menü güncellenirken bir sorun oluştu!"))
}

export async function MenuSortService(id, sort) {
    return await axios.put(`${MENUSORTURL}/${id}/${sort}`, {})
        .then(res => res.data)
        .catch(er => toast.error("Menü sıralanırken bir sorun oluştu!"))
}

export async function MenuDeleteService(id) {
    return await axios.delete(`${MENUDELETEURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Menü silinirken bir sorun oluştu!"))
}
// MENU END


// PAGE
export async function PageGetAllService() {
    return await axios.get(PAGEGETALLURL)
        .then(res => res.data)
        .catch(er => toast.error("Sayfalar listelenirken bir sorun oluştu!"))
}

export async function PageGetService(id) {
    return await axios.get(`${PAGEGETURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Sayfa getirilirken bir sorun oluştu!"))
}

export async function PageGetSlugService(slug) {
    return await axios.get(`${PAGEGETSLUGURL}/${slug}`)
        .then(res => res.data)
        .catch(er => toast.error("Sayfa slug ile getirilirken bir sorun oluştu!"))
}

export async function PageCreateService(data) {
    return await axios.post(PAGECREATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Sayfa oluşturulurken bir sorun oluştu!"))
}

export async function PageUpdateService(data) {
    return await axios.put(PAGEUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Sayfa güncellenirken bir sorun oluştu!"))
}

export async function PageDeleteService(id) {
    return await axios.delete(`${PAGEDELETEURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Sayfa silinirken bir sorun oluştu!"))
}
// PAGE END


// SETTINGS
export async function SettingsGetService(lang) {
    return await axios.get(`${SETTINGSGETURL}?lang=${lang}`)
        .then(res => res.data)
        .catch(er => toast.error("Ayarlar getirilirken bir sorun oluştu!"))
}

export async function SettingsUpdateService(data) {
    return await axios.put(SETTINGSUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Ayarlar güncellenirken bir sorun oluştu!"))
}
// SETTINGS END


// USER
export async function UserGetAllService(pageNumber, pageSize) {
    return await axios.get(`${USERGETALLURL}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(res => res.data)
        .catch(er => toast.error("Kullanıcılar listelenirken bir sorun oluştu!"))
}

export async function UserGetService(id) {
    return await axios.get(`${USERGETURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Kullanıcı getirilirken bir sorun oluştu!"))
}

export async function UserUpdateService(data) {
    return await axios.put(USERUPDATEURL, data)
        .then(res => res.data)
        .catch(er => toast.error("Kullanıcı güncellenirken bir sorun oluştu!"))
}

export async function UserDeleteService(id) {
    return await axios.delete(`${USERDELETEURL}/${id}`)
        .then(res => res.data)
        .catch(er => toast.error("Kullanıcı silinirken bir sorun oluştu!"))
}
// USER END