import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-4">About SmartShop</h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        Welcome to <span className="font-semibold">SmartShop</span>, your
        one-stop online store for quality products at unbeatable prices.
        We’re passionate about making online shopping easy, fast, and secure.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Our mission is to provide an exceptional shopping experience by
        offering a wide variety of products, excellent customer service, and
        secure checkout powered by Paystack.
      </p>
    </motion.div>
  );
}
