import * as yup from "yup";

export const SeoSchema = yup.object({
    titleTR: yup.string().required("Bu alan zorunludur!"),
    descriptionTR: yup.string().required("Bu alan zorunludur!"),
    keywordsTR: yup.string().required("Bu alan zorunludur!"),
    authorTR: yup.string().required("Bu alan zorunludur!"),
}).required();