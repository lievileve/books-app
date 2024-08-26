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

Route::post('/books', [BookController::class, 'store']); //posts new book to the store

//Author routes:
Route::get('/authors', [AuthorController::class, 'index']); //lists all authors
