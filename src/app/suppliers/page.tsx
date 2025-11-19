'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const levelNames = [
  "Iniciado Global", "Comerciante Novato", "Exportador Emergente", "Navegante Internacional",
  "Mercader en Ascenso", "Puente Comercial", "Despachador Internacional", "Explorador de Mercados",
  "Conquistador de Fronteras", "Logístico Global", "Embajador de Comercio", "Viajero de Cadenas",
  "Conector Transnacional", "Líder en Comercio", "Estratega del Mercado", "Dominante Logístico",
  "Maestre de Exportaciones", "Titán de los Puertos", "Señor de las Rutas", "Emperador Global",
  "Supremo Exportador"
];

const levelQuestions = [
    {
        enunciado: "¿Cuál es el documento clave que certifica la propiedad de la mercancía en el comercio internacional?",
        opciones: [
            { texto: "Factura Proforma", esCorrecta: false },
            { texto: "Conocimiento de Embarque (Bill of Lading)", esCorrecta: true },
            { texto: "Certificado de Origen", esCorrecta: false },
            { texto: "Póliza de Seguro", esCorrecta: false }
        ],
        explicacion: "El Conocimiento de Embarque (B/L) es el título de propiedad de la carga, esencial para retirarla en destino."
    },
    {
        enunciado: "¿Qué Incoterm significa que el vendedor entrega la mercancía en su propio almacén?",
        opciones: [
            { texto: "FOB (Free On Board)", esCorrecta: false },
            { texto: "CIF (Cost, Insurance and Freight)", esCorrecta: false },
            { texto: "EXW (Ex Works)", esCorrecta: true },
            { texto: "DDP (Delivered Duty Paid)", esCorrecta: false }
        ],
        explicacion: "EXW (Ex Works) es el término en el que el vendedor tiene la mínima obligación, poniendo la mercancía a disposición en sus propias instalaciones."
    },
    {
        enunciado: "¿Qué significa 'Arancel Aduanero'?",
        opciones: [
            { texto: "Un impuesto sobre las exportaciones", esCorrecta: false },
            { texto: "Un impuesto sobre las importaciones", esCorrecta: true },
            { texto: "Un acuerdo de libre comercio", esCorrecta: false },
            { texto: "La clasificación de la mercancía", esCorrecta: false }
        ],
        explicacion: "Un arancel es un impuesto que se aplica a los bienes importados a un país."
    }
];

type Option = {
    texto: string;
    esCorrecta: boolean;
};

type Question = {
    enunciado: string;
    opciones: Option[];
    explicacion: string;
};

export default function SuppliersPage() {
    const [currentLevel, setCurrentLevel] = React.useState(1);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);

    const currentQuestion: Question = levelQuestions[questionIndex];
    const progressPercentage = (questionIndex / levelQuestions.length) * 100;

    const handleSelectOption = (index: number) => {
        if (isVerified) return;
        setSelectedOption(index);
    };

    const handleVerify = () => {
        if (selectedOption === null) return;
        const correct = currentQuestion.opciones[selectedOption].esCorrecta;
        setIsCorrect(correct);
        setIsVerified(true);
    };

    const handleContinue = () => {
        if (questionIndex < levelQuestions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            // Logic to complete level and move to the next one
            alert(`¡Nivel ${currentLevel} completado!`);
            if(currentLevel < levelNames.length -1){
                setCurrentLevel(currentLevel + 1);
            }
            setQuestionIndex(0); // Restart for next level
        }
        setIsVerified(false);
        setSelectedOption(null);
    };

    const getOptionClass = (index: number) => {
        if (!isVerified) {
            return selectedOption === index ? 'border-blue-500 bg-blue-100' : 'border-gray-300';
        }
        if (currentQuestion.opciones[index].esCorrecta) {
            return 'bg-green-100 border-green-500 text-green-700 font-bold';
        }
        if (index === selectedOption && !currentQuestion.opciones[index].esCorrecta) {
            return 'bg-red-100 border-red-500 text-red-700 font-bold';
        }
        return 'border-gray-300';
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio
                </Link>
            </Button>

            <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm mt-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl mb-2">
                        {`Nivel ${currentLevel}: ${levelNames[currentLevel]}`}
                    </CardTitle>
                    <Progress value={progressPercentage} className="w-full h-2" />
                </CardHeader>
                <CardContent>
                    <div className="area-pregunta">
                        <p className="text-xl font-bold my-6 text-center">
                            {currentQuestion.enunciado}
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            {currentQuestion.opciones.map((opcion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectOption(index)}
                                    disabled={isVerified}
                                    className={cn(
                                        "p-4 border-2 rounded-lg text-left transition-all text-base",
                                        getOptionClass(index),
                                        !isVerified && "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                >
                                    {opcion.texto}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {isVerified && (
                         <div className={cn(
                             "mt-6 p-4 rounded-lg",
                             isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                         )}>
                             <h3 className={cn(
                                 "text-lg font-bold",
                                 isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                             )}>
                                 {isCorrect ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}
                             </h3>
                            {!isCorrect && (
                                <p className="mt-2 text-sm text-foreground/80">
                                    {currentQuestion.explicacion}
                                 </p>
                            )}
                         </div>
                    )}

                    <div className="mt-6">
                         <Button
                            onClick={isVerified ? handleContinue : handleVerify}
                            disabled={selectedOption === null}
                            className="w-full h-12 text-lg font-bold"
                            variant={isVerified ? (isCorrect ? "default" : "destructive") : "default"}
                         >
                            {isVerified ? "CONTINUAR" : "VERIFICAR"}
                         </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}