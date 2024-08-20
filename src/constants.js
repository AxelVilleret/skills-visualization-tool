// constants.js
export const LOCAL_STORAGE_KEYS = {
    COLOR_PALETTE: "color-palette",
    TAB_ORDER: "tab-order"
};

export const COLOR_PALETTES = [
    ["#ffd166", "#ef476f", "#26547c"],
    ["#e59500", "#840032", "#002642"],
    ["#f1dede", "#d496a7", "#5d576b"],
];

export const DEFAULT_COLOR_PALETTE = COLOR_PALETTES[0];

export const INACTIVE_COLOR = "#000000";

export const ACTIVE_COLOR = "#FF0000";

export const HOVERED_COLOR = "#00FF00";


export const DEFAULT_TAB_ORDER = ["Sunburst Chart", "Partition Diagram", "Circle Packing"];

export const METRICS = [
    {
        key: "mastery",
        label: "Maitrise",
    },
    {
        key: "trust",
        label: "Confiance",
    },
    {
        key: "cover",
        label: "Couverture",
    },
];