<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Province;
use App\Models\District;
use App\Models\LocalBody;
use App\Models\City;

class NepalAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['name_en' => 'Koshi Province', 'name_np' => 'कोशी प्रदेश'],
            ['name_en' => 'Madhesh Province', 'name_np' => 'मधेश प्रदेश'],
            ['name_en' => 'Bagmati Province', 'name_np' => 'बागमती प्रदेश'],
            ['name_en' => 'Gandaki Province', 'name_np' => 'गण्डकी प्रदेश'],
            ['name_en' => 'Lumbini Province', 'name_np' => 'लुम्बिनी प्रदेश'],
            ['name_en' => 'Karnali Province', 'name_np' => 'कर्णाली प्रदेश'],
            ['name_en' => 'Sudurpashchim Province', 'name_np' => 'सुदूरपश्चिम प्रदेश'],
        ];

        foreach ($provinces as $p) {
            Province::create($p);
        }

        // 2. SEED DISTRICTS (Organized by Province ID)
        $districts = [
            // Bagmati (Province 3)
            ['province_id' => 3, 'name_en' => 'Kathmandu', 'name_np' => 'काठमाडौँ'],
            ['province_id' => 3, 'name_en' => 'Lalitpur', 'name_np' => 'ललितपुर'],
            ['province_id' => 3, 'name_en' => 'Bhaktapur', 'name_np' => 'भक्तपुर'],
            ['province_id' => 3, 'name_en' => 'Chitwan', 'name_np' => 'चितवन'],
            // Gandaki (Province 4)
            ['province_id' => 4, 'name_en' => 'Kaski', 'name_np' => 'कास्की'],
            ['province_id' => 4, 'name_en' => 'Tanahu', 'name_np' => 'तनहुँ'],
            // Koshi (Province 1)
            ['province_id' => 1, 'name_en' => 'Morang', 'name_np' => 'मोरङ'],
            ['province_id' => 1, 'name_en' => 'Sunsari', 'name_np' => 'सुनसरी'],
            // Add remaining 69 districts here...
        ];

        foreach ($districts as $d) {
            District::create($d);
        }

        // 3. SEED LOCAL BODIES & MAJOR CITIES
        // Example: Kathmandu Metropolitan City
        $ktmDistrict = District::where('name_en', 'Kathmandu')->first();
        $ktmMetro = LocalBody::create([
            'district_id' => $ktmDistrict->id,
            'name_en' => 'Kathmandu Metropolitan City',
            'name_np' => 'काठमाडौँ महानगरपालिका',
            'ward_count' => 32,
            'type' => 'Metropolitan'
        ]);

        // Seed Major Cities/Hubs within Kathmandu Metro
        $hubs = [
            ['name_en' => 'Kalanki', 'name_np' => 'कलङ्की'],
            ['name_en' => 'Koteshwor', 'name_np' => 'कोटेश्वर'],
            ['name_en' => 'Gongabu', 'name_np' => 'गोंगबु'], // Bus Park Area
            ['name_en' => 'Chabahil', 'name_np' => 'चावहिल'],
        ];

        foreach ($hubs as $hub) {
            City::create([
                'local_body_id' => $ktmMetro->id,
                'name_en' => $hub['name_en'],
                'name_np' => $hub['name_np'],
            ]);
        }

        // Example: Pokhara (Kaski)
        $kaskiDistrict = District::where('name_en', 'Kaski')->first();
        $pokharaMetro = LocalBody::create([
            'district_id' => $kaskiDistrict->id,
            'name_en' => 'Pokhara Metropolitan City',
            'name_np' => 'पोखरा महानगरपालिका',
            'ward_count' => 33,
            'type' => 'Metropolitan'
        ]);

        City::create([
            'local_body_id' => $pokharaMetro->id,
            'name_en' => 'Prithvi Chowk',
            'name_np' => 'पृथ्वीचोक',
        ]);
    }
}
