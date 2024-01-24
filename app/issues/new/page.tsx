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
      console.log(response);
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
        {errors && <Text color="red">{errors.title?.message}</Text>}
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors && <Text color="red">{errors.description?.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
