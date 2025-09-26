<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cat_goal extends Model
{
    protected $primaryKey = 'id_cat_goal';
        protected $fillable = [
        'id_client',
        'id_category',
        'cat_custom',
        'cat_save',
    ];
}
