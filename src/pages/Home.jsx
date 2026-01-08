

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { FaHandHoldingHeart, FaUserShield, FaSearchLocation, FaQuoteLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUsers, FaHeartbeat, FaArrowRight, FaTint } from "react-icons/fa";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll Parallax Effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_apiUrl}/api/requests/public`);
        
        const activeRequests = data.filter(r => r.status === 'pending' || r.status === 'inprogress').slice(0, 6);
        setRequests(activeRequests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="dark:bg-slate-900 overflow-hidden transition-colors duration-500">
      
      {/* --- 1. Hero Section (Advanced) --- */}
      <section className="relative min-h-[90vh] flex items-center bg-soft dark:bg-slate-900 transition-colors">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 dark:bg-primary/5"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 dark:bg-secondary/5"></div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
              <span className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Save Life Today
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 dark:text-white mb-6">
              Donate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600">Blood</span>, <br />
              Become a Hero.
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              Every drop counts. Connect directly with patients in need. No middlemen, no hassle—just pure kindness.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary px-8 py-4 text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Join as Donor
              </Link>
              <Link to="/search" className="btn-outline px-8 py-4 text-lg hover:-translate-y-1 transition-transform bg-white dark:bg-transparent">
                Find Donors
              </Link>
            </div>
          </motion.div>

          {/* Parallax Image */}
          <motion.div 
            style={{ y: y1 }}
            className="relative hidden md:block"
          >
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                <img 
                  src="https://i.ibb.co/mFRg6kZd/Blood-donation-hflgzh.avif" 
                  alt="Blood Donation" 
                  className="w-full object-cover hover:scale-105 transition-transform duration-700"
                />
             </div>
             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-10 -left-10 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4"
             >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-2xl">
                  <FaHeartbeat />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">1200+ Lives</p>
                  <p className="text-xs text-slate-500">Saved this month</p>
                </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. Live Stats (Glassmorphism) --- */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 dark:border-slate-700">
            <StatBox number="5000+" label="Heroes Registered" icon={<FaUsers />} color="text-blue-500" />
            <StatBox number="150+" label="Daily Requests" icon={<FaTint />} color="text-rose-500" />
            <StatBox number="64" label="Districts Active" icon={<FaMapMarkerAlt />} color="text-emerald-500" />
            <StatBox number="24/7" label="Emergency Help" icon={<FaPhoneAlt />} color="text-purple-500" />
          </div>
        </div>
      </section>

      {/* --- 3. Dynamic Urgent Requests --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <SectionTitle 
               title="Urgent Needs" 
               subtitle="Someone's life depends on your kindness right now." 
               align="left"
             />
             <Link to="/donation-requests" className="group flex items-center gap-2 font-bold text-primary hover:text-rose-700 transition-colors">
                View All Requests <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
             </Link>
          </div>
          
          {loading ? (
             <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {requests.length > 0 ? (
                 requests.map((r, idx) => (
                   <RequestCard key={r._id} data={r} index={idx} />
                 ))
               ) : (
                 <div className="col-span-full text-center py-10 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-2xl">
                    No urgent requests at the moment.
                 </div>
               )}
            </div>
          )}
        </div>
      </section>

      {/* --- 4. Why Choose Us (Hover Effects) --- */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container">
          <SectionTitle title="Why We Are Unique" subtitle="We focus on speed, safety, and reliability." />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<FaHandHoldingHeart />} 
              title="Direct Connection" 
              desc="No middlemen. Connect directly with the donor via phone." 
              delay={0.1}
            />
            <FeatureCard 
              icon={<FaUserShield />} 
              title="Verified Profiles" 
              desc="We strictly verify every donor to ensure safety for patients." 
              delay={0.2}
            />
            <FeatureCard 
              icon={<FaSearchLocation />} 
              title="Geo-Targeting" 
              desc="Find donors within your specific Upazila in seconds." 
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- 5. Simple Process --- */}
      <section className="py-20 bg-soft dark:bg-slate-800/50 transition-colors">
        <div className="container">
           <SectionTitle title="How It Works" subtitle="Saving a life is easier than you think." />
           <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12 relative">
              {/* Connector Line (Hidden on Mobile) */}
              <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
              
              <Step number="1" title="Register" desc="Create your free account." />
              <Step number="2" title="Search" desc="Find donors or post request." />
              <Step number="3" title="Connect" desc="Call and coordinate." />
              <Step number="4" title="Save Life" desc="Donate and be a hero." />
           </div>
        </div>
      </section>

      {/* --- 6. Our Mission (Visual) --- */}
      <section className="py-20 bg-primary relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container text-center relative z-10">
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
           >
              <FaTint className="text-6xl mx-auto mb-6 text-white/80" />
              <h2 className="text-4xl md:text-5xl font-black mb-6">Our Mission</h2>
              <p className="max-w-3xl mx-auto text-xl opacity-90 leading-relaxed mb-10">
                "To create a world where no one has to lose a loved one simply because the right blood wasn't available on time."
              </p>
              <Link to="/register" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition shadow-2xl">
                Join the Movement
              </Link>
           </motion.div>
        </div>
      </section>

      {/* --- 7. Contact Section --- */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container">
           <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 items-center shadow-2xl">
              <div>
                 <h2 className="text-3xl font-bold mb-4">Have questions?</h2>
                 <p className="text-slate-400 mb-8">Our support team is available 24/7 to assist you with any emergency.</p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><FaPhoneAlt/></div>
                       <span>+880 1234 567 890</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><FaEnvelope/></div>
                       <span>help@bloodbond.com</span>
                    </div>
                 </div>
              </div>
              <form className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                 <h3 className="font-bold text-lg">Send us a message</h3>
                 <input className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary placeholder:text-slate-500" placeholder="Your Name" />
                 <input className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary placeholder:text-slate-500" placeholder="Your Email" />
                 <textarea className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary placeholder:text-slate-500" rows="3" placeholder="Message"></textarea>
                 <button className="w-full btn-primary py-3">Send Message</button>
              </form>
           </div>
        </div>
      </section>

    </div>
  );
}

/* --- Reusable Components (Advanced) --- */

function SectionTitle({title, subtitle, align="center"}) {
  return (
    <div className={`text-${align} mb-6`}>
      <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-3 relative inline-block">
        {title}
        <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10 rounded-full"></span>
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-lg">{subtitle}</p>
    </div>
  )
}

function StatBox({ number, label, icon, color }) {
  return (
    <div className="text-center p-4">
      <div className={`text-4xl ${color} mb-2 flex justify-center drop-shadow-sm`}>{icon}</div>
      <h3 className="text-3xl font-black text-slate-800 dark:text-white">{number}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-white dark:bg-slate-700 text-primary rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function RequestCard({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
           <h4 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1" title={data.recipientName}>
             {data.recipientName}
           </h4>
           <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
             <FaMapMarkerAlt /> {data.recipientDistrict}, {data.recipientUpazila}
           </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-sm border border-rose-200 dark:border-rose-800">
           {data.bloodGroup}
        </div>
      </div>
      
      <div className="space-y-2 mb-6 flex-1">
         <div className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
            <span className="font-semibold block text-xs uppercase text-slate-400 mb-1">Location</span>
            {data.hospitalName}
         </div>
         <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>📅 {data.donationDate}</span>
            <span>⏰ {data.donationTime}</span>
         </div>
      </div>

      <Link to={`/donation-requests/${data._id}`} className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2 group">
         Donate Now <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
      </Link>
    </motion.div>
  )
}

function Step({number, title, desc}) {
  return (
    <div className="relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full md:w-64 text-center z-10 hover:shadow-lg transition-shadow">
       <div className="w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-4 shadow-lg ring-4 ring-white dark:ring-slate-700">
         {number}
       </div>
       <h4 className="font-bold text-lg dark:text-white mb-1">{title}</h4>
       <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="card p-6 h-64 animate-pulse flex flex-col justify-between">
       <div className="flex justify-between">
          <div className="space-y-2">
             <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
             <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
       </div>
       <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
       <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
    </div>
  )
}