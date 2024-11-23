import { MenuColumns, SeoColumns, UserColumns } from "../components/Columns"

export const TargetColumn = (id) => {
    if (id === 1) return MenuColumns()
    if (id === 2) return SeoColumns()
    if (id === 3) return UserColumns()
}