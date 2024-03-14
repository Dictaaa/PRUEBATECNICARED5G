export function formatoMonto(monto) {
    const formatoIngles = monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const parteEnteraFormateada = formatoIngles.replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.');
    const partes = parteEnteraFormateada.split(',');

    return partes;
}

export function convertirFormatoLegible(fechaStr) {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const partesFecha = fechaStr.split('-');
    const año = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]) - 1;
    const dia = parseInt(partesFecha[2]);

    const fecha = new Date(año, mes, dia);

    const nombreMes = meses[fecha.getMonth()];

    const formatoLegible = `El ${dia} de ${nombreMes} de ${año}`;

    return formatoLegible;
}
