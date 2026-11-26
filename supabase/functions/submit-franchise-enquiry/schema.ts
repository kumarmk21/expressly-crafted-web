import { z } from "npm:zod@3";

export const FranchiseSchema = z.object({
  first_name: z.string().trim().max(60).optional().default(""),
  last_name: z.string().trim().max(60).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(20),
  location: z.string().trim().max(120).optional().default(""),
  worked_as_franchisee: z.boolean(),
  owns_vehicle: z.boolean(),
  privacy_consent: z.literal(true),
});