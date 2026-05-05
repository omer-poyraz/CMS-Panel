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
    menuGroupID: yup.number().required("Menü grubu zorunlu!"),
    parentMenuID: yup.number().nullable(),
    translations: yup.array().of(
        yup.object({
            id: yup.number().nullable(),
            lang: yup.string().required("Dil zorunlu!"),
            title: yup.string().required("Başlık zorunlu!"),
            slug: yup.string().required("Slug zorunlu!"),
            active: yup.boolean().required()
        })
    ).min(1, "En az bir çeviri gerekli!"),
    sort: yup.number().nullable(),
    activeLangTitle: yup.string().notRequired(),
    activeLangSlug: yup.string().notRequired(),
    activeLangActive: yup.boolean().notRequired()
});

export const MenuGroupSchema = yup.object({
    translations: yup.array().of(
        yup.object({
            id: yup.number().nullable(),
            lang: yup.string().required("Dil zorunlu!"),
            title: yup.string().required("Başlık zorunlu!"),
        })
    ).min(1, "En az bir çeviri gerekli!"),
    activeLangTitle: yup.string().notRequired()
});

export const LanguageSchema = yup.object({
    translations: yup.array().of(
        yup.object({
            id: yup.number().nullable(),
            title: yup.string().required("Başlık zorunlu!"),
            code: yup.string().required("Kod zorunlu!"),
            lang: yup.string().required("Dil zorunlu!"),
        })
    ).min(1, "En az bir çeviri gerekli!"),
    activeLangTitle: yup.string().notRequired(),
    activeLangCode: yup.string().notRequired()
});

export const UserSchema = yup.object({
    firstName: yup.string().required("Bu alan zorunludur!"),
    lastName: yup.string().required("Bu alan zorunludur!"),
    email: yup.string().required("Bu alan zorunludur!"),
    phoneNumber: yup.string().required("Bu alan zorunludur!"),
    password: yup.string().required("Bu alan zorunludur!"),
}).required();