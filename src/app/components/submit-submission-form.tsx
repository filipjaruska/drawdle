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
import { useUser } from "@clerk/clerk-react";



interface Props {
    draweekId: string,
}

const fromSchema = z.object({
    description: z.string().min(1),
});

const SubmitSubmissionForm = ({ draweekId }: Props) => {
    // const { user } = useUser();
    const userName = "user!.fullName";
    if (!userName) throw new Error("User not authorized");

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            description: '',
        },
    });

    async function onSubmit(value: z.infer<typeof fromSchema>) {
        await createSubmission(value, draweekId, userName).then(result => {
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
        <div className='border-4 border-blue-500 m-4'>
            <h1 className="text-4xl text-center">Submit form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
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
                        <SimpleUploadButton />
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SubmitSubmissionForm