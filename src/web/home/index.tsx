import React from "react";
import { WebNavbar } from "../../components/navbar";
import { ConfigProvider, theme } from "antd";

export const Web: React.FC = () => {
    return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
            <WebNavbar />
        </ConfigProvider>
    )
};