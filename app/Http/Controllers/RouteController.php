<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function showShort()
    {
        // Lógica para mostrar una vista
        return view('components.alarm.short');
    }

    public function showLayout()
    {
        // Lógica para mostrar una vista
        return view('components.layout');
    }

    public function showDouble()
    {
        // Lógica para mostrar una vista
        return view('components.double');
    }

    public function showLong()
    {
        // Lógica para mostrar una vista
        return view('components.long');
    }

    public function showAdmin()
    {
        // Lógica para mostrar una vista
        return view('components.admin');
    }
}
