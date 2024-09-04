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

        return AuthorResource::collection($authors)->additional(['message' => 'Author created successfully.']);
    }

    public function update(Request $request, Author $author)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $author->update($validatedData);

        $authors = Author::all();

        return AuthorResource::collection($authors)->additional(['message' => 'Author updated successfully.']);
    }

    public function destroy(Author $author)
    {
        if ($author->books()->count() > 0) {
            return response()->json([
                'message' => 'The author cannot be deleted because they have associated books.'
            ], 400);
        }

        $author->delete();
        $authors = Author::all();

        return AuthorResource::collection($authors)->additional(['message' => 'Author deleted successfully.']);
    }
}
