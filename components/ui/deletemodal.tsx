"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteModalProps<T = any> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data?: T) => void | Promise<void>;
  data?: T | null;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteModal<T = any>({
  isOpen,
  onClose,
  onConfirm,
  data = null,
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
}: DeleteModalProps<T>) {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    if (!data) return;
    setLoading(true);
    try {
      await onConfirm(data);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-6 bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Trash className="w-6 h-6 text-red-600" />
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Confirmation
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {message}
        </div>

        <DialogFooter>
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {cancelText}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-600 text-white transition"
            >
              {loading ? "Deleting..." : confirmText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
