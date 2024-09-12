<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorCollection;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all();
        return AuthorResource::collection($authors);
    }

    public function show($author)
    {
        $author = Author::find($author);

        return response()->json($author);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author = Author::create($validatedData);
        $authors = Author::all();

        return AuthorResource::collection($authors);
    }

    public function update(Request $request, Author $author)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author->update($validatedData);

        $authors = Author::all();

        return AuthorResource::collection($authors);
    }

    public function destroy(Author $author)
    {   $author->delete();
        $authors = Author::all();

        return AuthorResource::collection($authors);
    }
}
