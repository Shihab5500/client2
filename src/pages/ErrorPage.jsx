import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center space-y-5">
        <h1 className="text-9xl font-black text-primary opacity-20">404</h1>
        
        <h2 className="text-4xl font-bold text-slate-800">
          Oops! Page Not Found
        </h2>
        
        <p className="text-slate-500 max-w-md mx-auto text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="pt-4">
          <Link to="/" className="btn-primary shadow-lg shadow-primary/30">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}