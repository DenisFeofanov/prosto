import Home from "@/components/Home";
import { fetchBouquets } from "@/lib/api";

export default async function Page() {
  const bouquets = await fetchBouquets();
  return <Home bouquets={bouquets} />;
}

export const revalidate = 0;
