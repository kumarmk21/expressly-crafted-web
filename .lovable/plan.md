# Fraud Notice and Enquiry Consent

## Changes
- Replace the home-page fraud alert artwork with a clear branded notice stating that Scorpion Express never requests payments to personal UPI IDs or bank accounts and never charges job applicants any fee.
- Add an unchecked, required privacy-consent box to business, franchise, and quote enquiry forms.
- Link the consent text directly to the existing Privacy Policy and show a clear validation message if consent is missing.
- Update the Privacy Policy wording for enquiry consent and India’s Digital Personal Data Protection Act, 2023.

## Technical details
- Extend each Zod form schema with explicit `privacy_consent: true` validation and enforce the native required checkbox state.
- Submit a consent flag with enquiry records only where the current table supports it; otherwise enforce and document consent in the interface without changing unrelated data structures.
- Verify the notice and consent controls on desktop and mobile, and confirm the current build remains clean.
