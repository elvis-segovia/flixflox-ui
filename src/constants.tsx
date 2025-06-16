import { TeamOutlined, HomeOutlined, PlayCircleOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Home } from './admin/home';
import { CatalogCreate, CatalogList } from './admin/catalog';
import { CategoriesList } from './admin/categories';
import { CastList } from './admin/cast';
import { UsersCreate, UsersList } from './admin/users';

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
        key: '/dashboard/categories',
        icon: <VideoCameraOutlined />,
        label: 'Categories',
        to: '/dashboard/categories',
        component: <CategoriesList />
    },
    {
        key: '/dashboard/cast',
        icon: <TeamOutlined />,
        label: 'Cast',
        to: '/dashboard/cast',
        component: <CastList />
    },
    {
        key: '/dashboard/users',
        icon: <UserOutlined />,
        label: 'Users',
        to: '/dashboard/users',
        component: <UsersList />,
        children: [
            {
                key: '/dashboard/users/add',
                label: 'Add',
                to: '/dashboard/users/add',
                component: <UsersCreate />,
                show: false
            }
        ]
    }
];