# 🌱 Vivero & Jardín - Tienda Online

## 📁 Estructura del Proyecto
📁 vivero-jardin/
├── 📁 img/
│ ├── 📁 productos/ # Imágenes principales (250x250px)
│ └── 📁 thumbnails/ # Miniaturas (80x80px)
├── 📁 admin/
│ └── index.html # CRUD para gestionar productos
├── 📁 css/
│ ├── styles.css # Estilos de la tienda
│ └── admin.css # Estilos del CRUD
├── 📁 js/
│ ├── app.js # Lógica de la tienda
│ ├── search.js # Buscador con autocompletar
│ ├── pdf-generator.js # Generador de PDF
│ └── admin.js # Lógica del CRUD
├── data.json # Base de datos de productos
├── index.html # Tienda principal
└── README.md # Este archivo

text

## 🚀 Cómo Usar

### 1. Preparar las Imágenes
- Coloca las imágenes principales (250x250px) en: `/img/productos/`
- Coloca las miniaturas (80x80px) en: `/img/thumbnails/`
- Usa nombres descriptivos: `echeveria.jpg`, `maceta-barro.jpg`, etc.

### 2. Administrar Productos (CRUD)
1. Abre `/admin/index.html` en tu navegador
2. Agrega, edita o elimina productos
3. Descarga el `data.json` actualizado
4. Sube el nuevo `data.json` a tu servidor

### 3. Personalizar
- **Cambiar número de WhatsApp**: En `js/app.js`, línea donde dice `const numero = '5491123456789';`
- **Cambiar colores**: En `css/styles.css`, busca `:root` y modifica los valores de color
- **Agregar categorías**: En el HTML y en el JSON, agrega la nueva categoría

### 4. Funcionalidades
- 🔍 **Buscador con autocompletar**: Busca por nombre, categoría o etiquetas
- 🛒 **Carrito de compras**: Agrega productos y envía pedido por WhatsApp
- 📄 **Catálogo PDF**: Descarga el catálogo completo con todos los productos
- ⭐ **Productos destacados**: Marca productos como destacados para resaltarlos
- 🔥 **Ofertas especiales**: Sección separada para promociones
- 📱 **Menú hamburguesa**: Navegación responsive

## 📝 Formato del JSON

```json
{
  "productos": [
    {
      "id": 1,
      "nombre": "Kit Jardín Urbano",
      "categoria": "kits",
      "precio": 2490,
      "descripcion": "Maceta + sustrato + 3 semillas de girasol",
      "stock": 15,
      "codigo": "KIT-001",
      "fecha_registro": "2026-01-15",
      "imagen": "img/productos/kit-jardin.jpg",
      "thumbnail": "img/thumbnails/kit-jardin.jpg",
      "destacado": true,
      "ofertas": true,
      "etiquetas": ["kit", "girasol", "principiante"]
    }
  ]
}
🛠️ Tecnologías Usadas
HTML5, CSS3, JavaScript (Vanilla)

JSON para datos

Print API para generar PDF

LocalStorage para persistencia (opcional)

📱 Contacto
WhatsApp: +54 911 2345-6789

Email: info@viveroyjardin.com

Web: https://tudominio.com

¡Listo para cultivar! 🌱

text

---

## 🎯 Resumen de lo Entregado:

1. ✅ **Estructura separada** - Todo organizado en carpetas
2. ✅ **JSON editable** - Puedes actualizarlo desde el CRUD
3. ✅ **Buscador con autocompletar** - Busca por nombre, categoría y etiquetas
4. ✅ **Menú hamburguesa** - Incluye Inicio, Catálogo, Ofertas y Contacto
5. ✅ **Catálogo PDF** - Descarga completa con todos los productos
6. ✅ **CRUD independiente** - Panel de administración separado en `/admin/`
7. ✅ **Imágenes cuadradas** - 250x250px para productos, 80x80px para thumbnails
8. ✅ **Estilo moderno** - Paleta verde/natural con animaciones

### 📋 Pasos para Implementar:

1. Crea todas las carpetas según la estructura
2. Copia cada archivo en su lugar correspondiente
3. Coloca tus imágenes en las carpetas `productos/` y `thumbnails/`
4. Actualiza el número de WhatsApp en `js/app.js`
5. Abre `admin/index.html` para gestionar productos
