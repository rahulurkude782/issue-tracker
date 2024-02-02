import { patchIssueSchema } from "@/app/ValidationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, assignToUserId } = body;

  if (assignToUserId) {
    const user = await prisma?.user.findUnique({
      where: { id: assignToUserId },
    });
    if (!user)
      return NextResponse.json(
        { error: "Invalid AssignToUserId Provided." },
        { status: 404 }
      );
  }

  const issue = await prisma?.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return NextResponse.json({ error: "Invalid Issue" });

  const updatedIssue = await prisma?.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      assignToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma?.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const deletedIssue = await prisma?.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({
    data: deletedIssue,
    message: "Issue Deleted Successfuly",
  });
}
