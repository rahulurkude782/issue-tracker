import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <main>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummery open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View Summery of issues.",
};
