"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteUser } from "../_action/user";

interface BtnDeleteProps {
  userId: string;
  translations: {
    edit: string;
    delete: string;
    deleteConfirmationTitle: string;
    deleteConfirmation: string;
    userDeleted: string;
    cancel: string;
  };
}

const BtnDelete = ({ userId, translations }: BtnDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteUser(userId);
      if (result) {
        toast.success(translations.userDeleted);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50"
        >
          {translations.delete}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translations.deleteConfirmationTitle}</DialogTitle>
          <DialogDescription>
            {translations.deleteConfirmation}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            {translations.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : translations.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BtnDelete;
