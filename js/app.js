// ===== CARGA DE DATOS =====
let productos = [];
let carrito = [];

// Cargar datos del JSON
async function cargarDatos() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        productos = data.productos;
        renderizarProductos(productos);
        renderizarOfertas();
        return productos;
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Datos de respaldo
        productos = [];
        return [];
    }
}

// ===== RENDERIZAR PRODUCTOS =====
function renderizarProductos(lista) {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;

    grid.innerHTML = lista.map(producto => `
        <div class="producto-card ${producto.destacado ? 'destacado' : ''}">
            <div class="imagen-container">
                <img src="${producto.imagen || 'img/placeholder.jpg'}" 
                     alt="${producto.nombre}"
                     onerror="this.src='img/placeholder.jpg'">
            </div>
            <div class="info">
                <span class="categoria-tag">${producto.categoria}</span>
                <div class="nombre">${producto.nombre}</div>
                <div class="descripcion">${producto.descripcion}</div>
                <div class="precio">$${producto.precio.toFixed(0)}</div>
                <button class="btn-agregar" data-id="${producto.id}">
                    ➕ Agregar
                </button>
            </div>
        </div>
    `).join('');

    // Eventos de los botones
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) agregarAlCarrito(producto);
        });
    });
}

// ===== RENDERIZAR OFERTAS =====
function renderizarOfertas() {
    const grid = document.getElementById('ofertasGrid');
    if (!grid) return;

    const ofertas = productos.filter(p => p.ofertas);
    if (ofertas.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#7a8f7a;">Pronto tendremos nuevas ofertas 🌱</p>';
        return;
    }

    grid.innerHTML = ofertas.map(producto => `
        <div class="producto-card">
            <div class="imagen-container">
                <img src="${producto.imagen || 'img/placeholder.jpg'}" 
                     alt="${producto.nombre}"
                     onerror="this.src='img/placeholder.jpg'">
            </div>
            <div class="info">
                <span class="categoria-tag">⭐ Oferta</span>
                <div class="nombre">${producto.nombre}</div>
                <div class="descripcion">${producto.descripcion}</div>
                <div class="precio">$${producto.precio.toFixed(0)}</div>
                <button class="btn-agregar" data-id="${producto.id}">
                    ➕ Agregar
                </button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('#ofertasGrid .btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) agregarAlCarrito(producto);
        });
    });
}

// ===== CARRITO =====
function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const total = document.getElementById('total-carrito');
    const contador = document.getElementById('contador-carrito');

    if (carrito.length === 0) {
        lista.innerHTML = '<li style="text-align:center;color:#999;">Carrito vacío</li>';
        total.textContent = 'Total: $0.00';
        contador.textContent = '0';
        return;
    }

    let totalPrecio = 0;
    lista.innerHTML = carrito.map((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;
        return `
            <li>
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${subtotal}</span>
                <button onclick="eliminarDelCarrito(${index})" 
                        style="background:none;border:none;color:#e74c3c;cursor:pointer;">
                    ✕
                </button>
            </li>
        `;
    }).join('');

    total.textContent = `Total: $${totalPrecio.toFixed(0)}`;
    contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// ===== WHATSAPP =====
document.getElementById('enviarWhatsApp')?.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Agrega productos al carrito primero.');
        return;
    }

    let mensaje = '🌿 *Nuevo Pedido Vivero & Jardín* 🌿\n';
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        mensaje += `• ${item.nombre} (x${item.cantidad}) → $${subtotal}\n`;
        total += subtotal;
    });
    mensaje += `\n💰 *Total: $${total}*`;
    mensaje += `\n\n📦 ¡Gracias por tu compra! Envíame tu dirección.`;

    const numero = '5491123456789';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// ===== VACIAR CARRITO =====
document.getElementById('vaciarCarrito')?.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

// ===== TOGGLE CARRITO =====
document.getElementById('carritoToggle')?.addEventListener('click', () => {
    document.getElementById('carritoPanel').classList.toggle('active');
});

// ===== MENÚ HAMBURGUESA =====
document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
    document.getElementById('menuToggle').classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('menuToggle').classList.remove('active');
    });
});

// ===== FILTROS =====
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const categoria = btn.dataset.categoria;
        const filtrados = categoria === 'todos' 
            ? productos 
            : productos.filter(p => p.categoria === categoria);
        
        renderizarProductos(filtrados);
    });
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});
