import { Card } from "antd"
import Meta from "antd/es/card/Meta"
import React from "react"

export const VideoCard: React.FC = () => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>

    )
}