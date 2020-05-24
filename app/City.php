<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'cities';
    protected $fillable = ['name', 'lat', 'lng', 'population'];
    public $timestamps = false;
}
