

import { useMemo, useState } from "react";
import axios from "axios";
import { bloodGroups } from "../utils/bloodGroups";
import toast from "react-hot-toast";
import districts from "../Data/district.json";
import upazilas from "../Data/upazilas.json";

export default function SearchDonors() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // District Names List
  const districtList = useMemo(() => {
    return districts.map((d) => d.name);
  }, []);

  const upazilaList = useMemo(() => {
    if (!selectedDistrict) return [];
    const districtObj = districts.find((d) => d.name === selectedDistrict);
    if (!districtObj) return [];
    return upazilas
      .filter((u) => String(u.district_id) === String(districtObj.id))
      .map((u) => u.name); 
  }, [selectedDistrict]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setResult([]);
      const { data } = await axios.get(
        `${import.meta.env.VITE_apiUrl}/api/donors/search`,
        {
          params: {
            bloodGroup: selectedBlood || undefined,
            district: selectedDistrict || undefined,
            upazila: selectedUpazila || undefined,
          },
        }
      );
      setResult(data);
      if (!data.length) toast("No donors found!");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft dark:bg-slate-900 transition-colors py-8">
      <div className="container">
        <div className="card p-6 md:p-8 max-w-4xl mx-auto shadow-lg bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black mb-6 text-slate-800 dark:text-white">Search Donors</h2>

          <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
            {/* Blood Group */}
            <select
              className="input bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"
              value={selectedBlood}
              onChange={(e) => setSelectedBlood(e.target.value)}
            >
              <option value="">Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>

            {/* District Select */}
            <select
              className="input bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedUpazila(""); 
              }}
            >
              <option value="">District</option>
              {districtList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Upazila Select */}
            <select
              className="input bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600 disabled:opacity-50"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict} 
            >
              <option value="">Upazila</option>
              {upazilaList.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>

            <button className="btn-primary w-full h-[46px]" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {result.map((d) => (
            <div key={d._id} className="card p-5 shadow-sm border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary transition group">
              <div className="flex items-center gap-4">
                <img
                  src={d.avatar || "https://i.ibb.co/9W7w7yY/user.png"}
                  className="w-14 h-14 rounded-full border dark:border-slate-600 object-cover"
                  alt=""
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">{d.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{d.email}</p>
                </div>
              </div>

              <div className="mt-4 text-sm space-y-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Blood:</span>{" "}
                  <span className="text-primary font-bold">{d.bloodGroup}</span>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Location:</span> {d.district}, {d.upazila}
                </p>
              </div>
            </div>
          ))}

          {!loading && result.length === 0 && (
            <div className="md:col-span-3 text-center text-slate-500 dark:text-slate-400 py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-lg">Search donors by blood group & location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}