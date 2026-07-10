export default function BillDetailPage({ params }) {
  const { id } = params;
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold font-serif text-primary mb-4">Your Bill</h1>
      <p className="text-base-content/80">Viewing bill invoice details for Bill ID: <span className="font-mono font-bold text-secondary">{id}</span>. (Placeholder)</p>
    </div>
  );
}
