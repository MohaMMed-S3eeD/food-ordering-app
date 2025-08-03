import React from "react";
import { getUserById } from "@/server/db/user";

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUserById(userId as string);
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>
      <p>{user?.streetAddress}</p>
      <p>{user?.postalCode}</p>
      <p>{user?.city}</p>
      <p>{user?.country}</p>
      <p>{user?.role}</p>
      <p>{user?.createdAt?.toLocaleDateString()}</p>
      <p>{user?.updatedAt?.toLocaleDateString()}</p>
    </div>
  );
};

export default Page;
