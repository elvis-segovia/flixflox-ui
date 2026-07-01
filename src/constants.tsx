import { TeamOutlined, HomeOutlined, PlayCircleOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Home } from './pages/admin/home';
import { CatalogCreate, CatalogList } from './pages/admin/catalog';
import { GenresList } from './pages/admin/genres';
import { CastList } from './pages/admin/cast';
import { UsersCreate, UsersList } from './pages/admin/users';

export const menuItems = [
    {
        key: '/dashboard/home',
        icon: <HomeOutlined />,
        label: 'Home',
        to: '/dashboard/home',
        component: <Home />
    },
    {
        key: '/dashboard/catalog',
        icon: <PlayCircleOutlined />,
        label: 'Catalog',
        children: [
            {
                key: '/dashboard/catalog/movies',
                label: 'Movies',
                to: '/dashboard/catalog/movies',
                component: <CatalogList />,
                show: 'true'
            },
            {
                key: '/dashboard/catalog/tvshows',
                label: 'TV Shows',
                to: '/dashboard/catalog/tvshows',
                component: <CatalogList />,
                show: 'true'
            },
            {
                key: '/dashboard/movies/add',
                label: 'Add',
                to: '/dashboard/movies/add',
                component: <CatalogCreate />,
                show: 'false'
            },
            {
                key: '/dashboard/movies/add/:uuid',
                label: 'Add',
                to: '/dashboard/movies/add/:uuid',
                component: <CatalogCreate />,
                show: 'false'
            }
        ]
    },
    {
        key: '/dashboard/genres',
        icon: <VideoCameraOutlined />,
        label: 'Genres',
        to: '/dashboard/genres',
        component: <GenresList />,
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
                show: 'false'
            }
        ]
    }
];