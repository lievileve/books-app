<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Book routes;
Route::get('/books', [BookController::class, 'index']); //collects all books from store and displays them in overview
Route::get('/books/{book}', [BookController::class, 'show']); //retrieves book by id and displays its info (but doesn't this need to link to edit page?)

Route::post('/books', [BookController::class, 'store']); //posts new book to the store

//Author routes:
Route::get('/authors', [AuthorController::class, 'index']); //lists all authors
