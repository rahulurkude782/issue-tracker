"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get<User[]>("/api/users");
      if (data) setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Asign..." />
      <Select.Content>
        <Select.Group>
          <Select.Item value="0" disabled>
            Suggesations
          </Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              Rahul
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
