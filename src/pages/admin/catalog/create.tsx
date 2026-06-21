import React, { useEffect, useState } from "react";
import { MainBlock } from "../../../components";
import { Form, GetProp, message, notification, Tabs, UploadFile, UploadProps } from "antd";
import { MoviesForm, TvShowForm } from "./forms";
import { CatalogController } from "../../../controllers";
import { useParams } from "react-router-dom";

interface CatalogValues {
    title: string;
    type: string;
    release_year: number;
    genre: string[];
    rating: number;
    bg_image: any;
    description: string | "";
    cast: string[] | [];
    show_details: [],
    season: string;
    episode: string;
    intro_start_time: any;
    intro_end_time: any;
    duration_minutes: number;
    file_path: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const catalogCtrl = new CatalogController();

export const CatalogCreate: React.FC = () => {
    const [form] = Form.useForm();
    const { uuid } = useParams();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string | null>('movie');

    const fetchCatalog = async () => {
        try {
            setActiveTab('tvshow');
            if (uuid) {
                const catalog = await catalogCtrl.getCatalog(uuid);
                form.setFieldsValue(catalog.data);
            }
        } catch (error) {
            console.error('Error fetching catalog:', error);
        }
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        accept: '.mp4, .avi, .flv, .mkv, .mov, .wmv, .webm',
        beforeUpload: (file: FileType) => {
            setFileList((prev) => [...prev, file]);
            return false;
        },
        fileList,
        onRemove: (file: UploadFile) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid)); // Remove file from state
        }
    }

    const onChangeTab = (key: string) => {
        setActiveTab(key);
    }

    const handleUpload = async (values: CatalogValues) => {
        const formData = new FormData();
        formData.append('type', activeTab || "movie");
        formData.append('bg_image', values.bg_image);
        if (activeTab == 'tvshow') {
            if (values.show_details.length === 0) {
                message.error('Please select at least one file before uploading.');
                return;
            }
            values.show_details.forEach((element: any) => {
                formData.append(`file`, element.file_path as any)
                formData.append(`metadata`, JSON.stringify({
                    name: values.title.toLowerCase(),
                    season: element.season,
                    episode: element.episode
                }));
            });

            formData.append('values', JSON.stringify({
                title: values.title,
                type: activeTab,
                release_year: values.release_year,
                genre: values.genre,
                rating: values.rating,
                show_details: values.show_details.map((value: any) => {
                    return {
                        season: value.season,
                        title: value.title,
                        episode: value.episode,
                        intro_start_time: value.intro_start_time.format("HH:mm:ss"),
                        intro_end_time: value.intro_end_time.format("HH:mm:ss"),
                        next_episode_time: value.next_episode_time.format("HH:mm:ss")
                    }
                })
            }))
        } else {
            formData.append('values', JSON.stringify({
                title: values.title,
                type: activeTab,
                release_year: values.release_year,
                genre: values.genre,
                rating: values.rating,
                cast: values.cast,
                description: values.description,
                intro_start_time: values.intro_start_time.format("HH:mm:ss"),
                intro_end_time: values.intro_end_time.format("HH:mm:ss"),
            }))
            formData.append(`file`, values.file_path as any)
        }

        try {
            setUploading(true);
            if (uuid) {
                const response = await catalogCtrl.addEpisode(uuid, formData);

                if (response.status === 200) {
                    notification.success({
                        message: "Upload successful.",
                        description: "The content has been uploaded successfully."
                    });
                } else {
                    const errorData = await response.json();
                    console.error('Upload failed:', errorData);
                    message.error('Upload failed. Please try again.');
                }
            } else {
                const response = await catalogCtrl.uploadFile(formData);

                if (response.status === 201) {
                    notification.success({
                        message: "Upload successful.",
                        description: "The content has been uploaded successfully."
                    });
                } else {
                    const errorData = await response.json();
                    console.error('Upload failed:', errorData);
                    message.error('Upload failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error during upload:', error);
            message.error('An unexpected error occurred during the upload.');
        } finally {
            setUploading(false);
        }
    }

    const onCreate = async (values: CatalogValues) => {
        await handleUpload(values);
    }

    useEffect(() => {
        if (uuid) {
            fetchCatalog();
        }
    }, [uuid]);

    return (
        <MainBlock title="Add Catalog" showBreadcrumb={true}>
            <Tabs onChange={onChangeTab} activeKey={activeTab || 'movie'}>
                {!uuid &&
                    <Tabs.TabPane tab="Movie" key="movie">
                        {activeTab === 'movie' &&
                            <MoviesForm
                                form={form}
                                onCreate={onCreate}
                                uploadProps={props}
                                saving={uploading}
                                disabled={activeTab !== 'movie'}
                            />
                        }
                    </Tabs.TabPane>
                }
                <Tabs.TabPane tab="Tv Show" key="tvshow">
                    {activeTab === 'tvshow' &&
                        <TvShowForm
                            form={form}
                            onCreate={onCreate}
                            uploadProps={props}
                            saving={uploading}
                            disabled={activeTab !== 'tvshow'}
                        />
                    }
                </Tabs.TabPane>
            </Tabs>
        </MainBlock>
    )
}