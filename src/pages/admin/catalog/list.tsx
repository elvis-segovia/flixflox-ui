import React, { useEffect, useState } from "react";
import { MainBlock, SearchTable } from "../../../components";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { Button, Space, Tag, Tooltip } from "antd";
import { CatalogController } from "../../../controllers";

const catalogCtrl = new CatalogController();

const vtypes: any = {
    'tvshows': 'tvshow',
    'movies': 'movie'
}

export const CatalogList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(true)
    const { vtype } = useParams();

    const fetchCatalog = async () => {
        try {
            const catalog = await catalogCtrl.listVideosByType(vtypes[vtype || "movie"]);
            if (catalog.data.data) {
                setDataSource(catalog.data.data.map((item: any) => ({
                    ...item,
                    key: item.uuid
                })));
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, [refresh, vtype]);

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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status == "In-Progress" ? "processing" : "success"}>{status}</Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    {record.type === "tvshow" && (
                        <Tooltip title="Add">
                            <Link to={`/dashboard/movies/add/${record.uuid}`}>
                                <Button
                                    type="default"
                                    icon={<PlusSquareOutlined />}
                                    size="small"
                                />
                            </Link>
                        </Tooltip>
                    )}
                    <Tooltip title="Edit">
                        <Button
                            type="default"
                            size="small"
                            icon={<EditOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="default"
                            size="small"
                            icon={<DeleteOutlined />}
                            danger
                        />
                    </Tooltip>
                </Space>
            ),
        }
    ];
    return (
        <MainBlock title="Movies" button={
            <Space>
                <Link to="/dashboard/movies/add"><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add</Button></Link>
                <Button type="default" size="middle" icon={<ReloadOutlined />} onClick={() => setRefresh(!refresh)} />
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}