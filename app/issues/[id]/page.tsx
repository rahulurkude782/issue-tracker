import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import prisma from "../../../prisma/client";
import Link from "next/link";
import IssueEditButton from "./IssueEditButton";
import IssueDetail from "./IssueDetail";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <IssueDetail issue={issue!} />
      </Box>
      <Box>
        <IssueEditButton issueId={issue!.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
