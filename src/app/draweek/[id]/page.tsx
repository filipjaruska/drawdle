import React from "react";
import { getDraweek, getDraweekSubmissions } from "~/server/queries";

interface Props {
  params: { id: string };
}

const SpecificDraweek = async ({ params }: Props) => {
  const draweek = await getDraweek(Number(params.id));
  const submissions = await getDraweekSubmissions(draweek.id.toString());

  return (
    <div className="container mx-auto my-8 space-y-8 p-4">
      <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
        <h1 className="text-center text-4xl font-semibold text-foreground">
          {draweek?.topic}
        </h1>
        <h2 className="mt-2 text-center text-xl text-secondary-foreground">
          Description or something
        </h2>
      </div>
      <div className="mb-4 flex flex-row justify-between border-b border-border pb-2">
        <div className="text-2xl text-secondary-foreground">Submissions:</div>
        <div className="text-2xl text-secondary-foreground">
          ({submissions.length})
        </div>
      </div>
      <div className="space-y-8">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="rounded-lg border border-border bg-card p-4 shadow-lg"
          >
            <div className="mb-0 flex flex-col items-center sm:mb-2 sm:items-start sm:justify-between">
              <div className="mb-4 flex items-center sm:mb-0">
                <img
                  src={
                    submission.userIcon
                      ? submission.userIcon
                      : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  }
                  alt="user profile"
                  className="mr-4 h-16 w-16 rounded-full"
                />
                <p className="text-lg text-foreground sm:text-2xl">
                  {submission.userName}
                </p>
              </div>
              <p className="hidden pt-2 text-secondary-foreground sm:mt-0 md:block">
                {submission.description}
              </p>
            </div>
            <img
              src={submission.imageUrl}
              alt="submission"
              className="w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificDraweek;
