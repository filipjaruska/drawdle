import { Modal } from "~/app/_components/modal";
import FullPageImageView from "~/app/components/cull-image-page";

export default function ArtPage({
  params: { id: artId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(artId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid ID");

  return <FullPageImageView artId={idAsNumber} bgOn={false} />;
}
