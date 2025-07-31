"use client";

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
import { deleteProduct } from "../_action/Product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Translations {
  edit: string;
  delete: string;
  deleteConfirmationTitle: string;
  deleteConfirmation: string;
  productDeleted: string;
  cancel: string;
}

const BtnDelete = ({
  productId,
  translations,
}: {
  productId: string;
  translations: Translations;
}) => {
  const router = useRouter();
  
  const handleDelete = async (productId: string) => {
    try {
      const result = await deleteProduct(productId);
      if (result?.success) {
        toast.success(translations.productDeleted);
        router.refresh();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
      console.error("Delete error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200 cursor-pointer">
          {translations.delete}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translations.deleteConfirmationTitle}</DialogTitle>
          <DialogDescription>{translations.deleteConfirmation}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">{translations.cancel}</Button>
          <Button 
            variant="destructive"
            onClick={() => handleDelete(productId)}
          >
            {translations.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BtnDelete;