import React from "react";
import { MainBlock, SearchTable } from "../../components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SchoolsCreate } from "./create";

export const SchoolsList: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const handleCreate = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    }
    
    return (
        <MainBlock title="Schools" showBreadcrumb={true} button={<Button type="primary" size='middle' icon={<PlusSquareOutlined />} onClick={handleCreate}>New</Button>}>
            <SearchTable columns={columns} dataSource={dataSource} />
            <SchoolsCreate title="Create School" open={open} okText="Create" cancelText="Cancel" setOpen={setOpen} />
        </MainBlock>
    )
}