import React from 'react'
import { getMyImages } from '~/server/queries'

const RenderImageServer = async () => {
    const images = await getMyImages()
    return (
        <div>
            <img src={images[0]?.url} />
        </div>
    )
}

export default RenderImageServer