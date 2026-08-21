// ===== BUSCADOR CON AUTOCOMPLETAR =====
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const resultados = document.getElementById('resultados-busqueda');
    let timeout = null;

    buscador.addEventListener('input', function() {
        clearTimeout(timeout);
        const termino = this.value.trim().toLowerCase();
        
        if (termino.length < 2) {
            resultados.style.display = 'none';
            return;
        }

        timeout = setTimeout(() => {
            const coincidencias = productos.filter(p => 
                p.nombre.toLowerCase().includes(termino) ||
                p.categoria.toLowerCase().includes(termino) ||
                p.descripcion.toLowerCase().includes(termino) ||
                p.etiquetas.some(tag => tag.toLowerCase().includes(termino))
            );

            if (coincidencias.length === 0) {
                resultados.innerHTML = '<div style="padding:1rem;text-align:center;color:#999;">No se encontraron productos</div>';
                resultados.style.display = 'block';
                return;
            }

            resultados.innerHTML = coincidencias.slice(0, 10).map(p => `
                <div class="resultado-item" data-id="${p.id}">
                    <img src="${p.thumbnail || p.imagen || 'img/placeholder.jpg'}" 
                         alt="${p.nombre}"
                         onerror="this.src='img/placeholder.jpg'">
                    <div class="resultado-info">
                        <div class="nombre">${p.nombre}</div>
                        <div class="categoria">${p.categoria}</div>
                    </div>
                    <div class="precio">$${p.precio.toFixed(0)}</div>
                </div>
            `).join('');

            resultados.style.display = 'block';

            // Click en resultado
            document.querySelectorAll('.resultado-item').forEach(item => {
                item.addEventListener('click', () => {
                    const id = parseInt(item.dataset.id);
                    const producto = productos.find(p => p.id === id);
                    if (producto) {
                        agregarAlCarrito(producto);
                        buscador.value = '';
                        resultados.style.display = 'none';
                    }
                });
            });

        }, 300);
    });

    // Cerrar resultados al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultados.style.display = 'none';
        }
    });
});
