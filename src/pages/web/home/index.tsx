import React from "react";
import { WebNavbar } from "../../../components/navbar";
import { ConfigProvider, theme } from "antd";
import { Link } from "react-router-dom";

const items = [
    {
        key: 'movies',
        label: <Link to='movie/videos'>Movies</Link>,
    },
    {
        key: 'tv_shows',
        label: <Link to='tvshow/videos'>Tv Shows</Link>
    },
    {
        key: 'catalog',
        label: <Link to='catalog'>Browse All</Link>
    }
]

export const Web: React.FC = () => {
    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#e8611a',
                colorBgLayout: '#141414',
                colorBgContainer: '#1a1a1a',
                colorText: '#e5e5e5',
            },
            components: {
                Menu: {
                    darkItemBg: 'transparent',
                    darkItemColor: '#b3b3b3',
                    darkItemSelectedColor: '#ffffff',
                    darkItemHoverColor: '#ffffff',
                    horizontalItemSelectedColor: '#ffffff',
                    horizontalItemSelectedBg: 'transparent',
                },
                Layout: {
                    headerBg: 'transparent',
                    bodyBg: '#141414',
                },
            }
        }}>
            <WebNavbar items={items} />
        </ConfigProvider>
    )
};