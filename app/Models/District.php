<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Province;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class District extends Model
{
    protected $fillable = ['province_id', 'name_en', 'name_np'];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function localBodies(): HasMany
    {
        return $this->hasMany(LocalBody::class);
    }

    public function getNameAttribute()
    {
        $column = "name_" . app()->getLocale();
        return $this->{$column} ?? $this->name_en;
    }
}
