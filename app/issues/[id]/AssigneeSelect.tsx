"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("/api/users")
        .then((res) => res.data)
        .catch((error) => error),
    staleTime: 60 * 1000,
    retry: 3,
  });

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, { assignToUserId: userId })
            .catch((error) => toast.error("An Unexpected Error Occurred!"));
        }}
        defaultValue={issue.assignToUserId || " "}
      >
        <Select.Trigger placeholder="Asign..." />
        <Select.Content>
          <Select.Group>
            <Select.Item value="0" disabled>
              Suggesations
            </Select.Item>
            <Select.Item value=" ">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                Rahul
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
