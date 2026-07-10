import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary font-serif">Welcome to Resta</h1>
          <p className="py-6 text-base-content/85">
            Savor delicious moments. Reserve your table or order gourmet meals online today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/menu" className="btn btn-primary">
              View Menu
            </Link>
            <Link href="/reserve" className="btn btn-secondary">
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
