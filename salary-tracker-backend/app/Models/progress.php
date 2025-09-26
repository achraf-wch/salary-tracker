<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class progress extends Model
{
    protected $primaryKey = 'id_progress';
            protected $fillable = [
        'id_client',
        'id_date',
        'id_gaol',
        'id_cat_goal',
       
    ];
}
