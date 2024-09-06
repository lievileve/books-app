<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all();
        return ReviewResource::collection($reviews);
    }

    public function show(Review $review)
    {
        return new ReviewResource($review);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'book_id' => 'required|integer|exists:books,id',
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
        ]);

        $review = Review::create($validatedData);
        $reviews = Review::all();
        return ReviewResource::collection($reviews)->additional(['message' => 'Review posted successfully.']);
    }

    public function update(Request $request, Review $review)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
        ]);

        $review->update($validatedData);
        $reviews = Review::all();
        return ReviewResource::collection($reviews)->additional(['message' => 'Review updated successfully.']);
    }

    public function destroy(Review $review)
    {
        $review->delete();
        $reviews = Review::all();
        return ReviewResource::collection($reviews)->additional(['message' => 'Review deleted successfully.']);
    }
}
