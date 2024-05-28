'use client';
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

const UploadImage = ({ h1Name }: { h1Name: string }) => {
    const router = useRouter();
    return (
        <div className="p-4 bg-gray-700">
            <h1 className="text-4xl text-center">{h1Name}</h1>
            <p className="text-center text-gray-500">Descripton of stuff, recomend to scan images using x app</p>
            <div className="flex justify-center">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={() => {
                        router.refresh();
                    }}
                />
            </div>
        </div>
    )
}

export default UploadImage