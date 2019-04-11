export class GraficaData {
    private meses: Array<string> = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: Array<number> = [65, 59, 180, 81];

    constructor() {

    }

    getDataGrafica(): any {
        return {data: this.valores, label: 'Series A'};
    }

    incrementarValor(mes: string, valor: number): any {

        mes = mes.toLowerCase()
            .trim();

        for (const i in this.meses) {
            if (this.meses[i] === mes) {
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica();
    }

}
