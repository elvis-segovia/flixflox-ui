type BreadcrumbItem = {
    title: string;
    path?: string;
};

type MainBlockProps = {
    children: React.ReactNode,
    showBreadcrumb?: boolean;
    title?: string;
    button?: React.ReactNode;
    loading?: boolean;
    props?: any;
}

type NotifyProps = {
    type: 'success' | 'info' | 'warning' | 'error';
    message?: string;
    description?: string;
    showNotification?: boolean;
}