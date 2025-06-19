import React, { useState } from "react";
import { PlusSquareOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MainBlock, SearchTable } from "../../../components";
import { Button, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";

export const CastList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Character',
            dataIndex: 'character',
            key: 'character',
        },
        {
            title: 'Movie',
            dataIndex: 'movie',
            key: 'movie',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
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
        <MainBlock title="Cast" button={
            <Space>
                <Link to="/dashboard/cast/add"><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add</Button></Link>
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}