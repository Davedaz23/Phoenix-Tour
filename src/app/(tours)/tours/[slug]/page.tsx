export default function TourDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tour: {params.slug}</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">Tour detail page coming soon</p>
        </div>
      </div>
    </div>
  );
}