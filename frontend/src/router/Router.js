import { useRoutes } from "react-router-dom"
import { Layout } from '../components/Layout'
import { Home } from '../components/Home'

const Router = () => {
    // make routing
    const routing = useRoutes([

        {
            path: "*", element: <div>1111</div>
        },
        {
            path: "", element: <Layout />,
            children: [
                {
                    path: "/", element: <Home />
                },
            ]
        }
    ])
    // export routing
    return routing
}
// export router
export default Router