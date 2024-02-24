import { INSTAGRAM_URL, PHONE, TELEGRAM_URL, VK_URL } from "@/shared/constants";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const ShopFooter = () => {
  return (
    <footer className="bg-[#f5f5f5] p-16 flex flex-col gap-8 items-center text-center">
      <div className="flex flex-col gap-1 text-xl">
        <p>Город Нижний Тагил, проспект Строителей 13</p>

        <p>С 10:00 до 20:00 каждый день</p>

        <a href={`tel:${PHONE}`}>{PHONE}</a>
      </div>

      <p>
        По любым вопросам и для заказа свяжитесь с нами
        <br />
        по телефону и в соцсетях.
      </p>

      <section className="flex gap-3">
        <Link href={TELEGRAM_URL}>
          <SocialIcon url={TELEGRAM_URL} target="_blank" />
        </Link>
        <Link href={VK_URL}>
          <SocialIcon url={VK_URL} target="_blank" />
        </Link>
        <Link href={INSTAGRAM_URL}>
          <SocialIcon url={INSTAGRAM_URL} target="_blank" />
        </Link>
      </section>
    </footer>
  );
};

export default ShopFooter;
