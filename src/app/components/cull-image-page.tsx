import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { artId: number }) {

    const image = await getImage(props.artId);
    return (
        <img src={image.url} alt={image.name} className="w-96" />
    );
}
