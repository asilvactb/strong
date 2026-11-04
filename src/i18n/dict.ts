import type { Locale } from "@/data/catalog";

export const LOCALES: Locale[] = ["pt", "en", "es"];
export const isLocale = (l: string): l is Locale => (LOCALES as string[]).includes(l);

const pt = {
  nav: { home: "Início", company: "Empresa", products: "Produtos", editorial: "Editorial", pt2030: "Portugal 2030", contact: "Contactos" },
  cta: "Pedir proposta",
  ctaShort: "Falar connosco",
  tagline: "Da natureza para o seu espaço.",
  scroll: "Scroll para explorar",
  hero: {
    kicker: "Produtor e transformador de madeira · desde 2011",
    l1: "Da natureza",
    l2: "para o seu",
    l3: "espaço.",
    meta: "Póvoa de Lanhoso · Portugal",
  },
  statement:
    "Selecionamos a matéria-prima com rigor, transformamo-la com tecnologia avançada e uma equipa especializada em cada setor, e entregamos pavimentos, decks e revestimentos que trazem a madeira nobre para dentro de cada espaço.",
  statementKeys: ["rigor", "tecnologia", "madeira", "nobre"],
  collection: { label: "Coleção", title: "Seis linhas, uma matéria.", species: "espécies", variants: "referências", explore: "Explorar" },
  anatomy: {
    label: "Anatomia",
    title: "Por dentro de uma tábua multicamadas.",
    steps: [
      { t: "Camada nobre", d: "Madeira maciça da espécie escolhida. É a superfície que se vê, se toca e envelhece com o espaço." },
      { t: "Base estrutural", d: "Camada interior em contraplacado, que dá resistência à tábua." },
      { t: "Macho-fêmea", d: "Encaixe macho-fêmea, para uma instalação fácil." },
      { t: "Acabamento", d: "Cru, envernizado, oleado ou com velatura. A mesma madeira, quatro carácteres diferentes." },
    ],
  },
  species: { label: "Espécies", title: "Dezasseis madeiras. Cada uma com a sua assinatura.", hint: "Passe por cima para ver o veio" },
  numbers: {
    label: "Em números",
    items: [
      { v: 2011, l: "Ano de fundação" },
      { v: 16, l: "Espécies de madeira" },
      { v: 68, l: "Referências em catálogo" },
      { v: 6, l: "Linhas de produto" },
    ],
  },
  process: {
    label: "Processo",
    title: "Da floresta à obra.",
    steps: [
      { t: "Origem", d: "Parcerias de abate e comércio de madeira em Póvoa de Lanhoso e madeira certificada, de origem conhecida." },
      { t: "Seleção", d: "Seleção rigorosa da matéria-prima, espécie a espécie, tábua a tábua." },
      { t: "Transformação", d: "Tecnologia avançada e uma equipa especializada e motivada em cada setor da produção." },
      { t: "Acabamento", d: "Cru, envernizado, oleado ou velatura, de acordo com o produto e o projeto." },
      { t: "Entrega", d: "Pavimentos, decks, triplex, rodapés e acessórios prontos para a obra." },
    ],
  },
  responsibility: {
    label: "Responsabilidade",
    title: "Madeira certificada. Origem conhecida.",
    body:
      "A política de aquisição, assumida pela administração, exclui madeira de abate ilegal, de florestas de alto valor de conservação ameaçadas, de conversão de floresta, de árvores geneticamente modificadas ou associada à violação das Convenções Fundamentais da OIT.",
    items: ["Cumprimento da legislação laboral e de saúde e segurança", "Sem trabalho infantil nem trabalho forçado", "Sem discriminação no emprego", "Liberdade de associação e negociação coletiva"],
  },
  work: { label: "Obras", title: "Instalado.", note: "Projetos reais com madeira Strong" },
  contactBlock: { label: "Contacto", title: "Vamos dar forma ao seu projeto.", body: "Precisa de ajuda a encontrar o produto certo? Fale connosco." },
  footer: { rights: "Todos os direitos reservados", funded: "Cofinanciado por" },
  product: {
    configure: "Configurar",
    species: "Espécie",
    line: "Linha",
    width: "Largura",
    thickness: "Espessura",
    finish: "Acabamento",
    profile: "Perfil",
    use: "Utilização",
    int: "Interior",
    ext: "Exterior",
    length: "Comprimento",
    explode: "Vista explodida",
    photo: "Fotografia real",
    model: "Modelo 3D",
    specs: "Ficha técnica",
    construction: "Construção",
    all: "Todas as referências",
    request: "Pedir proposta para esta configuração",
    selected: "Configuração",
    drag: "Arraste para rodar",
    references: "referências",
    texNote: "Textura ilustrativa da espécie. As cores reais variam de tábua para tábua.",
    underlay: "Bases para pavimento",
    next: "Linha seguinte",
  },
  company: {
    label: "Empresa",
    title: "Know-how de madeira, desde 2011.",
    intro:
      "A Strong Wood Floors nasceu em 2011 como produtora de pavimentos de madeira, apoiada em anos de experiência no setor e em fortes parcerias de abate e comércio de madeira em Póvoa de Lanhoso, no norte de Portugal.",
    quality: "Qualidade",
    qualityTitle: "A qualidade é a nossa filosofia de trabalho.",
    qualityItems: ["Soluções inovadoras", "Competência técnica", "Qualidade do produto e cumprimento dos requisitos", "Melhoria contínua do sistema de gestão da qualidade"],
  },
  editorial: {
    label: "Editorial",
    title: "Notícias e investigação.",
    domotex: "A Strong Export esteve presente na Domotex, a principal feira mundial de pavimentos, “The World of Flooring”, em Hannover. Obrigado a todos os que visitaram o nosso stand.",
    research: "Investigação",
    researchIntro: "Investigação aplicada sobre a valorização de serradura e a libertação controlada de aromas em pavimentos de contraplacado.",
  },
  pt2030: {
    label: "Portugal 2030",
    title: "Inovação e sustentabilidade.",
    objective:
      "O projeto visa aumentar a capacidade produtiva através da adoção de tecnologias avançadas e soluções da Indústria 4.0. Segundo princípios ESG, investe em eficiência energética, reciclagem e economia circular, incluindo a valorização de resíduos e subprodutos para a própria produção.",
    code: "Código do projeto",
    beneficiary: "Beneficiário",
    total: "Custo total",
    eligible: "Custo total elegível",
    support: "Apoio financeiro da UE",
    rate: "Taxa de cofinanciamento",
  },
  contact: {
    label: "Contactos",
    title: "Fale connosco.",
    address: "Morada",
    phone: "Telefone",
    mobile: "Telemóvel",
    email: "Email",
    route: "Abrir no mapa",
    note: "Chamada para a rede fixa/móvel nacional, de acordo com o tarifário do seu operador.",
    form: { title: "Vamos falar do seu projeto?", personal: "Informações pessoais", project: "Requisitos do projeto", name: "Nome", email: "Email", phone: "Telefone", address: "Morada", product: "Qual o produto?", rooms: "Quais as divisões?", area: "Qual a área do seu projeto?", message: "Fale-nos sobre o seu projeto", send: "Enviar", required: "Campos obrigatórios", coords: "Coordenadas" },
  },
};

export type Dict = typeof pt;

const en: Dict = {
  nav: { home: "Home", company: "Company", products: "Products", editorial: "Editorial", pt2030: "Portugal 2030", contact: "Contact" },
  cta: "Request a quote",
  ctaShort: "Talk to us",
  tagline: "From nature to your space.",
  scroll: "Scroll to explore",
  hero: { kicker: "Wood producer & processor · since 2011", l1: "From nature", l2: "to your", l3: "space.", meta: "Póvoa de Lanhoso · Portugal" },
  statement:
    "We select our raw material with rigour, transform it with advanced technology and a specialised team in every sector, and deliver floors, decking and cladding that bring noble wood into every space.",
  statementKeys: ["rigour", "technology", "noble", "wood"],
  collection: { label: "Collection", title: "Six lines, one material.", species: "species", variants: "references", explore: "Explore" },
  anatomy: {
    label: "Anatomy",
    title: "Inside an engineered board.",
    steps: [
      { t: "Noble layer", d: "Solid wood of the chosen species. The surface you see, touch and that ages with the space." },
      { t: "Structural base", d: "Inner plywood layer that gives the board its strength." },
      { t: "Tongue & groove", d: "Tongue and groove joint for easy installation." },
      { t: "Finish", d: "Raw, varnished, oiled or tinted glaze. One wood, four characters." },
    ],
  },
  species: { label: "Species", title: "Sixteen woods. Each with its own signature.", hint: "Hover to read the grain" },
  numbers: { label: "In numbers", items: [{ v: 2011, l: "Founded" }, { v: 16, l: "Wood species" }, { v: 68, l: "Catalogue references" }, { v: 6, l: "Product lines" }] },
  process: {
    label: "Process",
    title: "From forest to site.",
    steps: [
      { t: "Origin", d: "Timber harvesting and trade partnerships in Póvoa de Lanhoso, and certified wood of known origin." },
      { t: "Selection", d: "Rigorous selection of raw material, species by species, board by board." },
      { t: "Processing", d: "Advanced technology and a specialised, motivated team in every production sector." },
      { t: "Finishing", d: "Raw, varnished, oiled or tinted glaze, depending on product and project." },
      { t: "Delivery", d: "Floors, decking, triplex, skirting and accessories ready for site." },
    ],
  },
  responsibility: {
    label: "Responsibility",
    title: "Certified wood. Known origin.",
    body:
      "Our sourcing policy, endorsed by senior management, excludes wood that is illegally harvested, from threatened high-conservation-value forests, from forest conversion, from genetically modified trees, or linked to violations of the ILO Core Conventions.",
    items: ["Compliance with labour and health & safety law", "No child or forced labour", "No discrimination in employment", "Freedom of association and collective bargaining"],
  },
  work: { label: "Projects", title: "Installed.", note: "Real projects in Strong wood" },
  contactBlock: { label: "Contact", title: "Let's shape your project.", body: "Need help finding the right product? Talk to us." },
  footer: { rights: "All rights reserved", funded: "Co-funded by" },
  product: {
    configure: "Configure", species: "Species", line: "Line", width: "Width", thickness: "Thickness", finish: "Finish", profile: "Profile", use: "Use",
    int: "Interior", ext: "Exterior", length: "Length", explode: "Exploded view", photo: "Real photo", model: "3D model", specs: "Specifications",
    construction: "Construction", all: "All references", request: "Request a quote for this configuration", selected: "Configuration", drag: "Drag to rotate",
    references: "references", texNote: "Illustrative species texture. Real colours vary from board to board.", underlay: "Floor underlays", next: "Next line",
  },
  company: {
    label: "Company",
    title: "Wood know-how, since 2011.",
    intro:
      "Strong Wood Floors was founded in 2011 as a wood flooring manufacturer, built on years of experience in the sector and strong timber harvesting and trading partnerships in Póvoa de Lanhoso, northern Portugal.",
    quality: "Quality",
    qualityTitle: "Quality is our working philosophy.",
    qualityItems: ["Innovative solutions", "Technical competence", "Product quality and compliance with requirements", "Continuous improvement of the quality management system"],
  },
  editorial: {
    label: "Editorial",
    title: "News and research.",
    domotex: "Strong Export exhibited at Domotex, the world's leading flooring fair, “The World of Flooring”, in Hannover. Thank you to everyone who visited our stand.",
    research: "Research",
    researchIntro: "Applied research on sawdust valorisation and the slow release of aromas in plywood floors.",
  },
  pt2030: {
    label: "Portugal 2030",
    title: "Innovation and sustainability.",
    objective:
      "The project aims to increase production capacity by adopting advanced technologies and Industry 4.0 solutions. Under ESG principles, it invests in energy efficiency, recycling and the circular economy, including recovering waste and by-products for the company's own production.",
    code: "Project code", beneficiary: "Beneficiary", total: "Total cost", eligible: "Total eligible cost", support: "EU financial support", rate: "Co-financing rate",
  },
  contact: {
    label: "Contact", title: "Talk to us.", address: "Address", phone: "Phone", mobile: "Mobile", email: "Email", route: "Open in maps",
    note: "Calls to Portuguese landline/mobile numbers, charged according to your operator's rates.",
    form: { title: "Shall we talk about your project?", personal: "Personal information", project: "Project requirements", name: "Name", email: "Email", phone: "Phone", address: "Address", product: "Which product?", rooms: "Which rooms?", area: "What is the area of your project?", message: "Tell us about your project", send: "Send", required: "Required fields", coords: "Coordinates" },
  },
};

const es: Dict = {
  nav: { home: "Inicio", company: "Empresa", products: "Productos", editorial: "Editorial", pt2030: "Portugal 2030", contact: "Contacto" },
  cta: "Pedir presupuesto",
  ctaShort: "Hablemos",
  tagline: "De la naturaleza a su espacio.",
  scroll: "Desplace para explorar",
  hero: { kicker: "Productor y transformador de madera · desde 2011", l1: "De la naturaleza", l2: "a su", l3: "espacio.", meta: "Póvoa de Lanhoso · Portugal" },
  statement:
    "Seleccionamos la materia prima con rigor, la transformamos con tecnología avanzada y un equipo especializado en cada sector, y entregamos pavimentos, decks y revestimientos que llevan la madera noble a cada espacio.",
  statementKeys: ["rigor", "tecnología", "madera", "noble"],
  collection: { label: "Colección", title: "Seis líneas, una materia.", species: "especies", variants: "referencias", explore: "Explorar" },
  anatomy: {
    label: "Anatomía",
    title: "Por dentro de una tabla multicapa.",
    steps: [
      { t: "Capa noble", d: "Madera maciza de la especie elegida. La superficie que se ve, se toca y envejece con el espacio." },
      { t: "Base estructural", d: "Capa interior de contrachapado, que aporta resistencia a la tabla." },
      { t: "Machihembrado", d: "Unión machihembrada, para una instalación fácil." },
      { t: "Acabado", d: "Crudo, barnizado, aceitado o veladura. La misma madera, cuatro caracteres." },
    ],
  },
  species: { label: "Especies", title: "Dieciséis maderas. Cada una con su firma.", hint: "Pase el cursor para ver la veta" },
  numbers: { label: "En cifras", items: [{ v: 2011, l: "Año de fundación" }, { v: 16, l: "Especies de madera" }, { v: 68, l: "Referencias en catálogo" }, { v: 6, l: "Líneas de producto" }] },
  process: {
    label: "Proceso",
    title: "Del bosque a la obra.",
    steps: [
      { t: "Origen", d: "Alianzas de tala y comercio de madera en Póvoa de Lanhoso y madera certificada de origen conocido." },
      { t: "Selección", d: "Selección rigurosa de la materia prima, especie a especie, tabla a tabla." },
      { t: "Transformación", d: "Tecnología avanzada y un equipo especializado y motivado en cada sector de la producción." },
      { t: "Acabado", d: "Crudo, barnizado, aceitado o veladura, según el producto y el proyecto." },
      { t: "Entrega", d: "Pavimentos, decks, triplex, rodapiés y accesorios listos para obra." },
    ],
  },
  responsibility: {
    label: "Responsabilidad",
    title: "Madera certificada. Origen conocido.",
    body:
      "Nuestra política de compras, asumida por la dirección, excluye madera de tala ilegal, de bosques de alto valor de conservación amenazados, de conversión forestal, de árboles modificados genéticamente o vinculada a la violación de los Convenios Fundamentales de la OIT.",
    items: ["Cumplimiento de la legislación laboral y de seguridad y salud", "Sin trabajo infantil ni forzoso", "Sin discriminación en el empleo", "Libertad de asociación y negociación colectiva"],
  },
  work: { label: "Obras", title: "Instalado.", note: "Proyectos reales con madera Strong" },
  contactBlock: { label: "Contacto", title: "Demos forma a su proyecto.", body: "¿Necesita ayuda para encontrar el producto adecuado? Hable con nosotros." },
  footer: { rights: "Todos los derechos reservados", funded: "Cofinanciado por" },
  product: {
    configure: "Configurar", species: "Especie", line: "Línea", width: "Ancho", thickness: "Espesor", finish: "Acabado", profile: "Perfil", use: "Uso",
    int: "Interior", ext: "Exterior", length: "Largo", explode: "Vista explosionada", photo: "Foto real", model: "Modelo 3D", specs: "Ficha técnica",
    construction: "Construcción", all: "Todas las referencias", request: "Pedir presupuesto para esta configuración", selected: "Configuración", drag: "Arrastre para girar",
    references: "referencias", texNote: "Textura ilustrativa de la especie. Los colores reales varían de tabla a tabla.", underlay: "Bases para pavimento", next: "Línea siguiente",
  },
  company: {
    label: "Empresa",
    title: "Know-how en madera, desde 2011.",
    intro:
      "Strong Wood Floors nació en 2011 como fabricante de pavimentos de madera, apoyada en años de experiencia en el sector y en sólidas alianzas de tala y comercio de madera en Póvoa de Lanhoso, en el norte de Portugal.",
    quality: "Calidad",
    qualityTitle: "La calidad es nuestra filosofía de trabajo.",
    qualityItems: ["Soluciones innovadoras", "Competencia técnica", "Calidad del producto y cumplimiento de requisitos", "Mejora continua del sistema de gestión de la calidad"],
  },
  editorial: {
    label: "Editorial",
    title: "Noticias e investigación.",
    domotex: "Strong Export estuvo presente en Domotex, la principal feria mundial de pavimentos, “The World of Flooring”, en Hannover. Gracias a todos los que visitaron nuestro stand.",
    research: "Investigación",
    researchIntro: "Investigación aplicada sobre la valorización del serrín y la liberación controlada de aromas en suelos de contrachapado.",
  },
  pt2030: {
    label: "Portugal 2030",
    title: "Innovación y sostenibilidad.",
    objective:
      "El proyecto tiene como objetivo aumentar la capacidad productiva mediante tecnologías avanzadas y soluciones de Industria 4.0. Bajo principios ESG, invierte en eficiencia energética, reciclaje y economía circular, incluida la valorización de residuos y subproductos para la propia producción.",
    code: "Código del proyecto", beneficiary: "Beneficiario", total: "Coste total", eligible: "Coste total elegible", support: "Apoyo financiero de la UE", rate: "Tasa de cofinanciación",
  },
  contact: {
    label: "Contacto", title: "Hable con nosotros.", address: "Dirección", phone: "Teléfono", mobile: "Móvil", email: "Email", route: "Abrir en mapa",
    note: "Llamada a red fija/móvil portuguesa, según la tarifa de su operador.",
    form: { title: "¿Hablamos de su proyecto?", personal: "Información personal", project: "Requisitos del proyecto", name: "Nombre", email: "Email", phone: "Teléfono", address: "Dirección", product: "¿Qué producto?", rooms: "¿Qué estancias?", area: "¿Cuál es el área de su proyecto?", message: "Háblenos de su proyecto", send: "Enviar", required: "Campos obligatorios", coords: "Coordenadas" },
  },
};

export const DICTS: Record<Locale, Dict> = { pt, en, es };
export const getDict = (l: Locale) => DICTS[l];
