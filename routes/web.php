<?php

use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('components.alarm.short');
// });

Route::get('/layout', [RouteController::class, 'showLayout'])->name('layout');


Route::get('/', [RouteController::class, 'showShort'])->name('short');

Route::get('/double', [RouteController::class, 'showDouble'])->name('double');

Route::get('/long', [RouteController::class, 'showLong'])->name('long');

Route::get('/admin', [RouteController::class, 'showAdmin'])->name('admin');

Route::get('/sensor', [RouteController::class, 'showSensor'])->name('sensor');

Route::get('/speaker', [RouteController::class, 'showSpeaker'])->name('speaker');

