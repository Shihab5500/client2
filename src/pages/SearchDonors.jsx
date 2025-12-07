


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

  //  District Names List তৈরি করা
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
    <div className="container py-8">
      <div className="card p-5 max-w-4xl mx-auto shadow-lg">
        <h2 className="text-xl font-black mb-4">Search Donors</h2>

        <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-3">
          {/* Blood Group */}
          <select
            className="input"
            value={selectedBlood}
            onChange={(e) => setSelectedBlood(e.target.value)}
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District Select */}
          <select
            className="input"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedUpazila(""); 
            }}
          >
            <option value="">District</option>
            {districtList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Upazila Select */}
          <select
            className="input"
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            disabled={!selectedDistrict} 
          >
            <option value="">Upazila</option>
            {upazilaList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button className="btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {result.map((d) => (
          <div key={d._id} className="card p-4 shadow-sm border hover:border-primary transition">
            <div className="flex items-center gap-3">
              <img
                src={d.avatar || "https://i.ibb.co/9W7w7yY/user.png"}
                className="w-12 h-12 rounded-full border object-cover"
                alt=""
              />
              <div>
                <h3 className="font-bold">{d.name}</h3>
                <p className="text-sm text-slate-500">{d.email}</p>
              </div>
            </div>

            <div className="mt-3 text-sm space-y-1 bg-slate-50 p-2 rounded-lg">
              <p>
                <span className="font-semibold">Blood:</span>{" "}
                <span className="text-primary font-bold">{d.bloodGroup}</span>
              </p>
              <p>
                <span className="font-semibold">Location:</span> {d.district}, {d.upazila}
              </p>
            </div>
          </div>
        ))}

        {!loading && result.length === 0 && (
          <div className="md:col-span-3 text-center text-slate-500 py-10 bg-slate-50 rounded-xl border border-dashed">
            Search donors by blood group & location.
          </div>
        )}
      </div>
    </div>
  );
}