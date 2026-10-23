import { fullAddress, siteConfig } from "@/config/site";
import type { LegalDoc } from "@/components/legal/LegalPage";

/*
 * TODO: these policies are a starting template written for this site's actual forms and
 * services. Have them reviewed by a qualified attorney before launch, and update
 * LAST_UPDATED whenever they change.
 */
const LAST_UPDATED = "October 23, 2026";
const company = siteConfig.legalName;
const brand = siteConfig.name;

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  path: "/privacy-policy/",
  description: `How ${brand} collects, uses and protects information you share through our website, quote forms and text messages.`,
  lastUpdated: LAST_UPDATED,
  intro: `This Privacy Policy explains how ${company} ("${brand}", "we", "us") collects, uses and protects information when you visit our website, request a quote, upload project files or communicate with us by phone, email or text message.`,
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      body: [
        "We collect information you choose to give us, including:",
        {
          list: [
            "Contact details such as your name, company, email address and phone number.",
            "Project details such as location, project type, scope, bid date and notes.",
            "Files you upload or share by link, such as drawings, specifications and addenda.",
            "Your text message preferences, including whether you agreed to transactional or marketing texts.",
          ],
        },
        "When you visit the website, our hosting provider automatically records basic technical information such as your IP address, browser type, pages visited and the date and time of your visit. We use this to keep the site secure and working properly.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use your information",
      body: [
        {
          list: [
            "To review your project and prepare quotes, estimates, takeoffs, drawings and other deliverables.",
            "To communicate with you about your request, your project and our services.",
            "To send text messages you have agreed to receive (see Text messaging below).",
            "To send occasional marketing emails, which you can opt out of at any time.",
            "To protect our website and forms from spam, fraud and abuse.",
            "To meet legal, tax and accounting obligations.",
          ],
        },
      ],
    },
    {
      id: "project-files",
      title: "Project files and confidentiality",
      body: [
        "Drawings, specifications and pricing you send us are treated as confidential. They are used only to provide the services you request, are accessed only by people working on your project and are never shared with other bidders or competitors.",
        "We are happy to sign a non-disclosure agreement for your project. Uploaded files are stored on access-restricted servers and are deleted after a reasonable retention period unless you ask us to keep them for revisions.",
      ],
    },
    {
      id: "text-messaging",
      title: "Text messaging (SMS)",
      body: [
        "If you check a consent box on one of our forms, we may send you text messages. Transactional messages relate to your quote request or project. Marketing messages include estimating tips and offers. The two are optional and separate, and agreeing to either is not a condition of purchase.",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent are excluded from any other sharing described in this policy and will not be shared with any third parties.",
        "You can opt out at any time by replying STOP. See our SMS Terms for full details.",
      ],
    },
    {
      id: "sharing",
      title: "How we share information",
      body: [
        "We do not sell your personal information. We share it only:",
        {
          list: [
            "With service providers who help us run our business, such as web hosting, email delivery and SMS providers, under agreements that require them to protect it.",
            "When required by law, or to protect our rights, our clients or the public.",
            "As part of a merger, acquisition or sale of assets, in which case this policy will continue to apply.",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      // TODO: update this section if analytics, ads or chat tools are added to the site
      body: [
        "Our website does not currently use advertising cookies. If we add analytics tools to understand how visitors use the site, we will update this policy and, where required, ask for your consent.",
      ],
    },
    {
      id: "retention-security",
      title: "Data retention and security",
      body: [
        "We keep personal information only as long as needed for the purposes described here, or as required by law. We use reasonable administrative, technical and physical safeguards to protect it, but no method of transmission or storage is completely secure.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices and rights",
      body: [
        "You can ask us to access, correct or delete the personal information we hold about you, or to stop sending you marketing messages. Depending on your state of residence, you may have additional rights under state privacy laws. To make a request, contact us using the details below. We will not discriminate against you for exercising these rights.",
      ],
    },
    {
      id: "children",
      title: "Children's privacy",
      body: ["Our services are intended for businesses and are not directed to children under 13. We do not knowingly collect information from children."],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top of this page shows when it was last changed. Material changes will be posted on this page before they take effect.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`${company}, ${fullAddress}. Email ${siteConfig.email} or call ${siteConfig.phone}.`],
    },
  ],
};

export const smsTerms: LegalDoc = {
  title: "SMS Terms & Conditions",
  path: "/sms-terms/",
  description: `Terms for the ${brand} text messaging program, including message types, frequency, costs and how to opt out.`,
  lastUpdated: LAST_UPDATED,
  intro: `These terms apply to text messages sent by ${company} ("${brand}") to customers and prospective customers who opt in on our website or in writing.`,
  sections: [
    {
      id: "program",
      title: "Program description",
      body: [
        `${brand} offers two separate, optional text messaging programs:`,
        {
          list: [
            "Transactional messages: updates about your quote request, project scheduling, file delivery, revisions and account questions.",
            "Marketing messages: occasional estimating tips, service announcements and offers.",
          ],
        },
        "You choose each program separately using its own checkbox. Neither box is checked for you, and consent is not a condition of purchasing any service.",
      ],
    },
    {
      id: "frequency-costs",
      title: "Message frequency and costs",
      body: [
        "Message frequency varies. Transactional messages depend on your project activity; marketing messages are typically sent no more than a few times per month.",
        "Message and data rates may apply. Check your mobile plan for details.",
      ],
    },
    {
      id: "opt-out",
      title: "How to opt out",
      body: [
        "Reply STOP to any message to stop receiving texts from that program. You will receive one final message confirming you have been unsubscribed. You can also opt out by contacting us using the details below.",
        "To start receiving messages again, reply START or opt in again on our website.",
      ],
    },
    {
      id: "help",
      title: "Help",
      body: [`Reply HELP for help, or contact us at ${siteConfig.email} or ${siteConfig.phone}.`],
    },
    {
      id: "carriers",
      title: "Carriers",
      body: [
        "Supported carriers include the major US wireless carriers. Carriers are not liable for delayed or undelivered messages.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      body: [
        "You must be at least 18 years old and the account holder, or have the account holder's permission, to opt in. You agree to tell us if you change or deactivate the phone number you gave us.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      body: [
        "We do not sell or share your mobile number or text messaging consent with third parties for their marketing purposes. See our Privacy Policy for how we handle your information.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: ["We may update these terms from time to time. Continued participation after changes are posted means you accept the updated terms."],
    },
  ],
};

export const fulfilmentPolicy: LegalDoc = {
  title: "Fulfilment & Refund Policy",
  path: "/fulfilment-policy/",
  description: `How ${brand} quotes, delivers and revises estimating, takeoff, drafting and detailing work, and how cancellations and refunds are handled.`,
  lastUpdated: LAST_UPDATED,
  intro: `This policy explains how ${company} ("${brand}") delivers its services and how we handle revisions, cancellations and refunds. Project-specific terms in your written quote take priority over this page.`,
  sections: [
    {
      id: "services",
      title: "Services we provide",
      body: [
        "We provide professional construction services delivered digitally, including cost estimates, quantity takeoffs, design-build budgets, drafting and structural detailing. We do not ship physical products.",
      ],
    },
    {
      id: "quotes",
      title: "Quotes and acceptance",
      body: [
        "After reviewing your drawings, we send a written quote with the scope, price and delivery date. Work begins once you accept the quote and any required payment is received.",
        // TODO: confirm payment terms (deposit, payment on delivery, net terms for repeat clients)
        "Payment terms are stated on each quote.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery",
      body: [
        "Deliverables are sent by email or secure download link, typically as Excel workbooks, marked-up PDF drawings and, where applicable, CAD files.",
        "We aim to meet every delivery date in your quote. Delivery dates depend on receiving complete drawings and timely answers to our questions; if information is missing, we will tell you right away and agree on a new date.",
      ],
    },
    {
      id: "revisions",
      title: "Revisions and addenda",
      body: [
        "If you find an error in a deliverable, tell us and we will correct it at no charge.",
        // TODO: confirm how addenda and scope changes are priced
        "Addenda and changes to the scope after work begins are handled as described in your quote. Larger changes may be quoted separately before we proceed.",
      ],
    },
    {
      id: "cancellations",
      title: "Cancellations",
      body: [
        "You may cancel a project at any time by email. If you cancel before work begins, any payment received will be refunded in full. If you cancel after work has started, you will be charged only for the work completed up to that point, and any balance paid will be refunded.",
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      body: [
        "Because our services are custom professional work, completed and delivered projects are generally not refundable. If a deliverable does not match the scope agreed in your quote and we cannot correct it, contact us within 14 days of delivery and we will work with you on a fair resolution, which may include a partial or full refund.",
        "Approved refunds are issued to the original payment method, usually within 5 to 10 business days.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about an order or a refund? Email ${siteConfig.email} or call ${siteConfig.phone}.`],
    },
  ],
};
