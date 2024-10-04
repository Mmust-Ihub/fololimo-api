import { Router } from "express"
import modelRouter from "./model.route.js"

const router = Router()

const defaultRoutes = [
    {
        path: "/model",
        route: modelRouter
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router