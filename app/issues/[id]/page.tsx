import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import prisma from "../../../prisma/client";
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
        <Heading as="h2">{issue?.title}</Heading>
        <Flex gap={"3"} my={"2"}>
          <IssueStatusBadge status={issue!.status} />

          <Text as="p">{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt={"4"}>
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>Edit Issue</Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
