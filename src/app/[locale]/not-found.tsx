import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24">
      <p className="eyebrow mb-3">404</p>
      <h1 className="serif text-3xl">Page not found</h1>
      <p className="mt-4"><Link href="/en">Return to P/A Institute →</Link></p>
    </div>
  );
}
