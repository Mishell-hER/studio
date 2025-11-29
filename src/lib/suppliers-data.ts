export type SupplierData = {
  continent: string;
  country: string;
  city: string;
  strengths: string;
  weaknesses: string;
  suppliers: string;
  contractType: string;
  quality: string;
  arbitration: string;
};

export const suppliersData: SupplierData[] = [
  {
    continent: 'Africa',
    country: 'Argelia',
    city: 'Argel',
    strengths: 'Gran mercado interno y sector energético; posición estratégica en Norte de África.',
    weaknesses: 'Burocracia y controles de divisas; barreras regulatorias; dependencia energética.',
    suppliers: 'Dattes Benamor (dátiles), Group SIM (trigo y harinas)',
    contractType: 'CPT (el exportador paga transporte hasta frontera o punto logístico del comprador en el norte)',
    quality: 'ISO 22000 (inocuidad alimentaria) + controles fitosanitarios por autoridad nacional (Direction du Commerce / Ministère du Commerce). Certificados SPS e inspección en puerto.',
    arbitration: 'Arbitraje ICC / UNCITRAL; sede neutra recomendada.',
  },
  {
    continent: 'Africa',
    country: 'Angola',
    city: 'Luanda',
    strengths: 'Recursos naturales (petróleo) y demanda de infraestructura; puerto en la costa atlántica.',
    weaknesses: 'Dependencia del petróleo; complejidad regulatoria; infraestructura interior irregular.',
    suppliers: 'AngoAlissar, Carrinho Group, AngoFruits',
    contractType: 'DAP (entrega directa en Luanda, recomendada por la infraestructura vial existente con Namibia)',
    quality: 'ISO 22000 y ISO 9001 para proveedores grandes. Requisitos sanitarios y certificados fitosanitarios (Ministério da Agricultura).',
    arbitration: 'ICC / UNCITRAL; cláusula con sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Benín',
    city: 'Porto-Novo',
    strengths: 'Ubicación estratégica en Golfo de Guinea; acceso a la subregión (puerto de Cotonú).',
    weaknesses: 'Mercado pequeño; trámites aduaneros lentos; infraestructura limitada.',
    suppliers: 'OBEB, AgriCoton, Benin Cashew',
    contractType: 'FCA (entrega en punto fronterizo, comprador asume transporte final)',
    quality: 'ISO 22000 (alimentos exportados) y cumplimiento SPS (Inspection Régionale de l’Agriculture). Certificados fitosanitarios y de origen.',
    arbitration: 'ICC / arbitraje regional; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Botsuana',
    city: 'Gaborone',
    strengths: 'Estabilidad política y marco regulatorio relativamente claro; buenas conexiones con RSA.',
    weaknesses: 'Mercado pequeño; costos logísticos pueden ser altos en rutas largas.',
    suppliers: 'Zambeef Botswana, Maun Agro',
    contractType: 'DAP (entrega directa en Gaborone, ruta estable y corta desde Sudáfrica)',
    quality: 'ISO 22000 y ISO 9001 (trazabilidad en ganadería). Certificación veterinaria y SPS (Dept. of Veterinary Services).',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Burkina Faso',
    city: 'Uagadugú',
    strengths: 'Mercado agrícola y demandante de insumos; posición en Burkina-Sahel.',
    weaknesses: 'Infraestructura limitada; riesgos de seguridad regional.',
    suppliers: 'Faso Coton, Sofitex, FasoMaïs',
    contractType: 'CPT (el vendedor paga transporte hasta destino, riesgo transferido al primer transportista)',
    quality: 'ISO 22000 (anacardo, sésamo) y controles fitosanitarios por autoridades agrícolas.',
    arbitration: 'ICC; arbitraje en sede regional o neutra.',
  },
  {
    continent: 'Africa',
    country: 'Burundi',
    city: 'Gitega',
    strengths: 'Proximidad a mercados de la región de los Grandes Lagos; mano de obra barata.',
    weaknesses: 'Infraestructura deficiente; riesgo político y limitaciones de comercio.',
    suppliers: 'ODECA (café), CNAC Burundi',
    contractType: 'FCA (entrega en frontera de Tanzania o Zambia; comprador gestiona resto del transporte)',
    quality: 'ISO 22000 recomendado (café/té) y requisitos fitosanitarios; certificados de exportación por autoridad nacional.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Camerún',
    city: 'Yaundé',
    strengths: 'Mercado grande en África central; puertos Atlanticos; diversidad sectorial.',
    weaknesses: 'Burocracia, corrupción y algunos problemas de seguridad en regiones.',
    suppliers: 'SOCAPALM (aceite de palma), CDC (cacao)',
    contractType: 'CIP (incluye seguro; recomendable por largas distancias y cruces múltiples)',
    quality: 'ISO 22000 + ISO 9001 en agroindustrias (cacao, palma). Autoridad: Ministère de l’Agriculture – controles fitosanitarios y RSPO (palm oil) cuando aplica.',
    arbitration: 'ICC / UNCITRAL; sede neutra recomendada.',
  },
  {
    continent: 'Africa',
    country: 'República Centroafricana',
    city: 'Bangui',
    strengths: 'Recursos naturales (maderas, minerales) potenciales; posición central.',
    weaknesses: 'Muy alta inseguridad; infraestructura casi inexistente; riesgos operativos.',
    suppliers: 'Centrafrique Cacao, Agrifood RCA',
    contractType: 'DAP (entrega en destino final dada su limitada infraestructura de importación)',
    quality: 'ISO 22000 (recomendado) para exportadores; controles fitosanitarios limitados localmente — se exige certificación en origen.',
    arbitration: 'Arbitraje ICC; sede fuera del país.',
  },
  {
    continent: 'Africa',
    country: 'Chad',
    city: 'Yamena',
    strengths: 'Recursos energéticos y minerales; posición estratégica en Sahel.',
    weaknesses: 'Infraestructura limitada; inseguridad y trámites aduaneros complejos.',
    suppliers: 'CotonTchad, SOTEC',
    contractType: 'CPT (transporte pagado hasta Yamena, vía Camerún)',
    quality: 'ISO 22000 (cereales/ganado) y certificados fitosanitarios por autoridad nacional.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Congo (República del Congo)',
    city: 'Brazzaville',
    strengths: 'Recursos (petróleo, madera); cercanía a puertos del Golfo de Guinea (por río).',
    weaknesses: 'Dependencia de recursos; institucionalidad débil en algunos ámbitos.',
    suppliers: 'ECO OLEA Congo, SARIS Congo',
    contractType: 'CIP (con seguro incluido, recomendado por distancia y riesgo de tránsito por RDC)',
    quality: 'ISO 22000 y ISO 9001 en agroindustrias; controles fitosanitarios locales.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'República Democrática del Congo',
    city: 'Kinshasa',
    strengths: 'Mercado enorme por población; recursos minerales estratégicos.',
    weaknesses: 'Grandes riesgos logísticos; inseguridad en áreas; trámites y corrupción.',
    suppliers: 'Société de Développement Agricole du Congo (maíz, arroz), Feronia Inc. (aceite de palma), Congo Coffee & Cacao Company (café y cacao)',
    contractType: 'CIP — recomendable por el alto riesgo logístico y carreteras irregulares; el vendedor cubre seguro y transporte hasta Kinshasa.',
    quality: 'ISO 22000 recomendado (exportaciones agrícolas/forestales); autoridades fitosanitarias variables; exigencias del comprador externo.',
    arbitration: 'ICC / UNCITRAL; sede neutra preferible.',
  },
  {
    continent: 'Africa',
    country: 'Costa de Marfil',
    city: 'Yamusukro',
    strengths: 'Economía dinámica de África Occidental; puerto de Abiyán eficiente; agricultura exportadora.',
    weaknesses: 'Trámites aduaneros y congestión portuaria en picos; variabilidad regulatoria.',
    suppliers: 'Cargill West Africa (cacao), SIFCA (aceite de palma y caucho), Olam Côte d’Ivoire (café y cacao)',
    contractType: 'CIP — se recomienda incluir seguro por el largo trayecto y tránsito por varios países.',
    quality: 'ISO 22000 y certificaciones sectoriales (UTZ/Fairtrade para cacao). Autoridad fitosanitaria y controles portuarios (Abidjan).',
    arbitration: 'ICC habitual; sede neutra (París/Londres/Suiza) recomendable.',
  },
  {
    continent: 'Africa',
    country: 'Djibouti',
    city: 'Yibuti',
    strengths: 'Puerto estratégico para Horn of Africa; hub logístico y naval.',
    weaknesses: 'Mercado pequeño; dependencia de tránsito hacia Etiopía; costos portuarios altos.',
    suppliers: 'Horizon Djibouti Terminals (cereales y aceites), Gashamo Trading (granos y semillas)',
    contractType: 'DAP — entrega directa al cliente final, aprovechando su conexión logística con Etiopía.',
    quality: 'ISO 22000 recomendado para tránsito/logística; requisitos sanitarios según destino (Etiopía).',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Egipto',
    city: 'El Cairo',
    strengths: 'Mercado grande y diversificado; infraestructura portuaria y logística desarrollada; hub norteafricano.',
    weaknesses: 'Burocracia y controles regulatorios; sensibilidad política en algunos periodos.',
    suppliers: 'Wadi Group (aves y cereales), Al Dahra Egypt (forrajes y frutas), Dina Farms (lácteos y cultivos)',
    contractType: 'CPT — vendedor paga transporte hasta El Cairo, riesgo transfiere al primer transportista.',
    quality: 'ISO 22000, ISO 9001, regulación sanitaria amplia (Egyptian Organization for Standardization & Quality). Certificados SPS y control de residuos/pesticidas.',
    arbitration: 'ICC / UNCITRAL; tribunales locales también activos; sede neutra aconsejable.',
  },
  {
    continent: 'Africa',
    country: 'Eritrea',
    city: 'Asmara',
    strengths: 'Posición estratégica en el Cuerno (Mar Rojo); potencial portuario.',
    weaknesses: 'Régimen cerrado; restricciones comerciales; riesgo regulatorio y operativo.',
    suppliers: 'Red Sea Trading Corporation (import/export estatal de granos), Tesfa Agro (hortalizas)',
    contractType: 'FCA — entrega en frontera de Sudán o Etiopía, el comprador gestiona el resto del transporte.',
    quality: 'ISO 22000 recomendado para exportación; autoridades de control de importación estrictas; certificados sanitarios necesarios.',
    arbitration: 'Arbitraje ICC; sede neutra fuera de Eritrea.',
  },
  {
    continent: 'Africa',
    country: 'Esuatini (anteriormente Suazilandia)',
    city: 'Mbabane',
    strengths: 'Proximidad y buena conectividad con Sudáfrica; estabilidad local.',
    weaknesses: 'Mercado pequeño; dependencia económica de RSA.',
    suppliers: 'Ubombo Sugar Limited (azúcar), Eswatini Dairy Board (lácteos)',
    contractType: 'DAP — entrega directa, ruta terrestre estable y corta desde Sudáfrica.',
    quality: 'ISO 22000 y certificación veterinaria para carne/lácteos; control por Ministry of Agriculture.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Etiopía',
    city: 'Adís Abeba',
    strengths: 'Gran mercado en el Cuerno; fuerte crecimiento y políticas pro-inversión en sectores clave.',
    weaknesses: 'Controles cambiarios, infraestructura interior en expansión pero con retos.',
    suppliers: 'Ethiopian Coffee & Tea Authority (café y té), EthioAgri-CEFT (aceites y cereales)',
    contractType: 'CIP — recomendable incluir seguro por el cruce fronterizo y alto valor de la carga.',
    quality: 'ISO 22000 y normas específicas para café (certificaciones de origen), autoridad fitosanitaria activa (EPA/EFDA).',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Gabón',
    city: 'Libreville',
    strengths: 'Recursos (madera, petróleo); estabilidad relativa y políticas de atracción.',
    weaknesses: 'Mercado pequeño; dependencia de commodities; costos logísticos internos.',
    suppliers: 'SIAT Gabon (aceite de palma), Olam Gabon (madera y caucho)',
    contractType: 'CPT — transporte pagado hasta Libreville, riesgo pasa en el punto de carga.',
    quality: 'ISO 22000 y certificaciones de sostenibilidad (p. ej. para palma), controles fitosanitarios por ministerio.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Gambia',
    city: 'Banjul',
    strengths: 'Puerta en la costa oeste y puente Senegambia; facilidad para operaciones regionales pequeñas.',
    weaknesses: 'Mercado limitado; infraestructura y servicios logísticos reducidos.',
    suppliers: 'Gambia Horticultural Enterprises (frutas tropicales), Gambia Groundnut Corporation (maní)',
    contractType: 'CPT — conveniente por dependencia de rutas a través de Senegal.',
    quality: 'ISO 22000 recomendado (maní, frutas); requisitos fitosanitarios y certificados de exportación.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Ghana',
    city: 'Acra',
    strengths: 'Economía estable y abierta en África Occidental; puerto de Tema activo; clima de negocios favorable.',
    weaknesses: 'Competencia local y trámites aduaneros; costos en ciertos servicios.',
    suppliers: 'Ghana Cocoa Board (cacao), Golden Exotics Ltd (banano), Blue Skies (jugos y frutas frescas)',
    contractType: 'CIP — con seguro, debido a la alta distancia y valor de los productos perecederos.',
    quality: 'ISO 22000, además estándares sectoriales (Ghana Cocoa Board requiere trazabilidad y certificaciones). Autoridades: FDA Ghana, GSA.',
    arbitration: 'ICC/UNCITRAL; sede neutra habitual.',
  },
  {
    continent: 'Africa',
    country: 'Guinea',
    city: 'Conakri',
    strengths: 'Recursos minerales (bauxita, etc.); demanda de inversión en minería/infraestructura.',
    weaknesses: 'Infraestructura insuficiente; trámites y riesgo social en zonas mineras.',
    suppliers: 'Soguipah (aceite de palma y caucho), Agrifood Guinea (arroz y frutas locales)',
    contractType: 'FCA — entrega en frontera de Sierra Leona o Liberia; comprador gestiona transporte final.',
    quality: 'ISO 22000 (cuando exportan a mercados exigentes); controles fitosanitarios por autoridades nacionales.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Guinea-Bisáu',
    city: 'Bissau',
    strengths: 'Potencial agrícola (cajú); mercado pequeño con conexiones regionales.',
    weaknesses: 'Limitada infraestructura portuaria y logística; inestabilidad institucional.',
    suppliers: 'AgroGuiné (anacardo), Guiné Export (mango y sésamo)',
    contractType: 'FCA — entrega en frontera con Senegal, comprador asume transporte.',
    quality: 'ISO 22000 (cajú/aceite de palma para exportación) recomendado; exigencias fitosanitarias al exportar.',
    arbitration: 'ICC; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Kenia',
    city: 'Nairobi',
    strengths: 'Hub logístico/regional (puerto de Mombasa); mercado dinámico y políticas de facilitación.',
    weaknesses: 'Congestión portuaria; trámites y corrupción en ciertas cadenas.',
    suppliers: 'Kenya Tea Development Agency (té), Del Monte Kenya (piña y frutas), Sasini PLC (café)',
    contractType: 'CIP — recomendado por valor y naturaleza perecedera de los productos.',
    quality: 'ISO 22000 y ISO 9001 (KEBS aplica normas y SPS estrictos). Requisitos de certificación para horticultura y corte.',
    arbitration: 'ICC / LCIA / UNCITRAL; arbitraje internacional común.',
  },
  {
    continent: 'Africa',
    country: 'Lesoto',
    city: 'Maseru',
    strengths: 'Enclave con fácil acceso a RSA; marco estable para operaciones específicas.',
    weaknesses: 'Mercado muy pequeño; dependencia casi total de Sudáfrica.',
    suppliers: 'Lesotho National Dairy Board (lácteos), Maluti Mountain Brewery (cebada)',
    contractType: 'DAP — entrega directa en Maseru, ruta estable y muy corta desde Johannesburgo.',
    quality: 'ISO 22000 (productos lácteos/ganado), controles veterinarios según RSA standards.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Liberia',
    city: 'Monrovia',
    strengths: 'Puerto (Monrovia) y potencial en reconstrucción; recursos forestales y marítimos.',
    weaknesses: 'Infraestructura limitada; procesos aduaneros mejorables.',
    suppliers: 'Liberia Agricultural Company (caucho), Firestone Liberia (hevea y látex)',
    contractType: 'CPT — transporte pagado hasta Monrovia; riesgo pasa al primer transportista.',
    quality: 'ISO 22000 recomendado para caucho/aceite de palma; autoridad fitosanitaria en reconstrucción.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Libia',
    city: 'Trípoli',
    strengths: 'Recursos energéticos y potencial de mercado petrolero.',
    weaknesses: 'Altísima inestabilidad política y seguridad; riesgo operativo muy elevado.',
    suppliers: 'Libyan African Investment Co. (granos y alimentos), Al-Naseem Dairy (lácteos)',
    contractType: 'CPT — entrega hasta frontera de Egipto o Túnez, comprador gestiona tramo final.',
    quality: 'ISO 22000 y ISO 9001 recomendable; controles variables por situación política.',
    arbitration: 'ICC / UNCITRAL; sede neutra fuera del país.',
  },
  {
    continent: 'Africa',
    country: 'Malawi',
    city: 'Lilongüe',
    strengths: 'Estabilidad relativa, demanda agrícola y conexiones regionales.',
    weaknesses: 'Infraestructura limitada y mercado pequeño; trámites administrativos.',
    suppliers: 'Agricultural Development and Marketing Corporation (maíz), Satemwa Tea Estates (té)',
    contractType: 'CIP — recomendado por seguro y tránsito largo desde Sudáfrica.',
    quality: 'ISO 22000 (tabaco, azúcar) y controles fitosanitarios; autoridad nacional de estándares.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Mali',
    city: 'Bamako',
    strengths: 'Grandes mercados en Sahel; productos agrícolas exportables.',
    weaknesses: 'Riesgo de seguridad y problemas logísticos en interior.',
    suppliers: 'CMDT (algodón), Office du Niger (arroz y caña de azúcar)',
    contractType: 'CPT — transporte terrestre extenso vía Burkina Faso o Senegal.',
    quality: 'ISO 22000 (algodón/arroz) recomendada para exportación; requisitos fitosanitarios para exportaciones agrícolas.',
    arbitration: 'ICC; sede neutra recomendada.',
  },
  {
    continent: 'Africa',
    country: 'Mauritania',
    city: 'Nuakchot',
    strengths: 'Recursos mineros y posición entre África occidental/norte; rutas a puertos.',
    weaknesses: 'Infraestructura limitada fuera de la costa; trámites variables.',
    suppliers: 'SONADER (cereales y forraje), Maurilog (logística agroexportadora)',
    contractType: 'FCA — entrega en punto fronterizo o terminal terrestre hacia el norte.',
    quality: 'ISO 22000 (inocuidad alimentaria) y ISO 9001 para operadores/agroindustrias cuando aplica. Requisitos fitosanitarios y certificación para exportación (certificados SPS, certificados veterinarios si procede)',
    arbitration: 'Arbitraje ICC / UNCITRAL; se recomienda cláusula de arbitraje internacional con sede neutra (p. ej. París, Ginebra o Londres) para mayor seguridad jurídica en contratos cross-border.',
  },
  {
    continent: 'Africa',
    country: 'Marruecos',
    city: 'Rabat',
    strengths: 'Infraestructura moderna (autopistas, puertos), acceso a Europa y África; clima de negocios pro-inversión.',
    weaknesses: 'Competencia intensa y requisitos regulatorios sectoriales.',
    suppliers: 'Les Domaines Agricoles (frutas y aceite de oliva), Cosumar (azúcar)',
    contractType: 'CPT — transporte pagado hasta Rabat, adecuado para comercio norteafricano.',
    quality: 'ISO 22000, ISO 9001 y cumplimiento frecuente de normas UE (fitosanitarios). Organismo nacional activo (INNORPI).',
    arbitration: 'ICC / UNCITRAL; arbitraje en sedes neutrales común.',
  },
  {
    continent: 'Africa',
    country: 'Mozambique',
    city: 'Maputo',
    strengths: 'Puertos (Maputo, Nacala), recursos naturales (gas); cercanía a RSA.',
    weaknesses: 'Infraestructura interna desigual; riesgos por corrupción/contratos.',
    suppliers: 'Olam Mozambique (algodón y sésamo), Tongaat Hulett (caña de azúcar)',
    contractType: 'DAP — entrega directa, fácil acceso por frontera sur con Sudáfrica.',
    quality: 'ISO 22000, certificaciones de pesca y palma cuando aplica; controles fitosanitarios.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Namibia',
    city: 'Windhoek',
    strengths: 'Estabilidad política y buena gobernanza; corredores logísticos hacia puertos.',
    weaknesses: 'Mercado pequeño; costos operativos en rutas largas.',
    suppliers: 'Namib Mills (granos y harina), Meatco Namibia (carne y ganado)',
    contractType: 'DAP — entrega directa en destino, rutas seguras desde Sudáfrica.',
    quality: 'ISO 22000 y certificaciones veterinarias para la carne; autoridad de normas aplicada.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Níger',
    city: 'Niamey',
    strengths: 'Recursos (uranio); posición en Sahel para ciertos mercados.',
    weaknesses: 'Gran desafío logístico, clima y seguridad en áreas remotas.',
    suppliers: 'Société de Produits Agricoles du Niger (mijo, sorgo), Office des Produits Vivriers (cereales)',
    contractType: 'CPT — transporte pagado hasta Niamey; tránsito extenso por desierto.',
    quality: 'ISO 22000 para exportaciones a mercados exigentes (cereales); control fitosanitario por autoridad local.',
    arbitration: 'ICC; sede neutra recomendada.',
  },
  {
    continent: 'Africa',
    country: 'Nigeria',
    city: 'Abuya',
    strengths: 'Mercado más grande de África; fuerte demanda y hubs industriales/portuarios.',
    weaknesses: 'Burocracia, inseguridad en zonas, congestión portuaria y corrupción.',
    suppliers: 'Olam Nigeria (cacao, arroz), Dangote Sugar Refinery (azúcar)',
    contractType: 'CIP — alto valor y riesgo vial; recomendable incluir seguro.',
    quality: 'ISO 22000, ISO 9001, regulaciones de NAFDAC y SON para agroalimentaria; requisitos SPS estrictos.',
    arbitration: 'ICC / LCIA / UNCITRAL; sede neutra recomendada.',
  },
  {
    continent: 'Africa',
    country: 'Ruanda',
    city: 'Kigali',
    strengths: 'Marco regulatorio muy orientado a facilitar negocios; seguridad y eficiencia administrativa.',
    weaknesses: 'Mercado pequeño; aislamiento geográfico relativo (no costa).',
    suppliers: 'NAEB (café y té), Rwanda Trading Company (café)',
    contractType: 'CIP — por valor alto del producto y necesidad de cobertura de seguro.',
    quality: 'ISO 22000, normas pro-negocios y trazabilidad; autoridad nacional activa en fitosanitarios.',
    arbitration: 'ICC / UNCITRAL; Ruanda facilita mecanismos rápidos, pero sede neutra aún preferible.',
  },
  {
    continent: 'Africa',
    country: 'Senegal',
    city: 'Dakar',
    strengths: 'Puerto importante (Dakar), estabilidad relativa y políticas proinversión.',
    weaknesses: 'Costos portuarios a veces altos; competencia regional.',
    suppliers: 'Compagnie Sucrière Sénégalaise (azúcar), SEDIMA Group (avicultura)',
    contractType: 'DAP — entrega directa en Dakar; rutas seguras y buena infraestructura.',
    quality: 'ISO 22000, controles SPS y requisitos para pesca/agro; autoridad nacional de estándares.',
    arbitration: 'ICC / UNCITRAL; sede neutra recomendable.',
  },
  {
    continent: 'Africa',
    country: 'Sierra Leona',
    city: 'Freetown',
    strengths: 'Potencial minero y portuario; recuperación post-conflicto en marcha.',
    weaknesses: 'Infraestructura y servicios limitados; trámites y mercados reducidos.',
    suppliers: 'Sierra Leone Produce Marketing Co. (cacao, palma), Goldtree (aceite de palma)',
    contractType: 'CPT — transporte pagado hasta destino; acceso difícil al interior.',
    quality: 'ISO 22000 recomendado para exportadores que buscan mercados exigentes; controles fitosanitarios aplicables.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Somalia',
    city: 'Mogadiscio',
    strengths: 'Potencial pesquero y posición estratégica en el Golfo; actividad privada en puertos.',
    weaknesses: 'Alto riesgo de seguridad (piratería/terrorismo); infraestructura muy dañada.',
    suppliers: 'Hormuud AgroTrade (granos y sésamo), Somali Banana Company (banano)',
    contractType: 'FCA — entrega en frontera keniana o etíope; comprador gestiona tramo final.',
    quality: 'ISO 22000 si se exporta a mercados formales (pero regulación local fragmentada); certificados se gestionan por compradores/países de tránsito.',
    arbitration: 'Arbitraje ICC y sede fuera de Somalia; cláusula de arbitraje internacional esencial.',
  },
  {
    continent: 'Africa',
    country: 'Sudan',
    city: 'Jartum',
    strengths: 'Recursos agrícolas y posición estratégica en el Cuerno-Sahel.',
    weaknesses: 'Conflicto activo en áreas (riesgo muy alto); operaciones comerciales severamente afectadas.',
    suppliers: 'Kenana Sugar Company (azúcar), Haggar Group (aceite vegetal, sorgo)',
    contractType: 'CPT — transporte pagado hasta Jartum; rutas extensas y riesgos logísticos.',
    quality: 'ISO 22000 y certificaciones fitosanitarias; requisitos por ministerio de agricultura y sanidad.',
    arbitration: 'ICC / UNCITRAL; sede neutra recomendada (considerar riesgos políticos).',
  },
  {
    continent: 'Africa',
    country: 'Togo',
    city: 'Lomé',
    strengths: 'Puerto de Lomé (reexportación regional), zona franca atractiva.',
    weaknesses: 'Mercado pequeño; dependencia del tránsito regional; trámites.',
    suppliers: 'Nouvelle Société Cotonnière du Togo (algodón), Café-Cacao Togo (café y cacao)',
    contractType: 'CPT — transporte pagado hasta Lomé; conexión terrestre estable con Ghana.',
    quality: 'ISO 22000 y controles fitosanitarios (algodón/cacao); autoridades locales exigen certificados de exportación.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Tanzania',
    city: 'Dodoma',
    strengths: 'Puertos (Dar es Salaam), sectores de gas y turismo; conectividad regional.',
    weaknesses: 'Burocracia y algunos controles reguladores; infraestructura interior variable.',
    suppliers: 'Tanzania Coffee Board (café), Kilombero Sugar Company (azúcar), TATEPA (té)',
    contractType: 'DAP — entrega en Dodoma; rutas eficientes con Kenia y Zambia.',
    quality: 'ISO 22000, normas para café/té/azúcar; autoridad fitosanitaria activa (TBS).',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Tunez',
    city: 'Túnez',
    strengths: 'Infraestructura desarrollada, cercano a Europa; sector industrial diversificado.',
    weaknesses: 'Mercado pequeño comparado con otras economías del norte; competencia europea.',
    suppliers: 'Office de l’Huile (aceite de oliva), GIL (hortalizas y frutas)',
    contractType: 'DAP — entrega directa; rutas seguras y cortas desde Argelia.',
    quality: 'ISO 22000, ISO 9001 y cumplimiento con normas UE frecuente; autoridad nacional de normas exigente.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Uganda',
    city: 'Kampala',
    strengths: 'Centro logístico del África oriental; políticas favorables a comercio regional.',
    weaknesses: 'Carreteras en ciertas zonas en mal estado; dependencia de puertos de Mombasa/Dar.',
    suppliers: 'Uganda Coffee Development Authority (café), Kakira Sugar Works (azúcar)',
    contractType: 'CIP — alto valor del café, cobertura de seguro recomendada.',
    quality: 'ISO 22000, certificaciones para café/hortalizas; autoridad fitosanitaria y normativa activa.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Zambia',
    city: 'Lusaka',
    strengths: 'Rica en minerales (cobre); corredores logísticos hacia puertos.',
    weaknesses: 'Dependencia de la minería; trámites y cargas impositivas sectoriales.',
    suppliers: 'Zambia Sugar Plc (azúcar), National Milling Corporation (cereales)',
    contractType: 'DAP — rutas seguras y buena conexión con Malawi y Tanzania.',
    quality: 'ISO 22000, normas aplicadas para azúcar y cereales; control fitosanitario nacional.',
    arbitration: 'ICC / UNCITRAL; sede neutra.',
  },
  {
    continent: 'Africa',
    country: 'Zimbabue',
    city: 'Harare',
    strengths: 'Mercado interno comparativamente grande y tradición industrial/agro.',
    weaknesses: 'Inestabilidad macroeconómica histórica; fluctuaciones en divisas y regulaciones.',
    suppliers: 'Cottco Holdings (algodón), Hippo Valley Estates (caña de azúcar)',
    contractType: 'CPT — transporte pagado hasta Harare; rutas interiores extensas.',
    quality: 'ISO 22000, ISO 9001 en agroindustrias; controles fitosanitarios exigidos para exportación.',
    arbitration: 'ICC / UNCITRAL; sede neutra recomendada.',
  },
  {
    continent: 'Europa',
    country: '🇦🇱 Albania\nNo UE',
    city: 'Tirana',
    strengths:
      '✓ Costos laborales bajos\n✓ Productos orgánicos en crecimiento\n✓ Proximidad a mercados UE',
    weaknesses:
      '✗ Infraestructura limitada\n✗ Burocracia compleja\n✗ Bajo volumen de producción',
    suppliers:
      'AgroKaraj y Erjoni Agro impulsan la exportación agrícola albanesa, destacando por su calidad, colaboración local y certificaciones internacionales',
    contractType:
      'Los contratos más usados son EXW, FOB, CIF y DDP, adaptándose según el contexto logístico y comercial',
    quality:
      'Certificación orgánica EU\nNormas albanesas limitadas\nEn proceso de adopción ISO 22000',
    arbitration: 'Cámara de Comercio de Albania - Adhesión a Convención de Nueva York',
  },
  {
    continent: 'Europa',
    country: '🇩🇪 Alemania\nUE',
    city: 'Berlin',
    strengths:
      '✓ Tecnología agrícola avanzada\n✓ Estándares de calidad premium\n✓ Excelente logística\n✓ Cumplimiento normativo',
    weaknesses:
      '✗ Costos elevados\n✗ Competencia intensa\n✗ Regulaciones estrictas',
    suppliers:
      'BayWa AG, AGRAVIS y Südzucker Group  son grandes empresas agrícolas y de semillas con presencia global.',
    contractType: 'DDP (Incoterms 2020) - Contratos marco plurianuales',
    quality:
      'ISO 22000\nGlobalGAP\nIFS Food\nBRCGS\nQS (Quality Scheme)',
    arbitration:
      'DIS (German Arbitration Institute) - Reconocimiento internacional bajo UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇦🇹 Austria\nUE',
    city: 'Viena',
    strengths:
      '✓ Productos orgánicos premium\n✓ Reputación de calidad\n✓ Ubicación estratégica',
    weaknesses: '✗ Producción limitada\n✗ Precios altos\n✗ Mercado pequeño',
    suppliers:
      'RWA Raiffeisen Ware, Agrana Beteiligungs-ag, Berglandmilch y Bio Austria son actores clave en agricultura, alimentos y productos orgánicos.',
    contractType: 'CIF con contratos de suministro a largo plazo',
    quality: 'ISO 22000\nAMA GütesiegelBio-Garantie\nEU Organic',
    arbitration: 'VIAC (Vienna International Arbitral Centre) - Referencia europea',
  },
  {
    continent: 'Europa',
    country: '🇧🇪 Bélgica\nUE',
    city: 'Bruselas',
    strengths:
      '✓ Hub logístico europeo\n✓ Puerto de Amberes\n✓ Innovación en horticultura',
    weaknesses:
      '✗ Territorio limitado\n✗ Dependencia de importaciones\n✗ Costos operativos altos',
    suppliers:
      "BelOrta, Greenyard, Agristo y Crop's frozen foods son reconocidos exportadores agrícolas, especializados en frutas, verduras y productos procesados.",
    contractType: 'FCA/DAP con contratos spot y forward',
    quality: 'ISO 22000\nBRCIFSFlandria QualityGlobalGAP',
    arbitration:
      'CEPANI (Belgian Centre for Arbitration) - Reconocido internacionalmente',
  },
  {
    continent: 'Europa',
    country: '🇧🇬 Bulgaria\nUE',
    city: 'Sofia',
    strengths:
      '✓ Costos competitivos\n✓ Clima favorable\n✓ Producción de rosas y lavanda',
    weaknesses:
      '✗ Infraestructura en desarrollo\n✗ Corrupción percibida\n✗ Calidad variable',
    suppliers:
      'Agro Trading Bulgaria LTD orientada a cultivos y productos orgánicos, Agraria SA única empresa búlgara dedicada a productos fitosanitarios.',
    contractType: 'FOB/CFR con pagos documentarios',
    quality: 'ISO 22000 (parcial)EU StandardsBDS (Bulgarian Standards)',
    arbitration: 'BCCI Arbitration Court - Convención de Nueva York',
  },
  {
    continent: 'Europa',
    country: '🇨🇿 Chequia\nUE',
    city: 'Praga',
    strengths:
      '✓ Industria cervecera desarrollada\n✓ Buena relación calidad-precio\n✓ Ubicación central',
    weaknesses: '✗ Mercado saturado\n✗ Producción limitada de ciertos cultivos',
    suppliers: 'Agrofert y Czech Hops son importantes en sectores agrícolas y alimentarios del país.',
    contractType: 'CPT/CIP Incoterms con contratos anuales',
    quality: 'ISO 22000Czech MadeGlobalGAPBRC',
    arbitration:
      'Arbitration Court at Czech Chamber of Commerce - UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇭🇷 Croacia\nUE',
    city: 'Zagreb',
    strengths: '✓ Aceite de oliva de calidad\n✓ Vinos premium\n✓ Costa adriática',
    weaknesses:
      '✗ Producción fragmentada\n✗ Escala limitada\n✗ Infraestructura mejorable',
    suppliers:
      'Podravka y Fortenova Group son nombres relevantes en agroindustria y alimentos.',
    contractType: 'FOB/FCA con términos de pago L/C',
    quality: 'ISO 22000PDO/PGI (denominaciones protegidas)EU Organic',
    arbitration:
      'Permanent Arbitration Court at Croatian Chamber of Economy - Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇩🇰 Dinamarca\nUE',
    city: 'Copenhague',
    strengths:
      '✓ Líder en producción porcina\n✓ Tecnología agrícola avanzada\n✓ Sostenibilidad',
    weaknesses:
      '✗ Costos muy elevados\n✗ Clima limitante\n✗ Mercado especializado',
    suppliers:
      'Danish Crown, Arla Foods y Danisko A/S son destacados en producción ganadera, alimentos y procesamiento.',
    contractType: 'DDP/DAP con contratos a largo plazo',
    quality: 'ISO 22000Danish Quality MarkØ-mærket (orgánico)Red Tractor',
    arbitration:
      'Danish Institute of Arbitration - Reconocimiento nórdico e internacional',
  },
  {
    continent: 'Europa',
    country: '🇸🇰 Eslovaquia\nUE',
    city: 'Bratislava',
    strengths:
      '✓ Ubicación estratégica\n✓ Costos moderados\n✓ Crecimiento agroindustrial',
    weaknesses: '✗ Mercado pequeño\n✗ Producción limitada\n✗ Competencia regional',
    suppliers:
      'Agrofert Slovakia, Agro Tami y Dairy Slovakia son empresas de agricultura y alimentos del país.',
    contractType: 'CPT/FCA con pagos documentarios',
    quality: 'ISO 22000SNAS (Slovak Standards)GlobalGAP',
    arbitration:
      'Court of Arbitration Slovak Chamber of Commerce - Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇸🇮 Eslovenia\nUE',
    city: 'Liubliana',
    strengths: '✓ Productos premium nicho\n✓ Miel de alta calidad\n✓ Vinos boutique',
    weaknesses: '✗ Producción muy limitada\n✗ Altos costos\n✗ Mercado micro',
    suppliers:
      'Mlekarna Ljubljana lidera en lácteos y SIP STROJNA INDUSTRIJA d.d. dedicada a maquinaría agrícola.',
    contractType: 'FCA/CPT contratos específicos',
    quality: 'ISO 22000EU Quality SchemesSlovenian Quality Mark',
    arbitration: 'Ljubljana Arbitration Centre - Integrado en red europea',
  },
  {
    continent: 'Europa',
    country: '🇪🇸 España\nUE',
    city: 'Madrid',
    strengths:
      '✓ Mayor productor de aceite de oliva\n✓ Frutas y hortalizas\n✓ Clima favorable\n✓ Exportador líder',
    weaknesses:
      '✗ Sequías recurrentes\n✗ Fragmentación productiva\n✗ Competencia interna',
    suppliers:
      'Anecoop, Dcoop y Ebro Foods son exportadores agrícolas y agroindustriales con amplio alcance.',
    contractType: 'FOB/CIF con contratos anuales y spot',
    quality: 'ISO 22000GlobalGAPBRCIFSDOP/IGP',
    arbitration:
      'Corte de Arbitraje de Madrid (CAM) - Convención de Nueva York, UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇪🇪 Estonia\nUE',
    city: 'Tallin',
    strengths:
      '✓ Digitalización avanzada\n✓ Productos orgánicos\n✓ E-governance eficiente',
    weaknesses: '✗ Clima riguroso\n✗ Producción limitada\n✗ Mercado pequeño',
    suppliers:
      'E-Piim, Estonian Grain y Valio Estonia son empresas agrícolas y productoras lácteas con exportación.',
    contractType: 'FCA/CPT con pagos electrónicos',
    quality: 'ISO 22000EU OrganicEstonian Quality Label',
    arbitration:
      'Estonian Chamber of Commerce Arbitration - Sistema nórdico-báltico',
  },
  {
    continent: 'Europa',
    country: '🇫🇮 Finlandia\nUE',
    city: 'Helsinki',
    strengths:
      '✓ Productos orgánicos premium\n✓ Berries silvestres\n✓ Sostenibilidad extrema',
    weaknesses: '✗ Costos muy altos\n✗ Temporada corta\n✗ Volúmenes limitados',
    suppliers: 'Valio y Raisio importantes en alimentos y Valtra para tractores agrícolas',
    contractType: 'DDP/DAP contratos a largo plazo',
    quality: 'ISO 22000Hyvää SuomestaLuomu (orgánico finlandés)Nordic Swan',
    arbitration:
      'Finland Chamber of Commerce Arbitration - Reconocimiento nórdico',
  },
  {
    continent: 'Europa',
    country: '🇫🇷 Francia\nUE',
    city: 'París',
    strengths:
      '✓ Mayor productor agrícola UE\n✓ Vinos y quesos de renombre\n✓ AOC/AOP\n✓ Innovación',
    weaknesses:
      '✗ Burocracia compleja\n✗ Costos elevados\n✗ Proteccionismo sectorial',
    suppliers:
      'InVivo (Soufflet), Terrena, Axéréal, Bigard y Lactalis son actores de peso en la agroindustria francesa.',
    contractType: 'FCA/DAP con contratos plurianuales',
    quality: 'ISO 22000Label RougeAOC/AOPAgriculture BiologiqueIFS/BRC',
    arbitration:
      'Cámara de Comercio Internacional Paris - Referencia mundial, UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇬🇷 Grecia\nUE',
    city: 'Atenas',
    strengths:
      '✓ Aceite de oliva premium\n✓ Clima mediterráneo\n✓ Productos tradicionales PDO',
    weaknesses:
      '✗ Infraestructura anticuada\n✗ Fragmentación\n✗ Burocracia excesiva',
    suppliers: 'Minerva, Mevgal y Creta Farms son empresas agroalimentarias griegas con exportación.',
    contractType: 'FOB/CFR con L/C o CAD',
    quality: 'ISO 22000PDO/PGI griegoAGROEU Organic',
    arbitration:
      'Athens Chamber of Commerce Arbitration - Convención de Nueva York',
  },
  {
    continent: 'Europa',
    country: '🇭🇺 Hungría\nUE',
    city: 'Budapest',
    strengths:
      '✓ Tierras fértiles\n✓ Paprika y foie gras\n✓ Costos competitivos',
    weaknesses:
      '✗ Infraestructura variable\n✗ Dependencia de subsidios\n✗ Inestabilidad política',
    suppliers:
      'Bonafarm Group, Pick Szeged, Sole-Mizo y Hungerit destacan en la producción alimentaria y agroindustrial.',
    contractType: 'CPT/FCA con contratos anuales',
    quality: 'ISO 22000Hungarian ProductHungaricumGlobalGAP',
    arbitration:
      'Court of Arbitration at Hungarian Chamber of Commerce - Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇮🇹 Italia\nUE',
    city: 'Roma',
    strengths:
      '✓ Productos DOP/IGP reconocidos\n✓ Vinos premium\n✓ Gastronomía mundial\n✓ Diversidad',
    weaknesses:
      '✗ Burocracia lenta\n✗ Producción fragmentada\n✗ Costos elevados',
    suppliers:
      'Ferrero, Barilla, Lavazza, Parmalat y Conserve Italia son líderes mundiales en alimentación y agroindustria.',
    contractType: 'FCA/FOB con contratos específicos por producto',
    quality: 'ISO 22000DOP/IGP/STGBRC/IFSMade in Italy',
    arbitration:
      'Camera Arbitrale di Milano - Alta reputación internacional, UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇱🇻 Letonia\nUE',
    city: 'Riga',
    strengths:
      '✓ Productos lácteos\n✓ Orgánicos en crecimiento\n✓ Costos moderados',
    weaknesses:
      '✗ Mercado pequeño\n✗ Clima limitante\n✗ Infraestructura mejorable',
    suppliers:
      'Olainfarm y Riga Varnish and Paint Plant (RVPP) son algunas de las empresas industriales más influyentes en Letonia, destacando en el sector químico.',
    contractType: 'FCA/CPT pagos documentarios',
    quality: 'ISO 22000EU StandardsLatvian Quality Mark',
    arbitration: 'Latvian Chamber of Commerce Arbitration - Sistema báltico',
  },
  {
    continent: 'Europa',
    country: '🇱🇹 Lituania\nUE',
    city: 'Vilna',
    strengths:
      '✓ Cereales y lácteos\n✓ Ubicación logística báltica\n✓ Costos competitivos',
    weaknesses: '✗ Clima frío\n✗ Mercado regional limitado',
    suppliers:
      'Latvijas Piensaimnieks, Dobeles Dzirnavnieks y Rimi Latvia son actores claves en agroindustria y distribución.',
    contractType: 'FCA/CPT con forwards',
    quality: 'ISO 22000Lithuanian QualityGlobalGAPEU Organic',
    arbitration:
      'Vilnius Court of Commercial Arbitration - Red báltica, Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇱🇺 Luxemburgo\nUE',
    city: 'Luxemburgo',
    strengths: '✓ Estabilidad financiera\n✓ Calidad premium\n✓ Hub financiero',
    weaknesses: '✗ Producción mínima\n✗ Costos altísimos\n✗ Mercado micro',
    suppliers: 'Luxlait y Biogros son prominentes en productos orgánicos.',
    contractType: 'DDP contratos especializados',
    quality: 'ISO 22000Lëtzebuerger ProduitEU Organic',
    arbitration:
      'Luxembourg Chamber of Commerce Arbitration - Enfoque financiero internacional',
  },
  {
    continent: 'Europa',
    country: '🇳🇴 Noruega\nNo UE',
    city: 'Oslo',
    strengths:
      '✓ Salmón y productos del mar líderes\n✓ Altísima calidad\n✓ Trazabilidad total',
    weaknesses:
      '✗ Costos extremadamente altos\n✗ No UE (EEA)\n✗ Producción terrestre limitada',
    suppliers:
      'Mowi (Marine Harvest), Lerøy Seafood y Salmar son exportadores clave de productos del mar y lácteos.',
    contractType: 'DDP/CIF contratos a largo plazo',
    quality: 'ISO 22000ASC/MSCNorwegian QualityGLOBALG.A.P.',
    arbitration: 'Norwegian Arbitration - Sistema nórdico, UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇵🇱 Polonia\nUE',
    city: 'Varsovia',
    strengths:
      '✓ Mayor productor frutas UE\n✓ Costos competitivos\n✓ Escala productiva\n✓ Lácteos',
    weaknesses:
      '✗ Calidad variable\n✗ Infraestructura en desarrollo\n✗ Fragmentación',
    suppliers:
      'Mlekovita, OSM Piątnica, Grupa Azoty y Cedrob son grandes empresas polacas dedicadas a la producción de lácteos, carne de ave y químicos como melamina y alcohol oxo.',
    contractType: 'CPT/FCA contratos anuales',
    quality: 'ISO 22000Polish QualityGlobalGAPIFS/BRC',
    arbitration:
      'Court of Arbitration at Polish Chamber of Commerce - Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇵🇹 Portugal\nUE',
    city: 'Lisboa',
    strengths:
      '✓ Vinos de Oporto\n✓ Corcho líder mundial\n✓ Aceite de oliva\n✓ Clima favorable',
    weaknesses:
      '✗ Escala limitada\n✗ Sequías\n✗ Infraestructura rural deficiente',
    suppliers:
      'Delta Cafés, Sovena, Lactogal y Group RAR son importantes en café, aceite, lácteos y exportación agrícola.',
    contractType: 'FOB/CIF con L/C',
    quality: 'ISO 22000DOP/IGP portuguésGlobalGAPEU Organic',
    arbitration: 'CAC (Centro de Arbitragem Comercial) - Convención de Nueva York',
  },
  {
    continent: 'Europa',
    country: '🇷🇴 Rumanía\nUE',
    city: 'Bucarest',
    strengths:
      '✓ Tierras agrícolas extensas\n✓ Costos bajos\n✓ Potencial de crecimiento',
    weaknesses: '✗ Infraestructura deficiente\n✗ Corrupción\n✗ Tecnología atrasada',
    suppliers:
      'Agricover, Cargill Romania y Danone Romania son actores en agricultura y alimentos.',
    contractType: 'FOB/CPT con pagos garantizados',
    quality: 'ISO 22000 (adopción creciente)Romanian QualityEU Standards',
    arbitration:
      'Court of International Commercial Arbitration at CCIR - Convención NY',
  },
  {
    continent: 'Europa',
    country: '🇷🇺 Rusia\nNo UE',
    city: 'Moscú',
    strengths:
      '✓ Gran productor de cereales\n✓ Escala masiva\n✓ Precios competitivos',
    weaknesses:
      '✗ Sanciones internacionales\n✗ Riesgo político alto\n✗ Calidad inconsistente\n✗ Logística compleja',
    suppliers: 'Rusagro, Miratorg y Wimm-Bill-Dann son grandes exportadores agroindustriales.',
    contractType: 'FOB Mar Negro - Contratos especiales con garantías',
    quality: 'GOST (estándares rusos)ISO limitadoCertificación propia',
    arbitration:
      'ICAC (International Commercial Arbitration Court at RF CCI) - Reconocimiento limitado por sanciones',
  },
  {
    continent: 'Europa',
    country: '🇸🇪 Suecia\nUE',
    city: 'estocolmo',
    strengths:
      '✓ Sostenibilidad líder\n✓ Productos orgánicos\n✓ Avena y lácteos premium',
    weaknesses:
      '✗ Costos muy altos\n✗ Clima limitante\n✗ Producción limitada',
    suppliers:
      'Lantmännen y Swedish Oat Fiber son relevantes en agroindustria y alimentos.',
    contractType: 'DDP/DAP contratos sostenibles a largo plazo',
    quality: 'ISO 22000KRAV (orgánico sueco)Svenskt SigillNordic Swan',
    arbitration: 'SCC (Stockholm Chamber of Commerce) - Prestigio internacional, UNCITRAL',
  },
  {
    continent: 'Europa',
    country: '🇨🇭 Suiza\nNo UE',
    city: 'Berna',
    strengths:
      '✓ Chocolate premium mundial\n✓ Quesos de calidad\n✓ Estabilidad extrema\n✓ Reputación',
    weaknesses:
      '✗ Costos altísimos\n✗ Producción limitada\n✗ No UE (acuerdos bilaterales)\n✗ Proteccionismo',
    suppliers: 'Nestlé, Lindt & Sprüngli y Emmi Group son gigantes globales de alimentos.',
    contractType: 'DDP contratos especializados premium',
    quality: 'ISO 22000Swiss QualityAOP/AOC suizoBIO Suisse',
    arbitration:
      "Swiss Chambers' Arbitration Institution - Referencia mundial neutral",
  },
  {
    continent: 'Europa',
    country: '🇹🇷 Turquía\nNo UE',
    city: 'Ankara',
    strengths:
      '✓ Frutas secas y avellanas líder\n✓ Ubicación estratégica\n✓ Costos competitivos\n✓ Diversidad',
    weaknesses:
      '✗ Inestabilidad monetaria\n✗ Riesgo político\n✗ Calidad variable',
    suppliers:
      'Erkunt Traktör dedicada a producción de tractores agrícolas y Safa Tarim especializada en productos fitosanitarios y de nutrición vegetal',
    contractType: 'FOB/CIF con pagos L/C confirmadas',
    quality: 'ISO 22000Turkish Standards (TSE)GlobalGAP (exportadores)Halal',
    arbitration:
      'ISTAC (Istanbul Arbitration Centre) - Convención de Nueva York, creciente reconocimiento',
  },
  {
    continent: 'Centro America',
    country: 'Belice',
    city: 'Belmopán',
    strengths:
      'Inglés oficial facilita comunicación; sistema jurídico basado en derecho inglés; régimen fiscal atractivo para IED; Zonas Francas con desgravaciones fiscales.',
    weaknesses: 'Disputa territorial con Guatemala crea incertidumbre; pequeño mercado local.',
    suppliers: 'Belize Agro Enterprise Ltd, Green Care Products Ltd, Quality Feed Mill Ltd',
    contractType:
      'Contratos indefinidos y de duración determinada (empleo); contratos mercantiles tradicionales.',
    quality:
      'Calidad bajo normas internacionales, énfasis en regulaciones regionales; ISO requerido en exportaciones.',
    arbitration:
      'Caso territorial pendiente en CIJ; arbitrajes internacionales para disputas comerciales conforme a tratados multilaterales.',
  },
  {
    continent: 'Centro America',
    country: 'Costa Rica',
    city: 'San José',
    strengths:
      'Economía estable y dinámica; TLCs amplios con varios países; buena infraestructura; respeto por certificaciones internacionales',
    weaknesses:
      'Procedimientos burocráticos lentos; cultura de negociaciones consensuales; retrasos en pagos frecuentes',
    suppliers: 'Agro Pro Centroamérica S.A. líder en fitosanitarios y fertilizantes',
    contractType:
      'Contratos de compraventa, arrendamiento mercantil, distribución y agencia comercial.',
    quality:
      'Uso extendido de ISO 9001:2015 y otras normas ISO (ambiental, seguridad alimentaria).',
    arbitration:
      'Ley unificada de arbitraje nacional e internacional vigente desde 2025; arbitraje bajo normativa Chárter UNCITRAL.',
  },
  {
    continent: 'Centro America',
    country: 'El Salvador',
    city: 'San Salvador',
    strengths:
      'Estabilidad macroeconómica y dolarización; incentivos en zonas francas; ubicación estratégica para distribución regional',
    weaknesses: 'Economia dependiente de remesas, mercado pequeño; inseguridad jurídica.',
    suppliers: 'Proveedores agronegocios apoyados por ley de zonas francas',
    contractType: 'Contrato de compraventa mercantil es el más común',
    quality: 'ISO 9001 y demás normas ISO aplicadas; organismo OSN certifica bajo estándares internacionales',
    arbitration:
      'Arbitraje práctico con voluntad judicial; asesoría previa recomendada; regulado por Código de Comercio local y acuerdos internacionales.',
  },
  {
    continent: 'Centro America',
    country: 'Guatemala',
    city: 'Ciudad de Guatemala',
    strengths:
      'Unión Aduanera Centroamericana facilita comercio; recursos naturales; mano de obra joven y costo competitivo',
    weaknesses:
      'Inseguridad, burocracia; riesgos legales en indemnizaciones; sistema judicial lento',
    suppliers: 'Grupo Promoagro (productos fitosanitarios, fertilizantes)',
    contractType: 'Contratos de compraventa, arrendamiento, préstamo, servicios profesionales',
    quality: 'Normas ISO reguladas por OSN; ISO 9001, ISO ambiental y otras presentes',
    arbitration:
      'Miembro de OMC, CIADI y tratados multilaterales; uso de arbitraje internacional para resolver controversias comerciales.',
  },
  {
    continent: 'Centro America',
    country: 'Honduras',
    city: 'Tegucigalpa',
    strengths: 'Integración regional; acceso a mercados regionales; sector agrícola importante',
    weaknesses: 'Problemas de seguridad y burocracia; infraestructura limitada',
    suppliers: 'Proveedores locales de fertilizantes y protección de cultivos (no específicos)',
    contractType: 'Contratos mercantiles tradicionales (compraventa, arrendamiento)',
    quality:
      'Adopción gradual de normas ISO para exportaciones; certificaciones exigentes por mercados internacionales',
    arbitration:
      'Arbitraje internacional conforme a tratados y legislación nacional para resolución de conflictos.',
  },
  {
    continent: 'Centro America',
    country: 'Nicaragua',
    city: 'Managua',
    strengths:
      'Estabilidad macroeconómica; reservas internacionales; sectores exportadores orientados a mano de obra intensiva',
    weaknesses:
      'Riesgos políticos y autoritarismo; bajo número de empresas certificadas ISO; financiamiento externo limitado.',
    suppliers: 'Herogra Nicaragua (fertilizantes, bioestimulantes)',
    contractType: 'Contratos de compraventa, préstamo y servicios usuales',
    quality: 'Solo 57 empresas con certificación ISO; proceso de certificación costoso y largo',
    arbitration:
      'Arbitraje internacional flexible, eficiente y confidencial; regulado por leyes nacionales y acuerdos internacionales.',
  },
  {
    continent: 'Norte America',
    country: 'Canadá',
    city: 'Toronto',
    strengths: 'Economía diversificada y estable; normas de calidad exigentes; gran mercado interno',
    weaknesses: 'Altos costos laborales y regulatorios',
    suppliers: 'Grandes proveedores agrícolas nacionales e internacionales',
    contractType: 'Contratos mercantiles formales y detallados',
    quality: 'ISO y estrictas regulaciones sanitarias y fitosanitarias',
    arbitration:
      'Arbitraje internacional respaldado por tratados como el CUSMA; mecanismos robustos para solución de conflictos.',
  },
  {
    continent: 'Centro America',
    country: 'México',
    city: 'Ciudad de México',
    strengths:
      'Gran mercado interno; TLCs amplios; infraestructura avanzada; industria agrícola sólida',
    weaknesses:
      'Burocracia y corrupción en algunos sectores; retos regulatorios en ciertos estados',
    suppliers: 'Proveedores agrarios líderes nacionales y multinacionales',
    contractType: 'Contrato de compraventa, distribución y agencia común',
    quality:
      'Amplia adopción de normas ISO (9001, 14001, etc.); cumplimiento regulatorio estricto',
    arbitration:
      'Uso frecuente de arbitraje según Ley de Comercio Exterior y tratados internacionales vigentes.',
  },
  {
    continent: 'Norte America',
    country: 'Estados Unidos',
    city: 'Texas',
    strengths:
      'Mayor mercado del mundo; infraestructura logística avanzada; gran diversidad agrícola',
    weaknesses: 'Costos altos; compleja regulación estatal y federal',
    suppliers: 'Proveedores líderes en fertilizantes, agroquímicos y maquinarias',
    contractType: 'Contratos de compraventa, distribución, servicios y sublicencias',
    quality: 'Certificaciones ISO, USDA, FDA, normas muy estrictas de calidad y seguridad',
    arbitration:
      'Arbitraje muy común; normas de arbitraje internacional reconocidas; tribunales y cámaras de comercio nacionales reputadas.',
  },
];
