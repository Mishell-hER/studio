
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, ArrowLeft, Volume2, VolumeX, Lock, ShieldQuestion, Trophy, Repeat, Star } from 'lucide-react';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { useLoginModal } from '@/hooks/use-login-modal';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

// --- TIPOS DE DATOS ---
interface Level {
  level: number;
  title: string;
  questions: number;
  bgColor: string;
  textColor: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Interfaz para el progreso del juego local
interface LocalGameProgress {
  userId: string;
  userName: string;
  highestLevelCompleted: number;
  failures: number;
  attempts: number;
  lastPlayed: string;
}

// --- DATOS DEL JUEGO ---
const levelTitles = [
  "Novato Navegante",
  "Aprendiz Aterrizado",
  "Comerciante Curioso",
  "Exportador Ensayista",
  "Navegante Novato",
  "Vendedor Viajero",
  "Agente Agudo",
  "Comerciante Comedido",
  "Exportador Experimentado",
  "Tigre de Tráficas",
  "Piloto de Puertos",
  "Capitán de Carga",
  "Estratega de Exportación",
  "General de Aduanas",
  "Magnate Marítimo",
  "Maestro de Mercados",
  "Rey del Comercio",
  "Señor de la Logística",
  "Emperador Exportador",
  "Dios del Comercio Exterior",
];

const levels: Level[] = Array.from({ length: 20 }, (_, i) => ({
  level: i + 1,
  title: levelTitles[i] || `Nivel ${i + 1}`,
  questions: (i === 0 || i === 2 || i === 3 || i === 4) ? 20 : (i < 10) ? 5 : (i < 15) ? 10 : (i < 18) ? 15 : (i < 19) ? 20 : 25,
  bgColor: 'bg-gray-100',
  textColor: 'text-gray-800'
}));

const questions: { [key: number]: Question[] } = {
    1: [
        {
            question: "¿Qué es una exportación?",
            options: ["Venta de productos dentro del mismo país", "Envío de mercancías a otro país", "Compra de productos extranjeros", "Transportar productos dentro de una ciudad"],
            correctAnswer: "Envío de mercancías a otro país",
            explanation: "Exportar es enviar bienes o servicios fuera del país de origen para su venta."
        },
        {
            question: "¿Cuál es el documento más básico para exportar un producto?",
            options: ["Factura comercial", "Recibo de entrega", "Carnet de identidad", "Recibo de agua"],
            correctAnswer: "Factura comercial",
            explanation: "La factura comercial respalda legalmente la operación y es requerida en aduanas."
        },
        {
            question: "¿Qué actor NO suele participar directamente en una exportación?",
            options: ["Exportador", "Importador", "Traductor jurado", "Transportista"],
            correctAnswer: "Traductor jurado",
            explanation: "El traductor no es parte esencial de la cadena, a menos que se requieran documentos en otro idioma."
        },
        {
            question: "¿Para qué sirve una cotización en el proceso de exportación?",
            options: ["Para calcular el costo de importación", "Para ofrecer precio, condiciones y características al cliente", "Para calcular impuestos internos", "Para determinar la moneda nacional"],
            correctAnswer: "Para ofrecer precio, condiciones y características al cliente",
            explanation: "Una cotización ayuda a negociar antes de cerrar la venta."
        },
        {
            question: "¿Cómo se llama al país que recibe la mercancía exportada?",
            options: ["País de origen", "País de envío", "País de destino", "País vecino"],
            correctAnswer: "País de destino",
            explanation: "Es el país donde llega y se nacionaliza la mercancía."
        },
        {
            question: "¿Qué mercancía está prohibido exportar sin permisos especiales?",
            options: ["Textiles", "Armas y municiones", "Café", "Juguetes"],
            correctAnswer: "Armas y municiones",
            explanation: "Son bienes controlados por tratados y leyes, necesitan permisos especiales."
        },
        {
            question: "El precio de venta internacional normalmente se acuerda en:",
            options: ["Moneda nacional", "Dólares o divisa extranjera", "Billetes de lotería", "Puntos de descuento"],
            correctAnswer: "Dólares o divisa extranjera",
            explanation: "El dólar o el euro son monedas de referencia en el comercio exterior."
        },
        {
            question: "¿Cuál es la vía más común para la exportación de productos frescos?",
            options: ["Marítima", "Terrestre", "Aérea", "Subterránea"],
            correctAnswer: "Aérea",
            explanation: "La vía aérea permite entregar productos perecederos rápidamente."
        },
        {
            question: "¿Cuál de los siguientes es un beneficio de exportar?",
            options: ["Limitar el mercado", "Incrementar ventas y divisas", "Dificultar la producción", "Reducir productividad"],
            correctAnswer: "Incrementar ventas y divisas",
            explanation: "Exportar ayuda a acceder a mercados más amplios."
        },
        {
            question: "¿Qué organismo promueve el comercio exterior en Perú?",
            options: ["MINSA", "MINCETUR", "RENIEC", "BCRP"],
            correctAnswer: "MINCETUR",
            explanation: "El Ministerio de Comercio Exterior y Turismo lidera la promoción de exportaciones en Perú."
        },
        {
            question: "¿Qué es un arancel de exportación?",
            options: ["Un impuesto al salir mercancías del país", "Un servicio de paquetería urgente", "Un seguro de viaje", "Una carta formal"],
            correctAnswer: "Un impuesto al salir mercancías del país",
            explanation: "El arancel es el tributo aplicado por el Estado a bienes al exportarlos o importarlos."
        },
        {
            question: "¿Qué es una cuota de exportación?",
            options: ["Permiso para matrimonio", "Límite a la cantidad que se puede exportar de un producto", "Precio consultivo", "Comisión bancaria"],
            correctAnswer: "Límite a la cantidad que se puede exportar de un producto",
            explanation: "Las cuotas regulan la cantidad de un bien que sale de un país."
        },
        {
            question: "¿Qué función cumple el agente de aduanas?",
            options: ["Gestionar trámites y documentación de exportación", "Producir contenedores", "Cultivar tierras", "Realizar inspecciones de salud"],
            correctAnswer: "Gestionar trámites y documentación de exportación",
            explanation: "Facilitan la operación y cumplimiento de regulaciones."
        },
        {
            question: "¿Qué es el BL (Bill of Lading)?",
            options: ["Un recibo bancario", "El conocimiento de embarque, documento del transportista marítimo", "Un recibo de taxi", "Una póliza de seguro"],
            correctAnswer: "El conocimiento de embarque, documento del transportista marítimo",
            explanation: "Es esencial en embarques marítimos, avala y demuestra la carga."
        },
        {
            question: "¿Para qué sirven los Tratados de Libre Comercio (TLC)?",
            options: ["Establecen tarifas fijas de transporte", "Eliminar o reducir barreras arancelarias y potenciar comercio", "Regular matrimonios binacionales", "Controlar reservas de oro"],
            correctAnswer: "Eliminar o reducir barreras arancelarias y potenciar comercio",
            explanation: "Facilitan el acceso a nuevos mercados y reducen costos."
        },
        {
            question: "¿Qué permite el régimen aduanero de exportación definitiva?",
            options: ["Salida temporal con devolución", "Salida del producto para venta permanente fuera del país", "Renovación de licencias", "Prueba de embalaje"],
            correctAnswer: "Salida del producto para venta permanente fuera del país",
            explanation: "Es el régimen más común cuando la mercadería no va a regresar."
        },
        {
            question: "¿Cómo se denomina el lugar habilitado por aduanas para el despacho de mercaderías?",
            options: ["Playa de estacionamiento", "Depósito temporal", "Puesto de salud", "Oficina del alcalde"],
            correctAnswer: "Depósito temporal",
            explanation: "Es donde se almacenan y nacionalizan mercancías antes de despacho."
        },
        {
            question: "¿Qué es el ‘packing list’?",
            options: ["Lista de canciones", "Relación detallada de contenidos del embarque", "Programa de TV", "Inventario de computadoras"],
            correctAnswer: "Relación detallada de contenidos del embarque",
            explanation: "Informa a aduanas y clientes qué va exactamente en el envío."
        },
        {
            question: "¿Qué significa la DUA?",
            options: ["Declaración Única de Aduanas", "Documento Único de Avión", "Dictamen Unificado de Almacén", "Dólares Unificados de América"],
            correctAnswer: "Declaración Única de Aduanas",
            explanation: "Es el principal formulario para declarar mercadería ante Aduanas."
        },
        {
            question: "¿Cuál es la función del Incoterm FOB?",
            options: ["El vendedor paga flete y seguro hasta destino", "El comprador asume riesgos y costos desde el puerto de embarque", "El vendedor entrega en el almacén del cliente", "El vendedor sigue siendo responsable hasta la venta en el extranjero"],
            correctAnswer: "El comprador asume riesgos y costos desde el puerto de embarque",
            explanation: "En FOB, el comprador toma el control y asume riesgos en el puerto de origen."
        },
    ],
    3: [
        {
            question: "¿Qué es un arancel preferencial?",
            options: ["Un impuesto estándar sin descuentos", "Un impuesto reducido por acuerdos comerciales", "Tarifa para productos especiales", "Una tasa fija para transporte"],
            correctAnswer: "Un impuesto reducido por acuerdos comerciales",
            explanation: "Se aplica dentro de los TLC para incentivar el comercio."
        },
        {
            question: "¿Qué significa “exportación temporal”?",
            options: ["Venta definitiva de mercancía", "Salida de mercancía con regreso previsto", "Exportación solo de muestras", "Envío de productos perecibles"],
            correctAnswer: "Salida de mercancía con regreso previsto",
            explanation: "Es para bienes que retornan después de un uso determinado."
        },
        {
            question: "¿Qué es un INCOTERM FCA?",
            options: ["Free Carrier, vendedor entrega mercancía al transportista en un punto acordado", "Feria Comercial Argentina", "Flete Costo Asegurado", "Un código de aduana"],
            correctAnswer: "Free Carrier, vendedor entrega mercancía al transportista en un punto acordado",
            explanation: "El vendedor cumple entregando la mercancía en el lugar convenido al transportista."
        },
        {
            question: "¿Qué tipo de inspección son las preembarque?",
            options: ["Revisión posventa", "Revisión antes de enviar la mercancía para garantizar calidad y cantidad", "Inspección en destino", "No existen inspecciones preembarque"],
            correctAnswer: "Revisión antes de enviar la mercancía para garantizar calidad y cantidad",
            explanation: "Permiten verificar cumplimiento antes de la exportación."
        },
        {
            question: "¿Qué es la factura proforma?",
            options: ["Documento comercial preliminar con detalles provisionales de la venta", "Recibo de pago", "Factura final para exportar", "Documento aduanero"],
            correctAnswer: "Documento comercial preliminar con detalles provisionales de la venta",
            explanation: "Sirve para informar al comprador antes del contrato formal."
        },
        {
            question: "¿Qué es la zona franca?",
            options: ["Área fuera del territorio nacional", "Zona con beneficios aduaneros y fiscales para almacenamiento o producción", "Área de baja seguridad", "Local comercial sin permiso"],
            correctAnswer: "Zona con beneficios aduaneros y fiscales para almacenamiento o producción",
            explanation: "Facilitan operaciones de comercio exterior con menos trámites."
        },
        {
            question: "¿Qué significa “despacho aduanero”?",
            options: ["Transporte terrestre", "Trámite para la entrada o salida de mercancías por la aduana", "Pago de seguro", "Trámite bancario"],
            correctAnswer: "Trámite para la entrada o salida de mercancías por la aduana",
            explanation: "Es la formalización ante la autoridad aduanera."
        },
        {
            question: "¿Qué es la barrera técnica en comercio exterior?",
            options: ["Requisito técnico o normativo para importar o exportar productos", "Barreras físicas en la frontera", "Casilla marítima", "Código postal"],
            correctAnswer: "Requisito técnico o normativo para importar o exportar productos",
            explanation: "Normas, certificaciones o características técnicas que deben cumplirse."
        },
        {
            question: "¿Qué es el Incoterm DAP?",
            options: ["Delivered At Place, el vendedor entrega la mercancía en un lugar indicado sin descargar", "Documento de autorización de pago", "Tipo de transporte aéreo", "No existe este término"],
            correctAnswer: "Delivered At Place, el vendedor entrega la mercancía en un lugar indicado sin descargar",
            explanation: "El vendedor asume costos hasta el lugar convenido, sin descargar."
        },
        {
            question: "¿Qué servicio ofrece una naviera?",
            options: ["Transporte marítimo de mercancías", "Servicio postal", "Aéreo de pasajeros", "Seguro bancario"],
            correctAnswer: "Transporte marítimo de mercancías",
            explanation: "Es la empresa que opera barcos para transporte internacional."
        },
        {
            question: "¿Qué comprende el control fitosanitario?",
            options: ["Control de documentos legales", "Control de calidad para productos agrícolas y evitar plagas", "Control de peso", "Revisión bancaria"],
            correctAnswer: "Control de calidad para productos agrícolas y evitar plagas",
            explanation: "Es vital para proteger ecosistemas y mercados de exportación."
        },
        {
            question: "¿Cuál es la diferencia principal entre INCOTERM FOB y CFR?",
            options: ["El seguro está incluido en CFR y no en FOB", "Ambos son iguales", "CFR es para transporte aéreo y FOB marítimo", "FOB incluye seguro, CFR no"],
            correctAnswer: "El seguro está incluido en CFR y no en FOB",
            explanation: "CFR cubre costo y flete hasta destino, pero seguro solo en CIF."
        },
        {
            question: "¿Qué son los documentos de transporte multimodal?",
            options: ["Documentos para transporte combinado (marítimo, terrestre, aéreo)", "Facturas comerciales", "Licencias de exportación", "Certificados de origen"],
            correctAnswer: "Documentos para transporte combinado (marítimo, terrestre, aéreo)",
            explanation: "Permiten gestión eficiente cuando se usan varias modalidades."
        },
        {
            question: "¿Qué es el drawback?",
            options: ["Devolución parcial de impuestos en exportación para insumos usados en producción", "Tipo de seguro", "Un impuesto adicional", "Contrato de flete"],
            correctAnswer: "Devolución parcial de impuestos en exportación para insumos usados en producción",
            explanation: "Incentiva las exportaciones reduciendo costos."
        },
        {
            question: "¿Qué es la cobertura cambiaria?",
            options: ["Seguro contra fluctuaciones del tipo de cambio en contratos internacionales", "Protección del seguro marítimo", "Documento aduanero", "Permiso de exportación"],
            correctAnswer: "Seguro contra fluctuaciones del tipo de cambio en contratos internacionales",
            explanation: "Mitiga riesgos cuando se pactan pagos en monedas extranjeras."
        },
        {
            question: "¿Qué es un sistema de gestión aduanera?",
            options: ["Herramientas tecnológicas para administrar trámites en aduanas", "Tipo de transporte", "Moneda local", "Licencia exportadora"],
            correctAnswer: "Herramientas tecnológicas para administrar trámites en aduanas",
            explanation: "Optimiza procesos, reduce errores y tiempos."
        },
        {
            question: "¿Qué importancia tiene la logística inversa en la exportación?",
            options: ["Ninguna", "Permite la devolución o gestión de productos defectuosos o embalajes", "Solo es para transporte interno", "Control de calidad"],
            correctAnswer: "Permite la devolución o gestión de productos defectuosos o embalajes",
            explanation: "Mantiene la satisfacción y reduce pérdidas."
        },
        {
            question: "¿Qué es un certificado fitosanitario?",
            options: ["Documento que acredita que un producto cumple normas sanitarias para exportación de plantas o productos agrícolas", "Documento de embarque", "Licencia industrial", "Factura comercial"],
            correctAnswer: "Documento que acredita que un producto cumple normas sanitarias para exportación de plantas o productos agrícolas",
            explanation: "Asegura que la mercancía cumple requisitos sanitarios del país destino."
        },
        {
            question: "¿Qué es un acuerdo de cooperación aduanera?",
            options: ["Un convenio entre países para facilitar el comercio y control conjunto", "Contrato privado de empresa", "Ley nacional", "Un tipo de seguro"],
            correctAnswer: "Un convenio entre países para facilitar el comercio y control conjunto",
            explanation: "Mejora la coordinación, reduce tiempos y costos."
        },
        {
            question: "¿Qué es la exportación indirecta?",
            options: ["Exportación sin intermediarios", "Exportación realizada a través de intermediarios como agentes o trading companies", "Exportación directa", "Venta local"],
            correctAnswer: "Exportación realizada a través de intermediarios como agentes o trading companies",
            explanation: "Permite llegar a mercados sin tener estructura propia."
        },
    ],
    4: [
        {
            question: "¿Qué implica la valoración aduanera?",
            options: ["Estimar el valor de la mercancía para calcular impuestos", "Revisión de embalaje", "Control de peso bruto", "Validación de seguro"],
            correctAnswer: "Estimar el valor de la mercancía para calcular impuestos",
            explanation: "Es la base para establecer los tributos a pagar."
        },
        {
            question: "¿Qué es el Arancel Externo Común (AEC)?",
            options: ["El impuesto único aplicable a mercancías importadas en un bloque económico o unión aduanera", "Un impuesto local", "Tarifas internas de la empresa", "Un seguro de carga"],
            correctAnswer: "El impuesto único aplicable a mercancías importadas en un bloque económico o unión aduanera",
            explanation: "Se aplica en bloques como el Mercosur para armonizar comercio."
        },
        {
            question: "¿Qué es un manifiesto de carga?",
            options: ["Documento con descripción detallada de la carga embarcada, presentado a la aduana", "Factura comercial", "Contrato de compra", "Inventario local"],
            correctAnswer: "Documento con descripción detallada de la carga embarcada, presentado a la aduana",
            explanation: "Es requisito para el control aduanero."
        },
        {
            question: "¿Qué son las mercancías peligrosas?",
            options: ["Bienes que requieren manejo especial por su naturaleza inflamable, tóxica o explosiva", "Productos baratos", "Productos perecibles", "Material promocional"],
            correctAnswer: "Bienes que requieren manejo especial por su naturaleza inflamable, tóxica o explosiva",
            explanation: "Su manipulación y transporte requiere protocolos específicos."
        },
        {
            question: "¿Qué es una franquicia aduanera?",
            options: ["Exoneración o reducción parcial de impuestos aduaneros para ciertos beneficios o sectores", "Una tienda internacional", "Tipo de transporte", "Seguro de carga"],
            correctAnswer: "Exoneración o reducción parcial de impuestos aduaneros para ciertos beneficios o sectores",
            explanation: "Apoya ciertos sectores o productos estratégicos."
        },
        {
            question: "¿Qué es el control de origen?",
            options: ["Verificar el país donde se produjo un bien para aplicar preferencias arancelarias", "Revisión de documentos bancarios", "Control del transporte interno", "Control de calidad final"],
            correctAnswer: "Verificar el país donde se produjo un bien para aplicar preferencias arancelarias",
            explanation: "Asegura que los beneficios arancelarios se otorguen solo a bienes que califican."
        },
        {
            question: "¿Qué función cumple un certificado sanitario?",
            options: ["Garantiza que productos alimenticios cumplen normas del país importador", "Documento bancario", "Licencia de exportación", "Documento de embarque"],
            correctAnswer: "Garantiza que productos alimenticios cumplen normas del país importador",
            explanation: "Es indispensable para productos como alimentos o farmacéuticos."
        },
        {
            question: "¿Qué implica un depósito aduanero?",
            options: ["Almacenamiento temporal de mercancías bajo control aduanero hasta su nacionalización o exportación", "Depósito bancario", "Contrato de transporte", "Pedido de compra"],
            correctAnswer: "Almacenamiento temporal de mercancías bajo control aduanero hasta su nacionalización o exportación",
            explanation: "Permite manejo flexible y seguro de mercancías."
        },
        {
            question: "¿Qué es un seguro de caución en exportación?",
            options: ["Garantía para cubrir obligaciones aduaneras o contractuales", "Seguro médico", "Seguro de vehiculos", "Seguro ambiental"],
            correctAnswer: "Garantía para cubrir obligaciones aduaneras o contractuales",
            explanation: "Ampara el pago de impuestos o cumplimiento de compromisos."
        },
        {
            question: "¿Qué se entiende por consolidación de carga?",
            options: ["Agrupar varias mercancías de diferentes exportadores en un solo envío", "Contrato de exportación directa", "Despacho aduanero único", "Contratación de flete aéreo"],
            correctAnswer: "Agrupar varias mercancías de diferentes exportadores en un solo envío",
            explanation: "Reduce costos y optimiza transporte."
        },
        {
            question: "¿Qué son los impuestos antidumping?",
            options: ["Tributos para proteger la industria nacional de importaciones a precios artificialmente bajos", "Tipo de seguro para cargas", "Permisos para exportar", "Tarifas portuarias"],
            correctAnswer: "Tributos para proteger la industria nacional de importaciones a precios artificialmente bajos",
            explanation: "Buscan evitar prácticas desleales en el comercio internacional."
        },
        {
            question: "¿Qué significa “armonización aduanera”?",
            options: ["Establecer normas y procesos comunes entre países para facilitar comercio y control", "Registro de embarques", "Certificado sanitario", "Registro de exportadores"],
            correctAnswer: "Establecer normas y procesos comunes entre países para facilitar comercio y control",
            explanation: "Facilita procesos y reduce barreras técnicas."
        },
        {
            question: "¿Qué es la operación de despacho directo?",
            options: ["Trámite simplificado de exportación donde la mercancía pasa directamente al contenedor sin almacenaje intermedio", "Almacenaje en depósito", "Solicitud de permiso", "Contrato de seguro"],
            correctAnswer: "Trámite simplificado de exportación donde la mercancía pasa directamente al contenedor sin almacenaje intermedio",
            explanation: "Agiliza tiempos y costos."
        },
        {
            question: "¿Qué es la Ley de Reembolso?",
            options: ["Política que devuelve total o parcialmente impuestos pagados en insumos usados para exportar", "Seguro contra daños", "Multa aduanera", "Contrato comercial"],
            correctAnswer: "Política que devuelve total o parcialmente impuestos pagados en insumos usados para exportar",
            explanation: "Mejora la competitividad y flujo de caja."
        },
        {
            question: "¿Qué es el CPM (Código Postal de Mercancías)?",
            options: ["Clasificación interna para facilitar localización y logística", "Nombre de documento financiero", "Número de exportador", "Certificado fitosanitario"],
            correctAnswer: "Clasificación interna para facilitar localización y logística",
            explanation: "Ayuda a organizar y controlar el inventario."
        },
        {
            question: "¿Qué se entiende por crédito documentario irrevocable?",
            options: ["Medio de pago que no puede ser modificado sin la aprobación de todas las partes", "Permiso de exportación", "Documento de transporte", "Factura comercial"],
            correctAnswer: "Medio de pago que no puede ser modificado sin la aprobación de todas las partes",
            explanation: "Ofrece seguridad y certeza en pagos internacionales."
        },
        {
            question: "¿Qué es una carta de porte internacional?",
            options: ["Documento de transporte terrestre o multimodal que prueba el contrato y entrega de mercancías", "Documento bancario", "Licencia de exportación", "Factura proforma"],
            correctAnswer: "Documento de transporte terrestre o multimodal que prueba el contrato y entrega de mercancías",
            explanation: "Representa el título de propiedad sobre la carga."
        },
        {
            question: "¿Cuál es la función del OEA (Operador Económico Autorizado)?",
            options: ["Facilitar y agilizar el comercio exterior mediante certificaciones que avalan confiabilidad", "Controlar aduanas", "Emitir certificados sanitarios", "Administrar puertos"],
            correctAnswer: "Facilitar y agilizar el comercio exterior mediante certificaciones que avalan confiabilidad",
            explanation: "Da beneficios en inspecciones y seguridad."
        },
        {
            question: "¿Qué es el valor CIF?",
            options: ["Precio del producto más costo de seguro y flete hasta el destino", "Precio neto en almacén", "Precio sin seguro ni flete", "Valor declarado solo para aduanas"],
            correctAnswer: "Precio del producto más costo de seguro y flete hasta el destino",
            explanation: "Se usa para cálculo de impuestos en importación."
        },
        {
            question: "¿Qué significa despacho consolidado?",
            options: ["Trámite aduanero para varios envíos agrupados y procesados simultáneamente", "Documento comercial", "Tipo de transporte", "Permiso de exportar"],
            correctAnswer: "Trámite aduanero para varios envíos agrupados y procesados simultáneamente",
            explanation: "Facilita y acelera operaciones de mercancías grupales."
        },
    ],
    5: [
        {
            question: "¿Qué es un contrato de agencia en exportación?",
            options: ["Contrato mediante el cual un agente representa al exportador en el extranjero para vender productos", "Contrato bancario", "Certificado de embarque", "Documento aduanero"],
            correctAnswer: "Contrato mediante el cual un agente representa al exportador en el extranjero para vender productos",
            explanation: "Facilita la comercialización en mercados internacionales sin presencia directa."
        },
        {
            question: "¿Qué es un certificado de inspección?",
            options: ["Documento que acredita que la mercancía cumple características y cantidad según contrato", "Permiso sanitario", "Contrato de transporte", "Licencia de exportación"],
            correctAnswer: "Documento que acredita que la mercancía cumple características y cantidad según contrato",
            explanation: "Seguridad para comprador y exportador."
        },
        {
            question: "¿Qué funciones cumple el Agente de Carga?",
            options: ["Coordina transporte, documentación y manejo logístico para exportar/importar", "Realiza inspecciones físicas", "Administra almacenes", "Emite certificados sanitarios"],
            correctAnswer: "Coordina transporte, documentación y manejo logístico para exportar/importar",
            explanation: "Es el intermediario logístico clave."
        },
        {
            question: "¿Qué significa el término “peso bruto”?",
            options: ["Peso total de mercancía incluyendo embalaje", "Peso neto sin embalaje", "Peso solo de la caja", "Peso máximo permitido"],
            correctAnswer: "Peso total de mercancía incluyendo embalaje",
            explanation: "Se usa para tarifas de transporte y despacho aduanero."
        },
        {
            question: "¿Qué es un manifiesto de carga aérea?",
            options: ["Documento que detalla las mercancías transportadas en un vuelo", "Contrato comercial", "Factura proforma", "Licencia exportadora"],
            correctAnswer: "Documento que detalla las mercancías transportadas en un vuelo",
            explanation: "Documento clave para control y despacho en aeropuertos."
        },
        {
            question: "¿Qué diferencia hay entre despacho postal y despacho courier?",
            options: ["El despacho courier es más rápido y especializado para paquetes pequeños", "Son iguales", "El despacho postal incluye transporte marítimo", "No existen diferencias"],
            correctAnswer: "El despacho courier es más rápido y especializado para paquetes pequeños",
            explanation: "Courier ofrece servicio puerta a puerta con seguimiento."
        },
        {
            question: "¿Qué es la exportación de servicios?",
            options: ["Venta de bienes físicos al extranjero", "Venta de servicios profesionales, tecnológicos o turísticos a clientes internacionales", "Importación temporal", "Venta local"],
            correctAnswer: "Venta de servicios profesionales, tecnológicos o turísticos a clientes internacionales",
            explanation: "Incluye consultorías, software, turismo, entre otros."
        },
        {
            question: "¿Qué impacta más en los costos totales de exportación?",
            options: ["Embalaje, transporte y aranceles", "Solo el precio del producto", "Costos administrativos", "Impuestos internos"],
            correctAnswer: "Embalaje, transporte y aranceles",
            explanation: "Muchas variables afectan el precio final para competir."
        },
        {
            question: "¿Qué es un consolidado marítimo?",
            options: ["Carga de varios exportadores agrupada para optimizar espacio en un contenedor", "Documentación oficial", "Tipo de seguro", "Permiso aduanero"],
            correctAnswer: "Carga de varios exportadores agrupada para optimizar espacio en un contenedor",
            explanation: "Reduce costos y mejora eficiencia."
        },
        {
            question: "¿Qué implica el control estadístico de comercio exterior?",
            options: ["Registro y análisis de datos sobre importación y exportación para decisiones políticas y comerciales", "Monitoreo del transporte", "Control de calidad", "Control de aduanas"],
            correctAnswer: "Registro y análisis de datos sobre importación y exportación para decisiones políticas y comerciales",
            explanation: "Es crucial para evaluar tendencias y oportunidades."
        },
        {
            question: "¿Qué es el carnet ATA?",
            options: ["Documento aduanero para la importación temporal de mercancías sin pago de impuestos", "Licencia de exportación", "Contrato de transporte", "Certificado sanitario"],
            correctAnswer: "Documento aduanero para la importación temporal de mercancías sin pago de impuestos",
            explanation: "Facilita el paso temporal de mercancías en ferias o muestras."
        },
        {
            question: "¿Qué significa “exportación concurrente”?",
            options: ["Exportar diferentes tipos de productos simultáneamente", "Exportar solo un producto", "Importar al mismo tiempo", "Exportar desde distintas agencias"],
            correctAnswer: "Exportar diferentes tipos de productos simultáneamente",
            explanation: "Gestiona múltiples envíos al mismo tiempo."
        },
        {
            question: "¿Qué es un almacén general de depósito?",
            options: ["Lugar autorizado para almacenar mercancías bajo control aduanero por tiempo limitado", "Depósito bancario", "Oficina de exportación", "Puerto marítimo"],
            correctAnswer: "Lugar autorizado para almacenar mercancías bajo control aduanero por tiempo limitado",
            explanation: "Permite controlar inventario para exportación o importación."
        },
        {
            question: "¿Qué es la trazabilidad en exportación?",
            options: ["Seguimiento y control de un producto desde producción hasta destino final", "Cambio de moneda", "Control de peso", "Control aduanero"],
            correctAnswer: "Seguimiento y control de un producto desde producción hasta destino final",
            explanation: "Garantiza confianza y calidad al comprador."
        },
        {
            question: "¿Qué es un certificado fitosanitario internacional?",
            options: ["Documento que garantiza la ausencia de plagas en productos vegetales exportados", "Factura comercial", "Certificado de calidad", "Carta de porte"],
            correctAnswer: "Documento que garantiza la ausencia de plagas en productos vegetales exportados",
            explanation: "Cumple normativas internacionales para acceso a mercados."
        },
        {
            question: "¿Qué función cumple el SICEX?",
            options: ["Sistema de información comercial exterior que facilita datos sobre exportaciones e importaciones", "Seguro de carga", "Sistema bancario", "Empresa exportadora"],
            correctAnswer: "Sistema de información comercial exterior que facilita datos sobre exportaciones e importaciones",
            explanation: "Apoya toma de decisiones y análisis de mercado."
        },
        {
            question: "¿Qué es la exportación bajo permiso especial?",
            options: ["Venta solo a países con relaciones diplomáticas", "Exportación de productos restringidos que requieren autorización previa", "Exportación temporal", "Venta al por menor"],
            correctAnswer: "Exportación de productos restringidos que requieren autorización previa",
            explanation: "Controla productos regulados para seguridad o tratado."
        },
        {
            question: "¿Qué significa “libre práctica aduanera”?",
            options: ["La autorización para que la mercancía salga o ingrese al país cumpliendo todos los requisitos", "Contrato comercial", "Licencia de exportación", "Documento bancario"],
            correctAnswer: "La autorización para que la mercancía salga o ingrese al país cumpliendo todos los requisitos",
            explanation: "Es la liberación final tras trámites y pago de tributos."
        },
        {
            question: "¿Qué es un sistema ERP y su función en exportación?",
            options: ["Software para gestión integral de procesos empresariales, incluyendo logística y bodegas", "Sistema de transporte", "Tipo de seguro", "Documento aduanero"],
            correctAnswer: "Software para gestión integral de procesos empresariales, incluyendo logística y bodegas",
            explanation: "Mejora la eficiencia y control en toda la cadena."
        },
        {
            question: "¿Qué implica el régimen de perfeccionamiento activo?",
            options: ["Permite exportar bienes transformados o elaborados a partir de insumos importados sin pagar aranceles inicialmente", "Exportación simple", "Importación definitiva", "Seguro de carga"],
            correctAnswer: "Permite exportar bienes transformados o elaborados a partir de insumos importados sin pagar aranceles inicialmente",
            explanation: "Incentiva la producción y exportación agregando valor."
        },
    ],
    ...Array.from({ length: 17 }, (_, i) => i + 2).reduce((acc, level) => {
        if (!acc[level]) { // Only create dummy questions if the level is not already filled
            acc[level] = Array.from({ length: levels[level-1].questions }, (_, qIndex) => ({
                question: `Pregunta ${qIndex + 1} del Nivel ${level}`,
                options: ["Opción A", "Opción B", "Opción C", "Opción D"],
                correctAnswer: "Opción A",
                explanation: `Explicación para la pregunta ${qIndex + 1} del Nivel ${level}.`
            }));
        }
        return acc;
    }, {} as { [key: number]: Question[] })
};

const TIME_PER_QUESTION = 15;
const LOCAL_STORAGE_GAME_KEY = 'localGameProgress';

// --- COMPONENTES DE AUDIO ---
const GameAudio: React.FC<{
  play: 'background' | 'lose' | 'win' | 'none';
  isMuted: boolean;
}> = ({ play, isMuted }) => {
    const backgroundAudioRef = useRef<HTMLAudioElement>(null);
    const loseAudioRef = useRef<HTMLAudioElement>(null);
    const winAudioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audios = [backgroundAudioRef.current, loseAudioRef.current, winAudioRef.current];
        if (audios.some(a => !a)) return;

        audios.forEach(a => {
            if(a) {
              a.muted = isMuted;
              a.pause();
              a.currentTime = 0;
            }
        });

        if (play === 'background' && backgroundAudioRef.current) {
            backgroundAudioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        } else if (play === 'lose' && loseAudioRef.current) {
            loseAudioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        } else if (play === 'win' && winAudioRef.current) {
            winAudioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        }
    }, [play, isMuted]);

    return (
        <>
            <audio ref={backgroundAudioRef} src="https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg" loop />
            <audio ref={loseAudioRef} src="https://actions.google.com/sounds/v1/cartoon/game_over.ogg" />
            <audio ref={winAudioRef} src="https://actions.google.com/sounds/v1/achievements/achievement.ogg" />
        </>
    );
};

// --- COMPONENTES DE UI ---

const LevelPath: React.FC<{ currentLevel: number; highestLevelCompleted: number; }> = ({ currentLevel, highestLevelCompleted }) => {
    return (
        <div className="flex justify-center items-center gap-1 flex-wrap my-4">
            {levels.map(level => {
                const isCompleted = level.level <= highestLevelCompleted;
                const isActive = level.level === currentLevel;
                const isLocked = level.level > currentLevel;

                return (
                    <motion.div
                        key={level.level}
                        className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                            isCompleted ? "bg-green-500 text-white" : "bg-muted text-muted-foreground",
                            isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-125"
                        )}
                        initial={{ scale: 1 }}
                        animate={{ scale: isActive ? 1.25 : 1 }}
                        title={`Nivel ${level.level}`}
                    >
                        {isLocked ? <Lock className="h-3 w-3"/> : level.level}
                    </motion.div>
                );
            })}
        </div>
    );
};

const GameStats: React.FC<{level: number, score: number, failures: number, attempts: number}> = ({ level, score, failures, attempts }) => (
    <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs text-muted-foreground">Nivel Actual</p>
                    <p className="text-lg font-bold text-primary">{level}</p>
                </div>
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs text-muted-foreground">Puntuación</p>
                    <p className="text-lg font-bold">{score}</p>
                </div>
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs text-muted-foreground">Fallos</p>
                    <p className="text-lg font-bold">{failures}</p>
                </div>
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs text-muted-foreground">Intentos</p>
                    <p className="text-lg font-bold">{attempts}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)

const GameOverScreen: React.FC<{ score: number, requiredScore: number, onRetry: () => void, onMenu: () => void }> = ({ score, requiredScore, onRetry, onMenu }) => (
    <Card className="w-full max-w-md mx-auto text-center bg-card/70 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-2xl text-destructive">¡Juego Terminado!</CardTitle>
            <CardDescription>No alcanzaste la puntuación mínima.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-lg">Tu puntuación: <span className="font-bold">{score}</span></p>
            <p className="text-muted-foreground">Necesitabas al menos {requiredScore} para pasar de nivel.</p>
            <div className="flex gap-4 justify-center">
                <Button onClick={onRetry}><Repeat className="mr-2"/> Reintentar Nivel</Button>
                <Button onClick={onMenu} variant="outline">Volver al Menú</Button>
            </div>
        </CardContent>
    </Card>
);

const GameComponent: React.FC<{ 
    user: { uid: string, nombre: string };
    onBackToMenu: () => void;
    onPlayAudio: (sound: 'background' | 'lose' | 'win' | 'none') => void;
    initialLevel: number;
    initialFailures: number;
    initialAttempts: number;
}> = ({ user, onBackToMenu, onPlayAudio, initialLevel, initialFailures, initialAttempts }) => {
    const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');
    const [currentLevel, setCurrentLevel] = useState(initialLevel);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [failures, setFailures] = useState(initialFailures);
    const [attempts, setAttempts] = useState(initialAttempts);
    
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const levelData = useMemo(() => levels.find(l => l.level === currentLevel)!, [currentLevel]);
    const questionData = useMemo(() => questions[currentLevel]?.[currentQuestionIndex], [currentLevel, currentQuestionIndex]);

    const progressPercentage = (currentQuestionIndex / (levelData?.questions || 1)) * 100;

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        stopTimer();
        setTimeLeft(TIME_PER_QUESTION);
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    stopTimer();
                    handleTimeOut();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }, [stopTimer]);

    useEffect(() => {
        onPlayAudio('background');
        startTimer();
        return () => stopTimer();
    }, [onPlayAudio, startTimer]);


    const saveProgress = useCallback((updatedProgress: Partial<LocalGameProgress>) => {
        const key = `${LOCAL_STORAGE_GAME_KEY}_${user.uid}`;
        const storedProgress = localStorage.getItem(key);
        const progress: LocalGameProgress = storedProgress 
            ? JSON.parse(storedProgress) 
            : { userId: user.uid, userName: user.nombre, highestLevelCompleted: 0, failures: 0, attempts: 0, lastPlayed: '' };
        
        const newProgress = { ...progress, ...updatedProgress, lastPlayed: new Date().toISOString() };
        localStorage.setItem(key, JSON.stringify(newProgress));
    }, [user]);

    const handleGameOver = () => {
        onPlayAudio('lose');
        stopTimer();
        setGameState('gameOver');
        setFailures(prev => prev + 1);
        saveProgress({ failures: failures + 1 });
    };

    const handleTimeOut = () => {
        setIsAnswered(true);
        setIsCorrect(false);
        setSelectedAnswer(null);
        handleGameOver();
    };

    const handleAnswerSelect = (option: string) => {
        if (isAnswered) return;
        setSelectedAnswer(option);
    };

    const handleVerify = () => {
        if (!selectedAnswer || isAnswered) return;

        stopTimer();
        const correct = selectedAnswer === questionData.correctAnswer;
        
        setIsAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        } else {
            handleGameOver();
        }
    };
    
    const handleNextQuestion = async () => {
        onPlayAudio('background');
        const isLastQuestion = currentQuestionIndex === levelData.questions - 1;
        const requiredScore = Math.ceil(levelData.questions * 0.7);

        if (isLastQuestion) {
             if (score + 1 >= requiredScore) { // Nivel superado
                onPlayAudio('win');
                saveProgress({ highestLevelCompleted: currentLevel });
                alert(`¡Nivel ${currentLevel} completado! Puntuación: ${score + 1}`);

                if (currentLevel < levels.length) {
                    setCurrentLevel(prev => prev + 1);
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    startTimer();
                } else {
                    alert("¡Felicidades, has completado todos los niveles!");
                    onBackToMenu();
                }
             } else {
                handleGameOver();
                return;
             }
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            startTimer();
        }

        setIsAnswered(false);
        setSelectedAnswer(null);
    };
    
     const handleRetryLevel = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setAttempts(prev => prev + 1);
        saveProgress({ attempts: attempts + 1 });
        setGameState('playing');
        startTimer();
    };

    const getButtonClass = (option: string) => {
        if (!isAnswered) return selectedAnswer === option ? 'bg-primary/20 border-primary' : 'border-border';
        if (option === questionData.correctAnswer) return 'bg-green-500/20 border-green-500 text-green-800 dark:text-green-300';
        if (option === selectedAnswer && !isCorrect) return 'bg-red-500/20 border-red-500 text-red-800 dark:text-red-300';
        return 'border-border opacity-60';
    };
    
    if (gameState === 'gameOver') {
        return <GameOverScreen score={score} requiredScore={Math.ceil(levelData.questions * 0.7)} onRetry={handleRetryLevel} onMenu={onBackToMenu} />;
    }

    if (!questionData) {
        return (
            <Card className="w-full max-w-2xl mx-auto bg-card/70 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                    <p>¡Felicidades! Has completado todos los niveles disponibles.</p>
                     <Button onClick={onBackToMenu} className="mt-4">Volver al Menú</Button>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            <GameStats level={currentLevel} score={score} failures={failures} attempts={attempts} />
            <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-xl md:text-2xl">Nivel {levelData.level}: {levelData.title}</CardTitle>
                         <div className="relative h-12 w-12">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" className="text-muted/30" fill="none" stroke="currentColor" strokeWidth="3" />
                                <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="100, 100" strokeDashoffset={100 - (timeLeft / TIME_PER_QUESTION) * 100} strokeLinecap="round" transform="rotate(-90 18 18)" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold">{timeLeft}</span>
                            </div>
                        </div>
                    </div>
                    <CardDescription>Pregunta {currentQuestionIndex + 1} de {levelData.questions}</CardDescription>
                    <Progress value={progressPercentage} className="mt-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-lg font-semibold min-h-[60px]">{questionData.question}</p>
                    <div className="space-y-3">
                        {questionData.options.map((option, index) => (
                            <Button key={index} variant="outline" className={cn("w-full h-auto justify-start text-left py-3 px-4 text-base transition-all duration-300 border-2", getButtonClass(option))} onClick={() => handleAnswerSelect(option)} disabled={isAnswered}>
                                {option}
                            </Button>
                        ))}
                    </div>
                    <AnimatePresence>
                        {isAnswered && isCorrect && (
                             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-md bg-green-100 dark:bg-green-900/30">
                                <h4 className="font-bold text-lg text-green-800 dark:text-green-200">
                                    ¡Correcto!
                                </h4>
                                <p className="mt-1 text-card-foreground/80">{questionData.explanation}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex justify-between items-center">
                        <Button onClick={onBackToMenu} variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Button>
                        {isAnswered ? (
                            <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
                                {currentQuestionIndex === levelData.questions - 1 ? "Finalizar Nivel" : "Siguiente Pregunta"}
                            </Button>
                        ) : (
                            <Button onClick={handleVerify} disabled={!selectedAnswer} className="w-full sm:w-auto">
                                Verificar
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const MenuCard: React.FC<{ title: string; description: string; icon: React.ElementType; onClick: () => void; bgColor: string; textColor: string; disabled?: boolean;}> = ({ title, description, icon: Icon, onClick, bgColor, textColor, disabled }) => (
    <Card className={cn("transform transition-all duration-300", disabled ? "bg-muted/50 cursor-not-allowed" : `${bgColor} hover:scale-105 hover:shadow-xl cursor-pointer`)} onClick={!disabled ? onClick : undefined}>
        <CardHeader className="flex flex-row items-center gap-4">
            <div className={cn("p-3 rounded-full", disabled ? "bg-muted" : `${bgColor} border-2 border-current`)}>
                <Icon className={cn("w-8 h-8", disabled ? "text-muted-foreground" : textColor)} />
            </div>
            <div>
                <CardTitle className={cn(disabled ? "text-muted-foreground" : textColor)}>{title}</CardTitle>
                <CardDescription className={cn(disabled ? "text-muted-foreground/80" : `${textColor} opacity-80`)}>
                    {description}
                </CardDescription>
            </div>
        </CardHeader>
    </Card>
);

const GameMenu: React.FC<{ 
    onNavigate: (view: 'playing' | 'ranking') => void; 
    user: any;
    highestLevelCompleted: number;
    currentLevel: number;
}> = ({ onNavigate, user, highestLevelCompleted, currentLevel }) => {
    const loginModal = useLoginModal();

    if (!user) {
        return (
            <div className="w-full max-w-4xl mx-auto space-y-8 text-center">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3">
                    <ShieldQuestion className="inline-block h-12 w-12 mb-2 text-primary"/> ¿Sabes o Estás Perdido?
                </h1>
                <p className="text-lg text-muted-foreground">
                    Inicia sesión para poner a prueba tus conocimientos de logística y comercio exterior.
                </p>
                <Card className="max-w-md mx-auto bg-card/70 backdrop-blur-sm p-8">
                    <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
                    <CardTitle className="mb-2">Contenido Bloqueado</CardTitle>
                    <CardDescription className="mb-6">Necesitas iniciar sesión para jugar.</CardDescription>
                    <Button onClick={loginModal.onOpen}>Iniciar Sesión</Button>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3">
                    <ShieldQuestion className="inline-block h-12 w-12 mb-2 text-primary"/> ¿Sabes o Estás Perdido?
                </h1>
                <p className="text-lg text-muted-foreground">
                    Pon a prueba tus conocimientos de logística y comercio exterior.
                </p>
            </div>
            <LevelPath currentLevel={currentLevel} highestLevelCompleted={highestLevelCompleted}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MenuCard title="Jugar" description={`Comenzar en el Nivel ${currentLevel}`} icon={Play} onClick={() => onNavigate('playing')} bgColor="bg-green-500/10" textColor="text-green-500" />
                <MenuCard title="Ranking" description="Ver la tabla de clasificación local" icon={Trophy} onClick={() => onNavigate('ranking')} bgColor="bg-yellow-500/10" textColor="text-yellow-500" />
            </div>
        </div>
    )
}

const LevelIntro: React.FC<{ level: number, onStart: () => void }> = ({ level, onStart }) => {
    useEffect(() => {
        const timer = setTimeout(onStart, 3000);
        return () => clearTimeout(timer);
    }, [onStart]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-6xl font-bold text-primary">Nivel {level}</h1>
                <p className="text-xl text-muted-foreground mt-2">¡Prepárate!</p>
            </motion.div>
        </div>
    );
};

const RankingScreen: React.FC<{ onBackToMenu: () => void }> = ({ onBackToMenu }) => {
    const [rankingData, setRankingData] = useState<LocalGameProgress[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        const gameProgressKeys = keys.filter(key => key.startsWith(LOCAL_STORAGE_GAME_KEY));
        const data = gameProgressKeys.map(key => JSON.parse(localStorage.getItem(key)!));
        data.sort((a, b) => b.highestLevelCompleted - a.highestLevelCompleted || a.failures - b.failures);
        setRankingData(data);
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto bg-card/70 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-primary"/> Ranking Local
                </CardTitle>
                <CardDescription>Clasificación de los jugadores en este navegador.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12 text-center">#</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead className="text-center">Nivel Máximo</TableHead>
                                <TableHead className="text-center">Fallos</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rankingData.length > 0 ? rankingData.map((player, index) => (
                                <TableRow key={player.userId}>
                                    <TableCell className="font-bold text-center">{index + 1}</TableCell>
                                    <TableCell>{player.userName}</TableCell>
                                    <TableCell className="text-center">{player.highestLevelCompleted}</TableCell>
                                    <TableCell className="text-center">{player.failures}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">Nadie ha jugado todavía.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                 <div className="mt-6 flex justify-center">
                    <Button onClick={onBackToMenu} variant="outline"><ArrowLeft className="mr-2"/>Volver al Menú</Button>
                </div>
            </CardContent>
        </Card>
    )
}


// --- PÁGINA PRINCIPAL ---
export default function SuppliersPage() {
    const { user, isLoading } = useLocalAuth();
    const [gameState, setGameState] = useState<'menu' | 'intro' | 'playing' | 'ranking'>('menu');
    const [audioState, setAudioState] = useState<'background' | 'lose' | 'win' | 'none'>('none');
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState<LocalGameProgress | null>(null);

    const currentLevel = useMemo(() => (progress?.highestLevelCompleted ?? 0) + 1, [progress]);

    useEffect(() => {
        if (user) {
            const storedProgress = localStorage.getItem(`${LOCAL_STORAGE_GAME_KEY}_${user.uid}`);
            if (storedProgress) {
                setProgress(JSON.parse(storedProgress));
            } else {
                 const initialProgress: LocalGameProgress = {
                    userId: user.uid,
                    userName: user.nombre,
                    highestLevelCompleted: 0,
                    failures: 0,
                    attempts: 1,
                    lastPlayed: new Date().toISOString()
                };
                localStorage.setItem(`${LOCAL_STORAGE_GAME_KEY}_${user.uid}`, JSON.stringify(initialProgress));
                setProgress(initialProgress);
            }
        }
    }, [user]);

    const handleNavigate = (view: 'playing' | 'ranking') => {
        if (view === 'playing') {
            setGameState('intro');
        } else {
            setGameState(view);
        }
    };

    const handleBackToMenu = useCallback(() => {
        setGameState('menu');
        if (user) {
             const storedProgress = localStorage.getItem(`${LOCAL_STORAGE_GAME_KEY}_${user.uid}`);
             if (storedProgress) {
                setProgress(JSON.parse(storedProgress));
             }
        }
    }, [user]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Cargando...</div>
    }

    const renderContent = () => {
        switch (gameState) {
            case 'intro':
                return <LevelIntro level={currentLevel} onStart={() => setGameState('playing')} />;
            case 'playing':
                if (!user || !progress) return <GameMenu onNavigate={handleNavigate} user={user} highestLevelCompleted={0} currentLevel={1} />;
                return <GameComponent 
                            user={user}
                            onBackToMenu={handleBackToMenu} 
                            onPlayAudio={setAudioState} 
                            initialLevel={currentLevel}
                            initialFailures={progress.failures}
                            initialAttempts={progress.attempts}
                        />;
            case 'ranking':
                return <RankingScreen onBackToMenu={handleBackToMenu} />;
            case 'menu':
            default:
                return <GameMenu 
                            onNavigate={handleNavigate} 
                            user={user} 
                            highestLevelCompleted={progress?.highestLevelCompleted ?? 0}
                            currentLevel={currentLevel}
                        />;
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
             <GameAudio play={audioState} isMuted={isMuted} />
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => setIsMuted(prev => !prev)}
            >
                {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            <AnimatePresence mode="wait">
                <motion.div
                    key={gameState}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

    

    
