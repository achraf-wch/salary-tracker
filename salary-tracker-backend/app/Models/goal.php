<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class goal extends Model
{
   
       protected $primaryKey = 'id_goal'; // <--- ADD THIS
    public $incrementing = true;
    protected $keyType = 'int';
        protected $fillable = [
        'id_client',
        'custom',
        'save',
        'invest',
    ];
}
