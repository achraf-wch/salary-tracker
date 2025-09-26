<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class date extends Model
{
    protected $primaryKey = 'id_date';
     protected $fillable = [
        
        'start',
        'end',
        
    ];
}
