import { LanguageColumns, MenuColumns, MenuGroupColumns, OrderColumns, UserColumns } from "../components/Columns"

export const TargetColumn = (id, setUpsert, setIsUpdate) => {
    if (id === 1) return MenuColumns(setUpsert, setIsUpdate)
    if (id === 2) return MenuGroupColumns(setUpsert, setIsUpdate)
    if (id === 3) return UserColumns(setUpsert, setIsUpdate)
    if (id === 4) return OrderColumns(setUpsert, setIsUpdate)
    if (id === 5) return LanguageColumns(setUpsert, setIsUpdate)
}