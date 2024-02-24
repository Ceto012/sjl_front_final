<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Short extends Controller
{
    public function show()
    {
        // Lógica para mostrar una vista
        return view('components.alarm.short');
    }
}
