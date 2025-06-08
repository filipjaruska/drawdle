"use client";
import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
interface Props {
  title: string;
  message: string;
}

const FunnyButton = ({ title, message }: Props) => {
  return (
    <Button onClick={() => toast.warning(message, { duration: 4000 })}>
      {title}
    </Button>
  );
};

export default FunnyButton;
