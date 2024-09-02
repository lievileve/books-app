<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{   //version below: eager loading without resource
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
    //version below: Resource collection without eager loading. 
    public function index()
    {
        $books = Book::all();
        return BookResource::collection($books);
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

    // public function store(Request $request): JsonResponse
    // {
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author_id' => 'required|integer|exists:authors,id',
    //     ]);

    //     $book = Book::create($validatedData);

    //     return (new BookResource($book))->response()->setStatusCode(201);
    // }


    public function show(Book $book)
    {
        $book->load('author:id,name');
        return response()->json($book);
    }

    // public function show(Book $book)
    // {
    //     $book->load('author:id,name');
    //     return new BookResource($book);
    // }


    public function update(Request $request, Book $book)
    {

        $book->load('author:id,name');
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
    // public function update(Request $request, Book $book): JsonResponse
    // {
    //     $book->load('author:id,name');
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author_id' => 'required|integer|exists:authors,id',
    //     ]);

    //     $book->update($validatedData);

    //     return (new BookResource($book))->additional([
    //         'success' => true,
    //         'message' => 'Book updated successfully.',
    //     ]);
    // }
}
