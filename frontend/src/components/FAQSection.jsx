export default function FAQSection() {
  const faqs = [
    {
      q: "What are your shipping policies?",
      a: "We offer free shipping on orders over $50 within the continental US. International shipping is available with additional charges.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard.",
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 30 days of purchase. Items must be unused and in original packaging for a full refund.",
    },
    {
      q: "Do you offer customer support?",
      a: "Yes! Our customer service team is available Monday–Friday 9AM–6PM EST via phone, email, or live chat.",
    },
  ];

  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-4xl font-bold text-green-900 text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Find quick answers to common questions about our services and policies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {faqs.map((item, index) => (
          <div key={index} className="hover:shadow-xl bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              {item.q}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
