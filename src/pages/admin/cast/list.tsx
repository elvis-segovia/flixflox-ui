import React, { useCallback, useEffect, useState } from "react";
import { PlusSquareOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MainBlock, SearchTable } from "../../../components";
import { Button, Space, Tooltip } from "antd";
import { CastController } from "../../../controllers";
import { CastForm } from "./create";

const castCtrl = new CastController();

export const CastList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const fetchCast = async () => {
        setLoading(true);
        try {
            const cast = await castCtrl.listCast();

            setDataSource(cast.data.map((item: any) => ({
                ...item,
                key: item.uuid
            })));
        } catch (error) {
            console.error("Failed to fetch cast:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = useCallback(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        fetchCast()
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birth_date',
            key: 'birth_date',
        },
        {
            title: 'Nationality',
            dataIndex: 'nationality',
            key: 'nationality',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, _record: any) => (
                <Space>
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
        <>
            <MainBlock title="Cast" loading={loading} button={
                <Space>
                    <Button type="primary" size="middle" onClick={handleCreate} icon={<PlusSquareOutlined />}>Add</Button>
                </Space>
            }>
                <SearchTable columns={columns} dataSource={dataSource} />
            </MainBlock>
            <CastForm
                title="Add Cast Member"
                open={open}
                setOpen={setOpen}
                okText="Save"
                cancelText="Cancel"
                onCreated={fetchCast}
            />
        </>
    )
}
