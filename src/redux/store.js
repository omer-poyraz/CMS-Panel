import { configureStore } from "@reduxjs/toolkit";
import editorReducer from './slices/editorSlice';
import fullscreenReducer from './slices/fullscreenSlice';
import langSlice from "./slices/langSlice";
import loginSlice from "./slices/loginSlice";
import menuCreateSlice from "./slices/menuCreateSlice";
import menuDeleteSlice from "./slices/menuDeleteSlice";
import menuGroupCreateSlice from "./slices/menuGroupCreateSlice";
import menuGroupDeleteSlice from "./slices/menuGroupDeleteSlice";
import menuGroupIdSlice from "./slices/menuGroupIdSlice";
import menuGroupsSlice from "./slices/menuGroupsSlice";
import menuGroupUpdateSlice from "./slices/menuGroupUpdateSlice";
import menuIdSlice from "./slices/menuIdSlice";
import menusByGroupSlice from "./slices/menusByGroupSlice";
import menusSlice from "./slices/menusSlice";
import menuUpdateSlice from "./slices/menuUpdateSlice";
import openMenuSlice from "./slices/openMenuSlice";
import pageCreateSlice from "./slices/pageCreateSlice";
import pageDeleteSlice from "./slices/pageDeleteSlice";
import pageIdSlice from "./slices/pageIdSlice";
import pageSlugSlice from "./slices/pageSlugSlice";
import pagesSlice from "./slices/pagesSlice";
import pageUpdateSlice from "./slices/pageUpdateSlice";
import previewReducer from './slices/previewSlice';
import themeSlice from "./slices/themeSlice";
import userDeleteSlice from "./slices/userDeleteSlice";
import userEditSlice from "./slices/userEditSlice";
import userIdSlice from "./slices/userIdSlice";
import userSlice from "./slices/userSlice";
import usersSlice from "./slices/usersSlice";
import userUpdateSlice from "./slices/userUpdateSlice";

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
        menus: menusSlice,
        menusByGroup: menusByGroupSlice,
        menuId: menuIdSlice,
        menuDelete: menuDeleteSlice,
        menuCreate: menuCreateSlice,
        menuUpdate: menuUpdateSlice,
        menuGroups: menuGroupsSlice,
        menuGroupId: menuGroupIdSlice,
        menuGroupDelete: menuGroupDeleteSlice,
        menuGroupCreate: menuGroupCreateSlice,
        menuGroupUpdate: menuGroupUpdateSlice,
        pages: pagesSlice,
        pageId: pageIdSlice,
        pageSlug: pageSlugSlice,
        pageCreate: pageCreateSlice,
        pageUpdate: pageUpdateSlice,
        pageDelete: pageDeleteSlice,
        fullscreen: fullscreenReducer,
        preview: previewReducer,
        editor: editorReducer,
    }
});