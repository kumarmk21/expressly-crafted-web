import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { FranchiseSchema } from "./schema.ts";
import { FRANCHISE_RECIPIENTS, RESUME_RECIPIENTS } from "../_shared/recipients.ts";

Deno.test("Franchise enquiries go only to Nishant", () => {
  assertEquals(FRANCHISE_RECIPIENTS, ["nishant@scorpiongroup.in"]);
});
Deno.test("Every resume notification goes only to HR", () => {
  assertEquals(RESUME_RECIPIENTS, ["hr@scorpiongroup.in"]);
});
Deno.test("Franchise enquiries require privacy consent", () => {
  const enquiry = { email: "applicant@example.com", phone: "9876543210", worked_as_franchisee: false, owns_vehicle: false };
  assertEquals(FranchiseSchema.safeParse({ ...enquiry, privacy_consent: false }).success, false);
  assertEquals(FranchiseSchema.safeParse({ ...enquiry, privacy_consent: true }).success, true);
});