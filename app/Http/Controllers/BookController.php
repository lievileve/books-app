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
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer|exists:authors,id',
        ]);

        $book = Book::create($validatedData);

        return response()->json($book, 201);
    }


    public function show(Book $book)
    {
        $book->load('author:id,name');
        return response()->json($book);
    }


    public function update(Request $request, Book $book)
    {

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer|exists:authors,id',
        ]);


        $book->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Book updated successfully.',
            'data' => $book
        ], 200);
    }
}
