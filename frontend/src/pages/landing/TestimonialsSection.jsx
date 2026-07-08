import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import { MOCK_TESTIMONIALS } from "../../utils/mockData.js";
import { getInitials } from "../../utils/formatters.js";

function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Loved by Job Seekers</h2>
          <p className="mt-4 text-gray-400">See how JobReachAI helped thousands find their dream jobs</p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {MOCK_TESTIMONIALS.map((t) => (
            <motion.div key={t.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-sm font-bold text-accent">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.company}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
