<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Book routes;
Route::get('/books', [BookController::class, 'index']); //collects all books from store and displays them in overview
Route::get('/books/{book}', [BookController::class, 'show']); //retrieves book by id and displays its info
Route::post('/books', [BookController::class, 'store']); //adds new book to database
Route::put('/books/{book}', [BookController::class, 'update']); //updates book in database
Route::delete('/books/{book}', [BookController::class, 'destroy']); //deletes book from database

//Author routes:
Route::get('/authors', [AuthorController::class, 'index']); //lists all authors
Route::get('/authors/{author}', [AuthorController::class, 'show']); //list single author
Route::post('/authors', [AuthorController::class, 'store']); //adds new author to database
Route::put('/authors/{author}', [AuthorController::class, 'update']); //updates author in database
Route::delete('/authors/{author}', [AuthorController::class, 'destroy']); //deletes author from database

//Review routes:
Route::get('/reviews', [ReviewController::class, 'index']); //collects all reviews from database 
Route::get('/reviews/{review}', [ReviewController::class, 'show']); //retrieves review by id
Route::post('/reviews', [ReviewController::class, 'store']); //adds new review to database
Route::put('/reviews/{review}', [ReviewController::class, 'update']); //updates review in database
Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']); //deletes review from database
