"use client";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { SimpleUploadButton } from './simple-upload-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createSubmission } from '~/server/actions/create-submission';
import { toast } from 'sonner';
import Link from 'next/link';

interface Props {
    draweekId: string,
}

const fromSchema = z.object({
    description: z.string().min(1),
});

const SubmitSubmissionForm = ({ draweekId }: Props) => {
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            description: '',
        },
    });

    async function onSubmit(value: z.infer<typeof fromSchema>) {
        await createSubmission(value, draweekId).then(result => {
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
        <div className='border-4 border-gray-200 border-opacity-80 p-1 gap-2 m-4 rounded-lg bg-slate-700 shadow-md items-center flex flex-row justify-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 flex flex-col'>
                    <h1 className="text-4xl text-center">Submit form</h1>
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
                <div className='items-center flex flex-col justify-center'>
                    <div className="text-gray-400">Recommend using
                        <Link href={"https://play.google.com/store/apps/details?id=com.google.android.apps.photos.scanner"} className='hover:underline text-gray-500'> moew </Link>
                        for photos</div>
                    <SimpleUploadButton />
                </div>
            </Form>
        </div>
    )
}

export default SubmitSubmissionForm