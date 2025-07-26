"use client";
import Loading from "@/app/[locale]/_components/Loading";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Category, Product } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateCategory } from "../_action/categories";

type InitialStateType = {
  message?: string;
  error?: {
    name?: string;
    general?: string;
  };
  status?: number | null;
};

const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};

export function EditCategory({
  category,
}: {
  category: Category & { products: Product[] };
}) {
  const [state, action, isPending] = useActionState(
    updateCategory,
    initialState
  );
  const t = useTranslations("");
  const locale = useLocale();

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
    if (state.error?.general) {
      toast.error(state.error.general);
    }
  }, [state.message, state.status, state.error]);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">{t("admin.categories.edit.title")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] bg-background border-border">
          <form action={action} className="space-y-6">
            <input type="hidden" name="id" value={category.id} />
            <DialogHeader
              className={`space-y-3 ${
                locale === "ar"
                  ? "text-center sm:text-right"
                  : "text-center sm:text-left"
              }`}
            >
              <DialogTitle className="text-xl font-semibold text-foreground">
                {t("admin.categories.edit.title")}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t("admin.categories.edit.description")}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  {t("admin.categories.form.name.label")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={category.name}
                  placeholder={t("admin.categories.form.name.placeholder")}
                  className="focus:ring-2 focus:ring-primary/20 border-input transition-all duration-200"
                />
                {state.error?.name && (
                  <p className="text-sm text-destructive font-medium">
                    {state.error.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="products"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  {t("products")}
                </Label>
                <div className="relative">
                  <div
                    id="products"
                    className="min-h-[2.5rem] p-3 bg-gradient-to-r from-muted/30 to-muted/50 text-muted-foreground border border-input rounded-lg transition-all duration-200 flex items-center"
                  >
                    {category.products.length > 0 ? (
                      <span className="text-sm">
                        {category.products
                          .map((product) => product.name)
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-sm italic opacity-70">
                        {t("noProductsFound")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                  <span>
                    {category.products.length} {t("products")}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row gap-3 w-full">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-input hover:bg-muted/50 transition-colors duration-200"
                >
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
                className="w-1/2 sm:w-auto bg-primary hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loading />
                    <span>{t("saving")}</span>
                  </div>
                ) : (
                  t("save")
                )}
              </Button>
            </DialogFooter>

            {state.error?.general && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive font-medium">
                  {state.error.general}
                </p>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
