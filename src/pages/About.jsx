


import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaUsers, FaGlobeAsia, FaAward } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* 1. Hero Section with Parallax feel */}
      <div className="relative bg-primary py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div> {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">About BloodBond</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Bridging the gap between donors and patients. We are on a mission to save lives, one drop at a time.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* 2. Our Story & Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">Who We Are?</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
              BloodBond started with a simple idea: <span className="font-bold text-primary">No one should die for a lack of blood.</span>
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We are a non-profit voluntary organization that uses technology to connect blood donors with recipients instantly. Our platform removes the hassle of finding blood during emergencies by creating a centralized, verified database of donors across Bangladesh.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl rotate-3 -z-10"></div>
            <img 
              src="https://i.ibb.co/mFRg6kZd/Blood-donation-hflgzh.avif" 
              alt="Volunteers" 
              className="rounded-2xl shadow-xl w-full object-cover h-80"
            />
          </motion.div>
        </div>

        {/* 3. Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <StatCard icon={<FaHandHoldingHeart />} number="1200+" label="Lives Saved" />
          <StatCard icon={<FaUsers />} number="5000+" label="Active Donors" />
          <StatCard icon={<FaGlobeAsia />} number="64" label="Districts" />
          <StatCard icon={<FaAward />} number="15+" label="Awards Won" />
        </div>

        {/* 4. Our Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <InfoCard 
            title="Our Mission" 
            desc="To build the largest verified blood donor network in the country and ensure blood is available within 30 minutes of request."
            bg="bg-rose-50 dark:bg-slate-800"
          />
          <InfoCard 
            title="Our Vision" 
            desc="A Bangladesh where every hospital has sufficient blood supply and voluntary donation is a standard practice for every healthy citizen."
            bg="bg-blue-50 dark:bg-slate-800"
          />
        </div>

      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, number, label }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 text-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <div className="text-4xl text-primary mb-3 flex justify-center">{icon}</div>
      <h3 className="text-3xl font-black text-slate-800 dark:text-white">{number}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
    </motion.div>
  );
}

function InfoCard({ title, desc, bg }) {
  return (
    <div className={`p-8 rounded-2xl ${bg} border border-slate-100 dark:border-slate-700`}>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}