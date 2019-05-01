/*  Este código va en el backend
    Es la nueva clase de GraficaData

    Si este archivo ya existe, reemplazarlo por este nuevo.
    Esta simplificado pero funciona de la misma manera
    que en la sección anterior.
*/

export class GraficaData2 {

    private labels: Array<string> = [];
    private valores: Array<number> = [0, 0, 0, 0];

    setLabels(labels: Array<string>): void {
        this.labels = labels;
    }

    getDataGrafica(): Array<Object> {
        return [
            {data: this.valores, label: 'Preguntas'}
        ];
    }

    incrementarValor(opcion: number, valor: number): Array<Object> {

        this.valores[opcion] += valor;

        return this.getDataGrafica();
    }

}
