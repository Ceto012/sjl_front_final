<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Layout extends Controller
{
    public function show()
    {
        // Lógica para mostrar una vista
        return view('layout');
    }
}
