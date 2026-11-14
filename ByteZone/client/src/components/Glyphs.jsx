// Dibujos de cada categoría (se usan como "foto" del producto cuando no hay imagen).
const G = {
  computadores: (<><rect x="40" y="8" width="40" height="74" rx="5" /><circle cx="60" cy="24" r="5" /><path d="M48 44h24M48 54h24M48 64h24" /></>),
  portatiles: (<><rect x="22" y="14" width="76" height="50" rx="5" /><path d="M8 72h104l-7 9H15z" /></>),
  procesadores: (<><rect x="36" y="22" width="48" height="48" rx="5" /><rect x="48" y="34" width="24" height="24" rx="2" /><path d="M46 12v10M60 12v10M74 12v10M46 70v10M60 70v10M74 70v10M26 34h10M26 46h10M26 58h10M84 34h10M84 46h10M84 58h10" /></>),
  'tarjetas-graficas': (<><rect x="8" y="24" width="98" height="44" rx="5" /><circle cx="40" cy="46" r="13" /><circle cx="76" cy="46" r="13" /><path d="M8 70v12M18 68v10" /></>),
  'memorias-ram': (<><rect x="8" y="30" width="104" height="30" rx="3" /><rect x="18" y="38" width="14" height="14" rx="2" /><rect x="40" y="38" width="14" height="14" rx="2" /><rect x="62" y="38" width="14" height="14" rx="2" /><path d="M8 60v8M112 60v8M20 60v8M30 60v8M44 60v8M54 60v8M66 60v8M76 60v8M88 60v8M98 60v8" /></>),
  almacenamiento: (<><rect x="28" y="12" width="64" height="66" rx="7" /><circle cx="60" cy="42" r="16" /><circle cx="60" cy="42" r="3" /><path d="M40 68h22" /></>),
  perifericos: (<><rect x="42" y="10" width="36" height="62" rx="18" /><path d="M60 10v26M42 36h36" /></>)
};
const COLORES = { computadores: 222, portatiles: 262, procesadores: 196, 'tarjetas-graficas': 158, 'memorias-ram': 32, almacenamiento: 340, perifericos: 14 };

export const colorCategoria = (slug) => COLORES[slug] ?? 215;

export function Glyph({ slug, size = 120 }) {
  return (
    <svg viewBox="0 0 120 90" width={size} height={size * 0.75} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {G[slug] || G.computadores}
    </svg>
  );
}
