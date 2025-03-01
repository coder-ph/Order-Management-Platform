import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import TvIcon from '@mui/icons-material/Tv';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';

export const mockCategories = [
  {
    id: 1,
    name: 'Appliances',
    icon: <LocalCafeIcon />,
  },
  {
    id: 2,
    name: 'Fashion',
    icon: <CheckroomIcon />,
  },
  {
    id: 3,
    name: 'Phones & Tablets',
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 4,
    name: 'Accessories',
    icon: <HeadphonesIcon />,
  },
]

export const mockProducts = [
  {
    id: 1,
    name: 'Unga',
    price: 169,
    category: 'Appliances',
    image: '/images/unga.jpg',
    description: 'Premium white maize flour, ideal for preparing delicious meals. Package contains 2kg of high-quality flour.'
  },
  {
    id: 2,
    name: 'Blender',
    price: 2990,
    category: 'Appliances',
    image: '/images/blender.jpg',
    description: 'Powerful kitchen blender with multiple speed settings. Perfect for smoothies, soups, and sauces. Includes grinder attachment.'
  },
  {
    id: 3,
    name: 'Television',
    price: 30299,
    category: 'Appliances',
    image: '/images/tv.jpg',
    description: '42-inch smart LED TV with 4K resolution. Features built-in streaming apps and voice control functionality.'
  },
  {
    id: 4,
    name: 'Kettle',
    price: 2790,
    category: 'Appliances',
    image: '/images/kettle.jpg',
    description: 'Stainless steel electric kettle with rapid boil technology. Features automatic shut-off and boil-dry protection.'
  },
  {
    id: 5,
    name: 'Sugar',
    price: 260,
    category: 'Appliances',
    image: '/images/sugar.jpg',
    description: 'Refined white sugar, perfect for baking and sweetening beverages. Package contains 1kg of fine granulated sugar.'
  },
  {
    id: 6,
    name: 'Glass Cleaner',
    price: 290,
    category: 'Appliances',
    image: '/images/glass-cleaner.jpg',
    description: 'Streak-free glass cleaning solution. Effective on windows, mirrors, and other glass surfaces. Contains 500ml of cleaning liquid.'
  },
  {
    id: 7,
    name: 'Vacuum Cleaner',
    price: 2000,
    category: 'Appliances',
    image: '/images/vacuum.jpg',
    description: 'Compact and powerful vacuum cleaner with cyclone technology. Features multiple attachments for various cleaning tasks.'
  },
  {
    id: 8,
    name: 'Microwave',
    price: 3490,
    category: 'Appliances',
    image: '/images/microwave.jpg',
    description: 'Digital microwave oven with multiple power levels and preset cooking programs. Capacity of 20 liters with turntable.'
  },
  {
    id: 9,
    name: 'T-Shirt',
    price: 750,
    category: 'Fashion',
    image: '/images/tshirt.jpg',
    description: '100% cotton crew neck t-shirt. Available in multiple colors and sizes. Machine washable and durable.'
  },
  {
    id: 10,
    name: 'Dress',
    price: 1500,
    category: 'Fashion',
    image: '/images/dress.jpg',
    description: 'Elegant A-line dress perfect for casual and semi-formal occasions. Made from breathable fabric with stylish design.'
  },
  {
    id: 11,
    name: 'iPhone 14',
    price: 85000,
    category: 'Phones & Tablets',
    image: '/images/iphone.jpg',
    description: 'Latest iPhone model featuring powerful A15 chip, impressive camera system, and all-day battery life. Available in multiple storage options.'
  },
  {
    id: 12,
    name: 'Samsung Galaxy Tab',
    price: 45000,
    category: 'Phones & Tablets',
    image: '/images/tablet.jpg',
    description: '10.4-inch tablet with high-resolution display, octa-core processor, and long-lasting battery. Perfect for work and entertainment.'
  },
  {
    id: 13,
    name: 'Headphones',
    price: 2500,
    category: 'Accessories',
    image: '/images/headphones.jpg',
    description: 'Wireless over-ear headphones with noise cancellation technology. Features comfortable ear cushions and up to 20 hours of battery life.'
  },
  {
    id: 14,
    name: 'Smart Watch',
    price: 5000,
    category: 'Accessories',
    image: '/images/watch.jpg',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications. Water-resistant design with customizable watch faces.'
  }
]