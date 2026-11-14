// Datos iniciales de BYTEZONE. Los productos y precios son EJEMPLOS de demostración.
export const usuariosIniciales = [
  { nombre: 'Administrador BYTEZONE', email: 'admin@bytezone.com', password: 'Admin123*', rol: 'admin' },
  { nombre: 'Cliente de Prueba', email: 'cliente@bytezone.com', password: 'Cliente123*', rol: 'cliente' }
];

export const categoriasIniciales = [
  ['Computadores', 'computadores'],
  ['Portátiles', 'portatiles'],
  ['Procesadores', 'procesadores'],
  ['Tarjetas gráficas', 'tarjetas-graficas'],
  ['Memorias RAM', 'memorias-ram'],
  ['Almacenamiento', 'almacenamiento'],
  ['Periféricos', 'perifericos']
];

export const marcasIniciales = [
  'ASUS', 'Lenovo', 'HP', 'MSI', 'Acer', 'Intel', 'AMD', 'Gigabyte',
  'Corsair', 'Kingston', 'Samsung', 'Western Digital', 'Logitech', 'Razer', 'BYTEZONE'
];

export const fichasIniciales = [
  { numero: '3235904', programa: 'Análisis y Desarrollo de Software (ADSO)', instructor: 'Miguel Andrés Arévalo Vela' },
  { numero: '0000001', programa: 'Ficha de ejemplo (demostración)', instructor: 'Instructor de ejemplo' },
  { numero: '0000002', programa: 'Ficha de ejemplo (demostración)', instructor: 'Instructor de ejemplo' }
];

// [nombre, descripcion, precio COP, stock, slug categoria, marca, destacado]
export const productosIniciales = [
  ['PC Gamer BYTEZONE Ryzen 5 5600 + RTX 3060', 'Equipo armado para jugar en 1080p: Ryzen 5 5600, RTX 3060 12GB, 16GB DDR4 y SSD NVMe de 1TB.', 4299000, 6, 'computadores', 'BYTEZONE', 1],
  ['PC Oficina Intel Core i5-12400 16GB 512GB SSD', 'Computador de escritorio silencioso y rápido para trabajo, estudio y multitarea.', 2349000, 12, 'computadores', 'BYTEZONE', 0],
  ['All in One HP 24" Ryzen 5 8GB 512GB', 'Todo en uno con pantalla Full HD de 24 pulgadas, teclado y mouse incluidos.', 2799000, 4, 'computadores', 'HP', 0],

  ['ASUS TUF Gaming F15 Core i5 RTX 3050 16GB', 'Portátil gamer con pantalla de 144 Hz, 16GB de RAM y SSD de 512GB.', 3799000, 8, 'portatiles', 'ASUS', 1],
  ['Lenovo IdeaPad 3 Ryzen 5 8GB 512GB', 'Portátil liviano para estudio y oficina, pantalla de 15.6" Full HD.', 1999000, 15, 'portatiles', 'Lenovo', 0],
  ['HP Pavilion 15 Core i5 16GB 512GB', 'Portátil de diseño delgado con 16GB de RAM y buen rendimiento diario.', 2699000, 7, 'portatiles', 'HP', 0],
  ['MSI Katana 15 Core i7 RTX 4060 16GB', 'Portátil gamer de alto rendimiento con RTX 4060 y teclado retroiluminado.', 6299000, 3, 'portatiles', 'MSI', 1],
  ['Acer Aspire 5 Core i3 8GB 256GB', 'Opción económica para tareas básicas, navegación y clases virtuales.', 1699000, 0, 'portatiles', 'Acer', 0],

  ['Intel Core i5-12400F', 'Procesador de 6 núcleos y 12 hilos, socket LGA1700 (requiere tarjeta gráfica dedicada).', 689000, 20, 'procesadores', 'Intel', 0],
  ['Intel Core i7-12700K', 'Procesador de 12 núcleos para gaming y producción, socket LGA1700.', 1289000, 5, 'procesadores', 'Intel', 0],
  ['AMD Ryzen 5 5600', 'Procesador de 6 núcleos y 12 hilos, socket AM4. Excelente relación precio-rendimiento.', 549000, 25, 'procesadores', 'AMD', 1],
  ['AMD Ryzen 7 5700X', 'Procesador de 8 núcleos y 16 hilos, socket AM4, ideal para jugar y editar.', 849000, 9, 'procesadores', 'AMD', 0],

  ['ASUS Dual GeForce RTX 3060 12GB', 'Tarjeta gráfica con 12GB GDDR6, ideal para 1080p y 1440p.', 1349000, 6, 'tarjetas-graficas', 'ASUS', 0],
  ['MSI GeForce RTX 4060 Ventus 2X 8GB', 'Tarjeta gráfica eficiente con DLSS 3 y trazado de rayos.', 1649000, 10, 'tarjetas-graficas', 'MSI', 1],
  ['Gigabyte Radeon RX 6600 8GB', 'Tarjeta gráfica AMD de 8GB GDDR6 para jugar en 1080p.', 989000, 2, 'tarjetas-graficas', 'Gigabyte', 0],
  ['ASUS Phoenix GeForce GTX 1650 4GB', 'Tarjeta gráfica compacta de entrada, perfecta para equipos pequeños.', 749000, 11, 'tarjetas-graficas', 'ASUS', 0],

  ['Kingston Fury Beast 16GB (2x8) DDR4 3200', 'Kit de memoria RAM DDR4 de 16GB con disipador.', 229000, 30, 'memorias-ram', 'Kingston', 0],
  ['Corsair Vengeance 32GB (2x16) DDR4 3600', 'Kit de 32GB DDR4 de alto rendimiento para multitarea pesada.', 449000, 14, 'memorias-ram', 'Corsair', 1],
  ['Corsair Vengeance 32GB (2x16) DDR5 5600', 'Kit DDR5 de 32GB para plataformas modernas.', 599000, 5, 'memorias-ram', 'Corsair', 0],

  ['Samsung 970 EVO Plus 1TB NVMe', 'SSD NVMe M.2 de 1TB con lectura de hasta 3.500 MB/s.', 459000, 18, 'almacenamiento', 'Samsung', 1],
  ['Kingston NV2 500GB NVMe', 'SSD NVMe M.2 de 500GB, arranque y carga de programas muy rápidos.', 189000, 40, 'almacenamiento', 'Kingston', 0],
  ['Western Digital Blue 2TB HDD', 'Disco duro de 2TB, 3.5 pulgadas, para guardar grandes cantidades de archivos.', 289000, 22, 'almacenamiento', 'Western Digital', 0],
  ['Samsung 870 EVO 1TB SATA', 'SSD SATA de 1TB, ideal para renovar equipos antiguos.', 429000, 3, 'almacenamiento', 'Samsung', 0],

  ['Logitech G502 HERO Mouse Gamer', 'Mouse gamer con sensor de 25.600 DPI y 11 botones programables.', 189000, 35, 'perifericos', 'Logitech', 1],
  ['Razer BlackWidow V3 Teclado Mecánico', 'Teclado mecánico con iluminación RGB y reposamuñecas.', 459000, 8, 'perifericos', 'Razer', 0],
  ['Corsair HS55 Audífonos Gamer', 'Audífonos con sonido envolvente y micrófono desmontable.', 249000, 16, 'perifericos', 'Corsair', 0],
  ['Logitech C920 Webcam Full HD', 'Cámara web 1080p para videollamadas y clases virtuales.', 299000, 13, 'perifericos', 'Logitech', 0],
  ['ASUS TUF Gaming VG249Q Monitor 24" 144Hz', 'Monitor IPS Full HD de 144 Hz para jugar sin desenfoque.', 799000, 5, 'perifericos', 'ASUS', 0]
];
