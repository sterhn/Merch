export const SELL_FILTERS = ['Все', 'Чармы', 'Принты', 'Стикеры', 'Значки', 'Брелки'];

export const ALL_ITEMS = [
  { name: 'Брелок Тодзи акрил', price: 8,  stock: 23, emoji: '🌸', color: 'primary',  type: 'Чармы'   },
  { name: 'Брелок Годзё акрил', price: 8,  stock: 31, emoji: '💜', color: 'lavender', type: 'Чармы'   },
  { name: 'Голо-набор стикеров', price: 6, stock: 47, emoji: '✨', color: 'sky',      type: 'Стикеры' },
  { name: 'Принт Юдзи А4',      price: 15, stock: 8,  emoji: '🍡', color: 'coral',    type: 'Принты'  },
  { name: 'Принт Годзё А4',     price: 15, stock: 12, emoji: '🌙', color: 'mint',     type: 'Принты'  },
  { name: 'Брелок Незуко',      price: 7,  stock: 19, emoji: '🌷', color: 'primary',  type: 'Брелки'  },
  { name: 'Значок Фрирен',      price: 5,  stock: 28, emoji: '⭐', color: 'butter',   type: 'Значки'  },
];

export const INVENTORY_ITEMS = [
  { name: 'Брелок Тодзи акрил', stock: 23, low: false, fandom: 'ДКК',    type: 'Чарм',   emoji: '🌸', color: 'primary' },
  { name: 'Принт Юдзи А4',      stock: 8,  low: true,  fandom: 'ДКК',    type: 'Принт',  emoji: '🍡', color: 'coral'   },
  { name: 'Голо-набор стикеров', stock: 47, low: false, fandom: 'Микс',   type: 'Стикер', emoji: '✨', color: 'sky'     },
  { name: 'Брелок Незуко',      stock: 4,  low: true,  fandom: 'КнЯ',    type: 'Брелок', emoji: '🌷', color: 'primary' },
  { name: 'Значок Фрирен',      stock: 28, low: false, fandom: 'Фрирен', type: 'Значок', emoji: '⭐', color: 'butter'  },
];

export const TOP_SELLERS = [
  { name: 'Брелок Тодзи акрил', sold: 24, rev: '$192', emoji: '🌸', colorIdx: 0 },
  { name: 'Голо-набор стикеров', sold: 18, rev: '$108', emoji: '✨', colorIdx: 1 },
  { name: 'Принт Годзё А4',     sold: 11, rev: '$165', emoji: '💜', colorIdx: 2 },
];

export const EXPENSE_CATS = [
  { label: 'Логистика',    color: 'sky',     emoji: '🚚' },
  { label: 'Взносы',       color: 'primary', emoji: '🎫' },
  { label: 'Производство', color: 'butter',  emoji: '🔨' },
  { label: 'Еда',          color: 'mint',    emoji: '☕' },
];

export const ACCENTS_LIST = [
  { key: 'pink',     label: 'Розовый',   dot: '#FF8AEC' },
  { key: 'lavender', label: 'Лаванда',   dot: '#CFA5FF' },
  { key: 'mint',     label: 'Мята',      dot: '#00EBA3' },
  { key: 'coral',    label: 'Коралл',    dot: '#FF8972' },
  { key: 'sky',      label: 'Небо',      dot: '#00D8FF' },
];
