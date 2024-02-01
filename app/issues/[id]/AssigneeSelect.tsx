"use client";

import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Asign..." />
      <Select.Content>
        <Select.Group>
          <Select.Item value="0" disabled>
            Suggesations
          </Select.Item>
          <Select.Item value="1">Rahul</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
