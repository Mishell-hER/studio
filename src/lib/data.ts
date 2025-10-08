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
    { id: 'USA', country: 'United States', capital: 'Washington, D.C.', tradeAgreement: 'USMCA', customsInfo: 'Standard international customs apply. Check CBP for details.', logisticalInfo: 'Extensive network of ports, rail, and highways.', detailsLink: 'https://www.cbp.gov/' },
    { id: 'CAN', country: 'Canada', capital: 'Ottawa', tradeAgreement: 'USMCA', customsInfo: 'Similar to US, managed by CBSA.', logisticalInfo: 'Major ports on both Atlantic and Pacific coasts.', detailsLink: 'https://www.cbsa-asfc.gc.ca/' },
    { id: 'MEX', country: 'Mexico', capital: 'Mexico City', tradeAgreement: 'USMCA', customsInfo: 'Requires specific import documentation.', logisticalInfo: 'Growing logistics infrastructure, key for NA trade.', detailsLink: 'http://omawww.sat.gob.mx/' },
  ],
  'south-america': [
    { id: 'BRA', country: 'Brazil', capital: 'Brasília', tradeAgreement: 'Mercosur', customsInfo: 'Complex customs regulations, requires local agent.', logisticalInfo: 'Major ports are Santos and Rio de Janeiro.', detailsLink: 'http://receita.economia.gov.br/' },
    { id: 'ARG', country: 'Argentina', capital: 'Buenos Aires', tradeAgreement: 'Mercosur', customsInfo: 'Frequent changes in import policies.', logisticalInfo: 'Buenos Aires port is the central hub.', detailsLink: 'https://www.afip.gob.ar/aduana/' },
    { id: 'PER', country: 'Peru', capital: 'Lima', tradeAgreement: 'Andean Community', customsInfo: 'SUNAT manages customs; specific tariffs apply.', logisticalInfo: 'Port of Callao is the main maritime gateway.', detailsLink: 'http://www.sunat.gob.pe/' },
  ],
  'europe': [
    { id: 'DEU', country: 'Germany', capital: 'Berlin', tradeAgreement: 'EU Single Market', customsInfo: 'No customs for intra-EU trade. Standard EU tariffs for external.', logisticalInfo: 'Port of Hamburg is one of the world\'s busiest.', detailsLink: 'https://www.zoll.de/' },
    { id: 'FRA', country: 'France', capital: 'Paris', tradeAgreement: 'EU Single Market', customsInfo: 'No customs for intra-EU trade. Standard EU tariffs for external.', logisticalInfo: 'Ports of Le Havre and Marseille are key.', detailsLink: 'http://www.douane.gouv.fr/' },
    { id: 'GBR', country: 'United Kingdom', capital: 'London', tradeAgreement: 'UK-EU TCA', customsInfo: 'Post-Brexit customs checks are in place. Requires EORI number.', logisticalInfo: 'Port of Felixstowe is the largest container port.', detailsLink: 'https://www.gov.uk/government/organisations/hm-revenue-customs' },
  ],
  'asia': [
    { id: 'CHN', country: 'China', capital: 'Beijing', tradeAgreement: 'RCEP', customsInfo: 'Strict customs clearance, often requires a broker.', logisticalInfo: 'Ports of Shanghai and Shenzhen are global leaders.', detailsLink: 'http://english.customs.gov.cn/' },
    { id: 'JPN', country: 'Japan', capital: 'Tokyo', tradeAgreement: 'CPTPP, RCEP', customsInfo: 'Efficient but stringent customs procedures.', logisticalInfo: 'Ports of Tokyo, Yokohama, and Nagoya are vital.', detailsLink: 'https://www.customs.go.jp/english/' },
    { id: 'IND', country: 'India', capital: 'New Delhi', tradeAgreement: 'SAFTA', customsInfo: 'ICEGATE is the portal for customs.', logisticalInfo: 'Mumbai and Chennai ports handle significant volume.', detailsLink: 'https://www.icegate.gov.in/' },
  ],
  'africa': [
    { id: 'ZAF', country: 'South Africa', capital: 'Pretoria', tradeAgreement: 'AfCFTA, SADC', customsInfo: 'Managed by SARS. VAT and duties apply.', logisticalInfo: 'Port of Durban is the busiest in sub-Saharan Africa.', detailsLink: 'https://www.sars.gov.za/' },
    { id: 'NGA', country: 'Nigeria', capital: 'Abuja', tradeAgreement: 'AfCFTA, ECOWAS', customsInfo: 'Pre-shipment inspection is often required.', logisticalInfo: 'Lagos Port Complex is the primary hub.', detailsLink: 'https://customs.gov.ng/' },
    { id: 'EGY', country: 'Egypt', capital: 'Cairo', tradeAgreement: 'AfCFTA, COMESA', customsInfo: 'Requires certificates of origin and inspection.', logisticalInfo: 'Suez Canal is a critical global shipping lane.', detailsLink: 'http://www.customs.gov.eg/' },
  ],
  'oceania': [
    { id: 'AUS', country: 'Australia', capital: 'Canberra', tradeAgreement: 'CPTPP, RCEP', customsInfo: 'Managed by Australian Border Force. Strict biosecurity.', logisticalInfo: 'Ports of Melbourne and Sydney are key.', detailsLink: 'https://www.abf.gov.au/' },
    { id: 'NZL', country: 'New Zealand', capital: 'Wellington', tradeAgreement: 'CPTPP, RCEP', customsInfo: 'Similar to Australia with strong biosecurity measures.', logisticalInfo: 'Ports of Auckland and Tauranga are the largest.', detailsLink: 'https://www.customs.govt.nz/' },
  ],
};
