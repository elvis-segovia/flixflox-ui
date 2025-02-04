import React from "react";
import { MainBlock, SearchTable } from "../../components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const StudentsList: React.FC = () => {
    const dataSource = [{
        "key": "3da175d2-5685-4c4c-a703-75f6230acb1c",
        "name": "Gardiner",
        "age": "41-7246490",
        "address": "Apt 1567"
    }, {
        "key": "45ea148e-0d77-4bfe-afdb-a81908d9ce8e",
        "name": "Jaine",
        "age": "97-2202355",
        "address": "Suite 59"
    }, {
        "key": "64c1c6bd-1c67-4599-ae6a-f87e2b35d797",
        "name": "Polly",
        "age": "70-0151981",
        "address": "Apt 1904"
    }, {
        "key": "41145550-1c9a-4085-9906-9a02312cc293",
        "name": "Urban",
        "age": "46-8810547",
        "address": "PO Box 25940"
    }, {
        "key": "dfe7c075-4d54-47a3-acab-bda1e601f42c",
        "name": "Mahala",
        "age": "41-3136375",
        "address": "Room 531"
    }, {
        "key": "54a02d41-dc08-41b7-ad12-27055bac2986",
        "name": "Gerard",
        "age": "41-8824913",
        "address": "16th Floor"
    }, {
        "key": "da1fc869-e449-4699-a327-52d78a1f186c",
        "name": "Bellanca",
        "age": "31-8691893",
        "address": "Suite 73"
    }, {
        "key": "53166139-98fe-47a1-b9a4-f91e4dc1c62b",
        "name": "Hilario",
        "age": "15-8760773",
        "address": "Room 1646"
    }, {
        "key": "9f2fd226-6a22-41fb-a89a-09ca80025b8a",
        "name": "Pauletta",
        "age": "95-5041231",
        "address": "8th Floor"
    }, {
        "key": "3beab872-2f0f-4df7-a22c-6c21e00656e9",
        "name": "Jaquenetta",
        "age": "27-0350977",
        "address": "Apt 37"
    }, {
        "key": "011a9754-2d6b-4ed0-a0f5-644cfb4198cd",
        "name": "Tessy",
        "age": "80-1330911",
        "address": "Room 211"
    }, {
        "key": "a093f334-7c81-4b67-961a-70aff868d2c6",
        "name": "Adoree",
        "age": "74-7023062",
        "address": "3rd Floor"
    }, {
        "key": "f7a84125-296c-4b57-9ef0-d86758e11ddd",
        "name": "Teirtza",
        "age": "67-8604721",
        "address": "PO Box 9360"
    }, {
        "key": "54c7b539-5067-43df-8331-04f645889bbe",
        "name": "Cornell",
        "age": "78-7420100",
        "address": "Room 1561"
    }, {
        "key": "63ce0803-5be1-4525-8b01-98d849d11efd",
        "name": "Ynes",
        "age": "14-4438484",
        "address": "Room 628"
    }, {
        "key": "4b446a5b-8d93-4de2-82bc-7f18df8c51ac",
        "name": "Hirsch",
        "age": "73-7064458",
        "address": "7th Floor"
    }, {
        "key": "60526635-3239-42d9-88b6-ba98094e6662",
        "name": "Lorry",
        "age": "83-7395470",
        "address": "Apt 177"
    }, {
        "key": "19a1e74c-b124-45a2-97cb-c9057e38d6e1",
        "name": "Judi",
        "age": "10-0516429",
        "address": "Apt 1273"
    }, {
        "key": "070e31dc-2254-45f1-a9f5-d99b59524c8b",
        "name": "Aksel",
        "age": "70-1918979",
        "address": "Apt 1998"
    }, {
        "key": "025374b3-fa7d-4fe0-96a0-ba190362f924",
        "name": "Clary",
        "age": "32-5113454",
        "address": "Room 429"
    }, {
        "key": "a7c260bc-2b0a-463c-9b0d-d648a2a49ad2",
        "name": "Quint",
        "age": "81-5109501",
        "address": "Apt 738"
    }, {
        "key": "2aa3177d-9d22-4228-ae1f-fd464ba0b9a8",
        "name": "Gabriel",
        "age": "16-3173245",
        "address": "Suite 57"
    }, {
        "key": "e1fb9140-1b06-4628-9e83-b48294134bd8",
        "name": "Tedmund",
        "age": "12-6218406",
        "address": "Room 1384"
    }, {
        "key": "29ba530a-7c12-4513-89f1-0fd8a814a961",
        "name": "Mimi",
        "age": "63-7149396",
        "address": "PO Box 87352"
    }, {
        "key": "1c16a8cd-8a3d-4369-93d4-1d56455e638b",
        "name": "Grantham",
        "age": "21-0992360",
        "address": "Suite 26"
    }, {
        "key": "f7271100-26ef-45dd-8bd2-b7510c72e1fb",
        "name": "Kelsey",
        "age": "57-0357435",
        "address": "Suite 88"
    }, {
        "key": "1a9a5b0e-cc2c-4605-97bd-d99943307a33",
        "name": "Anet",
        "age": "19-9778329",
        "address": "Suite 47"
    }, {
        "key": "94f468fe-c353-42e8-8d49-fb2d339a631c",
        "name": "Neddie",
        "age": "13-2939029",
        "address": "Suite 82"
    }, {
        "key": "44ac3149-86f3-4f6d-ba70-f1b75aea415c",
        "name": "Vyky",
        "age": "47-4261989",
        "address": "Apt 213"
    }, {
        "key": "9f62d1a0-3c1d-446e-ab60-7b00fdbca19f",
        "name": "Fiann",
        "age": "05-4874050",
        "address": "Suite 100"
    }, {
        "key": "7c12f0fe-2ec0-4985-80a9-914e1cefca43",
        "name": "Tonie",
        "age": "97-4334146",
        "address": "Apt 1238"
    }, {
        "key": "c188e25d-5667-4673-a1ce-98f628d481b6",
        "name": "Estelle",
        "age": "58-5839894",
        "address": "PO Box 98263"
    }, {
        "key": "5612ac99-43f0-463a-9468-613660e08c57",
        "name": "Kathie",
        "age": "40-1719254",
        "address": "Apt 1596"
    }, {
        "key": "fd098e25-966c-4a94-b8c8-80fe0f874dda",
        "name": "Leo",
        "age": "84-5538308",
        "address": "5th Floor"
    }, {
        "key": "8a1b2f20-42f7-47b1-90ec-fd2360ffaf74",
        "name": "Ario",
        "age": "73-3747318",
        "address": "Suite 49"
    }, {
        "key": "84c9151e-e965-45eb-98ef-c52d39ea1504",
        "name": "Murdock",
        "age": "46-8246702",
        "address": "Suite 94"
    }, {
        "key": "ec700faf-a241-4d46-88ea-e731103a7235",
        "name": "Rosella",
        "age": "79-9479434",
        "address": "Room 1164"
    }, {
        "key": "9110dbc9-2d07-4d32-8eea-52355291d0b3",
        "name": "Torr",
        "age": "04-0683382",
        "address": "Room 477"
    }, {
        "key": "cc1ceac0-2a7c-4e81-bf3a-2d3b4171badb",
        "name": "Khalil",
        "age": "94-0604626",
        "address": "Room 688"
    }, {
        "key": "3da0849c-d4a4-4d34-8c06-4523ac5b75d2",
        "name": "Ugo",
        "age": "54-5538311",
        "address": "Apt 561"
    }, {
        "key": "9f63fcf8-7376-4a91-9b8c-1cdf60ba9bee",
        "name": "Quill",
        "age": "20-1808081",
        "address": "Room 56"
    }, {
        "key": "2aca25c9-8b10-409e-bb64-f19125e79151",
        "name": "Krystyna",
        "age": "96-1710557",
        "address": "PO Box 53007"
    }, {
        "key": "a2e8441d-8fef-4ab6-b6c6-651b890a2184",
        "name": "Maryann",
        "age": "79-7245392",
        "address": "Room 1643"
    }, {
        "key": "d69a7697-0d79-47ab-b9b5-c88621c4d8a9",
        "name": "Jilly",
        "age": "91-7206589",
        "address": "Suite 89"
    }, {
        "key": "3c8d6525-2560-4c6f-b789-313bb383e957",
        "name": "Madalyn",
        "age": "17-7242673",
        "address": "PO Box 88863"
    }, {
        "key": "5bd6a311-3985-4e48-9963-142c385d6f59",
        "name": "Brandy",
        "age": "76-6100664",
        "address": "Room 1867"
    }, {
        "key": "88aca824-476a-412a-a9e8-c24e02ee4645",
        "name": "Casey",
        "age": "20-2683344",
        "address": "16th Floor"
    }, {
        "key": "4551e28b-8959-402a-b14d-30825adc1f88",
        "name": "Rance",
        "age": "33-1161259",
        "address": "Suite 40"
    }, {
        "key": "2addd348-8403-491a-aaf4-60c9cca83325",
        "name": "Tiebold",
        "age": "79-9247672",
        "address": "Suite 98"
    }, {
        "key": "e6afc745-5179-4388-9d7f-5c644531d1e9",
        "name": "Chrystel",
        "age": "09-9642870",
        "address": "Apt 67"
    }, {
        "key": "1b17311a-accb-45c0-887f-dc9fbcc30db6",
        "name": "Zuzana",
        "age": "86-1809938",
        "address": "Suite 11"
    }, {
        "key": "75c990ed-a857-42fc-853e-c57321fbb624",
        "name": "Ethan",
        "age": "29-1371804",
        "address": "Apt 1895"
    }, {
        "key": "7aca2e2e-4fe4-4c04-b6d1-be1e014dc1d8",
        "name": "Merwin",
        "age": "62-6066208",
        "address": "Room 977"
    }, {
        "key": "90c4fe24-c414-4ee4-8c28-0f074e5e0a56",
        "name": "Marty",
        "age": "13-7028044",
        "address": "PO Box 9420"
    }, {
        "key": "420272e8-0fc8-438a-9d2b-1e901e756526",
        "name": "Joscelin",
        "age": "94-9595820",
        "address": "Room 1251"
    }, {
        "key": "30c43074-8f92-44e1-aa72-3e7b78cb00a1",
        "name": "Gonzalo",
        "age": "01-5506754",
        "address": "12th Floor"
    }, {
        "key": "31b7cf5a-15ba-41b2-b58e-04da903c93e3",
        "name": "Haywood",
        "age": "78-4932989",
        "address": "PO Box 20445"
    }, {
        "key": "aeaebdf6-e9a9-45ae-abd0-fd1ebf9dae23",
        "name": "Timmy",
        "age": "02-0885405",
        "address": "Room 668"
    }, {
        "key": "13f8f1e1-1492-4e02-ac43-70b71de0db36",
        "name": "Warren",
        "age": "47-5779342",
        "address": "Suite 56"
    }, {
        "key": "644a4508-9602-4998-ae6f-eaeef30aafe0",
        "name": "Tymon",
        "age": "08-4289843",
        "address": "Apt 788"
    }, {
        "key": "42b549d7-69a7-4f5f-b031-24391355d762",
        "name": "Ruthi",
        "age": "75-9050861",
        "address": "PO Box 66848"
    }, {
        "key": "865ba60e-d057-4655-94fb-de6c5afc95b9",
        "name": "Corbie",
        "age": "60-4654354",
        "address": "Suite 84"
    }, {
        "key": "2917f61a-598a-4d0d-8714-47e765419338",
        "name": "Dana",
        "age": "10-4812888",
        "address": "1st Floor"
    }, {
        "key": "f82759e5-2f93-4fae-b9a1-5190f9c4bb2d",
        "name": "Sayres",
        "age": "57-7102741",
        "address": "4th Floor"
    }, {
        "key": "2728b926-d5d2-4955-88e9-e28b35b8ce81",
        "name": "Maggee",
        "age": "70-7738527",
        "address": "Room 96"
    }, {
        "key": "468854f3-a441-4fde-ad1a-045b246d32df",
        "name": "Maribelle",
        "age": "85-3067844",
        "address": "Suite 25"
    }, {
        "key": "af3224df-2e77-4fec-a1e6-4be5089ba428",
        "name": "Dyanne",
        "age": "97-7556531",
        "address": "Suite 42"
    }, {
        "key": "922f903c-38bd-4a87-b463-b45063489ef7",
        "name": "Ashley",
        "age": "55-8723689",
        "address": "PO Box 90021"
    }, {
        "key": "d9c39be3-33ab-4fa5-8e64-85e6fe111ab9",
        "name": "Nathalia",
        "age": "16-3816773",
        "address": "PO Box 39817"
    }, {
        "key": "b4ec93ca-0ea4-4ff0-a8ee-b7aa5fb77c6c",
        "name": "Nanette",
        "age": "57-6362941",
        "address": "Room 1994"
    }, {
        "key": "c07c2425-4b98-48c6-9a4d-fc4b44f93ed0",
        "name": "Kincaid",
        "age": "18-9763117",
        "address": "Suite 45"
    }, {
        "key": "c5232f91-94bc-478c-abf5-df6568fe7125",
        "name": "Anabella",
        "age": "84-3329678",
        "address": "Suite 99"
    }, {
        "key": "09e5b8f9-76df-451f-bcb0-8d18161d02aa",
        "name": "Fidel",
        "age": "00-0799095",
        "address": "PO Box 6134"
    }, {
        "key": "677165a9-1964-420b-8309-92db782b4f1c",
        "name": "Fabien",
        "age": "14-3163879",
        "address": "Room 458"
    }, {
        "key": "7a179544-3e93-41bb-be72-cc8f36d3e82a",
        "name": "Taber",
        "age": "73-5184466",
        "address": "PO Box 8820"
    }, {
        "key": "b4d083f6-c2c1-49ca-85b1-016a823d4855",
        "name": "Ilyse",
        "age": "81-7544099",
        "address": "Apt 1041"
    }, {
        "key": "41f32baf-0f72-4d74-ad15-a632783247e1",
        "name": "Dorey",
        "age": "56-9415685",
        "address": "Suite 18"
    }, {
        "key": "a3a8f12d-dd99-433f-8315-58ac100fc67f",
        "name": "Derry",
        "age": "11-7228836",
        "address": "Suite 67"
    }, {
        "key": "f5dc999c-a57c-45b9-9cb3-98913d3aa1d6",
        "name": "Cullie",
        "age": "71-7373169",
        "address": "Room 1250"
    }, {
        "key": "41b9b652-d0ed-4edb-aa70-9816f431d36f",
        "name": "Tamarah",
        "age": "76-4540523",
        "address": "Suite 65"
    }, {
        "key": "e94618af-b6b1-4ed1-b0bf-f74ce3d50c66",
        "name": "Rabi",
        "age": "68-7112462",
        "address": "Room 1133"
    }, {
        "key": "12014901-432f-449a-abd0-fe3cc2e268ae",
        "name": "Harlin",
        "age": "97-4066532",
        "address": "PO Box 20837"
    }, {
        "key": "8a228309-cef0-4770-8fce-d5d9c09773a8",
        "name": "Charlene",
        "age": "71-1337780",
        "address": "PO Box 26535"
    }, {
        "key": "afb97763-1062-4237-9624-3824c46ca7c3",
        "name": "Katy",
        "age": "29-9802756",
        "address": "Room 1169"
    }, {
        "key": "eea22eea-ae36-4615-af66-5e0eec3971c3",
        "name": "Francklyn",
        "age": "89-6290807",
        "address": "Apt 559"
    }, {
        "key": "1738bdb4-136d-4a2d-9f87-207be97ec75b",
        "name": "Sigismondo",
        "age": "53-5948371",
        "address": "PO Box 33078"
    }, {
        "key": "64ba5b5f-8216-45ed-8d6e-00db8521932f",
        "name": "Vivia",
        "age": "74-9997308",
        "address": "18th Floor"
    }, {
        "key": "6a9fd868-05c6-4759-99d6-d5f1cbd82a9e",
        "name": "Liana",
        "age": "85-4327825",
        "address": "Room 1200"
    }, {
        "key": "cc56f5af-fc25-4af7-ab62-b330c2c6c0ef",
        "name": "Reinaldos",
        "age": "81-3304809",
        "address": "18th Floor"
    }, {
        "key": "48cbebc2-641c-45c0-81d0-47712b3dd67d",
        "name": "Zonnya",
        "age": "65-9686972",
        "address": "PO Box 28227"
    }, {
        "key": "690d30ac-505f-4a49-b6fa-5763a9c1826b",
        "name": "Beverley",
        "age": "17-2272664",
        "address": "PO Box 65832"
    }, {
        "key": "f5fb273c-e6b7-462d-b91c-31e3fe4302b7",
        "name": "Aharon",
        "age": "57-0246559",
        "address": "13th Floor"
    }, {
        "key": "045b0eaf-4b7c-4377-8dc6-2ff41e3d084d",
        "name": "Mureil",
        "age": "65-5925723",
        "address": "3rd Floor"
    }, {
        "key": "b3adb56a-0b25-4c21-85b5-d23af6ac8177",
        "name": "Ginni",
        "age": "68-4820292",
        "address": "Suite 1"
    }, {
        "key": "43a0e2a9-9f14-43d8-a3c3-94b2f9133cb2",
        "name": "Ford",
        "age": "52-5364795",
        "address": "2nd Floor"
    }, {
        "key": "acc26838-2cde-4ef6-ab62-eb3a91846208",
        "name": "Susannah",
        "age": "90-8655283",
        "address": "Suite 21"
    }, {
        "key": "8528865a-674a-432d-b862-ca1d4d51061b",
        "name": "Tucker",
        "age": "63-3975950",
        "address": "17th Floor"
    }, {
        "key": "e6428985-2d2c-4a3d-b0c9-bf1ecf55d9be",
        "name": "Elle",
        "age": "15-4545908",
        "address": "Suite 5"
    }, {
        "key": "18c2ef06-bf33-4732-a67e-b56a6de8c78d",
        "name": "Jakob",
        "age": "71-9692679",
        "address": "Room 153"
    }, {
        "key": "ef0d3741-8097-4b2f-bb61-18335c293e4b",
        "name": "Mozes",
        "age": "17-4722207",
        "address": "Suite 100"
    }];

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
    return (
        <MainBlock title="Students" showBreadcrumb={true} button={<Link to="/students/option1"><Button type="primary" size='middle' icon={<PlusSquareOutlined />}>New</Button></Link>}>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}