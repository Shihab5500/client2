# 🩸 Blood Donation - Blood Donation Platform

Blood Donation is a modern, responsive, and user-friendly web application designed to bridge the gap between blood donors and recipients. It allows users to search for donors, make donation requests, and manage funding seamlessly.

---

## 🔗 Live Links
- **Live Website:** [Visit BloodDonation](https://blood-donation-platform.netlify.app/)
- **Server API:** [Server Link](https://server2-gilt-five.vercel.app/)

## 📂 Repository Links
- **Client Side:** [GitHub Client Repo](https://github.com/Shihab5500/client2)
- **Server Side:** [GitHub Server Repo](https://github.com/Shihab5500/server2)

---

## 🔑 Admin & User Credentials (For Testing)
You can use the **Demo Buttons** on the login page or use these credentials manually:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `demo@admin.com` | `Admin123` |
| **Donor** | `demo@user.com` | `User123` |

---

## ✨ Key Features

### 🌍 General
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Dark/Light Mode:** Seamless theme switching for better user experience.
- **Interactive UI:** Smooth animations using Framer Motion and AOS.

### 👤 User & Authentication
- **Authentication:** Secure login/registration using **Firebase** (Email/Password & Google Login).
- **Public Access:** Anyone can view donation requests, blogs, and search for donors without logging in.

### 🩸 Dashboard & Roles
- **Donor Dashboard:**
  - Create, Edit, and Delete donation requests.
  - View recent requests and manage profile.
- **Admin Dashboard:**
  - Manage all users (Block/Unblock, Make Volunteer/Admin).
  - Manage all donation requests (Delete/Edit/Status Change).
  - Visualize data with Charts (Recharts).
- **Volunteer Dashboard:**
  - Update donation status and manage blogs.

### 🔍 Core Functionalities
- **Search Donors:** Filter donors by Blood Group, District, and Upazila.
- **Donation Requests:** Create urgent requests and track status (Pending, In Progress, Done, Canceled).
- **Funding System:** Integrated **Stripe Payment Gateway** for donations/funding.
- **Blog Section:** Read health tips and news (Search & Filter enabled).

---

## 🛠️ Technologies Used

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** & **DaisyUI** (Styling)
- **Framer Motion** (Animations)
- **React Router DOM** (Routing)
- **Axios** (API Calls)
- **TanStack Query** (Data Fetching)
- **Recharts** (Data Visualization)
- **Stripe.js** (Payment)

### Backend
- **Node.js** & **Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication & Security)
- **Stripe API** (Payment Intent)

