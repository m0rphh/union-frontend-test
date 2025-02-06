import { z } from "zod";

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be valid"),
  dob: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old"),
  country: z.string().nonempty("Country is required"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export const leasingDetailsSchema = z.object({
  productType: z.enum(["Car", "Apartment", "Equipment"]) || z.string(),
  productModel: z.string().nonempty("Product Model is required"),
  leaseDuration: z
    .number()
    .min(1)
    .max(36, "Lease duration must be between 1-36 months"),
  monthlyBudget: z.number().min(500, "Minimum budget is $500"),
});

export type LeasingDetails = z.infer<typeof leasingDetailsSchema>;

const baseAdditionalDetailsSchema = z.object({
  notes: z.string().optional(),
  document: z.instanceof(File).optional(),
  terms: z.boolean().refine((val) => val, "You must agree to the terms"),
  leaseDuration: z
    .number()
    .min(1)
    .max(36, "Lease duration must be between 1-36 months"),
});

export type BaseAdditionalDetails = z.infer<typeof baseAdditionalDetailsSchema>;

const employerDetailsSchema = z.object({
  employerName: z.string().optional(),
  annualIncome: z.number().optional(),
});

export type EmployerDetails = z.infer<typeof employerDetailsSchema>;

export const additionalDetailsSchema = baseAdditionalDetailsSchema.merge(
  employerDetailsSchema
);

// Merge all schemas for full validation
export const formSchema = personalInfoSchema
  .merge(leasingDetailsSchema)
  .merge(additionalDetailsSchema)
  .merge(additionalDetailsSchema)
  .superRefine((data, ctx) => {
    if (data.leaseDuration && data.leaseDuration > 24) {
      if (!data.employerName) {
        ctx.addIssue({
          path: ["employerName"],
          message: "Employer Name is required for leases longer than 24 months",
          code: "custom",
        });
      }
      if (!data.annualIncome) {
        ctx.addIssue({
          path: ["annualIncome"],
          message: "Annual Income is required for leases longer than 24 months",
          code: "custom",
        });
      }
    }
  });
