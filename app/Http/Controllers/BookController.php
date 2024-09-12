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

        return BookResource::collection($books);
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

        return BookResource::collection($books);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        $books = Book::all();
        return BookResource::collection($books);
    }
}