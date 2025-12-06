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
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black">My Profile</h2>
        {!edit ? (
          <button className="btn-outline" onClick={() => setEdit(true)}>Edit</button>
        ) : (
          <button className="btn-primary" onClick={handleSave}>Save</button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 md:col-span-2">
          <img className="w-16 h-16 rounded-full object-cover" src={form.avatar} alt="" />
          {edit && (
            <input
              className="input"
              value={form.avatar}
              onChange={e => setForm({ ...form, avatar: e.target.value })}
              placeholder="Avatar URL"
            />
          )}
        </div>

        <Field label="Name">
          <input
            disabled={!edit}
            className={`input ${!edit && "bg-slate-50"}`}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Email (read only)">
          <input readOnly className="input bg-slate-50" value={user?.email} />
        </Field>

        <Field label="District">
          <input
            disabled={!edit}
            className={`input ${!edit && "bg-slate-50"}`}
            value={form.district}
            onChange={e => setForm({ ...form, district: e.target.value })}
          />
        </Field>

        <Field label="Upazila">
          <input
            disabled={!edit}
            className={`input ${!edit && "bg-slate-50"}`}
            value={form.upazila}
            onChange={e => setForm({ ...form, upazila: e.target.value })}
          />
        </Field>

        <Field label="Blood Group">
          <input
            disabled={!edit}
            className={`input ${!edit && "bg-slate-50"}`}
            value={form.bloodGroup}
            onChange={e => setForm({ ...form, bloodGroup: e.target.value })}
          />
        </Field>

        <Field label="Role">
          <input readOnly className="input bg-slate-50" value={me.role} />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
