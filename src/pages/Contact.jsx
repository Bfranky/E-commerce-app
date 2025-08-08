import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions or need assistance? We’d love to hear from you!
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-400"
            placeholder="Type your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
}
