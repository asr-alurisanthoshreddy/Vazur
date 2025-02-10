"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  { question: "How does MLB Fan Feed predict game outcomes?", answer: "We use advanced AI models that analyze player stats, team performance, and historical data to provide accurate predictions." },
  { question: "What data sources do you use for predictions?", answer: "Our AI model gathers data from official MLB sources, past games, player statistics, and real-time analytics." },
  { question: "Is MLB Fan Feed free to use?", answer: "Yes, MLB Fan Feed provides free access to basic predictions and insights. Premium features may be available in the future." },
  { question: "How often are predictions updated?", answer: "Predictions are updated in real-time as new game data, player stats, and external factors influence outcomes." },
  { question: "Can I rely on MLB Fan Feed for betting?", answer: "Our predictions are data-driven but should be used for informational purposes only. We do not encourage or support gambling." }
];

export default function FAQ() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-20" >
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-bold text-center mt-6">Frequently Asked Questions</h1>
        <p className="mt-2 text-center text-gray-400">Find answers to common questions about MLB Fan Feed.</p>

        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-6 space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-gray-300 mt-2">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No matching FAQs found.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/contact" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-bold shadow-lg hover:scale-105">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
