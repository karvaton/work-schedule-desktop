export const palette = [
    '#619b8a', '#fe7f2d', '#e883f9', '#06d6a0', '#9eadff',
    '#8bc34a', '#00bcd4', '#ffd166', '#8ad8ff', '#aed9ad', '#d9adbf',
];


export class Palette {
    private readonly colors: string[]
    private colorMap = new Map();
    
    constructor(colorsArr: string[]) {
        this.colors = colorsArr;
    }

    getColor(key: number) {
        if (!this.colorMap.has(key)) {
            this.colorMap.set(key, this.colors.pop() || '#ffffff');
        }
        return this.colorMap.get(key);
    }

    removeColor(key: number) {
        if (this.colorMap.has(key)) {
            const color = this.colorMap.get(key);
            this.colors.push(color);
            this.colorMap.delete(key);
        }
    }

    static highlight(hex: string) {
        const rgb = this.hexToRgb(hex);
        const { h, s, l } = this.rgbToHsl(rgb.toString());
        const hL = (100 - l)/2 + l;
        return new HSL(h, s, hL).toString();
    }

    private static hexToRgb(hex: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || [];
        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);
        return new RGB(r, g, b);
    }

    private static rgbToHsl(rgb: string) {
        const [red, green, blue] = rgb.slice(4, -1).split(',').map(str => Number(str)) || [0, 0, 0];

            let r = red / 255;
            let g = green / 255;
            let b = blue / 255;
            const l = Math.max(r, g, b);
            const s = l - Math.min(r, g, b);
            const h = s
                ? l === r
                    ? (g - b) / s
                    : l === g
                        ? 2 + (b - r) / s
                        : 4 + (r - g) / s
                : 0;
            const hue = 60 * h < 0 ? 60 * h + 360 : 60 * h;
            const sat = 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0);
            const light = (100 * (2 * l - s)) / 2;
        return new HSL(hue, sat, light);
    }
}


class RGB {
    r: number
    g: number
    b: number

    constructor(rgb: string)
    constructor(r: number, g: number, b: number)
    constructor(ns: number | string, g: number = 0, b: number = 0) {
        if (typeof ns === 'number') {
            this.r = +ns;
            this.g = g;
            this.b = b;
        } else {
            const [r, g, b] = String(ns).slice(4, -1).split(',').map(str => Number(str)) || [0, 0, 0];
            this.r = r;
            this.g = g;
            this.b = b;
        }
    }

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

class HSL {
    h: number
    s: number
    l: number

    constructor(hsl: string)
    constructor(h: number, s: number, l: number)
    constructor(ns: number | string, s: number = 0, l: number = 0) {
        if (typeof ns === 'number') {
            this.h = +ns;
            this.s = s;
            this.l = l;
        } else {
            const regexp = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
            const [h, s, l] = regexp.exec(String(ns))?.map(str => Number(str)) || [0, 0, 0];
            this.h = h;
            this.s = s;
            this.l = l;
        }
    }

    toString() {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }
}

export default new Palette(palette);