import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummery = ({ open, inProgress, closed }: Props) => {
  const cards: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In-progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {cards.map((card) => (
        <Link
          key={card.label}
          href={"/issues/list?status=" + card.status}
          className="w-full"
        >
          <Card>
            <Flex direction="column">
              <Text className="font-medium text-sm">{card.label}</Text>
              <Text className="font-bold">{card.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummery;
