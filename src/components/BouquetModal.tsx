import { Bouquet } from "@/interfaces/Bouquet";
import { formatPrice } from "@/lib/utils";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

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
        className="peer backdrop:bg-[black]/80 bg-transparent w-full max-w-none max-h-none mx-0 my-0 md:max-w-[70rem] md:m-auto hide-scrollbar"
        ref={modalRef}
        onClick={e => e.target === modalRef.current && closeModal()}
      >
        {bouquet ? (
          <div className="relative rounded-md bg-white pt-16 p-6 sm:p-12">
            <button
              className="absolute top-2 right-2 block ml-auto p-2"
              type="button"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            <div className="flex flex-col sm:flex-row items-start gap-16">
              {/* <Image
                className="rounded-md fine-pointer:group-hover:shadow-2xl"
                src={bouquet.photos[0]}
                width={300}
                height={300}
                alt="Фото букета"
                priority
              />
              <Image
                className="rounded-md fine-pointer:group-hover:shadow-2xl"
                src={bouquet.photos[0]}
                width={300}
                height={300}
                alt="Фото букета"
                priority
              />

              <Image
                className="rounded-md fine-pointer:group-hover:shadow-2xl"
                src={bouquet.photos[0]}
                width={300}
                height={300}
                alt="Фото букета"
                priority
              />

              <Image
                className="rounded-md fine-pointer:group-hover:shadow-2xl"
                src={bouquet.photos[0]}
                width={300}
                height={300}
                alt="Фото букета"
                priority
              /> */}

              <div>
                <h2 className="text-2xl font-bold mb-4">{bouquet.name}</h2>
                <p className="text-gray-600 mb-4">{bouquet.description}</p>
                <p className="text-lg font-bold mb-4">
                  {formatPrice(bouquet.price)}
                </p>
              </div>
            </div>

            {/* <div className="flex items-center">
              <button
                onClick={decreaseAmount}
                className="bg-gray-300 px-3 py-1 rounded-l"
              >
                -
              </button>
              <span className="mx-3">{amount}</span>
              <button
                onClick={increaseAmount}
                className="bg-gray-300 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div> */}
          </div>
        ) : (
          "Error: bouquet is null"
        )}
      </dialog>
      <div className="peer-open:blur-md">{children}</div>
    </>
  );
}
