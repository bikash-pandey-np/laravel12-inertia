<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\LocalBody;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    protected $fillable = ['local_body_id', 'name_en', 'name_np'];

    public function localBody(): BelongsTo
    {
        return $this->belongsTo(LocalBody::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function getNameAttribute()
    {
        $column = "name_" . app()->getLocale();
        return $this->{$column} ?? $this->name_en;
    }
}
