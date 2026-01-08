


import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import axiosSecure from "../api/axiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { me } = useOutletContext();
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: me.name,
    avatar: me.avatar,
    district: me.district,
    upazila: me.upazila,
    bloodGroup: me.bloodGroup
  });

  const handleSave = async () => {
    try {
      await axiosSecure.patch("/api/users/me", form);
      toast.success("Profile updated. Reload dashboard to see changes.");
      setEdit(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="card p-6 md:p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">My Profile</h2>
        {!edit ? (
          <button className="btn-outline px-6" onClick={() => setEdit(true)}>Edit</button>
        ) : (
          <button className="btn-primary px-6" onClick={handleSave}>Save</button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center gap-4 md:col-span-2 mb-2">
          <img className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 dark:border-slate-600" src={form.avatar} alt="" />
          {edit && (
            <div className="flex-1">
                <label className="label">Avatar URL</label>
                <input
                className="input bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"
                value={form.avatar}
                onChange={e => setForm({ ...form, avatar: e.target.value })}
                placeholder="https://example.com/photo.jpg"
                />
            </div>
          )}
        </div>

        <Field label="Name">
          <input
            disabled={!edit}
            className={`input ${!edit ? "bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-300" : "bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"}`}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Email (read only)">
          <input readOnly className="input bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed" value={user?.email} />
        </Field>

        <Field label="District">
          <input
            disabled={!edit}
            className={`input ${!edit ? "bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-300" : "bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"}`}
            value={form.district}
            onChange={e => setForm({ ...form, district: e.target.value })}
          />
        </Field>

        <Field label="Upazila">
          <input
            disabled={!edit}
            className={`input ${!edit ? "bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-300" : "bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"}`}
            value={form.upazila}
            onChange={e => setForm({ ...form, upazila: e.target.value })}
          />
        </Field>

        <Field label="Blood Group">
          <input
            disabled={!edit}
            className={`input ${!edit ? "bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-300" : "bg-white dark:bg-slate-900 dark:text-white dark:border-slate-600"}`}
            value={form.bloodGroup}
            onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
          />
        </Field>

        <Field label="Role">
          <input readOnly className="input bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-400 capitalize cursor-not-allowed" value={me.role} />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label mb-1 block">{label}</label>
      {children}
    </div>
  );
}