import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import React from "react"

interface VideoCardProps {
    title: string;
    description?: string;
    image?: string;
}

interface ListVideoCardProps {
    videos: VideoCardProps[]
}

export const VideoCard: React.FC<ListVideoCardProps> = ({ videos }) => {
    return (
        <Row gutter={16}>
            {
                videos.map((video, index) => {
                    return (
                        <Col span={8}>
                            <Card
                                key={index}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={video.image} />}
                            >
                                <Meta title={video.title} description={video.description} />
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>

    )
}