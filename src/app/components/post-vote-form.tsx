'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Vote } from '~/server/actions/post-vote';

interface Props {
    userId: string,
    pollingId: number;
}

const PostVoteForm = ({ userId, pollingId }: Props) => {
    const form = useForm();

    async function onSubmit() {
        await Vote(userId, pollingId);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type='submit'>
                Vote
            </Button>
        </form>
    );
}

export default PostVoteForm;