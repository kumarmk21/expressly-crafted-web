import { useState } from "react";
import FraudAlertPopup from "@/components/FraudAlertPopup";
import PrivacyNoticePopup from "@/components/PrivacyNoticePopup";

const HomeNotices = () => {
  const [step, setStep] = useState<"fraud" | "privacy" | "done">("fraud");

  return (
    <>
      {step === "fraud" && <FraudAlertPopup onClose={() => setStep("privacy")} />}
      {step === "privacy" && <PrivacyNoticePopup onClose={() => setStep("done")} />}
    </>
  );
};

export default HomeNotices;