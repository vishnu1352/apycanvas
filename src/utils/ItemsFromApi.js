import sendRequestFunc from "./sendRequestFunc";
import { BASEURL } from "./URL";

export async function ItemsFromApi(itemType) {
  if (itemType === "" || itemType === undefined) {
    const response = await sendRequestFunc(`${BASEURL}/getAllItems`, "GET");
    if (response.statusCode === 200) {
      return response.allItems;
    }
  } else {
    const response = await sendRequestFunc(
      `${BASEURL}/getItemsByType/${itemType}`,
      "GET"
    );
    if (response.statusCode === 200) {
      return response.allItems;
    }
  }
}
