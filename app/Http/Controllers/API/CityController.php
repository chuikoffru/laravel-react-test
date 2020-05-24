<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\City;

class CityController extends Controller
{
    /**
     * Отображаем все города
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cities = City::all();
        return response($cities, 200);
    }

    /**
     * Добавляем новый город
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $lat = $request->lat;
        $lng = $request->lng;
        $population = $request->population;
        $result = City::create(array (
            'name' => $name,
            'lat' => $lat,
            'lng' => $lng,
            'population' => $population
        ));
        return response($result, 201);
    }

    /**
     * Показываем данные одного города
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $city = City::findOrFail($id);
        return response($city, 200);
    }

    /**
     * Обновляем информацию о городе
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Удаляем город из списка
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
