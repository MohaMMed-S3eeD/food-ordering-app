"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { Category, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { deleteCategory } from "../_action/categories";
import { useActionState, useEffect } from "react";
import Loading from "@/app/[locale]/_components/Loading";
import { toast } from "sonner";

const initialState = {
  error: {},
  message: "",
  status: 0,
};

const DeleteCategory = ({
  category,
}: {
  category: Category & { products: Product[] };
}) => {
  const t = useTranslations("");
  const locale = useLocale();

  const [state, action, isPending] = useActionState(
    deleteCategory,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
    if (state.error?.general) {
      toast.error(state.error.general);
    }
  }, [state, isPending, state.status, state.message, state.error]);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] bg-background border-border">
          <form action={action}>
            <input type="hidden" name="id" value={category.id} />
            <DialogHeader>
              <DialogTitle>{category.name}</DialogTitle>
              <DialogDescription>
                products
                <span className="text-destructive">
                  {category.products.length}
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t("cancel")}</Button>
              </DialogClose>
              <Button disabled={isPending}>
                {isPending ? <Loading /> : t("delete")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCategory;
