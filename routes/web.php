<?php

use App\Http\Controllers\Short;

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

Route::get('/', function () {
    return view('components.alarm.short');
});

Route::get('/components/layout', 'NombreDelControlador@nombreDelMetodo')->name('layout');


Route::get('/components/alarm/short', [Short::class, 'show'])->name('short');
