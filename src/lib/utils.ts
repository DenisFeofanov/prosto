import { ModalOptions } from "@/interfaces/Modal";
import { Bouquet, CartItem, Size } from "@/interfaces/Order";
import { ValidateStatus } from "@/interfaces/OrderForm";
import {
  AMOUNT,
  DESCRIPTION,
  HAS_SIZE,
  NAME,
  PHOTOS,
  PHOTOS_L,
  PHOTOS_M,
  PHOTOS_S,
  PRICE,
} from "@/shared/bouquetsDatabaseProperties";
import { isFullPage } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Modal } from "antd";
import { CartState } from "./redux/cartSlice";

/**
 * Parses the response from the API into an array of Bouquet objects
 */
export function parseBouquets(data: QueryDatabaseResponse): Bouquet[] {
  return data.results.map(flower => {
    if (
      isFullPage(flower) &&
      flower.properties[PRICE].type === "number" &&
      flower.properties[NAME].type === "title" &&
      flower.properties[AMOUNT].type === "number" &&
      flower.properties[DESCRIPTION].type === "rich_text" &&
      flower.properties[HAS_SIZE].type === "formula" &&
      flower.properties[HAS_SIZE].formula.type === "boolean" &&
      flower.properties[PHOTOS].type === "files" &&
      flower.properties[PHOTOS_S].type === "files" &&
      flower.properties[PHOTOS_M].type === "files" &&
      flower.properties[PHOTOS_L].type === "files"
    ) {
      return {
        id: flower.id,
        price: flower.properties[PRICE].number as number,
        name: flower.properties[NAME].title[0].plain_text,
        description: flower.properties[DESCRIPTION].rich_text[0].plain_text,
        amountAvailable: flower.properties[AMOUNT].number as number,
        hasSize: flower.properties[HAS_SIZE].formula.boolean as boolean,
        photos: parsePhotos(flower.properties[PHOTOS].files),
        photosSizeS: parsePhotos(flower.properties[PHOTOS_S].files),
        photosSizeM: parsePhotos(flower.properties[PHOTOS_M].files),
        photosSizeL: parsePhotos(flower.properties[PHOTOS_L].files),
      };
    } else {
      throw new Error(
        "Failed to parse data. Check that the data is in the correct format."
      );
    }
  });
}

interface FileEntry {
  file: {
    url: string;
    expiry_time: string;
  };
  name: string;
  type?: "file";
}

interface ExternalEntry {
  external: {
    url: string;
  };
  name: string;
  type?: "external";
}

type Files = (FileEntry | ExternalEntry)[];

export function parsePhotos(photos: Files): string[] {
  const photoUrls: string[] = [];
  for (const file of photos) {
    if (file.type === "external") {
      photoUrls.push(file.external.url);
    } else if (file.type === "file") {
      photoUrls.push(file.file.url);
    }
  }
  return photoUrls;
}

export function convertOrderToString(orderedBouquets: CartItem[]): string {
  return orderedBouquets
    .reduce((acc, orderedBouquet) => {
      const size = orderedBouquet.size ? `размер ${orderedBouquet.size}, ` : "";
      const note = orderedBouquet.note
        ? `открытка "${orderedBouquet.note}", `
        : "";
      return `${acc}- ${orderedBouquet.data.name}, ${size}${note}цена ${orderedBouquet.data.price}р\n`;
    }, "")
    .trimEnd();
}

export function formatPrice(price: number): string {
  return `${price} руб.`;
}

export function calculateRemainingAmount(
  bouquet: Bouquet,
  cart: CartState
): number {
  if (bouquet === null) {
    return 0;
  }

  const sameIdBouquets = cart.bouquets.filter(
    orderedBouquet => orderedBouquet.data.id === bouquet.id
  );

  const alreadyOrderedAmount = sameIdBouquets.length;

  return bouquet.amountAvailable - alreadyOrderedAmount;
}

export function isSize(value: string): value is Size {
  return value === "S" || value === "M" || value === "L";
}

export function createModalShowFunc() {
  let modal: any = null;

  return (options: ModalOptions) => {
    if (modal !== null) {
      return;
    }

    modal = Modal.confirm({
      ...options,
      afterClose() {
        modal = null;
        if (options.afterClose === undefined) {
          return;
        }
        options.afterClose();
      },
    });
  };
}

export function calculateFullPrice(cart: CartState): number {
  return cart.bouquets.reduce((acc, { data }) => acc + data.price, 0);
}

export const validatePhoneNumber = (
  phone: string
): {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
} => {
  const phoneRegex = new RegExp(/^(8|\+7)\d{3}\d{3}\d{2}\d{2}$/);
  if (phone === "") {
    return {
      validateStatus: "error",
      errorMsg: null,
    };
  }
  if (phoneRegex.test(phone)) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
  return {
    validateStatus: "error",
    errorMsg: "Некорректный формат телефона",
  };
};

export function calculateNonWorkingHours({
  from,
  to,
}: {
  from: number;
  to: number;
}): number[] {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    if (i < from || i >= to) {
      hours.push(i);
    }
  }
  return hours;
}
