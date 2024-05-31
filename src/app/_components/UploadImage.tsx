import { SimpleUploadButton } from "../components/simple-upload-button";

const UploadImage = ({ h1Name }: { h1Name: string }) => {
    return (
        <div className="p-4 bg-gray-700">
            <h1 className="text-4xl text-center">{h1Name}</h1>
            <p className="text-center text-gray-500">Descripton of stuff, recomend to scan images using x app</p>
            <div className="flex justify-center">
                <SimpleUploadButton />
            </div>
        </div>
    )
}

export default UploadImage