import { Order, OrderedItem } from "@/interfaces/Order";
import { convertOrderToString } from "@/lib/utils";
import { AMOUNT } from "@/shared/bouquetsDatabaseProperties";
import { NOTION_ORDERS_DATABASE_ID, NOTION_TOKEN } from "@/shared/envVariables";
import {
  ADDRESS,
  CLIENT_NAME,
  CLIENT_PHONE,
  DELIVERY_TIME,
  ORDER,
  PICKUP_TIME,
  RECIPIENT_NAME,
  RECIPIENT_PHONE,
  TOTAL,
} from "@/shared/ordersDatabaseProperties";
import { Client } from "@notionhq/client";

const notionClient = new Client({
  auth: NOTION_TOKEN,
});

export async function POST(request: Request) {
  // using "as" because request has typed body from function createOrder()
  const { order } = (await request.json()) as { order: Order };
  const databaseId = NOTION_ORDERS_DATABASE_ID;
  let properties,
    sharedProperties = {
      [TOTAL]: {
        number: order.total,
      },
      [ORDER]: {
        rich_text: [
          {
            text: {
              content: convertOrderToString(order.items),
            },
          },
        ],
      },
      [CLIENT_NAME]: {
        title: [
          {
            text: {
              content: order.clientName,
            },
          },
        ],
      },
      [CLIENT_PHONE]: {
        phone_number: order.clientPhone,
      },
    };

  if (!databaseId) {
    return Response.json(
      {
        error: {
          message: "Missing environment variable NOTION_ORDERS_DATABASE_ID",
        },
      },
      {
        status: 500,
        statusText: "An error occurred while querying the Notion database",
      }
    );
  }

  switch (order.kind) {
    case "pickup":
      properties = {
        ...sharedProperties,

        [PICKUP_TIME]: {
          date: {
            start: order.pickupTime,
          },
        },
      };
      break;
    case "delivery":
      properties = {
        ...sharedProperties,
        [RECIPIENT_NAME]: {
          rich_text: [
            {
              text: {
                content: order.recipientName,
              },
            },
          ],
        },
        [RECIPIENT_PHONE]: {
          phone_number: order.recipientPhone,
        },
        [ADDRESS]: {
          rich_text: [
            {
              text: {
                content: order.address,
              },
            },
          ],
        },
        [DELIVERY_TIME]: {
          select: {
            name: order.deliveryTime,
          },
        },
      };
      break;

    default:
      properties = sharedProperties;
      break;
  }

  try {
    const response = await notionClient.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties,
    });

    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { id, amount } = await request.json();
  try {
    const response = await notionClient.pages.update({
      page_id: id,
      properties: {
        [AMOUNT]: {
          number: amount,
        },
      },
    });
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}
