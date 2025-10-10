import { z } from "zod";

export const genders = ["Erkek", "Kadın"] as const;
export type Gender = typeof genders[number];

export const userFormSchema = z.object({

  age: z.coerce.number().int().min(0).max(120),
  height: z.coerce.number().min(100).max(250),
  weight: z.coerce.number().min(20).max(400),
  gender: z.enum(genders, { message: "Cinsiyet seçiniz" }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
