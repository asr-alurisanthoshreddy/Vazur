"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, rating, comment }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setReviews((prevReviews) => [newReview.review, ...prevReviews]);
      setUser("");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
          <Input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-6 h-6 cursor-pointer ${i < rating ? "text-green-500" : "text-gray-300"}`}
                onClick={() => setRating(i + 1 === rating ? i : i + 1)}
                fill={i < rating ? "green" : "none"}
              />
            ))}
          </div>
          <Textarea
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Post Comment"}
          </Button>
        </form>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex items-center">
                <p className="font-bold mr-2">{review.user}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-green-500" : "text-gray-300"}`}
                      fill={i < review.rating ? "green" : "none"}
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}
      </CardContent>
    </Card>
  );
}
