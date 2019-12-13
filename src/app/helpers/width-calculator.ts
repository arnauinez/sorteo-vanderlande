import * as p5 from 'p5';

export class WidthCalculator {
    private static p55 = new p5(null);

    private static maxIndex: number = 20;
    private static maxWidth: number = 100;
    private static minWidth: number = 50;
    
    public static getWidthPercent = (index: number): number => {
        let width: number;
        if (index <= WidthCalculator.maxIndex / 2) {
            width = WidthCalculator.p55.map(index, 0, WidthCalculator.maxIndex / 2, WidthCalculator.minWidth, WidthCalculator.maxWidth);
        } else {
            width = WidthCalculator.p55.map(index, WidthCalculator.maxIndex / 2, WidthCalculator.maxIndex, WidthCalculator.maxWidth, WidthCalculator.minWidth);
        }
        return width;
    }

    public static getFontSize = (width: number): number => WidthCalculator.p55.map(width, WidthCalculator.minWidth, WidthCalculator.maxWidth, 1.5, 2.7);
    public static getRotatationX = (index: number): number => WidthCalculator.p55.map(index, 0, WidthCalculator.maxIndex, 60, -60);
}