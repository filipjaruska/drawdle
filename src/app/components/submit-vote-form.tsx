'use client';
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CreateVote } from '~/server/actions/create-vote';
import { toast } from 'sonner';

interface Props {
    pollingId: string,
}

const fromSchema = z.object({
    description: z.string().min(1),
});

const SubmitVoteForm = ({ pollingId }: Props) => {
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            description: '',
        },
    });

    async function onSubmit(value: z.infer<typeof fromSchema>) {
        await CreateVote(pollingId, value).then(result => {
            if (result?.success) {
                form.reset();
                toast.success(result.success);
            }
            if (result?.error) {
                toast.error(result.error);
            }
        })

    }

    return (
        <div className="border border-gray-200 border-opacity-80 p-6 rounded-lg bg-slate-700 shadow-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 flex flex-col'>
                    <h1 className="text-4xl text-center">Have an Idea? GIVE IT!</h1>
                    <div>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} id='description' name='description' placeholder='description' type='text' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SubmitVoteForm