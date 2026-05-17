export type CalculatorField = {
  id: string
  label: string
  help: string
  prefix?: string
  suffix?: string
  step?: number
  min?: number
  max?: number
  defaultValue: number
}

export type CalculatorSummary = {
  id: string
  label: string
  value: string
  tone?: 'default' | 'positive' | 'warning'
}

export type CalculatorFAQ = {
  question: string
  answer: string
}

export type CalculatorExample = {
  title: string
  description: string
}

export type CalculatorDefinition = {
  slug: string
  name: string
  shortName: string
  hero: string
  description: string
  seoTitle: string
  seoDescription: string
  intro: string
  category: string
  searchIntent: string
  fields: CalculatorField[]
  summaries: CalculatorSummary[]
  faqs: CalculatorFAQ[]
  examples: CalculatorExample[]
  formula: string[]
}

export type CalculatorResult = {
  mainValue: string
  subValue: string
  summaries: CalculatorSummary[]
}

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)

const percent = (value: number) => `${value.toFixed(2)}%`

const number = (value: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(
    Number.isFinite(value) ? value : 0,
  )

export const calculators: CalculatorDefinition[] = [
  {
    slug: 'etsy-fee-calculator',
    name: 'Etsy Fee Calculator',
    shortName: 'Etsy Fees',
    hero: 'Estimate Etsy seller fees, payment processing, and profit in seconds.',
    description:
      'A fast Etsy fee calculator for creators who want to estimate listing fees, transaction fees, payment processing, and net profit before publishing a product.',
    seoTitle: 'Etsy Fee Calculator – Estimate Etsy Seller Fees and Profit',
    seoDescription:
      'Use this free Etsy fee calculator to estimate listing fees, transaction fees, payment processing, total costs, and profit on every order.',
    intro:
      'Selling on Etsy feels simple until fees quietly eat your margin. This calculator helps you estimate what you actually keep after listing, transaction, and payment costs.',
    category: 'Marketplace',
    searchIntent: 'High-intent seller research',
    fields: [
      { id: 'price', label: 'Item price', help: 'What the buyer pays for the product itself.', prefix: '$', step: 0.01, min: 0, defaultValue: 35 },
      { id: 'shippingCharged', label: 'Shipping charged to buyer', help: 'Only include the amount paid by the buyer.', prefix: '$', step: 0.01, min: 0, defaultValue: 6 },
      { id: 'shippingCost', label: 'Your actual shipping cost', help: 'What you pay the carrier or fulfillment partner.', prefix: '$', step: 0.01, min: 0, defaultValue: 4.5 },
      { id: 'productCost', label: 'Product cost', help: 'Materials, production, packaging, and direct fulfillment cost.', prefix: '$', step: 0.01, min: 0, defaultValue: 12 },
      { id: 'transactionRate', label: 'Transaction fee rate', help: 'Etsy usually charges 6.5% on item price + shipping + gift wrapping.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 6.5 },
      { id: 'processingRate', label: 'Payment processing rate', help: 'A common baseline for Etsy Payments in the US is 3% + fixed fee.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 3 },
      { id: 'processingFixed', label: 'Payment processing fixed fee', help: 'Fixed processing fee per order.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.25 },
      { id: 'listingFee', label: 'Listing fee per item', help: 'Common Etsy listing fee baseline.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.2 },
      { id: 'offsiteAdsRate', label: 'Optional offsite ads rate', help: 'Set to 0 if you are not using offsite ads.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 0 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Does Etsy charge fees on shipping too?',
        answer:
          'In many cases, Etsy transaction fees apply to the full order amount the buyer pays, including shipping. Always verify your country and payment setup.',
      },
      {
        question: 'Should I include production cost?',
        answer:
          'Yes. If you want a real profit estimate, include materials, packaging, and any direct production or fulfillment cost.',
      },
      {
        question: 'Is this calculator official?',
        answer:
          'No. It is an independent estimator designed for planning and margin checks. Always confirm current Etsy fee rules before making pricing decisions.',
      },
    ],
    examples: [
      {
        title: 'Handmade jewelry order',
        description: 'Estimate whether a $35 product still has healthy margin after Etsy fees and postage.',
      },
      {
        title: 'Digital download offer',
        description: 'Set shipping to zero and compare how much digital products improve your take-home pay.',
      },
    ],
    formula: [
      'Gross order = item price + shipping charged to buyer',
      'Transaction fee = gross order × transaction fee rate',
      'Payment fee = gross order × payment processing rate + fixed processing fee',
      'Offsite ads fee = gross order × offsite ads rate',
      'Net profit = gross order − all fees − shipping cost − product cost',
    ],
  },
  {
    slug: 'gumroad-fee-calculator',
    name: 'Gumroad Fee Calculator',
    shortName: 'Gumroad Fees',
    hero: 'Check Gumroad fees, payout amount, and margin for every sale.',
    description:
      'Estimate Gumroad platform fees, payment processing, affiliate payouts, and net earnings for digital products and memberships.',
    seoTitle: 'Gumroad Fee Calculator – Estimate Gumroad Earnings',
    seoDescription:
      'Free Gumroad fee calculator for digital creators. Estimate platform fees, payment fees, affiliates, and take-home revenue per sale.',
    intro:
      'Gumroad is simple to launch on, but pricing mistakes stack up fast. Use this calculator to see how platform fees affect your final payout before you publish.',
    category: 'Digital products',
    searchIntent: 'High-intent creator pricing',
    fields: [
      { id: 'price', label: 'Product price', help: 'The amount the customer pays before optional taxes.', prefix: '$', step: 0.01, min: 0, defaultValue: 19 },
      { id: 'units', label: 'Number of sales', help: 'Estimate a batch of sales instead of only one order.', step: 1, min: 1, defaultValue: 10 },
      { id: 'platformRate', label: 'Platform fee rate', help: 'Use your current Gumroad plan or fee tier.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 10 },
      { id: 'processingRate', label: 'Payment processing rate', help: 'Typical blended payment processing rate.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 3.49 },
      { id: 'processingFixed', label: 'Payment processing fixed fee', help: 'Fixed payment fee per order.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.49 },
      { id: 'affiliateRate', label: 'Affiliate commission rate', help: 'Set to 0 if no affiliate partner is involved.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 0 },
      { id: 'deliveryCost', label: 'Delivery or support cost per sale', help: 'Use this for file hosting, customer support, or fulfillment overhead.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.5 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Can I use this for memberships and subscriptions?',
        answer:
          'Yes. Treat one billing cycle as one sale, then estimate monthly or yearly revenue by adjusting the number of sales.',
      },
      {
        question: 'What if my fee rate is different?',
        answer: 'Update the fee inputs to match your current Gumroad plan, region, and payment method.',
      },
      {
        question: 'Should I include support costs?',
        answer:
          'If your digital product creates refund, onboarding, or support work, including a per-sale support cost gives you a more realistic margin.',
      },
    ],
    examples: [
      {
        title: 'Selling a $19 template pack',
        description: 'Estimate how much 10 sales actually produce after platform and payment fees.',
      },
      {
        title: 'Affiliate launch campaign',
        description: 'Compare profit with and without affiliate commissions before recruiting partners.',
      },
    ],
    formula: [
      'Gross revenue = product price × number of sales',
      'Platform fee = gross revenue × platform fee rate',
      'Payment fee = number of sales × (product price × payment processing rate + fixed processing fee)',
      'Affiliate fee = gross revenue × affiliate commission rate',
      'Net earnings = gross revenue − platform fee − payment fee − affiliate fee − delivery or support costs',
    ],
  },
  {
    slug: 'ko-fi-fee-calculator',
    name: 'Ko-fi Fee Calculator',
    shortName: 'Ko-fi Fees',
    hero: 'Estimate how much you keep from Ko-fi donations, memberships, and shop sales.',
    description:
      'Use this free Ko-fi fee calculator to estimate platform fees, payment processing, and final take-home earnings from donations and creator shop sales.',
    seoTitle: 'Ko-fi Fee Calculator – Estimate Ko-fi Earnings and Fees',
    seoDescription:
      'Calculate Ko-fi fees, payment costs, and take-home income from support payments, memberships, and digital product sales.',
    intro:
      'Ko-fi is one of the easiest ways for creators to get paid, but payment processing and optional platform fees still affect your real income. This calculator helps you price smarter.',
    category: 'Creator support',
    searchIntent: 'Donation and creator monetization research',
    fields: [
      { id: 'price', label: 'Average support or order amount', help: 'Average value of each donation, membership payment, or order.', prefix: '$', step: 0.01, min: 0, defaultValue: 5 },
      { id: 'units', label: 'Number of supporters or orders', help: 'How many payments you expect in the selected period.', step: 1, min: 1, defaultValue: 40 },
      { id: 'platformRate', label: 'Ko-fi platform fee rate', help: 'Use 0 for donation-friendly setups or your applicable seller fee.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 0 },
      { id: 'processingRate', label: 'Payment processing rate', help: 'PayPal or card processing usually takes a percentage.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 2.9 },
      { id: 'processingFixed', label: 'Payment processing fixed fee', help: 'Fixed fee per payment, often used by payment processors.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.3 },
      { id: 'deliveryCost', label: 'Reward or fulfillment cost per payment', help: 'Use this if supporters receive files, prints, or other perks.', prefix: '$', step: 0.01, min: 0, defaultValue: 0 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Can I use this for memberships?',
        answer: 'Yes. Set the average payment amount and expected member count for one billing period.',
      },
      {
        question: 'What if I only use Ko-fi for donations?',
        answer: 'Set the platform fee rate to your current effective rate and keep delivery cost at zero if you send no rewards.',
      },
      {
        question: 'Does Ko-fi charge the same fee everywhere?',
        answer:
          'No. Fees can vary by plan, feature, country, and payment provider. Treat this as a planning tool, not an official fee notice.',
      },
    ],
    examples: [
      {
        title: 'Small supporter campaign',
        description: 'Estimate how much 40 supporters at $5 each becomes after payment processing.',
      },
      {
        title: 'Paid wallpaper drop',
        description: 'Include reward or delivery costs to check whether a low-priced digital release is still worth it.',
      },
    ],
    formula: [
      'Gross revenue = average payment × number of supporters or orders',
      'Platform fee = gross revenue × platform fee rate',
      'Payment fee = number of payments × (average payment × payment processing rate + fixed processing fee)',
      'Net earnings = gross revenue − platform fee − payment fee − delivery cost total',
    ],
  },
  {
    slug: 'patreon-earnings-calculator',
    name: 'Patreon Earnings Calculator',
    shortName: 'Patreon Earnings',
    hero: 'Estimate monthly Patreon take-home pay after platform and payment fees.',
    description:
      'A practical Patreon earnings calculator for creators who want to model membership revenue, fee drag, and net monthly income.',
    seoTitle: 'Patreon Earnings Calculator – Estimate Monthly Take-Home Pay',
    seoDescription:
      'Estimate Patreon revenue, platform fees, payment fees, and net monthly income with this free creator earnings calculator.',
    intro:
      'Membership businesses look recurring and predictable, but small fee differences can change your monthly take-home amount more than you expect.',
    category: 'Membership',
    searchIntent: 'Recurring creator revenue planning',
    fields: [
      { id: 'price', label: 'Average membership price', help: 'Average billed amount per active member.', prefix: '$', step: 0.01, min: 0, defaultValue: 8 },
      { id: 'units', label: 'Number of members', help: 'Your expected active paying members this month.', step: 1, min: 1, defaultValue: 120 },
      { id: 'platformRate', label: 'Platform fee rate', help: 'Use your current Patreon plan fee.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 8 },
      { id: 'processingRate', label: 'Payment processing rate', help: 'Estimated blended payment processing rate.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 2.9 },
      { id: 'processingFixed', label: 'Payment fixed fee', help: 'Fixed payment processing fee per pledge.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.3 },
      { id: 'deliveryCost', label: 'Per-member reward cost', help: 'Shipping, Discord management, bonus files, or other member perks.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.5 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Why include a reward cost?',
        answer: 'Recurring memberships often come with hidden labor or delivery cost. Adding it prevents overestimating your real income.',
      },
      {
        question: 'Can I estimate yearly earnings?',
        answer: 'Yes. Use monthly numbers first, then multiply your net result by 12 for a simple yearly projection.',
      },
      {
        question: 'Do all members pay successfully every month?',
        answer: 'Not always. For a conservative model, reduce your member count slightly or adjust the average payment amount downward.',
      },
    ],
    examples: [
      {
        title: 'Growing art membership',
        description: 'Test whether 120 members at $8 is enough once all fees and perk costs are included.',
      },
      {
        title: 'Higher-tier membership strategy',
        description: 'Compare a smaller high-ticket membership against a larger lower-priced member base.',
      },
    ],
    formula: [
      'Gross monthly revenue = membership price × number of members',
      'Platform fee = gross monthly revenue × platform fee rate',
      'Payment fee = number of members × (membership price × payment processing rate + fixed fee)',
      'Net monthly earnings = gross monthly revenue − platform fee − payment fee − reward cost total',
    ],
  },
  {
    slug: 'freelance-hourly-to-annual-calculator',
    name: 'Freelance Hourly to Annual Calculator',
    shortName: 'Freelance Annual',
    hero: 'Convert freelance hourly pricing into monthly and annual income estimates.',
    description:
      'Estimate freelance monthly and annual income based on hourly rate, billable hours, unpaid admin time, and business expenses.',
    seoTitle: 'Freelance Hourly to Annual Calculator – Estimate Income Fast',
    seoDescription:
      'Use this freelance hourly to annual calculator to estimate monthly and yearly income from hourly pricing, billable hours, and business costs.',
    intro:
      'Many freelancers set an hourly rate without converting it into actual monthly or annual income. This calculator makes the gap visible so you can price with confidence.',
    category: 'Freelance pricing',
    searchIntent: 'Income planning and rate setting',
    fields: [
      { id: 'hourlyRate', label: 'Hourly rate', help: 'What you charge clients per billable hour.', prefix: '$', step: 0.01, min: 0, defaultValue: 40 },
      { id: 'billableHoursWeek', label: 'Billable hours per week', help: 'Only include hours that clients actually pay for.', step: 0.5, min: 0, max: 168, defaultValue: 20 },
      { id: 'weeks', label: 'Working weeks per year', help: 'Use a realistic number after holidays and breaks.', step: 1, min: 1, max: 52, defaultValue: 48 },
      { id: 'expensesMonth', label: 'Business expenses per month', help: 'Software, taxes reserve, coworking, tools, or subscriptions.', prefix: '$', step: 0.01, min: 0, defaultValue: 300 },
      { id: 'utilization', label: 'Billable utilization rate', help: 'How much of your available work time ends up billable.', suffix: '%', step: 1, min: 1, max: 100, defaultValue: 75 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Why does utilization matter?',
        answer: 'Freelancers spend time on outreach, proposals, admin, and revisions. Utilization prevents assuming every work hour gets billed.',
      },
      {
        question: 'Should taxes be included?',
        answer: 'You can include a monthly tax reserve inside business expenses for a more conservative estimate.',
      },
      {
        question: 'Can this help me choose a new hourly rate?',
        answer: 'Yes. Change your hourly rate until the annual take-home number feels realistic for your goals.',
      },
    ],
    examples: [
      {
        title: 'Part-time freelancer',
        description: 'Check whether charging $40/hour for 20 billable hours a week covers your monthly costs.',
      },
      {
        title: 'Pricing increase decision',
        description: 'Compare how much annual income changes when you move from $40 to $55 per hour.',
      },
    ],
    formula: [
      'Effective billable hours per week = billable hours × utilization rate',
      'Annual gross = hourly rate × effective billable hours per week × working weeks',
      'Monthly gross = annual gross ÷ 12',
      'Monthly take-home before tax = monthly gross − monthly business expenses',
    ],
  },
  {
    slug: 'digital-product-profit-calculator',
    name: 'Digital Product Profit Calculator',
    shortName: 'Digital Product Profit',
    hero: 'Model digital product pricing, fees, conversion, and total profit.',
    description:
      'A simple digital product profit calculator for creators selling templates, ebooks, presets, or mini-courses.',
    seoTitle: 'Digital Product Profit Calculator – Price Your Offer Better',
    seoDescription:
      'Estimate digital product revenue, fees, fulfillment cost, and net profit with this free calculator for online creators.',
    intro:
      'A low-priced product can look attractive until you factor in payment fees, refunds, and delivery overhead. This calculator helps you test your pricing before launch.',
    category: 'Offer planning',
    searchIntent: 'Launch planning and pricing',
    fields: [
      { id: 'price', label: 'Product price', help: 'Your listed price for the digital product.', prefix: '$', step: 0.01, min: 0, defaultValue: 29 },
      { id: 'units', label: 'Expected sales', help: 'Estimate a launch, month, or campaign total.', step: 1, min: 1, defaultValue: 50 },
      { id: 'platformRate', label: 'Platform fee rate', help: 'Your storefront or marketplace fee rate.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 5 },
      { id: 'processingRate', label: 'Payment processing rate', help: 'Card or payment processor percentage.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 2.9 },
      { id: 'processingFixed', label: 'Payment fixed fee', help: 'Fixed payment cost per sale.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.3 },
      { id: 'refundRate', label: 'Refund rate', help: 'Use an estimate if your niche usually refunds more often.', suffix: '%', step: 0.1, min: 0, max: 100, defaultValue: 3 },
      { id: 'deliveryCost', label: 'Per-sale support cost', help: 'Delivery, support, or update cost per customer.', prefix: '$', step: 0.01, min: 0, defaultValue: 0.75 },
    ],
    summaries: [],
    faqs: [
      {
        question: 'Why include a refund rate?',
        answer: 'Refunds reduce real earnings and can distort launch planning if you only model gross revenue.',
      },
      {
        question: 'Can I use this for courses or memberships?',
        answer: 'Yes, as long as you treat one billing event as one sale and adjust the support cost as needed.',
      },
      {
        question: 'What counts as support cost?',
        answer: 'Customer support time, onboarding, file hosting, updates, or bonus assets can all be treated as delivery cost.',
      },
    ],
    examples: [
      {
        title: 'Template bundle launch',
        description: 'Estimate whether a $29 template pack reaches your target profit after fees and refunds.',
      },
      {
        title: 'Low-ticket volume offer',
        description: 'See how much margin shrinks when a product is cheap and payment fixed fees become a bigger percentage.',
      },
    ],
    formula: [
      'Gross revenue = product price × expected sales',
      'Refund loss = gross revenue × refund rate',
      'Platform fee = gross revenue × platform fee rate',
      'Payment fee = expected sales × (product price × payment processing rate + fixed fee)',
      'Net profit = gross revenue − refund loss − platform fee − payment fee − support cost total',
    ],
  },
]

export const calculatorMap = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorDefinition>

export function calculateResult(slug: string, values: Record<string, number>): CalculatorResult {
  switch (slug) {
    case 'etsy-fee-calculator': {
      const grossOrder = values.price + values.shippingCharged
      const transactionFee = grossOrder * (values.transactionRate / 100)
      const paymentFee = grossOrder * (values.processingRate / 100) + values.processingFixed
      const listingFee = values.listingFee
      const offsiteAdsFee = grossOrder * (values.offsiteAdsRate / 100)
      const totalFees = transactionFee + paymentFee + listingFee + offsiteAdsFee
      const netProfit = grossOrder - totalFees - values.shippingCost - values.productCost
      const margin = grossOrder > 0 ? (netProfit / grossOrder) * 100 : 0

      return {
        mainValue: money(netProfit),
        subValue: `${percent(margin)} net margin`,
        summaries: [
          { id: 'gross', label: 'Gross order amount', value: money(grossOrder) },
          { id: 'fees', label: 'Total estimated fees', value: money(totalFees), tone: 'warning' },
          { id: 'shipping', label: 'Shipping cost', value: money(values.shippingCost) },
          { id: 'product', label: 'Product cost', value: money(values.productCost) },
          { id: 'profit', label: 'Estimated profit', value: money(netProfit), tone: netProfit >= 0 ? 'positive' : 'warning' },
        ],
      }
    }
    case 'gumroad-fee-calculator':
    case 'ko-fi-fee-calculator':
    case 'patreon-earnings-calculator':
    case 'digital-product-profit-calculator': {
      const grossRevenue = values.price * values.units
      const platformFee = grossRevenue * ((values.platformRate ?? 0) / 100)
      const paymentFee = values.units * (values.price * ((values.processingRate ?? 0) / 100) + (values.processingFixed ?? 0))
      const affiliateFee = grossRevenue * ((values.affiliateRate ?? 0) / 100)
      const refundLoss = grossRevenue * ((values.refundRate ?? 0) / 100)
      const deliveryCostTotal = values.units * (values.deliveryCost ?? 0)
      const net = grossRevenue - platformFee - paymentFee - affiliateFee - refundLoss - deliveryCostTotal
      const avgPerSale = values.units > 0 ? net / values.units : 0

      return {
        mainValue: money(net),
        subValue: `${money(avgPerSale)} average kept per payment`,
        summaries: [
          { id: 'gross', label: 'Gross revenue', value: money(grossRevenue) },
          { id: 'platform', label: 'Platform fees', value: money(platformFee), tone: 'warning' },
          { id: 'payment', label: 'Payment fees', value: money(paymentFee), tone: 'warning' },
          ...(affiliateFee > 0 ? [{ id: 'affiliate', label: 'Affiliate payout', value: money(affiliateFee), tone: 'warning' as const }] : []),
          ...(refundLoss > 0 ? [{ id: 'refund', label: 'Refund loss', value: money(refundLoss), tone: 'warning' as const }] : []),
          ...(deliveryCostTotal > 0 ? [{ id: 'delivery', label: 'Support or delivery cost', value: money(deliveryCostTotal) }] : []),
          { id: 'net', label: slug === 'patreon-earnings-calculator' ? 'Net monthly earnings' : 'Net earnings', value: money(net), tone: net >= 0 ? 'positive' : 'warning' },
        ],
      }
    }
    case 'freelance-hourly-to-annual-calculator': {
      const effectiveHours = values.billableHoursWeek * (values.utilization / 100)
      const annualGross = values.hourlyRate * effectiveHours * values.weeks
      const monthlyGross = annualGross / 12
      const monthlyTakeHome = monthlyGross - values.expensesMonth
      const annualTakeHome = monthlyTakeHome * 12

      return {
        mainValue: money(annualTakeHome),
        subValue: `${money(monthlyTakeHome)} estimated monthly take-home before tax`,
        summaries: [
          { id: 'effective', label: 'Effective billable hours per week', value: number(effectiveHours) },
          { id: 'annualGross', label: 'Annual gross income', value: money(annualGross) },
          { id: 'monthlyGross', label: 'Monthly gross income', value: money(monthlyGross) },
          { id: 'expenses', label: 'Monthly expenses', value: money(values.expensesMonth), tone: 'warning' },
          { id: 'annualTakeHome', label: 'Annual take-home before tax', value: money(annualTakeHome), tone: annualTakeHome >= 0 ? 'positive' : 'warning' },
        ],
      }
    }
    default:
      return {
        mainValue: money(0),
        subValue: 'No calculator selected',
        summaries: [],
      }
  }
}
