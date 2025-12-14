"use client";

import * as React from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form as ShadForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/Select";

interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select" | "date";
  options?: { label: string; value: any }[];
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

interface FormFieldsProps {
  fields: Field[];
  initialData?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void;
  onCancel?: () => void;
}

export default function FormFields({
  fields,
  initialData,
  onSubmit,
  onCancel,
}: FormFieldsProps) {
  const form = useForm({
    defaultValues: initialData || {},
    mode: "onBlur",
  });

  const handleSubmit = (data: FieldValues) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <ShadForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 bg-white dark:bg-[#111] rounded-xl shadow-lg transition-colors"
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              minLength:
                field.minLength && field.type === "text"
                  ? {
                      value: field.minLength,
                      message: `${field.label} must be at least ${field.minLength} characters`,
                    }
                  : undefined,
              maxLength:
                field.maxLength && field.type === "text"
                  ? {
                      value: field.maxLength,
                      message: `${field.label} must be at most ${field.maxLength} characters`,
                    }
                  : undefined,
              pattern:
                field.type === "number"
                  ? { value: /^[0-9]+$/, message: "Only numbers allowed" }
                  : undefined,
            }}
            render={({ field: rhfField, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </FormLabel>

                {field.type === "checkbox" ? (
                  <FormControl>
                    <Checkbox
                      checked={!!rhfField.value}
                      onCheckedChange={rhfField.onChange}
                      className="scale-125"
                    />
                  </FormControl>
                ) : field.type === "select" ? (
                  <FormControl>
                    <Select
                      value={rhfField.value || ""}
                      onValueChange={rhfField.onChange}
                      options={field.options || []}
                    />
                  </FormControl>
                ) : (
                  <FormControl>
                    <Input
                      {...rhfField}
                      type={field.type || "text"}
                      placeholder={field.placeholder || ""}
                      className="border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition-colors dark:bg-[#1f2938] bg-[#fcfcfc]"
                    />
                  </FormControl>
                )}

                {fieldState?.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        ))}

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="px-6 py-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 "
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all"
          >
            Save
          </Button>
        </div>
      </form>
    </ShadForm>
  );
}
