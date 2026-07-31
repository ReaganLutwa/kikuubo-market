import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router'
import { motion } from 'framer-motion'
import { FileText, ShieldCheck, ArrowLeft } from 'lucide-react'

type Section = { id: string; title: string; body: string[] }
type Doc = { title: string; intro: string; sections: Section[] }

const DOCS: Record<string, Doc> = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Kikuubo Uganda Ltd ("Kikuubo", "we", "us") respects your privacy. This policy explains what we collect, why, and the rights you have under the Data Protection and Privacy Act, 2019 of Uganda.',
    sections: [
      {
        id: 'data-we-collect',
        title: '1. Data we collect',
        body: [
          'When you shop on Kikuubo we collect your name, phone number, delivery address (e.g. your street in Kampala, Wakiso, Jinja or Mbarara), order history and device information such as browser type and IP address. If you create an account we also store your login credentials in encrypted form.',
          'We collect this data to process orders, arrange boda and courier delivery, prevent fraud and improve your shopping experience.',
        ],
      },
      {
        id: 'momo-payments',
        title: '2. Mobile money payment data',
        body: [
          'Payments on Kikuubo are made through MTN Mobile Money and Airtel Money. We never see or store your MoMo PIN. When you pay, we receive only a transaction reference, the amount in UGX and a confirmation status from the payment processor.',
          'Transaction records are retained for seven years as required by Ugandan tax and financial regulations, after which they are securely deleted.',
        ],
      },
      {
        id: 'cookies',
        title: '3. Cookies & local storage',
        body: [
          'We use cookies and browser local storage to keep your cart, remember recently-viewed products and save your preferences such as language and delivery location. See our Cookie Notice for the full list and how to disable them.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Who we share data with',
        body: [
          'We share your delivery details with sellers and delivery riders only as needed to fulfil your order, and payment data with licensed payment processors. We never sell your personal data to third parties. Data may be disclosed to Ugandan authorities only where required by law.',
        ],
      },
      {
        id: 'your-rights',
        title: '5. Your rights under the Data Protection and Privacy Act, 2019',
        body: [
          'Under the Data Protection and Privacy Act, 2019 you have the right to access the personal data we hold about you, to request correction of inaccurate data, to request deletion where data is no longer necessary, and to withdraw consent for marketing messages at any time.',
          'Kikuubo is registered with the Personal Data Protection Office (PDPO). To exercise any of these rights, email privacy@kikuubo.ug and we will respond within 30 days.',
        ],
      },
      {
        id: 'security-contact',
        title: '6. Security & contact',
        body: [
          'We protect your data with encryption in transit, access controls and regular security reviews. If you suspect unauthorised use of your account, contact us immediately at privacy@kikuubo.ug or call our Kampala support line on 0800 100 200 (toll-free).',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro:
      'These Terms govern your use of the Kikuubo marketplace. By creating an account or placing an order you agree to them.',
    sections: [
      {
        id: 'marketplace-role',
        title: '1. Our role as a marketplace',
        body: [
          'Kikuubo is an online marketplace connecting buyers with independent sellers across Uganda. Unless a product is marked "Sold by Kikuubo", the seller is responsible for the product, its description and its legality. Kikuubo provides the platform, payment collection and delivery coordination.',
        ],
      },
      {
        id: 'accounts',
        title: '2. Accounts',
        body: [
          'You must be 18 years or older to hold an account. You are responsible for keeping your login details confidential and for all activity under your account. Provide accurate name, phone number and delivery address details.',
        ],
      },
      {
        id: 'buyer-obligations',
        title: '3. Buyer obligations',
        body: [
          'Buyers must pay the full order amount at checkout via MTN MoMo, Airtel Money, card or Pay on Delivery where available. Do not place orders you do not intend to pay for — repeated fake orders lead to account suspension.',
        ],
      },
      {
        id: 'seller-obligations',
        title: '4. Seller obligations',
        body: [
          'Sellers must list genuine products with accurate descriptions and prices in Uganda Shillings (UGX), dispatch orders within the stated handling time, and honour the Return & Refund Policy. Sellers are responsible for taxes applicable to their sales. Additional obligations are set out in the Store & Seller Credit Terms.',
        ],
      },
      {
        id: 'pricing-orders',
        title: '5. Pricing & orders',
        body: [
          'All prices are displayed in UGX and include VAT where applicable. An order is confirmed when payment is authorised or, for Pay on Delivery, when the order is dispatched. We may cancel orders affected by clear pricing errors and will refund any payment in full.',
        ],
      },
      {
        id: 'prohibited-items',
        title: '6. Prohibited items',
        body: [
          'The following may not be sold on Kikuubo: counterfeit goods, narcotics and unlicensed pharmaceuticals, firearms and explosives, stolen property, endangered wildlife products, and any item prohibited under Ugandan law. Listings violating this rule are removed and offending accounts suspended.',
        ],
      },
      {
        id: 'liability',
        title: '7. Limitation of liability',
        body: [
          'Kikuubo is liable for payment processing and services it performs directly, but not for the quality or legality of third-party sellers\' products, to the extent permitted by law. Our Buyer Protection programme covers non-delivery and items significantly not as described.',
        ],
      },
      {
        id: 'governing-law',
        title: '8. Governing law',
        body: [
          'These Terms are governed by the laws of the Republic of Uganda. Disputes will be resolved first through our resolution centre, then by the courts of Uganda sitting in Kampala.',
        ],
      },
    ],
  },
  returns: {
    title: 'Return & Refund Policy',
    intro:
      'Changed your mind or received a faulty item? Kikuubo Buyer Protection has you covered — here is exactly how returns and refunds work.',
    sections: [
      {
        id: 'return-window',
        title: '1. 7-day return window',
        body: [
          'You may request a return within 7 days of delivery. Start the return from your orders page or by contacting support with your order number. Items must be returned in the condition received, with original packaging, tags and accessories.',
        ],
      },
      {
        id: 'conditions-by-category',
        title: '2. Conditions by category',
        body: [
          'Electronics & phones: returnable if faulty, damaged on arrival or not as described. Change-of-mind returns are accepted only if the seal is unbroken.',
          'Fashion & footwear: returnable if unworn, with tags attached. Try-ons are fine — signs of wear are not.',
          'Farm produce & food items: final sale. For freshness and safety reasons, fresh produce, meat, dairy and other perishables cannot be returned. If your produce arrives spoiled, report it within 24 hours with photos for a replacement or refund.',
        ],
      },
      {
        id: 'return-pickup',
        title: '3. Boda return pickup',
        body: [
          'For addresses within Kampala and Wakiso, we dispatch a boda rider to collect the return at no cost to you for faulty or wrong items. For change-of-mind returns a pickup fee of UGX 5,000 applies. Upcountry customers can drop the item at the nearest courier partner point; we refund reasonable courier costs for verified faulty items.',
        ],
      },
      {
        id: 'refund-processing',
        title: '4. How refunds are paid',
        body: [
          'Once the returned item passes inspection, your refund is sent to the original payment method — MTN MoMo or Airtel Money — within 3-5 business days. Pay on Delivery orders are refunded to your mobile money number after confirmation. You will receive an SMS when the refund is sent.',
        ],
      },
      {
        id: 'exchanges',
        title: '5. Exchanges & disputes',
        body: [
          'Prefer a replacement instead of a refund? Choose "exchange" when opening the return and we will ship the replacement as soon as the return is collected. If a seller disputes your return, Kikuubo\'s resolution team reviews the evidence and decides within 5 business days.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie Notice',
    intro:
      'This notice explains the cookies and local storage Kikuubo uses, what each one does, and how you can control them.',
    sections: [
      {
        id: 'what-we-use',
        title: '1. What we use',
        body: [
          'Kikuubo uses a small number of cookies and browser local storage entries to make the marketplace work smoothly. We do not use third-party advertising trackers.',
        ],
      },
      {
        id: 'essential',
        title: '2. Essential storage',
        body: [
          'Cart (localStorage): keeps the items in your basket so they survive page reloads and app switching. Session cookie: keeps you signed in securely. These are strictly necessary — the shop cannot function without them.',
        ],
      },
      {
        id: 'preferences',
        title: '3. Preferences',
        body: [
          'We store your delivery location (e.g. Kampala Central), preferred language and display preferences in localStorage so you do not have to set them on every visit.',
        ],
      },
      {
        id: 'recently-viewed',
        title: '4. Recently viewed & analytics',
        body: [
          'Your recently-viewed products list is stored locally on your device only — it never leaves your browser. We also use privacy-friendly, aggregated analytics to understand which categories are popular so we can stock what Uganda wants. No individual browsing profiles are built or sold.',
        ],
      },
      {
        id: 'how-to-disable',
        title: '5. How to disable',
        body: [
          'You can block or delete cookies through your browser settings (Chrome: Settings → Privacy and Security → Cookies; Safari: Settings → Privacy). You can also clear localStorage from your browser\'s developer tools or by clearing site data. Note that disabling essential storage will break your cart and sign-in. On Android, clearing the app\'s storage achieves the same result.',
        ],
      },
      {
        id: 'changes-contact',
        title: '6. Changes & contact',
        body: [
          'If we add new cookies we will update this notice and flag the change on the site. Questions? Email privacy@kikuubo.ug.',
        ],
      },
    ],
  },
  'seller-terms': {
    title: 'Store & Seller Credit Terms',
    intro:
      'These terms apply to every seller operating a store on Kikuubo, including commission, payouts and the Kikuubo Seller Credit programme.',
    sections: [
      {
        id: 'commission',
        title: '1. Commission structure',
        body: [
          'Kikuubo charges commission only on completed, delivered orders — listing is free. Commission rates by category: Electronics 8%, Fashion 10%, Farm produce 5%. Commission is calculated on the item price in UGX excluding delivery fees. We may run promotional rate reductions; these are announced in the Seller Hub.',
        ],
      },
      {
        id: 'payouts',
        title: '2. Payouts to your MoMo',
        body: [
          'Seller earnings are paid out every 24 hours to your registered MTN MoMo or Airtel Money number, after the buyer\'s delivery confirmation (or automatically 72 hours after dispatch if the buyer does not confirm). Payouts are net of commission and any applicable fees. Minimum payout is UGX 10,000 — smaller balances roll over to the next cycle.',
        ],
      },
      {
        id: 'seller-credit',
        title: '3. Kikuubo Seller Credit & advances',
        body: [
          'Qualified sellers can access stock advances through Kikuubo Seller Credit. Eligibility requires at least 3 months of selling history, a fulfilment rate above 90% and a store rating of 4.0 or higher. Advances range from UGX 200,000 to UGX 5,000,000 depending on your sales volume.',
          'Advances carry a flat service fee of 6% over a 30-day term. Repayment is deducted automatically as a percentage (default 30%) of each daily payout until the advance is cleared. Early repayment is free and improves your limit. Defaulting on an advance suspends your store and credit eligibility until settled.',
        ],
      },
      {
        id: 'seller-standards',
        title: '4. Seller standards',
        body: [
          'Sellers must dispatch orders within the stated handling time, keep listings accurate, respond to buyer messages within 24 hours and honour the Return & Refund Policy. Selling counterfeit or prohibited items leads to immediate termination.',
        ],
      },
      {
        id: 'suspension',
        title: '5. Suspension & termination policy',
        body: [
          'Stores may be suspended for late dispatch rates above 10%, excessive return disputes, review manipulation or credit default. First-time minor issues receive a warning and 7 days to correct. Serious or repeated violations lead to permanent termination. Suspended sellers may appeal to seller-support@kikuubo.ug; appeals are decided within 10 business days. Legitimate outstanding payouts are released after the returns window closes.',
        ],
      },
      {
        id: 'changes',
        title: '6. Changes to these terms',
        body: [
          'We may update these terms with 14 days\' notice via the Seller Hub and SMS. Continuing to sell after the notice period constitutes acceptance. These terms are governed by the laws of Uganda.',
        ],
      },
    ],
  },
}

const NAV_ORDER = ['privacy', 'terms', 'returns', 'cookies', 'seller-terms'] as const

export default function Legal() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '') || 'privacy'
  const doc = DOCS[slug] ?? DOCS.privacy
  const [active, setActive] = useState(doc.sections[0].id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setActive(doc.sections[0].id)
  }, [slug, doc])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [doc])

  const otherDocs = useMemo(() => NAV_ORDER.filter((k) => k !== slug), [slug])

  return (
    <div className="bg-sand/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-night/60 hover:text-sunset transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to shop
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* TOC sidebar */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="rounded-2xl bg-white/70 backdrop-blur border border-night/5 p-5 shadow-sm">
                <p className="font-sora font-semibold text-night text-sm mb-3 flex items-center gap-2">
                  <FileText size={15} className="text-sunset" /> On this page
                </p>
                <ul className="space-y-1.5">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className={`block text-[13px] leading-snug px-3 py-1.5 rounded-lg transition-colors ${
                          active === s.id
                            ? 'bg-sunset/10 text-sunset font-semibold'
                            : 'text-night/55 hover:text-night hover:bg-night/5'
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 rounded-2xl bg-night text-cream p-5">
                <p className="font-sora font-semibold text-sm mb-3 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-leaf" /> Legal centre
                </p>
                <ul className="space-y-2">
                  {otherDocs.map((k) => (
                    <li key={k}>
                      <Link to={`/${k}`} className="text-[13px] text-cream/60 hover:text-sunset transition-colors">
                        {DOCS[k].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Document card */}
            <article className="flex-1 w-full max-w-3xl rounded-2xl bg-white shadow-lg shadow-night/5 border border-night/5 px-6 py-8 md:px-12 md:py-12">
              <p className="text-xs uppercase tracking-widest text-sunset font-semibold mb-2">Kikuubo Legal</p>
              <h1 className="font-sora font-extrabold tracking-tight text-night text-3xl md:text-4xl">
                {doc.title}
              </h1>
              <p className="mt-2 text-xs text-night/45 font-medium">Last updated: July 2026</p>
              <p className="mt-5 text-night/70 leading-relaxed font-['Inter']">{doc.intro}</p>
              <div className="mt-8 space-y-8">
                {doc.sections.map((s, i) => (
                  <motion.section
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.15) }}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-sora font-bold text-night text-lg md:text-xl mb-3">{s.title}</h2>
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[15px] text-night/70 leading-relaxed mb-3 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </motion.section>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-night/10 flex flex-wrap items-center justify-between gap-3 text-xs text-night/50">
                <p>© 2026 Kikuubo Uganda Ltd · Kampala, Uganda</p>
                <div className="flex gap-4">
                  {NAV_ORDER.filter((k) => k !== slug).slice(0, 4).map((k) => (
                    <Link key={k} to={`/${k}`} className="hover:text-sunset transition-colors">
                      {DOCS[k].title}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
