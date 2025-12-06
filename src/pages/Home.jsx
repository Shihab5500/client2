import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <section className="bg-soft">
        <div className="container py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black leading-tight"
            >
              Give Blood, <span className="text-primary">Save Lives</span>  
              <br />Join Bangladesh’s Donor Network
            </motion.h1>
            <p className="mt-4 text-slate-600 text-lg">
              BloodBond connects donors with recipients fast and safely.
              Create requests, find donors, and make impact.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">Join as a donor</Link>
              <Link to="/search" className="btn-outline">Search Donors</Link>
            </div>
          </div>

          <div className="card p-3 md:p-5">
            <img
              className="rounded-xl w-full object-cover"
              src="https://i.ibb.co.com/mFRg6kZd/Blood-donation-hflgzh.avif"
              alt="banner"
            />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-black mb-6">Why BloodBond?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Fast Requests", d: "Create emergency requests in seconds." },
            { t: "Verified Donors", d: "Role-based system ensures reliability." },
            { t: "Smart Search", d: "Find donors by blood group & location." }
          ].map((f,i)=>(
            <div key={i} className="card p-5">
              <div className="text-primary text-xl font-black mb-2">0{i+1}</div>
              <h3 className="font-bold text-lg">{f.t}</h3>
              <p className="text-slate-600 mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container py-12 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-black">Contact Us</h2>
            <p className="text-slate-600 mt-2">
              Any question or partnership? We’re here.
            </p>
            <p className="mt-4 font-semibold">Hotline: +880 1XXX-XXXXXX</p>
          </div>

          <form className="card p-5 space-y-3">
            <input className="input" placeholder="Name" />
            <input className="input" placeholder="Email" />
            <textarea className="input min-h-28" placeholder="Message"></textarea>
            <button type="button" className="btn-primary w-full">Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}
