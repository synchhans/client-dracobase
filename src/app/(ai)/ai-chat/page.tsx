import { Suspense } from "react";
import AiChatPage from "./AiChatPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading AI Chat...</div>}>
      <AiChatPage />
    </Suspense>
  );
}
