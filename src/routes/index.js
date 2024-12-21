import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import PageNotFound from "../pages/error/PageNotFound";
import ProfilePage from "../pages/personal/ProfilePage";
import AboutPage from '../pages/public/AboutPage/index.jsx'

const routes = [
    {
        path: "/",
        component: <HomePage />,
        isPrivate: false,
    },
    {
        path: "/login",
        component: <LoginPage />,
        isPrivate: false,
    },
    {
        path: "/about",
        component: <AboutPage />,
        isPrivate: false,
    },
    {
        path: "/profile",
        component: <ProfilePage />,
        isPrivate: true,
    },
    {
        path: "/404",
        component: <PageNotFound />,
        isPrivate: false,
    },
    {
        path: "*",
        component: <PageNotFound />,
        isPrivate: false,
    }
]

export default routes;
