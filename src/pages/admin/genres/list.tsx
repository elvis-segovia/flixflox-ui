import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { MainBlock, SearchTable } from "../../../components";
import { Button, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { GenresController } from "../../../controllers";
import { GenreForm } from "./create";

const genreCtrl = new GenresController();

export const GenresList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false)

    const fetchGenres = async () => {
        try {
            const genres = await genreCtrl.listGenres();

            setDataSource(genres.data.map((item: any) => ({
                ...item,
                key: item.uuid
            })));
        } catch (error) {
            console.error("Failed to fetch genres:", error);
        } finally {
            setRefresh(false);
        }
    };

    const handleCreate = useCallback(() => {
        setOpen(true);
    }, [open]);

    useEffect(() => {
        fetchGenres()
    }, [refresh]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    {record.type === "tvshow" && (
                        <Tooltip title="Add">
                            <Link to={`/add`}>
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
        <MainBlock title="Genres" button={
            <Space>
                <Button type="primary" size="middle" onClick={handleCreate} icon={<PlusSquareOutlined />}>Add</Button>
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} />
            <GenreForm title="Add Genre" open={open} setOpen={setOpen} okText="Save" cancelText="Cancel" setRefresh={setRefresh} />
        </MainBlock>
    )
}