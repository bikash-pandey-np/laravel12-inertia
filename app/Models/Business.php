<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Business extends Authenticatable
{
    public $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'pan_no',
        'phone_no',
        'password',
        'status',
        'is_phone_verified',
        'phone_verified_at',
        'remember_token',
    ];

    protected $casts = [
        'status' => 'boolean',
        'is_phone_verified' => 'boolean',
        'phone_verified_at' => 'datetime',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $appends = ['formatted_registration_date'];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            do {
                $uuid = (string) Str::uuid();
            } while (static::where('uuid', $uuid)->exists());

            $model->uuid = $uuid;
        });
    }
    protected function getFormattedRegistrationDateAttribute()
    {
        return $this->created_at->format('j F, Y - h:i:s');
    }
}
