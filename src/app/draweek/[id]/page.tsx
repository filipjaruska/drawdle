import React from 'react'

interface Props {
    params: { id: string }
}

const SpecificDraweek = async ({ params }: Props) => {
    return (
        <div>{params.id}</div>
    )
}

export default SpecificDraweek