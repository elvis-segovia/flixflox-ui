import type { ThemeConfig } from 'antd';

// Colors derived from the flixflox.png logo (orange-to-coral gradient)
const brandColors = {
    primary: '#e8611a',       // Main orange from logo
    primaryHover: '#f57c3a',  // Lighter orange
    secondary: '#d94568',     // Coral/pink from logo gradient
    accent: '#f5a623',        // Golden accent
};

export const lightTheme: ThemeConfig = {
    token: {
        colorPrimary: brandColors.primary,
        colorSuccess: '#10b981',
        colorWarning: '#f59e0b',
        colorError: '#ef4444',
        colorInfo: brandColors.primary,
        borderRadius: 8,
        colorBgLayout: '#f5f5f7',
        colorBgContainer: '#ffffff',
        colorText: '#1a1a2e',
        colorTextSecondary: '#64748b',
    },
    components: {
        Layout: {
            siderBg: '#1a1a2e',
            headerBg: '#ffffff',
            bodyBg: '#f5f5f7',
        },
        Menu: {
            subMenuItemBg: '#1a1a2e',
            darkItemBg: '#1a1a2e',
            darkItemColor: '#a0aec0',
            darkItemSelectedColor: '#ffffff',
            darkItemHoverColor: '#f0f0f0',
            itemBg: '#1a1a2e',
            itemSelectedBg: brandColors.primary,
            itemHoverBg: '#2d2d44',
            itemBorderRadius: 6,
        },
        Button: {
            primaryColor: '#ffffff',
            borderRadius: 8,
        },
        Card: {
            borderRadiusLG: 12,
        },
        Input: {
            borderRadius: 8,
        },
    },
};

export const darkTheme: ThemeConfig = {
    token: {
        colorPrimary: brandColors.primaryHover,
        colorSuccess: '#34d399',
        colorWarning: '#fbbf24',
        colorError: '#f87171',
        colorInfo: brandColors.primaryHover,
        borderRadius: 8,
        colorBgLayout: '#0f0f1a',
        colorBgContainer: '#1a1a2e',
        colorBgElevated: '#22223a',
        colorText: '#e2e8f0',
        colorTextSecondary: '#94a3b8',
        colorBorder: '#2d2d44',
        colorBorderSecondary: '#22223a',
    },
    components: {
        Layout: {
            siderBg: '#0f0f1a',
            headerBg: '#1a1a2e',
            bodyBg: '#0f0f1a',
        },
        Menu: {
            subMenuItemBg: '#0f0f1a',
            darkItemBg: '#0f0f1a',
            darkItemColor: '#94a3b8',
            darkItemSelectedColor: '#ffffff',
            darkItemHoverColor: '#f0f0f0',
            itemBg: '#0f0f1a',
            itemSelectedBg: brandColors.primaryHover,
            itemHoverBg: '#1a1a2e',
            itemBorderRadius: 6,
        },
        Button: {
            primaryColor: '#ffffff',
            borderRadius: 8,
        },
        Card: {
            borderRadiusLG: 12,
            colorBgContainer: '#1a1a2e',
        },
        Input: {
            borderRadius: 8,
            colorBgContainer: '#22223a',
            colorBorder: '#2d2d44',
        },
        Table: {
            colorBgContainer: '#1a1a2e',
            headerBg: '#22223a',
        },
    },
};
