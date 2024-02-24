import { INSTAGRAM_URL, PHONE, TELEGRAM_URL, VK_URL } from "@/shared/constants";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const ShopFooter = () => {
  return (
    <footer className="p-8 py-20 lg:py-40 lg:p-16 flex flex-col gap-8 items-center text-center">
      <div className="flex flex-col gap-1 text-base lg:text-xl">
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
        <Link href={TELEGRAM_URL} target="_blank">
          <SocialIcon url={TELEGRAM_URL} as="span" />
        </Link>
        <Link href={VK_URL} target="_blank">
          <SocialIcon url={VK_URL} as="span" />
        </Link>
        <Link href={INSTAGRAM_URL} target="_blank">
          <SocialIcon url={INSTAGRAM_URL} as="span" />
        </Link>
      </section>
    </footer>
  );
};

export default ShopFooter;
