import { ContactsOutlined, HomeOutlined, PlayCircleOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Home } from './admin/home';
import { CatalogCreate, CatalogList } from './admin/catalog';
import LoginForm from './admin/login';

export const menuItems = [
    {
        key: '/dashboard/home',
        icon: <HomeOutlined />,
        label: 'Home',
        to: '/dashboard/home',
        component: <Home />
    },
    {
        key: '/dashboard/movies',
        icon: <PlayCircleOutlined />,
        label: 'Catalog',
        to: '/dashboard/movies',
        component: <CatalogList />,
        children: [
            {
                key: '/dashboard/movies/add',
                label: 'Add',
                to: '/dashboard/movies/add',
                component: <CatalogCreate />,
                show: false
            }
        ]
    },
    {
        key: '/dashboard/genres',
        icon: <VideoCameraOutlined />,
        label: 'Genres',
        to: '/dashboard/genres',
        component: <Home />
    },
    {
        key: '/dashboard/actors',
        icon: <ContactsOutlined />,
        label: 'Actors',
        to: '/dashboard/actors',
        component: <Home />
    },
    {
        key: '/dashboard/users',
        icon: <UserOutlined />,
        label: 'Users',
        to: '/dashboard/users',
        component: <Home />
    },
    {
        key: 'login',
        label: 'Login',
        to: '/dashboard/login',
        component: <LoginForm />,
        style: { display: 'none' }
    },
];