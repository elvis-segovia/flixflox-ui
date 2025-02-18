import { HomeOutlined, PlayCircleOutlined } from '@ant-design/icons';
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
        key: 'login',
        label: 'Login',
        to: '/dashboard/login',
        component: <LoginForm />,
        style: { display: 'none' }
    },
];