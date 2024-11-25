import * as yup from "yup";

export const SeoSchema = yup.object({
    titleTR: yup.string().required("Bu alan zorunludur!"),
    descriptionTR: yup.string().required("Bu alan zorunludur!"),
    keywordsTR: yup.string().required("Bu alan zorunludur!"),
    authorTR: yup.string().required("Bu alan zorunludur!"),
}).required();

export const AuthSchema = yup.object({
    username: yup.string().required("Bu alan zorunludur!"),
    password: yup.string().required("Bu alan zorunludur!"),
}).required();

export const MenuSchema = yup.object({
    file: yup.string().notRequired(),
    TitleTR: yup.string().required("Bu alan zorunludur!"),
    LongTitleTR: yup.string().required("Bu alan zorunludur!"),
    UrlTR: yup.string().required("Bu alan zorunludur!"),
    ParentHeaderID: yup.string().notRequired(),
});

export const UserSchema = yup.object({
    firstName: yup.string().required("Bu alan zorunludur!"),
    lastName: yup.string().required("Bu alan zorunludur!"),
    userName: yup.string().required("Bu alan zorunludur!"),
    email: yup.string().required("Bu alan zorunludur!"),
    phoneNumber: yup.string().required("Bu alan zorunludur!"),
    password: yup.string().notRequired(),
}).required();