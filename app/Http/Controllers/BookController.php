<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return BookResource::collection($books);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer|exists:authors,id',
        ]);

        $book = Book::create($validatedData);

        $books = Book::all();

        return BookResource::collection($books)->additional([
            'success' => true,
            'message' => 'Book added successfully.',
        ]);
    }

    public function show(Book $book)
    {
        return new BookResource($book);
    }

    public function update(Request $request, Book $book)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|integer|exists:authors,id',
        ]);

        $book->update($validatedData);

        $books = Book::all();

        return BookResource::collection($books)->additional([
            'success' => true,
            'message' => 'Book updated successfully.',
        ]);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        $books = Book::all();
        return BookResource::collection($books)->additional([
            'success' => true,
            'message' => 'Book deleted successfully.',
        ]);
    }
}
//old functions 
 //version below: eager loading without resource
    // public function index()
    // {
    //     $books = Book::with('author:id,name')->get();
    //     return response()->json($books);
    // }

    //version below: eager loading with resource collection
    // public function index()
    // {
    //     $books = Book::with('author:id,name')->get();
    //     return BookResource::collection($books);
    // } 


    // public function store(Request $request): JsonResponse
    // {
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author_id' => 'required|integer|exists:authors,id',
    //     ]);

    //     $book = Book::create($validatedData);

    //     return response()->json($book, 201);
    // }

        // public function show(Book $book)
    // {
    //     $book->load('author:id,name');
    //     return response()->json($book);
    // }

       // public function update(Request $request, Book $book)
    // {

    //     $book->load('author:id,name');
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author_id' => 'required|integer|exists:authors,id',
    //     ]);


    //     $book->update($validatedData);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Book updated successfully.',
    //         'data' => $book
    //     ], 200);
    // }
    // public function update(Request $request, Book $book): JsonResponse
    // {
    //     // $book->load('author:id,name');
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author_id' => 'required|integer|exists:authors,id',
    //     ]);

    //     $book->update($validatedData);

    //     // Prepare the response data
    //     $responseData = [
    //         'success' => true,
    //         'message' => 'Book updated successfully.',
    //         'data' => new BookResource($book), // Use BookResource to format the book data
    //     ];

    //     // Return a JSON response
    //     return response()->json($responseData);
    // }