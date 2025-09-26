<?php
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AccountController::class, 'register']);
Route::post('/login', [AccountController::class, 'login']);
Route::post('/goal', [SessionController::class, 'goal']);
Route::post('/cat_goal', [SessionController::class, 'cat_goal']);
Route::post('/date', [SessionController::class, 'date']);

Route::get('/progress', [ProgressController::class, 'progress']);
Route::post('/update', [ProgressController::class, 'update']);




