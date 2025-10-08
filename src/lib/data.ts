export type CountryData = {
  id: string;
  country: string;
  capital: string;
  tradeAgreement: string;
  customsInfo: string;
  logisticalInfo: string;
  detailsLink: string;
};

export type ContinentsData = {
  [key: string]: CountryData[];
};

export const logisticData: ContinentsData = {
  'north-america': [
    { id: 'PAN', country: "Panamá", capital: "Ciudad de Pánama", tradeAgreement: "No hay en snippet", customsInfo: "Aduana Panama", logisticalInfo: "Como Negociar con Panama", detailsLink: "#" },
    { id: 'BLZ', country: "Belice", capital: "Belmopán", tradeAgreement: "No tienen", customsInfo: "Puente de Chetumal -Benque Viejo del Carmen y Santa Elena", logisticalInfo: "RUTA CIUDAD DE PANAMÁ A BELMOPÁN", detailsLink: "#" },
    { id: 'CRI', country: "Costa Rica", capital: "San José", tradeAgreement: "Si tienen", customsInfo: "Fuerte control en frontera Paso Canoas", logisticalInfo: "RUTA CIUDAD DE PANAMÁ A SAN JOSÉ", detailsLink: "#" },
    { id: 'SLV', country: "El Salvador", capital: "San Salvador", tradeAgreement: "Si tienen", customsInfo: "Aduana Anguiatú - Aduana El Amatillo", logisticalInfo: "RUTA CIUDAD DE PANAMÁ A SAN SALVADOR", detailsLink: "#" },
    { id: 'GTM', country: "Guatemala", capital: "Ciudad de Guatemala", tradeAgreement: "Si tienen", customsInfo: "Aduana Tecún Umán - Aduana La Mesilla", logisticalInfo: "RUTA CIUDAD DE PANAMÁ A CIUDAD DE GUATEMALA", detailsLink: "#" },
    { id: 'HND', country: "Honduras", capital: "Tegucigalpa", tradeAgreement: "Si tienen", customsInfo: "Paso de San Pancho - Paso de Peña Blanca - Paso de El Guasaule", logisticalInfo: "RUTA CIUDAD DE PANAMÁ A TEGUCIGALPA", detailsLink: "#" },
  ],
  'south-america': [
    { id: 'ARG', country: 'Argentina', capital: 'Buenos Aires', tradeAgreement: 'MERCOSUR', customsInfo: 'ADUANA ARGENTINA', logisticalInfo: "Formal en apertura, buscan vínculo personal; les gusta debatir con intensidad.", detailsLink: "RUTA LIMA - BUENOS AIRES" },
    { id: 'BOL', country: "Bolivia", capital: "La Paz", tradeAgreement: "MERCOSUR", customsInfo: "ADUANA BOLIVIA", logisticalInfo: "Negociación formal, protocolar, orientada a la jerarquía.", detailsLink: "RUTA LIMA - LA PAZ" },
    { id: 'PRY', country: "Paraguay", capital: "Asunción", tradeAgreement: "MERCOSUR", customsInfo: "ADUANA PARAGUAY", logisticalInfo: "Formal pero flexible; se valora la relación personal.", detailsLink: "RUTA LIMA - ASUNCIÓN" },
    { id: 'URY', country: "Uruguay", capital: "Montevideo", tradeAgreement: "MERCOSUR", customsInfo: "ADUANA URUGUAY", logisticalInfo: "Formal, sobrio y pragmático; ser claro y confiable.", detailsLink: "RUTA LIMA - MONTEVIDEO" },
    { id: 'VEN', country: "Venezuela", capital: "Caracas", tradeAgreement: "TLC PERU - VENEZUELA", customsInfo: "ADUANA VENEZUELA", logisticalInfo: "Relacional, centrada en la confianza; la puntualidad es flexible.", detailsLink: "RUTA LIMA - CARACAS" },
  ],
  'europe': [
    { id: 'ALB', country: "Albania", capital: "Tirana", tradeAgreement: "No tiene (Miembro AELC)", customsInfo: "Dogana Shqiptare", logisticalInfo: "Cómo negociar con Albania", detailsLink: "https://www.exteriores.gob.es/Documents/FichasPais/ALBANIA_FICHA%20PAIS.pdf" },
    { id: 'SWE', country: "Suecia", capital: "Estocolmo", tradeAgreement: "TLC UE-Perú (Miembro UE)", customsInfo: "Tullverket: Startsida", logisticalInfo: "Cómo negociar con Suecia", detailsLink: "https://www.exteriores.gob.es/Documents/FichasPais/SUECIA_FICHA%20PAIS.pdf" },
    { id: 'CHE', country: "Suiza", capital: "Berna", tradeAgreement: "TLC AELC-Perú (Miembro AELC)", customsInfo: "Swiss Federal Customs Administration", logisticalInfo: "Cómo negociar con Suiza", detailsLink: "https://www.exteriores.gob.es/Documents/FichasPais/SUIZA_FICHA%20PAIS.pdf" },
    { id: 'TUR', country: "Turquía (parte europea)", capital: "Ankara", tradeAgreement: "Acuerdo de la Union Aduanera -UE (Miembro AELC)", customsInfo: "Gümrükler Genel Müdürlüğü", logisticalInfo: "Cómo negociar con Turquía (parte europea)", detailsLink: "#" },
  ],
  'asia': [
    { id: 'CHN', country: 'China', capital: 'Pekín', tradeAgreement: 'Ninguno específico en snippet', customsInfo: 'AUTORIDAD ADUANERA', logisticalInfo: 'Tipo de negociación: Muy formal, estructurada... Los chinos evitan la confrontación.', detailsLink: 'FICHA PAÍS' },
    { id: 'UZB', country: "Uzbekistán", capital: "Taskent", tradeAgreement: "Sin FTA", customsInfo: "AUTORIDAD ADUANERA", logisticalInfo: "Formal, jerárquica y protocolar; se respeta mucho la autoridad.", detailsLink: "Ficha País" },
    { id: 'VNM', country: "Vietnam", capital: "Hanói", tradeAgreement: "ASEAN - China - ASEAN FTA + RCEP", customsInfo: "AUTORIDAD ADUANERA", logisticalInfo: "Formal pero basada en relaciones personales; evitan decir “no” directamente.", detailsLink: "Ficha País" },
  ],
  'africa': [
    { id: 'DZA', country: "Argelia", capital: "Argel", tradeAgreement: "AfCFTA", customsInfo: "https://douane.gov.dz/?lang=fr", logisticalInfo: "Negociación formal y jerárquica, orientada a resultados.", detailsLink: "https://www.exteriores.gob.es/documents/fichaspais/argelia_ficha%20pais.pdf" },
    { id: 'TUN', country: "Túnez", capital: "Túnez", tradeAgreement: "AfCFTA", customsInfo: "http://www.douane.gov.tn/", logisticalInfo: "Se valora la cortesía y la construcción de relaciones.", detailsLink: "https://datos.bancomundial.org/pais/TN" },
    { id: 'UGA', country: "Uganda", capital: "Kampala", tradeAgreement: "AfCFTA", customsInfo: "https://ura.go.ug/en/", logisticalInfo: "Negociación abierta, se valora la honestidad.", detailsLink: "https://maps.app.goo.gl/6LvfHx61CwySua1y5,https://tradecouncil.org/country-guides/doing-business-with-uganda/,https://datos.bancomundial.org/pais/UG,https://tradecouncil.org/country-guides/doing-business-with-uganda/#doing-business,178,22,26,44,205" },
    { id: 'ZMB', country: "Zambia", capital: "Lusaka", tradeAgreement: "SADC; AfCFTA", customsInfo: "https://www.zra.org.zm/", logisticalInfo: "Negociación formal, basada en acuerdos firmes.", detailsLink: "https://maps.app.goo.gl/irRJ2kLc6LDVnYRN6,https://tradecouncil.org/country-guides/doing-business-with-" },
    { id: 'SLE', country: "Sierra Leona", capital: "Freetown", tradeAgreement: "AfCFTA", customsInfo: "https://www.nra.gov.sl/", logisticalInfo: "Negociación relacional, se prioriza la confianza.", detailsLink: "https://maps.app.goo.gl/QhYdcGhTB18T73jh9" },
  ],
  'oceania': [
    { id: 'AUS_mel', country: "Australia", capital: "Melbourne", tradeAgreement: "ALC Perú - Australia", customsInfo: "Hume Highway (M31)", logisticalInfo: "Formal, estructurada; muy estricta puntualidad.", detailsLink: "RUTA SIDNEY- MELBOURNE" },
    { id: 'AUS_bri', country: "Australia", capital: "Brisbane", tradeAgreement: "ALC Perú - Australia", customsInfo: "Pacific Highway / M1", logisticalInfo: "Menos formal, construyen confianza; más directa.", detailsLink: "RUTA SIDNEY- BRISBANE" },
    { id: 'AUS_per', country: "Australia", capital: "Perth", tradeAgreement: "ALC Perú - Australia", customsInfo: "Controles fitosanitarios al ingresar a Australia Occidental", logisticalInfo: "Práctica y enfocada en resultados; valoran la rapidez.", detailsLink: "RUTA SIDNEY - PERTH" },
    { id: 'AUS_dar', country: "Australia", capital: "Darwin", tradeAgreement: "ALC Perú - Australia", customsInfo: "Controles fitosanitarios en Territorio del Norte", logisticalInfo: "Más relajada, estilo cercano e informal; énfasis en relaciones.", detailsLink: "RUTA SIDNEY - DARWIN" },
  ],
  'otros': [
    { id: 'GBR_lon', country: "Gran Bretaña", capital: "Londres", tradeAgreement: "No hay en snippet", customsInfo: "No hay en snippet", logisticalInfo: "COMO NEGOCIAR CON GRAN BRETAÑA", detailsLink: "https://datos.bancomundial.org/?locations=GD-GB" },
    { id: 'GBR_manc', country: "Gran Bretaña", capital: "Manchester", tradeAgreement: "No hay en snippet", customsInfo: "No hay en snippet", logisticalInfo: "COMO NEGOCIAR CON GRAN BRETAÑA", detailsLink: "https://datos.bancomundial.org/?locations=GD-GB" },
    { id: 'IDN_yog', country: "Indonesia", capital: "Yogyakarta", tradeAgreement: "No hay en snippet", customsInfo: "No hay en snippet", logisticalInfo: "https://my.nzte.govt.nz/article/business-culture-in-indonesia", detailsLink: "https://www.exteriores.gob.es/documents/fichaspais/indonesia_ficha%20pais.pdf" },
    { id: 'IDN_cir', country: "Indonesia", capital: "Cirebon", tradeAgreement: "No hay en snippet", customsInfo: "No hay en snippet", logisticalInfo: "https://my.nzte.govt.nz/article/business-culture-in-indonesia", detailsLink: "https://www.calcularruta.com/yakarta-cirebon.html" },
  ],
};
