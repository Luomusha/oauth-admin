import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import RedirectUrl from "./RedirectUrl"
import { OAUTH_URI } from "../common/config"

const Home = lazy(() => import("./Home"))
const Dashboard = lazy(() => import("./Home/Dashboard"))
const UserList = lazy(() => import("./Home/Users"))
const UserForm = lazy(() => import("./Home/Users/UserForm"))
const UserDetail = lazy(() => import("./Home/Users/UserDetail"))
const ClientList = lazy(() => import("./Home/Clients"))
const ClientForm = lazy(() => import("./Home/Clients/ClientForm"))
const ClientDetail = lazy(() => import("./Home/Clients/ClientDetail"))
const TokenList = lazy(() => import("./Home/Tokens"))
const NoMatch = lazy(() => import("./404"))
const Callback = lazy(() => import("./Callback"))

export default () => {

    return <Suspense fallback={<div>loading</div>}>
        <Router>
            <Routes>
                <Route element={<Home />} >
                    <Route index element={<Dashboard />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/new" element={<UserForm />} />
                    <Route path="/users/:id" element={<UserDetail />} />
                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/clients/new" element={<ClientForm />} />
                    <Route path="/clients/:id" element={<ClientDetail />} />
                    <Route path="/tokens" element={<TokenList />} />
                </Route>
                <Route path="/callback" element={<Callback />} />
                <Route path="/login" element={<RedirectUrl url={OAUTH_URI} />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
    </Suspense>
}
