"use client";

import { useState } from "react";
import { useVerifyOtp } from "@/modules/auth/queries";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OtpForm({ referenceId }: { referenceId: string }) {
  const [otp, setOtp] = useState("");
  const verifyOtp = useVerifyOtp();
  const router = useRouter();

  const submit = async () => {
    await verifyOtp.mutateAsync({
      reference_id: referenceId,
      otp
    });

    toast.success("Account verified. Please login.");
    router.push("/login");
  };

  return (
    <div className="space-y-4">
      <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} />
      <button onClick={submit}>Verify OTP</button>
    </div>
  );
}