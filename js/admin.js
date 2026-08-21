// ===== CRUD PARA ADMIN =====
let productos = [];
let modoEdicion = false;

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosAdmin();
    setupEventListeners();
});

function setupEventListeners() {
    // Formulario
    document.getElementById('productForm').addEventListener('submit', guardarProducto);
    document.getElementById('btnCancelar').addEventListener('click', cancelarEdicion);
    document.getElementById('btnDescargarJSON').addEventListener('click', descargarJSON);
    document.getElementById('btnCargarJSON').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput').addEventListener('change', cargarJSONDesdeArchivo);
}

// ===== CARGAR DATOS =====
async function cargarDatosAdmin() {
    try {
        const response = await fetch('../data.json');
        const data = await response.json();
        productos = data.productos || [];
        renderizarLista();
    } catch (error) {
        console.error('Error cargando datos:', error);
        productos = [];
        renderizarLista();
    }
}

// ===== RENDERIZAR LISTA =====
function renderizarLista() {
    const container = document.getElementById('productosList');
    if (productos.length === 0) {
        container.innerHTML = '<p style="color:#999;text-align:center;padding:2rem;">No hay productos cargados</p>';
        return;
    }

    container.innerHTML = productos.map((p, index) => `
        <div class="producto-item">
            <div class="info">
                <span class="nombre">${p.nombre}</span>
                <span class="categoria">${p.categoria}</span>
                ${p.destacado ? '⭐' : ''}
                ${p.ofertas ? '🔥' : ''}
            </div>
            <div class="precio">$${p.precio.toFixed(0)}</div>
            <div class="acciones">
                <button class="btn-edit" onclick="editarProducto(${index})">✏️ Editar</button>
                <button class="btn-delete" onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ===== GUARDAR PRODUCTO =====
function guardarProducto(e) {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        descripcion: document.getElementById('descripcion').value,
        stock: parseInt(document.getElementById('stock').value) || 0,
        codigo: document.getElementById('codigo').value || `PROD-${Date.now().toString().slice(-4)}`,
        imagen: document.getElementById('imagen').value || 'img/placeholder.jpg',
        thumbnail: document.getElementById('thumbnail').value || 'img/placeholder.jpg',
        destacado: document.getElementById('destacado').checked,
        ofertas: document.getElementById('ofertas').checked,
        etiquetas: document.getElementById('etiquetas').value.split(',').map(t => t.trim()).filter(t => t)
    };

    if (id) {
        // Editar
        const index = productos.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            datos.id = parseInt(id);
            // Mantener fecha de registro original
            datos.fecha_registro = productos[index].fecha_registro;
            productos[index] = datos;
        }
    } else {
        // Nuevo
        datos.id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        datos.fecha_registro = new Date().toISOString().split('T')[0];
        productos.push(datos);
    }

    renderizarLista();
    resetearFormulario();
    alert(id ? '✅ Producto actualizado correctamente' : '✅ Producto agregado correctamente');
}

// ===== EDITAR PRODUCTO =====
function editarProducto(index) {
    const p = productos[index];
    document.getElementById('productId').value = p.id;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('precio').value = p.precio;
    document.getElementById('descripcion').value = p.descripcion;
    document.getElementById('stock').value = p.stock;
    document.getElementById('codigo').value = p.codigo;
    document.getElementById('imagen').value = p.imagen || '';
    document.getElementById('thumbnail').value = p.thumbnail || '';
    document.getElementById('destacado').checked = p.destacado || false;
    document.getElementById('ofertas').checked = p.ofertas || false;
    document.getElementById('etiquetas').value = (p.etiquetas || []).join(', ');
    document.getElementById('formTitle').textContent = '✏️ Editar Producto';
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
    modoEdicion = true;
}

// ===== ELIMINAR PRODUCTO =====
function eliminarProducto(index) {
    if (confirm(`¿Estás seguro de eliminar "${productos[index].nombre}"?`)) {
        productos.splice(index, 1);
        renderizarLista();
        alert('🗑️ Producto eliminado');
    }
}

// ===== CANCELAR EDICIÓN =====
function cancelarEdicion() {
    resetearFormulario();
}

function resetearFormulario() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('formTitle').textContent = 'Agregar Producto';
    document.getElementById('destacado').checked = false;
    document.getElementById('ofertas').checked = false;
    modoEdicion = false;
}

// ===== DESCARGAR JSON =====
function descargarJSON() {
    const data = { productos: productos };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ===== CARGAR JSON DESDE ARCHIVO =====
function cargarJSONDesdeArchivo(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            if (data.productos && Array.isArray(data.productos)) {
                productos = data.productos;
                renderizarLista();
                alert('✅ JSON cargado correctamente');
            } else {
                alert('❌ El archivo no tiene el formato esperado (debe tener un array "productos")');
            }
        } catch (error) {
            alert('❌ Error al leer el archivo JSON');
            console.error(error);
        }
    };
    reader.readAsText(file);
    e.target.value = ''; // Resetear input
}
