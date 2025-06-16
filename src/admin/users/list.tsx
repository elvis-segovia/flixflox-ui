import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import { MainBlock, SearchTable } from "../../components";
import { Button, Space, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { UsersController } from "../../controllers";

const usersCtrl = new UsersController

export const UsersList: React.FC = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const fetchUsers = async () => {
        try {
            const users = await usersCtrl.listUsers();
            setDataSource(users.data.map((item: any) => ({
                ...item,
                key: item.id
            })));
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Privileges',
            dataIndex: 'privileges',
            key: 'privileges',
            render: (privileges: any) => (
                privileges.map((privilege: string) => (
                    <Tag color="cyan">{privilege}</Tag>
                ))
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <Tag color="gold">{role || "user"}</Tag>
            )
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
        <MainBlock title="Users" button={
            <Space>
                <Link to="/dashboard/users/add"><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add</Button></Link>
                <Button type="default" size="middle" icon={<ReloadOutlined />} onClick={() => setRefresh(!refresh)} />
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}