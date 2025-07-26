"use client";
import Loading from "@/app/[locale]/_components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addCategory } from "../_action/categories";

type InitialStateType = {
  message?: string;
  error?: ValidationError;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};
const Form = () => {
  const [state, action, isPending] = useActionState(addCategory, initialState);
  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
    if (state.error?.general) {
      toast.error(state.error.general);
    }
  }, [state.message, state.status, state.error]);

  const translations = useTranslations("");
  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">
          {translations("admin.categories.form.name.label")}
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={translations("admin.categories.form.name.placeholder")}
          />
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? <Loading /> : translations("create")}
          </Button>
        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
        {state.error?.general && (
          <p className="text-sm text-destructive">{state.error.general}</p>
        )}
      </div>
    </form>
  );
};

export default Form;
