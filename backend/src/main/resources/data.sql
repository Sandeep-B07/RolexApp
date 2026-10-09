INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Submariner Date', '126610LN', 'Submariner', 'Unisex', 'Oystersteel', '41mm', 'Black', 'Oyster bracelet', 'Calibre 3235', '70 hours', '300 metres', 10250.00, 8, 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80', 'The archetypal diver''s watch. Ceramic bezel, luminescent hour markers and a waterproof Oyster case — engineered for the depths, admired on land.', true)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Cosmograph Daytona', '126500LN', 'Daytona', 'Men', 'Oystersteel', '40mm', 'Black', 'Oyster bracelet', 'Calibre 4130', '72 hours', '100 metres', 15150.00, 5, 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=900&q=80', 'The watch born on the racetrack. Chronograph counters, tachymetric scale and the legendary in-house Calibre 4130 movement.', true)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('GMT-Master II', '126710BLRO', 'GMT-Master II', 'Unisex', 'Oystersteel', '40mm', 'Black', 'Oyster bracelet', 'Calibre 3285', '70 hours', '100 metres', 11650.00, 6, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80', 'The "Pepsi" bezel. Two time zones at a glance — the essential companion for global travellers.', true)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Datejust 41', '126300', 'Datejust', 'Unisex', 'Oystersteel', '41mm', 'Silver', 'Oyster bracelet', 'Calibre 3235', '70 hours', '100 metres', 8300.00, 12, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80', 'The original classic. The fluted bezel, Cyclops lens and instantly recognisable proportions define the modern dress watch.', true)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Day-Date 40', '228238', 'Day-Date', 'Men', '18 ct yellow gold', '40mm', 'Champagne', 'President bracelet', 'Calibre 3255', '70 hours', '100 metres', 41250.00, 3, 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80', 'The President. Full-day date display in 18 ct gold — worn by leaders and luminaries for over sixty years.', true)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Explorer', '214270', 'Explorer', 'Unisex', 'Oystersteel', '39mm', 'Black', 'Oyster bracelet', 'Calibre 3132', '48 hours', '100 metres', 7600.00, 9, 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=900&q=80', 'Made for the summit. Clean, legible and built for the world''s highest altitudes and lowest temperatures.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Yacht-Master 42', '126655', 'Yacht-Master', 'Men', '18 ct Everose gold', '42mm', 'Chocolate brown', 'Oysterflex bracelet', 'Calibre 3235', '70 hours', '100 metres', 34850.00, 4, 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=900&q=80', 'The seafaring icon. A bidirectional rotatable bezel and a regatta chronograph for those who live on the water.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Oyster Perpetual', '124300', 'Oyster Perpetual', 'Unisex', 'Oystersteel', '36mm', 'Turquoise blue', 'Oyster bracelet', 'Calibre 3132', '48 hours', '100 metres', 6150.00, 15, 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=900&q=80', 'Pure cheerfulness. A bright lacquered dial on the most accessible Oyster of all — the joyful entry into the collection.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Daytona "Rainbow" Platinum', '116506', 'Daytona', 'Men', 'Platinum', '40mm', 'White', 'Oyster bracelet', 'Calibre 4130', '72 hours', '100 metres', 75800.00, 1, 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=900&q=80', 'A constellation on the wrist. Diamond-set bezel in platinum with ice-blue dial — the rarest of the Daytona family.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Datejust 36 "Pearl"', '278240', 'Datejust', 'Women', 'Oystersteel & 18 ct gold', '36mm', 'Mother-of-pearl', 'Jubilee bracelet', 'Calibre 2671', '48 hours', '100 metres', 12450.00, 7, 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80', 'Timeless elegance in a smaller case. Mother-of-pearl dial with diamond hour markers and fluted bezel.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Submariner "Hulk" 50th', '116610LV', 'Submariner', 'Unisex', 'Oystersteel', '40mm', 'Green', 'Oyster bracelet', 'Calibre 3135', '48 hours', '300 metres', 24500.00, 2, 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=900&q=80', 'The legendary green bezel. A collector''s homage to the 50th anniversary Submariner — instantly recognisable.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Cellini Time', '50529', 'Cellini', 'Men', '18 ct rose gold', '39mm', 'Blue', 'Leather strap', 'Calibre 3194', '48 hours', '50 metres', 28900.00, 4, 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?auto=format&fit=crop&w=900&q=80', 'The pure dress watch. Classic round case, Breguet numerals and slim profile — haute horlogerie, distilled.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Explorer II', '226570', 'Explorer', 'Men', 'Oystersteel', '42mm', 'Black', 'Oyster bracelet', 'Calibre 3187', '48 hours', '100 metres', 9800.00, 6, 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=900&q=80', 'For those who venture beyond daylight. The 24-hour bezel and orange hand track polar time with clarity.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Pearlmaster 39', '119178', 'Pearlmaster', 'Women', '18 ct yellow gold', '39mm', 'White mother-of-pearl', 'Oyster bracelet', 'Calibre 3156', '50 hours', '100 metres', 52300.00, 2, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80', 'The most opulent of all. A garden of diamonds on 18 ct gold — the jewel of the Oyster collection.', false)
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO watches (name, reference_number, collection, category, case_material, case_size, dial_color, bracelet, movement, power_reserve, water_resistance, price, stock, image_url, description, featured) VALUES
('Yacht-Master 37 "Rolesor"', '126600', 'Yacht-Master', 'Women', 'Oystersteel & 18 ct Everose gold', '37mm', 'Cognac', 'Oyster bracelet', 'Calibre 3235', '70 hours', '100 metres', 16750.00, 5, 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80', 'Two-tone grace. The classic yachting bezel in warm Rolesor — equally at home at the marina or the gala.', false)
ON CONFLICT (reference_number) DO NOTHING;
