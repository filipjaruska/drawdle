import { SignedIn, SignedOut } from "@clerk/nextjs";
import UploadImage from "../_components/UploadImage";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function MyDrawdle() {
    const images = await getMyImages();
    async function Images() {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="p-4 border-dashed border-2 border-sky-700 divide-y divide-blue-200">
                        {/* use next Image for the competition, costs money if used too much, nextConfig needs to allow for mnow */}
                        <img src={image.url} className="p-2 w-full h-5/6" />
                        <div className="text-xl">{image.name}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <main className="pt-1">
            <SignedOut>
                <div className="w-full h-full text-2xl text-center ">Please sign in above.</div>
            </SignedOut>
            <SignedIn>
                <UploadImage h1Name="Welcome to your Image Gallery, put here button to upload images! make into ist own client component and put it in /mygalery" />
                {/* <div>
          if {images.length} === getMySubmittedImages + 1 then hide the upload button 
                NO INSTEAD MOVE UPLOAD TO THE SUBMIT IN THE "EVENT" AND PUT PROFILE HERE WITH EDIT BUTTON
        </div> */}
                <Images />
            </SignedIn>
        </main>
    );
}
