"use client";

import "easymde/dist/easymde.min.css";
import {
  Button,
  Callout,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { z } from "zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const onFormSubmit = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);
    } catch (error) {
      setError("An Unexpected error has occurred.");
      setTimeout(() => setError(""), 3000);
    }
  };

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
      <form className=" space-y-3" onSubmit={handleSubmit(onFormSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
