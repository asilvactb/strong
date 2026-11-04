// Catalogue data — sourced from the current strongexport.com product pages.
// Species facts (scientific name, natural range) are general botanical references.

export type Locale = "pt" | "en" | "es";
export type L10n = Record<Locale, string>;

export type SpeciesId =
  | "carvalho"
  | "carvalho-homogeneo"
  | "nogueira"
  | "cumaru"
  | "jatoba"
  | "sucupira"
  | "hard-maple"
  | "freixo"
  | "garapa"
  | "afizelia"
  | "kambala"
  | "pinho-americano"
  | "riga"
  | "tauari"
  | "ipe"
  | "massaranduba"
  | "casquinha";

export type Species = {
  id: SpeciesId;
  name: string; // commercial PT name, used across all locales
  common: L10n;
  latin: string;
  tone: string; // fallback colour when texture is missing
  texture: string;
};

export const SPECIES: Record<SpeciesId, Species> = {
  carvalho: {
    id: "carvalho",
    name: "Carvalho",
    common: { pt: "Carvalho", en: "Oak", es: "Roble" },
    latin: "Quercus spp.",
    tone: "#BC8248",
    texture: "/textures/carvalho.jpg",
  },
  "carvalho-homogeneo": {
    id: "carvalho-homogeneo",
    name: "Carvalho Homogéneo",
    common: { pt: "Carvalho seleção homogénea", en: "Oak, homogeneous selection", es: "Roble, selección homogénea" },
    latin: "Quercus spp.",
    tone: "#BD8752",
    texture: "/textures/carvalho-homogeneo.jpg",
  },
  nogueira: {
    id: "nogueira",
    name: "Nogueira",
    common: { pt: "Nogueira", en: "Walnut", es: "Nogal" },
    latin: "Juglans spp.",
    tone: "#84674A",
    texture: "/textures/nogueira.jpg",
  },
  cumaru: {
    id: "cumaru",
    name: "Cumaru",
    common: { pt: "Cumaru", en: "Cumaru · Brazilian teak", es: "Cumarú" },
    latin: "Dipteryx odorata",
    tone: "#6A4118",
    texture: "/textures/cumaru.jpg",
  },
  jatoba: {
    id: "jatoba",
    name: "Jatobá",
    common: { pt: "Jatobá", en: "Jatoba · Brazilian cherry", es: "Jatobá" },
    latin: "Hymenaea courbaril",
    tone: "#7D4E1E",
    texture: "/textures/jatoba.jpg",
  },
  sucupira: {
    id: "sucupira",
    name: "Sucupira",
    common: { pt: "Sucupira", en: "Sucupira", es: "Sucupira" },
    latin: "Bowdichia spp.",
    tone: "#613E16",
    texture: "/textures/sucupira.jpg",
  },
  "hard-maple": {
    id: "hard-maple",
    name: "Hard Maple",
    common: { pt: "Ácer duro", en: "Hard maple", es: "Arce duro" },
    latin: "Acer saccharum",
    tone: "#BAA48A",
    texture: "/textures/hard-maple.jpg",
  },
  freixo: {
    id: "freixo",
    name: "Freixo Americano",
    common: { pt: "Freixo americano", en: "American ash", es: "Fresno americano" },
    latin: "Fraxinus americana",
    tone: "#BFA889",
    texture: "/textures/freixo.jpg",
  },
  garapa: {
    id: "garapa",
    name: "Garapa",
    common: { pt: "Garapa", en: "Garapa", es: "Garapa" },
    latin: "Apuleia leiocarpa",
    tone: "#A2732B",
    texture: "/textures/garapa.jpg",
  },
  afizelia: {
    id: "afizelia",
    name: "Afizélia",
    common: { pt: "Afizélia", en: "Afzelia · Doussié", es: "Afzelia · Doussié" },
    latin: "Afzelia spp.",
    tone: "#865A24",
    texture: "/textures/afizelia.jpg",
  },
  kambala: {
    id: "kambala",
    name: "Kambala Amarela",
    common: { pt: "Kambala amarela · Iroko", en: "Iroko", es: "Iroko" },
    latin: "Milicia excelsa",
    tone: "#B77940",
    texture: "/textures/kambala.jpg",
  },
  "pinho-americano": {
    id: "pinho-americano",
    name: "Pinho Americano",
    common: { pt: "Pinho americano", en: "Southern yellow pine", es: "Pino amarillo" },
    latin: "Pinus spp.",
    tone: "#A28449",
    texture: "/textures/pinho-americano.jpg",
  },
  riga: {
    id: "riga",
    name: "Riga",
    common: { pt: "Pinho de Riga", en: "Riga pine · Scots pine", es: "Pino de Riga" },
    latin: "Pinus sylvestris",
    tone: "#9C7D41",
    texture: "/textures/riga.jpg",
  },
  tauari: {
    id: "tauari",
    name: "Tauari",
    common: { pt: "Tauari", en: "Tauari", es: "Tauari" },
    latin: "Couratari spp.",
    tone: "#A48F69",
    texture: "/textures/tauari.jpg",
  },
  ipe: {
    id: "ipe",
    name: "Ipê",
    common: { pt: "Ipê", en: "Ipe", es: "Ipé" },
    latin: "Handroanthus spp.",
    tone: "#523B25",
    texture: "/textures/ipe.jpg",
  },
  massaranduba: {
    id: "massaranduba",
    name: "Massaranduba",
    common: { pt: "Maçaranduba", en: "Massaranduba", es: "Masaranduba" },
    latin: "Manilkara spp.",
    tone: "#987164",
    texture: "/textures/massaranduba.jpg",
  },
  casquinha: {
    id: "casquinha",
    name: "Casquinha Vermelha",
    common: { pt: "Casquinha vermelha termotratada", en: "Thermo-treated red deal", es: "Pino rojo termotratado" },
    latin: "Pinus sylvestris",
    tone: "#846E5B",
    texture: "/textures/casquinha.jpg",
  },
};

export type CategoryId =
  | "pavimento-multicamadas"
  | "pavimento-macico"
  | "deck"
  | "triplex"
  | "rodape"
  | "acessorios";

export type Build = "multilayer" | "solid" | "deck" | "triplex" | "skirting" | "underlay";

export type Variant = {
  slug: string;
  species: SpeciesId;
  line?: "Topline" | "Softline" | "Ecoline";
  label?: string; // explicit label when not species+line
  widths: number[];
  thicknesses: number[];
  lengths?: string;
  use?: ("int" | "ext")[];
  note?: L10n;
};

export type Category = {
  id: CategoryId;
  index: string;
  build: Build;
  name: L10n;
  short: L10n;
  lead: L10n;
  construction: L10n[];
  finishes: L10n[];
  extra?: { label: L10n; value: L10n }[];
  variants: Variant[];
};

const T = (pt: string, en: string, es: string): L10n => ({ pt, en, es });

const MULTI_T = [9, 12, 15, 16, 18, 19, 20];

const F = {
  cru: T("Cru", "Raw", "Crudo"),
  verniz: T("Envernizado", "Varnished", "Barnizado"),
  oleo: T("Oleado", "Oiled", "Aceitado"),
  velatura: T("Velatura", "Tinted glaze", "Veladura"),
};

export const CATEGORIES: Category[] = [
  {
    id: "pavimento-multicamadas",
    index: "01",
    build: "multilayer",
    name: T("Pavimento Multicamadas", "Engineered Flooring", "Pavimento Multicapa"),
    short: T("Multicamadas", "Engineered", "Multicapa"),
    lead: T(
      "A nobreza da madeira maciça à superfície, a estabilidade de uma base estrutural em contraplacado por baixo. Fácil de instalar, pensado para interiores sofisticados.",
      "Noble solid wood on the surface, the stability of a structural plywood base beneath. Easy to install, designed for refined interiors.",
      "La nobleza de la madera maciza en la superficie, la estabilidad de una base estructural de contrachapado debajo. Fácil de instalar, pensado para interiores sofisticados."
    ),
    construction: [
      T("Camada nobre de madeira maciça", "Noble solid-wood top layer", "Capa noble de madera maciza"),
      T("Base estrutural em contraplacado", "Structural plywood base", "Base estructural de contrachapado"),
      T("Encaixe macho-fêmea", "Tongue & groove joint", "Machihembrado"),
    ],
    finishes: [F.cru, F.verniz, F.oleo, F.velatura],
    variants: [
      { slug: "afizelia-topline", species: "afizelia", line: "Topline", widths: [90, 120], thicknesses: MULTI_T },
      { slug: "carvalho-topline", species: "carvalho", line: "Topline", widths: [100, 120, 140, 160, 185, 240], thicknesses: MULTI_T },
      { slug: "carvalho-softline", species: "carvalho", line: "Softline", widths: [100, 120, 140, 160, 185, 240], thicknesses: MULTI_T },
      { slug: "carvalho-ecoline", species: "carvalho", line: "Ecoline", widths: [100, 120, 140, 160, 185, 240], thicknesses: MULTI_T },
      { slug: "carvalho-homogeneo-softline", species: "carvalho-homogeneo", line: "Softline", widths: [120], thicknesses: MULTI_T },
      { slug: "cumaru-topline", species: "cumaru", line: "Topline", widths: [100, 120, 140], thicknesses: MULTI_T },
      { slug: "freixo-softline", species: "freixo", line: "Softline", widths: [120], thicknesses: MULTI_T },
      { slug: "garapa-topline", species: "garapa", line: "Topline", widths: [100, 120, 140, 185], thicknesses: MULTI_T },
      { slug: "hard-maple-topline", species: "hard-maple", line: "Topline", widths: [110, 120], thicknesses: MULTI_T },
      { slug: "jatoba-topline", species: "jatoba", line: "Topline", widths: [100, 120, 140, 185], thicknesses: MULTI_T },
      { slug: "kambala-amarela-topline", species: "kambala", line: "Topline", widths: [90, 120], thicknesses: MULTI_T },
      { slug: "nogueira-topline", species: "nogueira", line: "Topline", widths: [110, 120, 140, 185], thicknesses: MULTI_T },
      { slug: "nogueira-softline", species: "nogueira", line: "Softline", widths: [110, 120, 140, 185], thicknesses: MULTI_T },
      { slug: "pinho-americano-topline", species: "pinho-americano", line: "Topline", widths: [110, 135, 185], thicknesses: MULTI_T },
      { slug: "riga-softline", species: "riga", line: "Softline", widths: [110, 135, 160, 185], thicknesses: MULTI_T },
      { slug: "riga-ecoline", species: "riga", line: "Ecoline", widths: [110, 135, 160, 185], thicknesses: MULTI_T },
      { slug: "sucupira-topline", species: "sucupira", line: "Topline", widths: [100, 120, 140, 185], thicknesses: MULTI_T },
      { slug: "tauari-topline", species: "tauari", line: "Topline", widths: [100, 120, 140, 185], thicknesses: MULTI_T },
    ],
  },
  {
    id: "pavimento-macico",
    index: "02",
    build: "solid",
    name: T("Pavimento Maciço", "Solid Wood Flooring", "Pavimento Macizo"),
    short: T("Maciço", "Solid", "Macizo"),
    lead: T(
      "Madeira maciça de ponta a ponta. Força, tradição e a beleza natural de cada espécie, numa tábua que dura gerações.",
      "Solid wood through and through. Strength, tradition and the natural beauty of each species, in a board built to last generations.",
      "Madera maciza de principio a fin. Fuerza, tradición y la belleza natural de cada especie, en una tabla que dura generaciones."
    ),
    construction: [
      T("Madeira maciça integral", "Full solid wood", "Madera maciza integral"),
      T("Macho-fêmea nos quatro lados", "Tongue & groove on four sides", "Machihembrado en los cuatro lados"),
      T("Espessuras entre 19 e 21 mm", "Thicknesses between 19 and 21 mm", "Espesores entre 19 y 21 mm"),
    ],
    finishes: [F.cru, F.verniz],
    variants: [
      { slug: "afizelia-topline", species: "afizelia", line: "Topline", widths: [90, 120], thicknesses: [20] },
      { slug: "carvalho-topline", species: "carvalho", line: "Topline", widths: [90, 115, 140], thicknesses: [21] },
      { slug: "carvalho-softline", species: "carvalho", line: "Softline", widths: [90, 115, 140], thicknesses: [21] },
      { slug: "carvalho-ecoline", species: "carvalho", line: "Ecoline", widths: [140, 160], thicknesses: [21] },
      { slug: "cumaru-topline", species: "cumaru", line: "Topline", widths: [100, 120, 140], thicknesses: [20] },
      { slug: "freixo-americano-softline", species: "freixo", line: "Softline", widths: [115], thicknesses: [21] },
      { slug: "garapa-topline", species: "garapa", line: "Topline", widths: [100, 120, 140, 185], thicknesses: [20] },
      { slug: "hard-maple-topline", species: "hard-maple", line: "Topline", widths: [115], thicknesses: [21] },
      { slug: "jatoba-topline", species: "jatoba", line: "Topline", widths: [100, 120, 140, 185], thicknesses: [20] },
      { slug: "kambala-amarela-topline", species: "kambala", line: "Topline", widths: [90, 120], thicknesses: [20] },
      { slug: "nogueira-topline", species: "nogueira", line: "Topline", widths: [115, 140, 185], thicknesses: [21] },
      { slug: "nogueira-softline", species: "nogueira", line: "Softline", widths: [115, 140, 185], thicknesses: [21] },
      { slug: "pinho-americano-topline", species: "pinho-americano", line: "Topline", widths: [135, 185], thicknesses: [21] },
      { slug: "riga-softline", species: "riga", line: "Softline", widths: [110, 135], thicknesses: [21] },
      { slug: "riga-ecoline", species: "riga", line: "Ecoline", widths: [110, 135], thicknesses: [21] },
      { slug: "sucupira-topline", species: "sucupira", line: "Topline", widths: [100, 120, 140, 185], thicknesses: [20] },
      { slug: "tauari-topline", species: "tauari", line: "Topline", widths: [100, 120], thicknesses: [20] },
    ],
  },
  {
    id: "deck",
    index: "03",
    build: "deck",
    name: T("Deck", "Decking", "Tarima exterior"),
    short: T("Deck", "Decking", "Deck"),
    lead: T(
      "Madeira maciça para o exterior. Terraços, varandas, zonas de piscina e passadiços, em espécies naturalmente densas e resistentes.",
      "Solid wood for the outdoors. Terraces, balconies, pool surrounds and walkways, in naturally dense, resistant species.",
      "Madera maciza para exterior. Terrazas, balcones, zonas de piscina y pasarelas, en especies naturalmente densas y resistentes."
    ),
    construction: [
      T("Madeira maciça", "Solid wood", "Madera maciza"),
      T("Perfil liso ou antiderrapante", "Smooth or anti-slip profile", "Perfil liso o antideslizante"),
      T("Fixação oculta, semi-oculta ou à vista", "Hidden, semi-hidden or visible fixing", "Fijación oculta, semioculta o vista"),
    ],
    finishes: [T("Liso", "Smooth", "Liso"), T("Antiderrapante", "Anti-slip", "Antideslizante")],
    extra: [
      { label: T("Clips", "Clips", "Clips"), value: T("PVC · Inox", "PVC · Stainless steel", "PVC · Inox") },
    ],
    variants: [
      { slug: "cumaru", species: "cumaru", widths: [100, 125, 145], thicknesses: [20] },
      { slug: "garapa", species: "garapa", widths: [100, 125, 145], thicknesses: [20] },
      { slug: "ipe", species: "ipe", widths: [100, 135], thicknesses: [19, 20] },
      { slug: "kambala-amarela", species: "kambala", widths: [95, 125], thicknesses: [20] },
      { slug: "massaranduba", species: "massaranduba", widths: [100, 125], thicknesses: [20] },
    ],
  },
  {
    id: "triplex",
    index: "04",
    build: "triplex",
    name: T("Triplex", "Triplex Cladding", "Triplex"),
    short: T("Triplex", "Triplex", "Triplex"),
    lead: T(
      "Revestimento de fachada em madeira, com textura e caráter natural. Colado ou pregado, para interior e exterior conforme a espécie.",
      "Wood façade cladding with texture and natural character. Glued or nailed, for interior or exterior depending on species.",
      "Revestimiento de fachada en madera, con textura y carácter natural. Pegado o clavado, para interior y exterior según la especie."
    ),
    construction: [
      T("Perfil de fachada triplex", "Triplex façade profile", "Perfil de fachada triplex"),
      T("Encaixe macho-fêmea", "Tongue & groove joint", "Machihembrado"),
      T("Colado ou pregado", "Glued or nailed", "Pegado o clavado"),
    ],
    finishes: [F.cru, F.oleo],
    variants: [
      { slug: "afizelia-topline", species: "afizelia", line: "Topline", widths: [95, 125], thicknesses: [22], use: ["int", "ext"] },
      { slug: "carvalho-topline", species: "carvalho", line: "Topline", widths: [120, 145], thicknesses: [22], use: ["int"] },
      { slug: "casquinha-vermelha-termotratada", species: "casquinha", label: "Casquinha Vermelha Termotratada", widths: [135], thicknesses: [28], use: ["int", "ext"] },
      { slug: "freixo-americano-softline", species: "freixo", line: "Softline", widths: [120], thicknesses: [22], use: ["int"] },
      { slug: "hard-maple-topline", species: "hard-maple", line: "Topline", widths: [120], thicknesses: [22], use: ["int"] },
      { slug: "kambala-amarela-topline", species: "kambala", line: "Topline", widths: [95, 125], thicknesses: [22, 28], use: ["int", "ext"] },
      { slug: "nogueira-topline", species: "nogueira", line: "Topline", widths: [120, 145], thicknesses: [22], use: ["int"] },
      { slug: "pinho-americano-topline", species: "pinho-americano", line: "Topline", widths: [135, 140], thicknesses: [22, 32], use: ["int"] },
    ],
  },
  {
    id: "rodape",
    index: "05",
    build: "skirting",
    name: T("Rodapé", "Skirting Boards", "Rodapié"),
    short: T("Rodapé", "Skirting", "Rodapié"),
    lead: T(
      "O remate que fecha o espaço. Folheado e envernizado em comprimentos standard, ou maciço cru produzido por encomenda em dez espécies.",
      "The finishing line of every room. Veneered and varnished in standard lengths, or solid raw made to order in ten species.",
      "El remate que cierra el espacio. Chapado y barnizado en largos estándar, o macizo crudo fabricado por encargo en diez especies."
    ),
    construction: [
      T("Folheado sobre MDF ou contraplacado/pinho finger", "Veneer over MDF or plywood/finger-jointed pine", "Chapa sobre MDF o contrachapado/pino finger"),
      T("Maciço cru por encomenda", "Solid raw, made to order", "Macizo crudo por encargo"),
      T("Comprimentos de 1200 a 3000 mm (maciço)", "Lengths from 1200 to 3000 mm (solid)", "Largos de 1200 a 3000 mm (macizo)"),
    ],
    finishes: [F.verniz, F.cru],
    variants: [
      { slug: "mdf-folheado-carvalho", species: "carvalho", label: "MDF Folheado Envernizado · Carvalho", widths: [70], thicknesses: [14], lengths: "2250" },
      { slug: "finger-folheado-carvalho", species: "carvalho", label: "Contraplacado/Pinho Finger Folheado · Carvalho", widths: [70], thicknesses: [15], lengths: "2200 · 2450" },
      { slug: "finger-folheado-jatoba", species: "jatoba", label: "Contraplacado/Pinho Finger Folheado · Jatobá", widths: [70], thicknesses: [15], lengths: "2200 · 2450" },
      { slug: "finger-folheado-sucupira", species: "sucupira", label: "Contraplacado/Pinho Finger Folheado · Sucupira", widths: [70], thicknesses: [15], lengths: "2200 · 2450" },
      { slug: "finger-folheado-afizelia", species: "afizelia", label: "Contraplacado/Pinho Finger Folheado · Afizélia", widths: [70], thicknesses: [15], lengths: "2200 · 2450" },
      ...(["afizelia", "carvalho", "cumaru", "garapa", "jatoba", "kambala", "pinho-americano", "riga", "sucupira", "tauari"] as SpeciesId[]).map(
        (s): Variant => ({
          slug: `macico-cru-${s}`,
          species: s,
          label: `Maciço Cru · ${SPECIES[s].name}`,
          widths: [70, 90],
          thicknesses: [15, 19],
          lengths: "1200 – 3000",
          note: T("Por encomenda", "Made to order", "Por encargo"),
        })
      ),
    ],
  },
  {
    id: "acessorios",
    index: "06",
    build: "underlay",
    name: T("Acessórios", "Accessories", "Accesorios"),
    short: T("Acessórios", "Accessories", "Accesorios"),
    lead: T(
      "Tudo o que fica por baixo e faz a diferença: bases de espuma e de cortiça para colocar sob o pavimento.",
      "Everything underneath that makes the difference: foam and cork underlays to lay beneath the floor.",
      "Todo lo que queda debajo y marca la diferencia: bases de espuma y de corcho para colocar bajo el pavimento."
    ),
    construction: [
      T("Bases de espuma 2 mm", "2 mm foam underlays", "Bases de espuma 2 mm"),
      T("Versões HD antracite", "HD anthracite versions", "Versiones HD antracita"),
      T("Cortiça natural", "Natural cork", "Corcho natural"),
    ],
    finishes: [],
    variants: [
      { slug: "espuma-2mm", species: "carvalho", label: "Espuma 2 mm", widths: [], thicknesses: [2] },
      { slug: "espuma-2mm-manga", species: "carvalho", label: "Espuma 2 mm com manga plástica", widths: [], thicknesses: [2] },
      { slug: "espuma-hd-manga", species: "carvalho", label: "Espuma 2 mm HD Antracite com manga plástica", widths: [], thicknesses: [2] },
      { slug: "espuma-hd-aluminio", species: "carvalho", label: "Espuma 2 mm HD Antracite com folha de alumínio", widths: [], thicknesses: [2] },
      { slug: "cortica", species: "carvalho", label: "Cortiça", widths: [], thicknesses: [] },
    ],
  },
];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

export const variantLabel = (v: Variant) =>
  v.label ?? `${SPECIES[v.species].name}${v.line ? " " + v.line : ""}`;

export const LEGACY_IMG = "https://strongexport.com/storage/imgs";

export const COMPANY = {
  name: "Strong Export, Lda",
  brand: "Strong Wood Floors",
  founded: 2011,
  address: ["Rua de Porto D'Ave, nº 425", "Taíde", "4830-755 Póvoa de Lanhoso", "Portugal"],
  phone: "+351 253 947 104",
  mobile: "+351 966 248 435",
  email: "geral@strongexport.com",
  lat: 41.561922,
  lng: -8.220852,
  maps: "https://maps.app.goo.gl/wAZ4HcQWGWsFQ2Qh6",
};

export const PT2030 = {
  title: "PITD - Strong Export Innovation and Sustainability",
  programme: "Programa Inovação e Transição Digital",
  code: "COMPETE2030-FEDER-001583800",
  beneficiary: "STRONG EXPORT LDA",
  total: "3.346.948,96 €",
  eligible: "3.323.887,23 €",
  support: "1.329.554,89 €",
  rate: "40%",
};

export const GALLERY = [
  "curiti_afizelia_1", "curiti_carvalho_1", "curiti_cumaru", "curiti_jatoba_1", "curiti_nogueira_1",
  "curiti_riganova_1", "curiti_sucupira", "hugo_carvalho_1", "hugo_hardmapple", "hugo_riganova_1",
  "joao_sucupira_1", "mario_cumaru_2", "miguel_pinhoamericano_1", "curiti_carvalho_3", "curiti_nogueira_2",
  "curiti_riganova_3",
];

export const COVERS: Record<string, string> = {
  "pavimento-multicamadas": "/img/products/pavimento-multicamadas/carvalho-softline.jpg",
  "pavimento-macico": "/img/products/pavimento-macico/jatoba-topline.jpg",
  deck: "/img/products/deck/cumaru.jpg",
  triplex: "/img/products/triplex/nogueira-topline.jpg",
  rodape: "/textures/carvalho.jpg",
  acessorios: "/img/gallery/hugo_carvalho_1.jpg",
};

/** Studio shot that represents each product line. */
export const LINE_SHOTS: Record<CategoryId, string> = {
  "pavimento-multicamadas": "/img/shots/pavimento-multicamadas/carvalho-topline.jpg",
  "pavimento-macico": "/img/shots/pavimento-macico/nogueira-topline.jpg",
  deck: "/img/shots/deck/cumaru.jpg",
  triplex: "/img/shots/triplex/afizelia-topline.jpg",
  rodape: "/img/shots/rodape/macico-cru-carvalho.jpg",
  acessorios: "/img/shots/acessorios/bases.jpg",
};
