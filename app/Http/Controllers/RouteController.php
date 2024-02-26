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
        return view('components.alarm.double');
    }

    public function showLong()
    {
        // Lógica para mostrar una vista
        return view('components.alarm.long');
    }

    public function showAdmin()
    {
        // Lógica para mostrar una vista
        return view('components.alarm.admin');
    }

    public function showSensor()
    {
        // Lógica para mostrar una vista
        return view('sensor.sensor');
    }

    public function showSpeaker()
    {
        // Lógica para mostrar una vista
        return view('speaker.speaker');
    }
}
