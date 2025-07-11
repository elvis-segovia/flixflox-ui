import React from "react";
import { WebNavbar } from "../../../components/navbar";
import { ConfigProvider, theme } from "antd";
import { Link } from "react-router-dom";

const items = [
    {
        key: 'movies',
        label: <Link to='movies/videos'>Movies</Link>,

    },
    {
        key: 'tv_shows',
        label: <Link to='tv-shows/videos'>Tv Shows</Link>
    }
]

export const Web: React.FC = () => {
    return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
            <WebNavbar items={items} />
        </ConfigProvider>
    )
};