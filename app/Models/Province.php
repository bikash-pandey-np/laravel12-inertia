<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\District;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = ['name_en', 'name_np'];

    public function districts(): HasMany
    {
        return $this->hasMany(District::class);
    }

    // Helper for easy name access: $province->name
    public function getNameAttribute()
    {
        $locale = app()->getLocale(); // 'en' or 'np'
        $column = "name_{$locale}";
        return $this->{$column} ?? $this->name_en;
    }
}
