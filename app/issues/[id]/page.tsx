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
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import { Metadata } from "next";
interface Props {
  params: { id: string };
}

const fetchIssues = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssues(params.id);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue!} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue!} />
            <IssueEditButton issueId={issue!.id} />
            <IssueDeleteButton issue={issue} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const issue = await fetchIssues(params.id);
  return {
    title: issue?.title,
    description: "Description of issue " + issue?.description,
  };
};

export default IssueDetailsPage;
