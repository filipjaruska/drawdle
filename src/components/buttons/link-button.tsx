"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const LinkButton = ({
  text,
  link,
  message,
}: {
  text: string;
  link: string;
  message: string | null;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        if (message) {
          toast.info(message);
        }
        router.push(link);
      }}
    >
      {text}
    </Button>
  );
};

export default LinkButton;
