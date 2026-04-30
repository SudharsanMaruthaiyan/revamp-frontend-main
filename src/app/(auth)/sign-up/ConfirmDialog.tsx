"use client";

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ConfirmSignupData } from "./types";

interface ConfirmSignupDialogProps {
  open: boolean;
  data: ConfirmSignupData;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmSignupDialog({
  open,
  data,
  loading,
  onCancel,
  onConfirm,
}: ConfirmSignupDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="text-xl font-semibold">
            Confirm your details
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-600">
            We’ll send an OTP to the phone number below
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 space-y-3 text-sm">
          <InfoRow label="Full Name" value={data.name} />
          <InfoRow label="Phone Number" value={data.phone} />
          <InfoRow label="Email" value={data.email} />
        </div>

        <AlertDialogFooter className="mt-6 gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Edit
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
              active:scale-[0.98]
              disabled:opacity-60
              transition
              cursor-pointer
            "
          >
            {loading ? "Sending OTP..." : "Confirm & Send OTP"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right text-gray-900">
        {value}
      </span>
    </div>
  );
}