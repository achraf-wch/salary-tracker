<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $primaryKey = 'id_category';
            protected $fillable = [
        'category_name',
        
        
    ];
}
