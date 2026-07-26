import React, { useCallback, useEffect, useState } from "react";
import { MainBlock, SearchTable } from "../../../components";
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { Button, Space, Tag, Tooltip } from "antd";
import { CatalogController } from "../../../controllers";
import { resolveVType } from "./vtypes";
import { EpisodeForm } from "./forms/editEpisode";

interface EpisodeRow {
    key: string;
    title: string;
    season: number;
    episode_number: number;
    status: string;
    [key: string]: any;
}

const catalogCtrl = new CatalogController();

export const CatalogView: React.FC = () => {
    const [dataSource, setDataSource] = useState<EpisodeRow[]>([]);
    const [showTitle, setShowTitle] = useState<string>('');
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false)
    const { vtype, uuid } = useParams();
    const { label } = resolveVType(vtype);

    const fetchCatalog = async () => {
        if (!uuid) return;
        try {
            setLoading(true);
            const { data } = await catalogCtrl.getCatalog(uuid);
            setShowTitle(data.title ?? '');
            const episodes = (data.seasons ?? []).flatMap((season: any) =>
                (season.episodes ?? []).map((episode: any) => ({
                    ...episode,
                    episode: episode.episode_number,
                    season: season.season_number,
                    uuid: data.uuid,
                    episode_uuid: episode.uuid,
                    key: episode.uuid ?? `${season.season_number}-${episode.episode_number}`,
                }))
            );
            episodes.sort((a: EpisodeRow, b: EpisodeRow) =>
                a.season - b.season || a.episode_number - b.episode_number
            );
            setDataSource(episodes);
        } catch (error) {
            console.error('Error fetching catalog:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = useCallback((record: any) => {
        setData(record);
        setOpen(true);
    }, [open]);

    useEffect(() => {
        fetchCatalog();
    }, [refresh, uuid]);

    const columns = [
        {
            title: 'Episode',
            dataIndex: 'episode_number',
            key: 'episode_number',
            sorter: (a: EpisodeRow, b: EpisodeRow) => a.episode_number - b.episode_number,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: EpisodeRow, b: EpisodeRow) => a.title.localeCompare(b.title),
        },
        {
            title: 'Season',
            dataIndex: 'season',
            key: 'season',
            sorter: (a: EpisodeRow, b: EpisodeRow) => a.season - b.season,
            render: (season: number) => `Season ${season}`,
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
            render: (_: any, record: EpisodeRow) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            type="default"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => { handleEdit(record) }}
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
        <MainBlock title={showTitle || label} showBreadcrumb={true} button={
            <Space>
                <Link to={`/dashboard/catalog/${vtype}/add/${uuid}`}><Button type="primary" size="middle" icon={<PlusSquareOutlined />}>Add Episode</Button></Link>
                <Tooltip title="Refresh">
                    <Button type="default" size="middle" icon={<ReloadOutlined />} onClick={() => setRefresh(!refresh)} />
                </Tooltip>
            </Space>
        }>
            <SearchTable columns={columns} dataSource={dataSource} props={{ loading }} />
            <EpisodeForm title="Edit Episode" data={data} open={open} setOpen={setOpen} okText="Save" cancelText="Cancel" setRefresh={() => setRefresh(prev => !prev)} />
        </MainBlock>
    )
}
