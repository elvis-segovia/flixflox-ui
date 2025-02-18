import React, { useEffect } from "react";
import { MainBlock, SearchTable } from "../../components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { CatalogController } from "../../controllers";

const catalogCtrl = new CatalogController();

export const CatalogList: React.FC = () => {
    const [dataSource, setDataSource] = React.useState<any[]>([]);

    const fetchCatalog = async () => {
        try {
            const catalog = await catalogCtrl.listCatalog();
            setDataSource(catalog.data.map((item: any) => ({
                ...item,
                key: item.uuid
            })));
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Link to="/dashboard/catalog/delete">Delete</Link>
            ),
        }
    ];
    return (
        <MainBlock title="Movies" button={<Link to="/dashboard/movies/add"><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add</Button></Link>}>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}