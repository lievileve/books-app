<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
        public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    public function store(): JsonResponse
    {
        //function from chatGPT, update and refactor using RMB
        // // Validate the request data
        // $validatedData = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'author_id' => 'required|integer|exists:authors,id',
        // ]);

        // Create a new book using the validated data
        $book = Book::create();

        // Return the newly created book as a JSON response
        return response()->json($book, 201);
    }

}
