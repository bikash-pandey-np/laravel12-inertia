<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\District;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocalBody extends Model
{
    protected $fillable = ['district_id', 'name_en', 'name_np', 'ward_count', 'type'];

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }

    public function getNameAttribute()
    {
        $column = "name_" . app()->getLocale();
        return $this->{$column} ?? $this->name_en;
    }
}
