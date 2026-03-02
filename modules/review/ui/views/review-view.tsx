import ReviewList from "../components/review-list";

export default function ReviewView() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Pending Reviews</h1>
      <ReviewList />
    </div>
  );
}
