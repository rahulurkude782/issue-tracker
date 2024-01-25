import React from "react";
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
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.status}</p>
      <p>{issue?.createdAt.toDateString()}</p>
      <p>{issue?.description}</p>
    </div>
  );
};

export default IssueDetailsPage;
