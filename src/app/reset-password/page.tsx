// app/reset-password/page.tsx (or .js)
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-white text-center">Loading...</div>}
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
