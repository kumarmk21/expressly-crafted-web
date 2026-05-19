import LegalLayout from "./LegalLayout";

const Disclaimer = () => (
  <LegalLayout
    title="Disclaimer"
    subtitle="Important information about the use of this website and the limitations of the content we publish."
    lastUpdated="May 2026"
  >
    <h2>1. General Information</h2>
    <p>
      The information provided on this website by Scorpion Express Pvt. Ltd. is for general informational purposes
      only. While we strive to keep the content accurate and current, we make no representations or warranties of any
      kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.
    </p>

    <h2>2. No Professional Advice</h2>
    <p>
      Content on this website does not constitute legal, financial, customs, or regulatory advice. You should consult
      qualified professionals before acting on any information provided here.
    </p>

    <h2>3. Service Information</h2>
    <p>
      Transit times, coverage pincodes, rates, and capabilities described on the website are indicative and may
      change without notice. Binding service commitments are governed only by the contract of carriage and any
      written agreement signed with Scorpion Express.
    </p>

    <h2>4. External Links</h2>
    <p>
      Our website may contain links to third-party websites or services that are not owned or controlled by Scorpion
      Express. We have no control over and assume no responsibility for the content, privacy policies, or practices
      of any third-party websites.
    </p>

    <h2>5. Tracking & Portal Data</h2>
    <p>
      Tracking information displayed in our customer portal and tracking widgets is provided on a best-effort basis.
      Status events depend on field scans and partner uploads and may be delayed or temporarily unavailable.
    </p>

    <h2>6. Limitation of Liability</h2>
    <p>
      In no event shall Scorpion Express, its directors, employees, or partners be liable for any loss or damage
      arising out of or in connection with the use of this website, including indirect or consequential loss.
    </p>

    <h2>7. Trademarks</h2>
    <p>
      "Scorpion Express", the scorpion device, and related marks are trademarks of Scorpion Express Pvt. Ltd. All
      other trademarks shown on this website are the property of their respective owners.
    </p>

    <h2>8. Contact</h2>
    <p>
      For clarifications about this Disclaimer, please contact us at{" "}
      <a href="mailto:Info@Scorpiongroup.in">Info@Scorpiongroup.in</a>.
    </p>
  </LegalLayout>
);

export default Disclaimer;
