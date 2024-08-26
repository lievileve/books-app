<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
        public function index()
    {
        $books = Book::with('author:id,name')->get();
        return response()->json($books);
    }

public function store(Request $request): JsonResponse
{
    // Validate the request data
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'author_id' => 'required|integer|exists:authors,id',
    ]);

    // Create a new book using the validated data
    $book = Book::create($validatedData);

    // Return the newly created book as a JSON response
    return response()->json($book, 201);
}

    public function show(Book $book)
    {
    
        return response()->json($book);
    }
}
