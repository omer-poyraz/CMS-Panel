export const fetchMenu = (url) => {
    if (url === "/") return "Dashboard"
    if (url === "/menu") return "Menü Yönetimi"
    if (url === "/file") return "Dosya Yönetimi"
    if (url === "/form") return "Form Yönetimi"
    if (url === "/orders") return "Sipariş Yönetimi"
    if (url === "/image") return "Resim Yönetimi"
    if (url === "/seo") return "Seo Yönetimi"
    if (url === "/product") return "Ürün Yönetimi"
    if (url === "/user") return "Kullanıcı Yönetimi"
    if (url === "/settings") return "Ayarlar"
}