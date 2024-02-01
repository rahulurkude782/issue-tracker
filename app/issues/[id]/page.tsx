import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import prisma from "../../../prisma/client";
import Link from "next/link";
import IssueEditButton from "./IssueEditButton";
import IssueDetail from "./IssueDetail";
import IssueDeleteButton from "./IssueDeleteButton";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue!} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <IssueEditButton issueId={issue!.id} />
            <IssueDeleteButton issue={issue} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
