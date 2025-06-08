"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: {
  artId: number;
  bgOn: boolean;
}) {
  const image = await getImage(props.artId);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  const user = auth();

  return (
    <div
      className={`z-50 flex items-center justify-center p-4 ${props.bgOn ? "fixed inset-0 bg-black bg-opacity-50" : ""}`}
    >
      <div className="w-full max-w-7xl rounded-lg border border-border bg-card p-6 shadow-lg sm:flex sm:space-x-6">
        <div className="mb-4 flex w-full flex-shrink-0 items-center justify-center sm:mb-0 sm:w-3/4">
          <img
            src={image.url}
            alt={image.name}
            className="w-full rounded-lg object-contain"
          />
        </div>
        <div className="flex w-full flex-shrink-0 flex-col border-t border-border pl-0 pt-4 sm:w-1/4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <div className="mb-4 border-b border-border pb-2 text-center text-2xl text-foreground sm:text-left">
            {image.name}
          </div>
          <div className="flex flex-col p-2 text-foreground">
            <span className="font-semibold">Uploaded by:</span>
            <span>{uploaderInfo.fullName}</span>
          </div>
          <div className="flex flex-col p-2 text-foreground">
            <span className="font-semibold">Submitted on:</span>
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
          </div>
          {user.userId === uploaderInfo.id && (
            <div className="p-2">
              <form
                action={async () => {
                  "use server";
                  await deleteImage(image.id);
                }}
              >
                <p className="text-center text-secondary-foreground">
                  Button rework in patch 0.6
                </p>
                <button
                  type="submit"
                  className="w-full cursor-not-allowed rounded bg-red-600 px-4 py-2 font-bold text-foreground hover:bg-red-700"
                  disabled
                >
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
