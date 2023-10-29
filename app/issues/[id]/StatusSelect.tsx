"use client";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const statuses = [
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={async (status) => {
          try {
            await axios.patch("/api/issues/" + issue.id, {
              status,
            });
            router.refresh();
          } catch (error) {
            toast.error("Changes could not be saved.");
          }
        }}
      >
        <Select.Trigger variant="soft" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
