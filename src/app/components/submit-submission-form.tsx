"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { SimpleUploadButton } from "./simple-upload-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSubmission } from "~/server/actions/create-submission";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  draweekId: string;
  canSubmit: boolean;
}

const fromSchema = z.object({
  description: z.string().min(1),
});

const SubmitSubmissionForm = ({ draweekId, canSubmit }: Props) => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(value: z.infer<typeof fromSchema>) {
    await createSubmission(value, draweekId).then((result) => {
      if (result?.success) {
        form.reset();
        toast.success(result.success);
      }
      if (result?.error) {
        toast.error(result.error);
      }
    });
  }

  const [booleanValue, setBooleanValue] = useState(false);

  const handleBooleanChange = (value: boolean) => {
    setBooleanValue(value);
  };

  return (
    <div className="m-4 flex flex-row items-center justify-center gap-2 rounded-lg border border-border bg-card p-1 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <h1 className="text-center text-4xl">Submit form</h1>
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="description"
                      name="description"
                      placeholder="title or a description"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {canSubmit ? (
            <Button type="submit">Submit</Button>
          ) : (
            <div className="text-center font-extrabold text-red-700">
              You do not have permission to submit.
            </div>
          )}
        </form>
        {!booleanValue ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-400">
              Recommend using
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.google.android.apps.photos.scanner"
                }
                className="text-gray-500 hover:underline"
              >
                {" "}
                Photos Scanner{" "}
              </Link>
              for photos
            </div>
            <SimpleUploadButton onBooleanChange={handleBooleanChange} />
          </div>
        ) : (
          <div className="flex w-1/4 items-center justify-center">
            Upload Complete, if you have already uploaded the image before you
            dont have to upload it again, the latest uploaded image will be
            used.
          </div>
        )}
      </Form>
    </div>
  );
};

export default SubmitSubmissionForm;
