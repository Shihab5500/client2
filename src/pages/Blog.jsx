import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dummy Data (Mock API Response)
  const allBlogs = [
    { id: 1, title: "Benefits of Donating Blood", category: "Health", date: "Jan 10, 2026", author: "Dr. Ayesha", img: "https://i.ibb.co.com/gFDJb4Kv/ENG.png" },
    { id: 2, title: "Who can donate blood?", category: "Guide", date: "Jan 05, 2026", author: "Admin", img: "https://i.ibb.co.com/1tC9tBRw/1623677348.webp" },
    { id: 3, title: "What to eat before donation", category: "Diet", date: "Dec 28, 2025", author: "Nutritionist", img: "https://i.ibb.co.com/zVHvV0tk/What-to-Eat-Before-and-After-Donating-Blood-Tips-and-Benefits-31601976a6.png" },
    { id: 4, title: "Emergency Blood Need in Dhaka", category: "News", date: "Dec 20, 2025", author: "Reporter", img: "https://i.ibb.co.com/nq8LqxhN/Blood-bank.webp" },
    { id: 5, title: "Recovering after donation", category: "Health", date: "Dec 15, 2025", author: "Dr. Rahim", img: "https://i.ibb.co.com/SXVZDpYv/post-donation.jpg" },
  ];

  // Filter Logic
  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Health", "Guide", "Diet", "News"];

  useEffect(() => {
    // Simulating API Loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <div className="min-h-screen bg-soft dark:bg-slate-900 transition-colors py-12">
      <div className="container mx-auto px-4">
        
        {/* Header Area */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">Latest Updates</h1>
          <p className="text-slate-600 dark:text-slate-400">Read our latest articles, news, and donation guidelines.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap
                  ${selectedCategory === cat 
                    ? "bg-primary text-white" 
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search blogs..." 
              className="input pl-10 bg-slate-50 dark:bg-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
             {[1,2,3].map(i => <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(b => (
                <div key={b.id} className="card overflow-hidden hover:shadow-lg transition group bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {b.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {b.date}</span>
                      <span className="flex items-center gap-1"><FaUser /> {b.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary transition-colors cursor-pointer">
                      {b.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                      Blood donation is a vital procedure that saves millions of lives. Learn about the process and benefits...
                    </p>
                    
                    <Link to="#" className="text-primary font-bold text-sm hover:underline mt-auto">
                      Read Full Article &rarr;
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-20 text-slate-500 dark:text-slate-400">
                <p className="text-xl">No blogs found matching "{searchTerm}"</p>
                <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="text-primary font-bold mt-2 hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}