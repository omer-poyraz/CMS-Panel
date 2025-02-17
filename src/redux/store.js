import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import openMenuSlice from "./slices/openMenuSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";
import userSlice from "./slices/userSlice";
import userIdSlice from "./slices/userIdSlice";
import usersSlice from "./slices/usersSlice";
import userUpdateSlice from "./slices/userUpdateSlice";
import userEditSlice from "./slices/userEditSlice";
import userDeleteSlice from "./slices/userDeleteSlice";
import headersSlice from "./slices/headersSlice";
import headerIdSlice from "./slices/headerIdSlice";
import headerDeleteSlice from "./slices/headerDeleteSlice";
import seosSlice from "./slices/seosSlice";
import seoIdSlice from "./slices/seoIdSlice";
import seoAddSlice from "./slices/seoAddSlice";
import seoUpdateSlice from "./slices/seoUpdateSlice";
import seoDeleteSlice from "./slices/seoDeleteSlice";

export const Store = configureStore({
    reducer: {
        login: loginSlice,
        openMenu: openMenuSlice,
        theme: themeSlice,
        lang: langSlice,
        user: userSlice,
        userId: userIdSlice,
        users: usersSlice,
        userUpdate: userUpdateSlice,
        userEdit: userEditSlice,
        userDelete: userDeleteSlice,
        headers: headersSlice,
        headerId: headerIdSlice,
        headerDelete: headerDeleteSlice,
        seos: seosSlice,
        seoId: seoIdSlice,
        seoAdd: seoAddSlice,
        seoUpdate: seoUpdateSlice,
        seoDelete: seoDeleteSlice,
    }
});