<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'clients';
    protected $primaryKey = 'id_client'; // <--- ADD THIS
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'name',
        'age',
        'email',
        'password',
    ];
}
