'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Vote } from '~/server/actions/post-vote';

interface Props {
    userId: string,
    pollingId: number;
}

const PostVoteForm = ({ userId, pollingId }: Props) => {
    const form = useForm();

    async function onSubmit() {
        await Vote(userId, pollingId).then(result => {
            if (result?.success) {
                form.reset();
                toast.success(result.success);
            }
            if (result?.error) {
                toast.error(result.error);
            }
        });
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