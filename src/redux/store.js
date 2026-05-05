import { configureStore } from "@reduxjs/toolkit";
import editorReducer from './slices/editorSlice';
import fullscreenReducer from './slices/fullscreenSlice';
import langSlice from "./slices/langSlice";
import languageCreateSlice from "./slices/languageCreateSlice";
import languageDeleteSlice from "./slices/languageDeleteSlice";
import languageIdSlice from "./slices/languageIdSlice";
import languagesSlice from "./slices/languagesSlice";
import languageUpdateSlice from "./slices/languageUpdateSlice";
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
import settingsSlice from "./slices/settingsSlice";
import settingsUpdateSlice from "./slices/settingsUpdateSlice";
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
        languages: languagesSlice,
        languageCreate: languageCreateSlice,
        languageId: languageIdSlice,
        languageUpdate: languageUpdateSlice,
        languageDelete: languageDeleteSlice,
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
        settings: settingsSlice,
        settingsUpdate: settingsUpdateSlice,
        fullscreen: fullscreenReducer,
        preview: previewReducer,
        editor: editorReducer,
    }
});