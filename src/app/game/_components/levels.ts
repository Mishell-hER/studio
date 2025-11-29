
export type Question = {
  text: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
};

export type Level = {
  title: string;
  description: string;
  passingScore: number;
  questions: Question[];
};

export const levels: Level[] = [
  // Nivel 1: Novato Navegante
  {
    title: "Conceptos Básicos de Exportación",
    description: "Demuestra que entiendes los fundamentos del comercio internacional.",
    passingScore: 30,
    questions: [
      {
        text: "¿Qué significa 'Incoterm'?",
        options: [
          "Términos de Contrato Internacional",
          "Términos de Comercio Internacional",
          "Impuestos de Comercio Interno",
          "Términos de Transporte Interno"
        ],
        correctAnswer: 1,
        feedback: "Correcto. Los Incoterms definen las responsabilidades entre comprador y vendedor."
      },
      {
        text: "¿Cuál es el propósito principal de una 'Factura Comercial' en una exportación?",
        options: [
          "Es un saludo para el cliente.",
          "Es el documento que declara el valor de la mercancía para aduanas.",
          "Es una guía de empaque.",
          "Es un contrato de transporte."
        ],
        correctAnswer: 1,
        feedback: "Exacto. La Factura Comercial es crucial para la declaración aduanera y el cálculo de impuestos."
      },
      {
        text: "En el Incoterm EXW (Ex Works), ¿quién es responsable de cargar la mercancía en el transporte?",
        options: [
          "El vendedor",
          "El comprador",
          "El transportista",
          "La aduana"
        ],
        correctAnswer: 1,
        feedback: "Correcto. En EXW, la responsabilidad del vendedor termina al poner la mercancía a disposición. El comprador asume casi todo."
      }
    ]
  },
  // Nivel 2: Aprendiz Aterrizado
  {
    title: "Documentación y Aduanas",
    description: "El papeleo es clave. ¿Conoces los documentos necesarios?",
    passingScore: 40,
    questions: [
      {
        text: "¿Qué documento especifica el contenido, peso y dimensiones de cada bulto en un envío?",
        options: [
          "Factura Comercial",
          "Conocimiento de Embarque (B/L)",
          "Lista de Empaque (Packing List)",
          "Certificado de Origen"
        ],
        correctAnswer: 2,
        feedback: "¡Muy bien! La Lista de Empaque es esencial para la verificación de la carga por parte de la aduana y el cliente."
      },
      {
        text: "Para exportar desde Perú a Europa, ¿qué certificado suele ser necesario para obtener preferencias arancelarias?",
        options: [
          "Certificado Sanitario",
          "Formato DUA",
          "Certificado de Origen (EUR.1)",
          "Póliza de Seguro"
        ],
        correctAnswer: 2,
        feedback: "Correcto. El EUR.1 prueba que la mercancía es originaria de Perú y puede acogerse a los beneficios del TLC con la UE."
      },
       {
        text: "El Incoterm DDP (Delivered Duty Paid) significa que el vendedor es responsable de...",
        options: [
          "Solo el transporte principal.",
          "Todo, excepto los impuestos de importación.",
          "Absolutamente todo, incluyendo transporte, seguro y pago de impuestos de importación.",
          "Solo la entrega en el puerto de destino."
        ],
        correctAnswer: 2,
        feedback: "¡Así es! DDP representa la máxima obligación para el vendedor, que debe entregar la mercancía lista para el comprador."
      }
    ]
  },
   // Nivel 3: Comerciante Curioso
  {
    title: "Logística y Transporte Terrestre",
    description: "Es hora de mover la mercancía. ¿Conoces tus rutas y modos?",
    passingScore: 50,
    questions: [
      {
        text: "El 'transporte multimodal' se refiere a:",
        options: [
          "Usar solo camiones de diferentes empresas.",
          "Usar varios tipos de transporte (ej. camión, tren, barco) bajo un único contrato.",
          "Enviar la misma mercancía a varios destinos.",
          "Transportar solo en modo terrestre."
        ],
        correctAnswer: 1,
        feedback: "Correcto. El transporte multimodal simplifica la logística al usar un solo operador para todo el trayecto."
      },
      {
        text: "En el transporte terrestre internacional, ¿qué es la 'Carta de Porte CMR'?",
        options: [
          "Un permiso de conducir especial.",
          "El contrato de transporte por carretera que prueba la recepción de la mercancía.",
          "Un seguro obligatorio para el camión.",
          "Una declaración de aduanas."
        ],
        correctAnswer: 1,
        feedback: "¡Muy bien! La Carta de Porte CMR es el documento clave que regula el transporte internacional de mercancías por carretera."
      },
       {
        text: "¿Cuál es una de las principales ventajas de usar el Incoterm FCA (Free Carrier) para el exportador?",
        options: [
          "El exportador controla todo el envío hasta el final.",
          "Es el más barato para el comprador.",
          "El riesgo se transfiere rápidamente al comprador una vez entregada la mercancía al transportista.",
          "No requiere factura comercial."
        ],
        correctAnswer: 2,
        feedback: "¡Exacto! Con FCA, el vendedor cumple su obligación y transfiere el riesgo en una etapa temprana, usualmente en su propio país."
      }
    ]
  },
];
