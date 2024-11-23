import { HeaderGetAllService, SeoGetAllService, UserGetAllService } from "../service"

export const TargetData = (id) => {
    if (id === 1) return HeaderGetAllService().then(res => res.result)
    if (id === 2) return SeoGetAllService().then(res => res.result)
    if (id === 3) return UserGetAllService(1, 50).then(res => res)
}