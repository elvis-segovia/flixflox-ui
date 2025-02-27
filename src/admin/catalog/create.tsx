import React, { useState } from "react";
import { MainBlock } from "../../components";
import { Form, GetProp, message, notification, Tabs, UploadFile, UploadProps } from "antd";
import { MoviesForm, TvShowForm } from "./forms";
import { CatalogController } from "../../controllers";
import dayjs from "dayjs";

interface CatalogValues {
    title: string;
    type: string;
    release_year: number;
    genre: string[];
    rating: number;
    description: string | "";
    cast: string[] | [];
    season: string;
    episode: string;
    intro_start_time: string;
    intro_end_time: string;
    duration_minutes: number;
    file_path: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const catalogCtrl = new CatalogController();

export const CatalogCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);

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

    const handleContent = async (values: CatalogValues) => {
        if (fileList.length === 0) {
            message.error('Please select at least one file before uploading.');
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as any);
        });
        formData.append('type', activeTab || "movie");

        if (activeTab === 'tvShow') {
            formData.append('name', values.title.toLowerCase());
            formData.append('season', values.season);
            formData.append('episode', values.episode);
        }

        try {
            setUploading(true);
            const response = await catalogCtrl.uploadFile(formData);

            if (response.status === 200) {
                const { file_path } = response.data;
                const catalogResponse = await catalogCtrl.createCatalog({ ...values, file_path });

                if (catalogResponse.status === 201) {
                    notification.success({
                        message: "Upload successful.",
                        description: "The content has been uploaded successfully."
                    });
                    form.resetFields();
                    setFileList([]);
                } else {
                    message.error('Failed to create catalog entry.');
                }
            } else {
                const errorData = await response.json();
                console.error('Upload failed:', errorData);
                message.error('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during upload:', error);
            message.error('An unexpected error occurred during the upload.');
        } finally {
            setUploading(false);
        }
    };

    const onCreate = async (values: CatalogValues) => {
        values.intro_start_time = dayjs(values.intro_start_time).format('HH:mm:ss');
        values.intro_end_time = dayjs(values.intro_end_time).format('HH:mm:ss');
        await handleContent(values);
    }

    return (
        <MainBlock title="Add Catalog" showBreadcrumb={true}>
            <Tabs defaultActiveKey="movie" onChange={onChangeTab}>
                <Tabs.TabPane tab="Movie" key="movie">
                    <MoviesForm form={form} onCreate={onCreate} uploadProps={props} saving={uploading} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tv Show" key="tvShow">
                    <TvShowForm form={form} onCreate={onCreate} uploadProps={props} saving={uploading} />
                </Tabs.TabPane>
            </Tabs>
        </MainBlock>
    )
}