import { BasicLayout } from "../layouts/BasicLayout";
import { Error404 } from "../pages/404";
import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";

const routes = [...routesAdmin,...routesClient,{
    path:"*",
    layout:BasicLayout,
    component:Error404
}]

export default routes