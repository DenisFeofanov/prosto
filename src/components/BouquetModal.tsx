import { Bouquet } from "@/interfaces/Bouquet";
import { formatPrice } from "@/lib/utils";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/shared/constants";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PrimaryButton from "./PrimaryButton";

interface Props extends React.PropsWithChildren {
  bouquet: Bouquet | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function BouquetModal({
  bouquet,
  isOpen,
  closeModal,
  children,
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog
        className="peer backdrop:bg-[black]/80 rounded-md hide-scrollbar max-w-none"
        ref={modalRef}
        onClick={e => e.target === modalRef.current && closeModal()}
      >
        {bouquet ? (
          <div className="relative rounded-md bg-white pt-16 p-6 max-w-[30rem] lg:min-w-[80vw] lg:p-12">
            <button
              className="absolute top-2 right-2 p-2"
              type="button"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            <div className="flex flex-col items-start gap-4 lg:flex-row lg:gap-16">
              <Image
                className="rounded-md fine-pointer:group-hover:shadow-2xl"
                src={bouquet.photos[0]}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt="Фото букета"
              />

              <div>
                <h2 className="text-2xl font-bold mb-4">{bouquet.name}</h2>
                <p className="text-gray-600 mb-4">{bouquet.description}</p>
                <p className="text-lg font-bold mb-4">
                  {formatPrice(bouquet.price)}
                </p>

                <PrimaryButton onClick={() => console.log("TODO: buy bouquet")}>
                  Купить
                </PrimaryButton>
              </div>
            </div>
          </div>
        ) : (
          "Error: bouquet is null"
        )}
      </dialog>
      <div className="peer-open:blur-md">{children}</div>
    </>
  );
}
