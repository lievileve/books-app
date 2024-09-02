<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Resources\BookCollection;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Book routes;
Route::get('/books', [BookController::class, 'index']); //collects all books from store and displays them in overview

Route::get('/books/{book}', [BookController::class, 'show']); //retrieves book by id and displays its info

Route::post('/books', [BookController::class, 'store']); //posts new book to the store

Route::put('/books/{book}', [BookController::class, 'update']); //updates book in store

//Author routes:
Route::get('/authors', [AuthorController::class, 'index']); //lists all authors
Route::get('/authors/{author}', [AuthorController::class, 'show']);//list single author
