import { Empty } from "antd"
import React from "react"
import { MainBlock } from "../../components/block"

export const BlankPage: React.FC = () => {
    return(
        <MainBlock>
            <Empty description={false} />
        </MainBlock>
        
    )
}