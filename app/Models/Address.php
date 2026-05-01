<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\City;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    protected $fillable = ['city_id', 'ward_no', 'tole_en', 'tole_np'];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    // Helper to get the Tole name based on locale
    public function getToleAttribute()
    {
        $column = "tole_" . app()->getLocale();
        return $this->{$column} ?? $this->tole_en;
    }

    /**
     * Helper to get a full formatted address string
     * Usage: $address->full_address
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->tole}, Ward {$this->ward_no}, {$this->city->name}";
    }
}
