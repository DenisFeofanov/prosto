"use client"; // Error components must be Client Components

import { Button } from "antd";
import Title from "antd/es/typography/Title";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen max-w-[70vw] mx-auto">
      <Title level={1} type="danger">
        Something went wrong!
      </Title>
      <p>{error.message}</p>

      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
