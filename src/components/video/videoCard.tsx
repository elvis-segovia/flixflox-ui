import { Card, Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import React from "react"
import { Link } from "react-router-dom";

interface VideoCardProps {
    uuid: string;
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
                        <Link to={`/web/play/${video.uuid}`} key={`player-${index}`}>
                            <Col span={8}>
                                <Card
                                    key={index}
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={video.image || "https://placehold.co/240x135"} />}
                                >
                                    <Meta title={video.title} description={video.description} />
                                </Card>
                            </Col>
                        </Link>
                    )
                })
            }
        </Row>

    )
}