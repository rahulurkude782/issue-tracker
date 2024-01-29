"use client";

import { IssueSchema } from "@/app/ValidationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillInfoCircle } from "react-icons/ai";
import { z } from "zod";

import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFormSubmit = handleSubmit(async (data: IssueFormData) => {
    try {
      setIsLoading(true);

      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

      setIsLoading(false);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      setError("An Unexpected error has occurred.");
      setTimeout(() => setError(""), 3000);
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root>
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onFormSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit">
          {issue ? "Update Issue" : "Submit Issue"} {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
