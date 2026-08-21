// ===== GENERADOR DE CATÁLOGO PDF =====
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('descargarPDF')?.addEventListener('click', generarPDF);
});

function generarPDF() {
    // Mostrar estado de carga
    const btn = document.getElementById('descargarPDF');
    const textoOriginal = btn.textContent;
    btn.textContent = '⏳ Generando...';
    btn.disabled = true;

    try {
        // Crear contenido del PDF como HTML
        const contenido = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        padding: 40px;
                        max-width: 800px;
                        margin: 0 auto;
                        color: #2d3d2d;
                    }
                    h1 {
                        text-align: center;
                        color: #2a5c3a;
                        border-bottom: 3px solid #4a8c5a;
                        padding-bottom: 20px;
                    }
                    .producto {
                        border: 1px solid #d4e0cc;
                        border-radius: 12px;
                        padding: 16px;
                        margin-bottom: 16px;
                        page-break-inside: avoid;
                    }
                    .producto h3 {
                        margin: 0 0 6px 0;
                        color: #1a3a24;
                    }
                    .categoria {
                        font-size: 0.8rem;
                        color: #7a8f7a;
                        text-transform: uppercase;
                    }
                    .precio {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #2a5c3a;
                    }
                    .descripcion {
                        color: #5a6f5a;
                        margin: 8px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        color: #7a8f7a;
                        font-size: 0.9rem;
                        border-top: 1px solid #d4e0cc;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>🌿 Catálogo Vivero & Jardín</h1>
                <p style="text-align:center;color:#5a6f5a;">
                    ${new Date().toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                    })}
                </p>
                
                ${productos.map(p => `
                    <div class="producto">
                        <div style="display:flex;justify-content:space-between;align-items:start;">
                            <div>
                                <h3>${p.nombre}</h3>
                                <div class="categoria">${p.categoria}</div>
                            </div>
                            <div class="precio">$${p.precio.toFixed(0)}</div>
                        </div>
                        <div class="descripcion">${p.descripcion}</div>
                        <div style="font-size:0.8rem;color:#7a8f7a;">
                            Código: ${p.codigo} | Stock: ${p.stock} unidades
                        </div>
                    </div>
                `).join('')}
                
                <div class="footer">
                    📱 WhatsApp: +54 911 2345-6789 | 📧 info@viveroyjardin.com<br>
                    🌱 Cultiva tu espacio con estilo y naturaleza
                </div>
            </body>
            </html>
        `;

        // Crear ventana para imprimir/PDF
        const ventana = window.open('', '_blank');
        ventana.document.write(contenido);
        ventana.document.close();
        
        // Esperar a que se cargue y luego imprimir
        setTimeout(() => {
            ventana.print();
            btn.textContent = textoOriginal;
            btn.disabled = false;
        }, 500);

    } catch (error) {
        console.error('Error generando PDF:', error);
        btn.textContent = textoOriginal;
        btn.disabled = false;
        alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    }
}
