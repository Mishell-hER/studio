"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const levels = [
    "Iniciado Global", "Comerciante Novato", "Exportador Emergente", "Navegante Internacional", "Mercader en Ascenso",
    "Puente Comercial", "Despachador Internacional", "Explorador de Mercados", "Conquistador de Fronteras", "Logístico Global",
    "Embajador de Comercio", "Viajero de Cadenas", "Conector Transnacional", "Líder en Comercio", "Estratega del Mercado",
    "Dominante Logístico", "Maestre de Exportaciones", "Titán de los Puertos", "Señor de las Rutas", "Emperador Global", "Supremo Exportador"
];

const questions = [
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
        enunciado: "¿Qué significa el Incoterm 'FOB'?",
        opciones: [
            { texto: "El vendedor entrega la mercancía en su fábrica.", esCorrecta: false },
            { texto: "El vendedor paga el seguro hasta el destino.", esCorrecta: false },
            { texto: "El vendedor entrega la mercancía a bordo del buque en el puerto de embarque.", esCorrecta: true },
            { texto: "El comprador recoge la mercancía en el puerto de destino.", esCorrecta: false }
        ],
        explicacion: "FOB (Free On Board) significa que la responsabilidad del vendedor termina una vez que la mercancía está cargada en el buque designado por el comprador."
    },
    {
        enunciado: "¿Para qué se utiliza una 'Carta de Crédito'?",
        opciones: [
            { texto: "Para describir la mercancía.", esCorrecta: false },
            { texto: "Para asegurar el pago al vendedor si cumple las condiciones.", esCorrecta: true },
            { texto: "Para contratar el transporte.", esCorrecta: false },
            { texto: "Para declarar el valor en aduanas.", esCorrecta: false }
        ],
        explicacion: "Una Carta de Crédito es un instrumento de pago donde un banco garantiza el pago al vendedor, siempre que se presenten los documentos correctos."
    }
];

const TIME_PER_QUESTION = 20; // 20 segundos por pregunta

function GameComponent() {
    const [gameState, setGameState] = React.useState('playing'); // 'playing', 'feedback'
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = React.useState(TIME_PER_QUESTION);
    const router = useRouter();

    React.useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleTimeOut();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [currentQuestionIndex, gameState]);
    
    const handleTimeOut = () => {
        setGameState('feedback');
        setIsCorrect(false);
        setSelectedOption(null); // Para que no haya seleccionada
    };
    
    const handleOptionSelect = (index: number) => {
        if (gameState === 'playing') {
            setSelectedOption(index);
        }
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;
        
        const question = questions[currentQuestionIndex];
        const correct = question.opciones[selectedOption].esCorrecta;
        
        setIsCorrect(correct);
        setGameState('feedback');
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setIsCorrect(null);
        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimeLeft(TIME_PER_QUESTION);
            setGameState('playing');
        } else {
            // Fin del juego o nivel
            alert("¡Nivel completado!");
            setCurrentQuestionIndex(0); // Reiniciar por ahora
            setTimeLeft(TIME_PER_QUESTION);
            setGameState('playing');
        }
    };
    
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    const timeProgress = (timeLeft / TIME_PER_QUESTION) * 100;

    return (
        <Card className="w-full mx-auto max-w-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                     <CardTitle className="text-xl">Nivel 1: {levels[1]}</CardTitle>
                    <div className="relative h-12 w-12">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.83
                                a 15.9155 15.9155 0 0 1 0 -31.83"
                                className="text-gray-600/50"
                                fill="none"
                                strokeWidth="4"
                            />
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.83
                                a 15.9155 15.9155 0 0 1 0 -31.83"
                                className={cn(
                                    "transition-all duration-500",
                                    timeProgress > 50 ? "text-green-500" : timeProgress > 25 ? "text-yellow-500" : "text-red-500"
                                )}
                                fill="none"
                                strokeWidth="4"
                                strokeDasharray={`${timeProgress}, 100`}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                            {timeLeft}
                        </span>
                    </div>
                </div>
                <Progress value={progressPercentage} className="w-full" />
            </CardHeader>
            <CardContent className="p-4 md:p-6">
                <p className="text-xl font-semibold mb-6 min-h-[60px]">{currentQuestion.enunciado}</p>

                <div className="space-y-4">
                    {currentQuestion.opciones.map((opcion, index) => {
                        const isSelected = selectedOption === index;
                        let optionClass = "border-muted-foreground/50 hover:bg-muted/50";
                        if (gameState === 'feedback') {
                            if (opcion.esCorrecta) {
                                optionClass = "bg-green-500/20 border-green-500 text-green-200";
                            } else if (isSelected && !opcion.esCorrecta) {
                                optionClass = "bg-red-500/20 border-red-500 text-red-200";
                            }
                        } else if (isSelected) {
                            optionClass = "bg-primary/20 border-primary";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                disabled={gameState === 'feedback'}
                                className={cn(
                                    "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between",
                                    optionClass
                                )}
                            >
                                <span className="font-medium">{opcion.texto}</span>
                                {gameState === 'feedback' && opcion.esCorrecta && <Check className="h-5 w-5 text-green-500" />}
                                {gameState === 'feedback' && isSelected && !opcion.esCorrecta && <X className="h-5 w-5 text-red-500" />}
                            </button>
                        )
                    })}
                </div>
                
                <div className={cn("mt-6 transition-all duration-300", gameState === 'feedback' ? 'opacity-100 h-auto' : 'opacity-0 h-0 invisible' )}>
                     {isCorrect !== null && (
                         <div className={cn("p-4 rounded-lg", isCorrect ? "bg-green-900/50" : "bg-red-900/50")}>
                             <h3 className={cn("font-bold text-lg", isCorrect ? "text-green-300" : "text-red-300")}>
                                 {timeLeft === 0 ? "¡Se acabó el tiempo!" : isCorrect ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}
                             </h3>
                             {!isCorrect && <p className="text-muted-foreground mt-2">{currentQuestion.explicacion}</p>}
                         </div>
                     )}
                 </div>

                <div className="mt-6">
                    {gameState === 'playing' ? (
                        <Button className="w-full" onClick={handleCheckAnswer} disabled={selectedOption === null}>
                            Verificar
                        </Button>
                    ) : (
                        <Button className="w-full" onClick={handleNextQuestion}>
                            Continuar
                        </Button>
                    )}
                </div>

            </CardContent>
        </Card>
    );
}


export default function SuppliersPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio
                </Link>
            </Button>
             <h1 className="text-3xl font-bold tracking-tighter mb-2">¿Sabes o Estás Perdido?</h1>
            <p className="text-muted-foreground mb-8">Pon a prueba tus conocimientos sobre exportación y logística.</p>
            <GameComponent />
        </div>
    );
}
