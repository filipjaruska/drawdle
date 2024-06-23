'use client';
import React, { useEffect, useState } from 'react'
import { subscribeUser } from '~/utils/serviceWorker';

const TestPage = () => {


    useEffect(() => {
        async function setUpServiceWorker() {
            try {
                await subscribeUser();
            } catch (error) {
                console.log(error)
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setUpServiceWorker()
    }, [])
    return (
        <></>
    )
}

export default TestPage