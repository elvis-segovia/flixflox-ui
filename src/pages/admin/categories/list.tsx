import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { MainBlock, SearchTable } from "../../../components";
import { Button, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";

export const CategoriesList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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
        <MainBlock title="Categories" button={
            <Space>
                <Link to="/dashboard/categories/add"><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add</Button></Link>
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}