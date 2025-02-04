import React from "react";
import { MainBlock, SearchTable } from "../../components";

export const TeachersList: React.FC = () => {
    const dataSource = [{
        "key": "70fb2d0b-653b-4070-b78f-1b5b3b0df88a",
        "name": "Jeniffer Balassa",
        "age": "93",
        "address": "52177 Onsgard Alley"
    }, {
        "key": "41801974-c066-46ba-bd4d-b70c95b92e61",
        "name": "Milissent Domino",
        "age": "40",
        "address": "453 Green Street"
    }, {
        "key": "60ac5f5b-1a3b-4fb6-95c8-ad5f0f3031a7",
        "name": "Bobbi Romeril",
        "age": "02",
        "address": "133 Hansons Plaza"
    }, {
        "key": "fe56a778-115f-49fe-8ef4-9a807e68fd11",
        "name": "Tanya Collins",
        "age": "45",
        "address": "58 Montana Crossing"
    }, {
        "key": "df96e183-a8d5-403c-b19b-a367d7b7f6e5",
        "name": "Sue Gavaran",
        "age": "28",
        "address": "3 Tennessee Terrace"
    }, {
        "key": "8c1301d9-6852-41d0-aab6-5845b1b5e074",
        "name": "Emlyn Greenman",
        "age": "72",
        "address": "51 Sundown Point"
    }, {
        "key": "682ed7bb-a795-446e-b287-5b85e69afa97",
        "name": "Hurley Durdy",
        "age": "00",
        "address": "91230 Gina Terrace"
    }, {
        "key": "5971bfaf-c7aa-49d1-8817-bc4f0516a5fd",
        "name": "Noelani Carlaw",
        "age": "21",
        "address": "814 Debs Pass"
    }, {
        "key": "7007db75-4448-42de-853d-d3595bda403b",
        "name": "Darelle Bohills",
        "age": "28",
        "address": "50 Old Gate Plaza"
    }, {
        "key": "d9a0f359-b50e-48fe-a84d-031973c73b46",
        "name": "Vince Bowness",
        "age": "62",
        "address": "2429 Forster Alley"
    }, {
        "key": "0a255be7-2ca1-4156-b7e7-e5bda97c393b",
        "name": "Lyda Le Grys",
        "age": "81",
        "address": "8573 Anzinger Pass"
    }, {
        "key": "2e23f172-e3d0-4114-beca-47f3af1c10cd",
        "name": "Franzen Francke",
        "age": "71",
        "address": "0 Springs Drive"
    }, {
        "key": "1d90f61f-0d26-4052-8107-08fb7affc946",
        "name": "Rory Crighten",
        "age": "96",
        "address": "708 Bellgrove Street"
    }, {
        "key": "91c55551-8367-4e67-8c42-78afa63cfa0f",
        "name": "Carola Edgeson",
        "age": "89",
        "address": "55 Laurel Street"
    }, {
        "key": "773ebbd4-acb2-4daa-b5f7-7b02a6ff176d",
        "name": "Dallas Kinloch",
        "age": "96",
        "address": "91 Scott Avenue"
    }, {
        "key": "28d0478f-82af-49a8-acb5-9c36cecea5e2",
        "name": "Raquela Longcaster",
        "age": "87",
        "address": "68 Steensland Street"
    }, {
        "key": "53b72df3-60e7-4702-818b-6fb5fedf58b5",
        "name": "Arlin Lodwig",
        "age": "27",
        "address": "24290 Springs Road"
    }, {
        "key": "40bd5f92-0e04-40b5-ad19-1e3177a40eda",
        "name": "Royce Dragge",
        "age": "86",
        "address": "1641 Corry Junction"
    }, {
        "key": "a597e9b0-7545-4d69-8037-eab2f4d23851",
        "name": "Aloise Iacopo",
        "age": "47",
        "address": "3580 Dixon Lane"
    }, {
        "key": "91f3e0e6-c393-418d-8125-7bf505a4d9bb",
        "name": "Michaeline Bwy",
        "age": "37",
        "address": "793 Banding Pass"
    }, {
        "key": "59355ead-2f56-4e73-8607-0bc2c79eb1c9",
        "name": "Elisa Gobbet",
        "age": "24",
        "address": "11129 Oriole Junction"
    }, {
        "key": "a37ef40a-35f3-4964-a2e0-6705a2a74baa",
        "name": "Hildagard Jones",
        "age": "64",
        "address": "07671 Independence Center"
    }, {
        "key": "7ee5af6e-1a8e-455f-bf8c-529e51ebd8ff",
        "name": "Briney McNay",
        "age": "65",
        "address": "90699 Gulseth Avenue"
    }, {
        "key": "aa3535e0-c6fa-4336-b7b9-cd916228cb92",
        "name": "Samuele Cristofanini",
        "age": "68",
        "address": "099 3rd Way"
    }, {
        "key": "3cc3e928-04a2-428d-ae87-e21e92c1c9a1",
        "name": "Ker Grandin",
        "age": "83",
        "address": "0311 Schlimgen Alley"
    }, {
        "key": "cf49ae79-b535-42fc-92d2-4d7a51608c94",
        "name": "Linea Ladloe",
        "age": "86",
        "address": "74067 Chinook Parkway"
    }, {
        "key": "af4bd85c-0340-4c59-ac01-cfb2f1f70e1d",
        "name": "Clayton Connock",
        "age": "39",
        "address": "79972 Randy Circle"
    }, {
        "key": "90aaa295-8d4c-4a6e-b83f-6525d29d597e",
        "name": "Melba Spinige",
        "age": "96",
        "address": "5565 Arrowood Road"
    }, {
        "key": "4768f49a-1c75-4701-9733-2ceec9b11b0a",
        "name": "Peter Smieton",
        "age": "05",
        "address": "16441 Merry Trail"
    }, {
        "key": "97ee57a5-9a73-4864-ae65-918f3fa3ce59",
        "name": "Almire Kiddell",
        "age": "50",
        "address": "877 5th Hill"
    }, {
        "key": "e2020441-efef-4cb3-8371-77738ab4cca0",
        "name": "Avigdor Eggar",
        "age": "60",
        "address": "49201 Leroy Crossing"
    }, {
        "key": "9ba2fbb5-9748-43f2-907f-334c2675773a",
        "name": "Maible Thody",
        "age": "32",
        "address": "9 Schurz Circle"
    }, {
        "key": "9c03ec4f-5d0c-401f-a213-9736bcf643a1",
        "name": "Chadwick Gidley",
        "age": "54",
        "address": "4055 Autumn Leaf Drive"
    }, {
        "key": "683fd762-3cd5-4a96-b95a-e61cdcbc5691",
        "name": "Myrah Letty",
        "age": "00",
        "address": "68564 Stoughton Terrace"
    }, {
        "key": "bfedab32-c6d3-40ef-9c7f-e424d8166895",
        "name": "Margret Hoggan",
        "age": "95",
        "address": "161 Kingsford Alley"
    }, {
        "key": "f4a2f936-36e0-444a-b8d7-6bf102d1cd9d",
        "name": "Edita Barts",
        "age": "93",
        "address": "60659 Chive Park"
    }, {
        "key": "5e89048d-3f75-40ee-9ce1-f8024981c629",
        "name": "Velvet Hutchence",
        "age": "34",
        "address": "881 Nelson Center"
    }, {
        "key": "1525a7b7-b7bc-4336-969e-53894d4e0367",
        "name": "Allys Alabastar",
        "age": "20",
        "address": "5073 Hauk Circle"
    }, {
        "key": "305a96d9-d1ec-4e6f-a396-7f69ac4246c0",
        "name": "Elora Bignell",
        "age": "95",
        "address": "6 Loeprich Center"
    }, {
        "key": "b4c7ad77-4ab4-4a8e-a564-f40ba058ab1b",
        "name": "Cathi Hamflett",
        "age": "99",
        "address": "6149 Melby Place"
    }, {
        "key": "b27d2f90-69ea-4ae1-b41e-965f48cca0b8",
        "name": "Sigfrid Voisey",
        "age": "23",
        "address": "014 Kenwood Court"
    }, {
        "key": "8102245d-2b0b-4b22-bfc6-b2fd40107062",
        "name": "Marley Ingrey",
        "age": "64",
        "address": "60 Kinsman Park"
    }, {
        "key": "57d76db0-0324-4e48-b73f-75bee742ab19",
        "name": "Starr Unsworth",
        "age": "90",
        "address": "02 Porter Point"
    }, {
        "key": "10cbfe6c-55b1-44b4-9b8c-c7da84351f15",
        "name": "Conchita Stepto",
        "age": "11",
        "address": "90 Cascade Crossing"
    }, {
        "key": "b862a40f-d339-4110-b91b-006f2a075ea4",
        "name": "Ivy Hrachovec",
        "age": "54",
        "address": "2 Springview Street"
    }, {
        "key": "f58879ae-0260-4303-aa59-46722cc469c3",
        "name": "Bax Bagott",
        "age": "48",
        "address": "10955 Garrison Hill"
    }, {
        "key": "b5364a51-7cdc-482a-ad92-b8ed7dd92490",
        "name": "Rayna Myrie",
        "age": "32",
        "address": "965 Miller Drive"
    }, {
        "key": "6af487ce-dab8-47a7-a55d-571c42466a84",
        "name": "Andree Zuker",
        "age": "14",
        "address": "5 Heath Trail"
    }, {
        "key": "814eccd7-423d-40b5-8fb3-505c55e1ad95",
        "name": "Dorie Fissenden",
        "age": "17",
        "address": "70 Talmadge Circle"
    }, {
        "key": "f502b423-c19e-478a-bb5e-6353bd40600b",
        "name": "Coleen Sims",
        "age": "40",
        "address": "6232 Manufacturers Road"
    }, {
        "key": "773058da-c15d-4238-a32a-edabef1e7237",
        "name": "Ellerey Mitchel",
        "age": "05",
        "address": "1 Old Gate Center"
    }, {
        "key": "00d89579-af76-42a7-a8d9-387c12a04b3a",
        "name": "Gardner Abramov",
        "age": "41",
        "address": "031 Lakewood Gardens Place"
    }, {
        "key": "f16ffd40-8123-4f26-abc9-9d62a029608a",
        "name": "Ardine Chataignier",
        "age": "81",
        "address": "9871 Reinke Pass"
    }, {
        "key": "9ffd52de-9629-44a6-a254-4faf471dcb2b",
        "name": "Kylie Keary",
        "age": "77",
        "address": "900 Blue Bill Park Lane"
    }, {
        "key": "4adf834f-f82f-4aac-89e5-3708a3078f3e",
        "name": "Rice Tax",
        "age": "39",
        "address": "0 Morning Center"
    }, {
        "key": "b7994f86-bda6-43c1-8b4f-71bf598ce7d3",
        "name": "Udall Matteucci",
        "age": "40",
        "address": "523 Debra Trail"
    }, {
        "key": "72192def-ee38-4e1c-bab3-f9cca562a2a9",
        "name": "Reina Childerley",
        "age": "77",
        "address": "03975 Forster Junction"
    }, {
        "key": "ebf2f7eb-1c91-4b50-bdff-0a3942a7d627",
        "name": "Michal Blodgett",
        "age": "93",
        "address": "65 Jackson Terrace"
    }, {
        "key": "18135613-5257-43fa-9fe4-aa8afc43baf0",
        "name": "Leanora Mirfield",
        "age": "40",
        "address": "7458 Holy Cross Circle"
    }, {
        "key": "01cb5c73-c6b8-48c4-8be1-4583a0fab40d",
        "name": "Yolanda Maddern",
        "age": "06",
        "address": "59 Schmedeman Hill"
    }, {
        "key": "09f9bb5b-27b6-4e35-8559-a9f6f7789c09",
        "name": "Warner Balderson",
        "age": "38",
        "address": "04460 Melrose Street"
    }, {
        "key": "15e5eb41-e0c6-4da3-b1f0-d93209f49e7c",
        "name": "Hannis Haslock(e)",
        "age": "51",
        "address": "00 Swallow Alley"
    }, {
        "key": "077a72f4-4090-485c-966b-a43c5cce5852",
        "name": "Brittne Yushachkov",
        "age": "18",
        "address": "0635 Iowa Street"
    }, {
        "key": "c4d3ce76-172a-4966-a44d-4f7e9d8e2941",
        "name": "Sarita Cokly",
        "age": "57",
        "address": "750 Logan Road"
    }, {
        "key": "a2f23488-8534-45a7-b80c-d5c106b8b2ef",
        "name": "Joyce Lenahan",
        "age": "76",
        "address": "51 Transport Drive"
    }, {
        "key": "4346c49c-c6ce-49dc-978c-0a8b79697e15",
        "name": "Archibaldo Noriega",
        "age": "19",
        "address": "26510 Packers Road"
    }, {
        "key": "cbcd7042-a572-46be-bb2f-fe013aea81c1",
        "name": "Val MacTerrelly",
        "age": "03",
        "address": "3420 Lien Lane"
    }, {
        "key": "9955009d-7c8f-421b-b271-a55fdfbdadc6",
        "name": "Rina Sappell",
        "age": "93",
        "address": "637 Talisman Way"
    }, {
        "key": "b68d23b7-cdd0-49c7-a2aa-58b1e3b34466",
        "name": "Steffen Hoppner",
        "age": "85",
        "address": "3622 Arkansas Way"
    }, {
        "key": "e6f2c7fb-fbb0-4d6c-8fa2-98e6afce84c5",
        "name": "Cinnamon Stronach",
        "age": "47",
        "address": "02 Fair Oaks Way"
    }, {
        "key": "cbeaa7f1-4811-4955-b2e6-5ebe3e47756e",
        "name": "Conni Sueter",
        "age": "52",
        "address": "02028 Burrows Way"
    }, {
        "key": "ac35528b-89eb-4191-b661-e4b9f18ede7f",
        "name": "Kipp Dearnley",
        "age": "08",
        "address": "221 Lyons Parkway"
    }, {
        "key": "c77f3c66-545a-41b1-9c56-53f3735bcb04",
        "name": "Sybilla Masselin",
        "age": "41",
        "address": "6 Harper Lane"
    }, {
        "key": "a83c8fed-3e83-4f53-bcd5-8b69beecfb53",
        "name": "Luigi Butland",
        "age": "45",
        "address": "833 Hollow Ridge Trail"
    }, {
        "key": "db17c6a2-9222-4287-98b6-2424aa22a3c2",
        "name": "Bentlee Davydychev",
        "age": "13",
        "address": "7051 Morrow Alley"
    }, {
        "key": "3225f3d9-f914-4a0a-9fc8-e08c93977c42",
        "name": "Josy Potell",
        "age": "31",
        "address": "1909 Blackbird Lane"
    }, {
        "key": "9ba42ea4-bafd-4789-a044-0fd45852c47d",
        "name": "Hamish Waine",
        "age": "53",
        "address": "86 Armistice Terrace"
    }, {
        "key": "8fe5b7d8-26ea-49f2-be03-ae675d8a34c9",
        "name": "Pia Deners",
        "age": "45",
        "address": "0 Larry Parkway"
    }, {
        "key": "234ac914-fdf8-471a-a9dd-daecc23af5f2",
        "name": "Cletis Haseley",
        "age": "18",
        "address": "4 Moulton Circle"
    }, {
        "key": "42b9c930-58fa-4a7b-9eec-6bf3531c43da",
        "name": "Rolf Sirr",
        "age": "91",
        "address": "7399 Steensland Terrace"
    }, {
        "key": "cdc5ba98-5a01-40ae-a68c-8c5eb70d02d8",
        "name": "Felecia Webland",
        "age": "69",
        "address": "879 Vahlen Court"
    }, {
        "key": "ae6685c5-abe8-4d7f-a66b-8f7b012a48a1",
        "name": "Cayla Ballach",
        "age": "18",
        "address": "9260 Hagan Street"
    }, {
        "key": "c492e25e-eea5-4055-8d4f-0d3375d9c79d",
        "name": "Inez Fountain",
        "age": "14",
        "address": "7023 Center Drive"
    }, {
        "key": "6e6eeb8c-0fb0-4e92-accd-31bb3dc0c8e4",
        "name": "Clem Macvain",
        "age": "75",
        "address": "33553 Hollow Ridge Point"
    }, {
        "key": "eab26140-309a-4727-aa5a-4c336534bbf1",
        "name": "Alric Albers",
        "age": "99",
        "address": "4603 High Crossing Way"
    }, {
        "key": "15514bd1-70d2-4120-a2dd-71477f896cfd",
        "name": "Priscella Starkie",
        "age": "86",
        "address": "28 Bellgrove Pass"
    }, {
        "key": "565c6c31-fc26-4c2b-8699-ee3046dd22ae",
        "name": "Martyn Batty",
        "age": "53",
        "address": "736 Laurel Drive"
    }, {
        "key": "41fcf912-89b8-4b1a-bb09-c3bc0588ff83",
        "name": "Starr Palluschek",
        "age": "26",
        "address": "48260 Porter Trail"
    }, {
        "key": "3c734738-ba22-4485-8b9d-f895864e3014",
        "name": "Eward Cordero",
        "age": "93",
        "address": "714 Derek Way"
    }, {
        "key": "e3f0dd61-5056-406a-81be-8b314a0e2d5f",
        "name": "Rickie Whitemarsh",
        "age": "34",
        "address": "77044 Doe Crossing Place"
    }, {
        "key": "04601a82-fc61-4d58-af28-d0d9ce1ce711",
        "name": "Mateo Turfin",
        "age": "14",
        "address": "78267 Debra Lane"
    }, {
        "key": "e5709405-2fd0-4e25-a9f8-e4f73c1f8c30",
        "name": "Helyn Manifould",
        "age": "59",
        "address": "645 Badeau Road"
    }, {
        "key": "e679b8d5-966f-4bb6-a14b-15d6b51ca1b5",
        "name": "Ardisj Rodriguez",
        "age": "40",
        "address": "12 Blue Bill Park Terrace"
    }, {
        "key": "b5e51d77-ad8c-4d8e-81f4-6e14bd2582b7",
        "name": "Gavra Woolam",
        "age": "01",
        "address": "18 Northwestern Terrace"
    }, {
        "key": "415a2e81-cd24-429c-a83d-f7b262acb18e",
        "name": "Starlene Melling",
        "age": "90",
        "address": "333 Mallard Way"
    }, {
        "key": "a5fdcc7c-64f9-4047-93d5-5f85f4bbaf22",
        "name": "Biddie Eland",
        "age": "52",
        "address": "846 Calypso Junction"
    }, {
        "key": "c1113f64-a277-44a7-a8a7-2321a7e6e93e",
        "name": "Vinnie Dunham",
        "age": "32",
        "address": "064 Nelson Trail"
    }, {
        "key": "990ea84c-ddcb-42cc-9b63-01f8960f63a0",
        "name": "Susette Blaze",
        "age": "93",
        "address": "80824 Bowman Road"
    }, {
        "key": "f1414e2e-a2d1-437b-96ce-b0ae50cb65c8",
        "name": "Kalindi Caff",
        "age": "13",
        "address": "3 Homewood Street"
    }, {
        "key": "e69f87ac-2567-4642-a6c4-e61654702622",
        "name": "Berkeley Wake",
        "age": "45",
        "address": "52 Scoville Crossing"
    }]

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
        <MainBlock title="Teachers" showBreadcrumb={true}>
            <SearchTable columns={columns} dataSource={dataSource} />
        </MainBlock>
    )
}