'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Settings, LogOut, Check, X, HelpCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

const TIME_PER_QUESTION = 30; // 30 segundos por pregunta

type Option = {
    texto: string;
    esCorrecta: boolean;
};

type Question = {
    enunciado: string;
    opciones: Option[];
    explicacion: string;
};

type GameState = 'menu' | 'playing' | 'level-complete';


const GameMenu = ({ onPlay, onExit }: { onPlay: () => void, onExit: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full max-w-md mx-auto p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center mb-8">
                <span className="block text-green-500">¿Sabes</span> 
                <span className="text-orange-500 text-5xl md:text-6xl mx-2">o</span> 
                <span className="block text-red-500">Estás Perdido?</span>
            </h1>
            
            <div className="flex-grow"></div>

            <div className="flex justify-around w-full">
                 <Button 
                    onClick={onPlay} 
                    className="h-14 text-lg font-bold text-white shadow-[0_5px_0_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: '#4CAF50' }}
                 >
                    JUGAR
                </Button>
                <Button 
                    className="h-14 text-lg font-bold text-white shadow-[0_5px_0_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: '#2196F3' }}
                >
                    OPCIONES
                </Button>
                <Button 
                    onClick={onExit} 
                    className="h-14 text-lg font-bold text-white shadow-[0_5px_0_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: '#F44336' }}
                >
                    SALIR
                </Button>
            </div>
        </div>
    );
};


const TimerCircle = ({ timeLeft }: { timeLeft: number }) => {
    const percentage = (timeLeft / TIME_PER_QUESTION) * 100;
    const strokeDashoffset = 283 * (1 - percentage / 100);

    return (
        <div className="relative h-16 w-16">
            <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                    className="stroke-current text-gray-200"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                ></circle>
                <circle
                    className="stroke-current text-primary"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeDasharray="283"
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{timeLeft}</span>
            </div>
        </div>
    );
};


export default function SuppliersPage() {
    const router = useRouter();
    const [gameState, setGameState] = React.useState<GameState>('menu');
    const [currentLevel, setCurrentLevel] = React.useState(0);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(TIME_PER_QUESTION);

    const currentQuestion: Question = levelQuestions[questionIndex];
    const progressPercentage = (questionIndex / levelQuestions.length) * 100;
    
    React.useEffect(() => {
        if (gameState !== 'playing' || isVerified) return;

        if (timeLeft === 0) {
            handleTimeUp();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [gameState, isVerified, timeLeft, questionIndex]);
    
    const startGame = () => {
        setQuestionIndex(0);
        setCurrentLevel(0);
        setIsVerified(false);
        setSelectedOption(null);
        setTimeLeft(TIME_PER_QUESTION);
        setGameState('playing');
    };

    const exitGame = () => {
        router.push('/');
    };

    const handleSelectOption = (index: number) => {
        if (isVerified) return;
        setSelectedOption(index);
    };

    const handleTimeUp = () => {
        setIsCorrect(false);
        setIsVerified(true);
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
            alert(`¡Nivel ${currentLevel} completado!`);
            if (currentLevel < levelNames.length - 1) {
                setCurrentLevel(currentLevel + 1);
            }
            setQuestionIndex(0); 
        }
        setIsVerified(false);
        setSelectedOption(null);
        setTimeLeft(TIME_PER_QUESTION);
    };

    const getOptionClass = (index: number) => {
        if (!isVerified) {
            return selectedOption === index ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'border-border';
        }
        if (currentQuestion.opciones[index].esCorrecta) {
            return 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-bold';
        }
        if (index === selectedOption && !currentQuestion.opciones[index].esCorrecta) {
            return 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300 font-bold';
        }
        return 'border-border';
    };


    if (gameState === 'menu') {
        return (
          <div className="min-h-screen w-full flex items-center justify-center bg-[#e8f9fd]">
            <GameMenu onPlay={startGame} onExit={exitGame} />
          </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-4">
                <button onClick={() => setGameState('menu')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al menú
                </button>
            </Button>

            <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm mt-4">
                <CardHeader>
                     <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-center text-xl">
                            {`Nivel ${currentLevel}: ${levelNames[currentLevel]}`}
                        </CardTitle>
                        <TimerCircle timeLeft={timeLeft} />
                    </div>
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
                                        !isVerified && "hover:bg-accent"
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
                                 "text-lg font-bold flex items-center",
                                 isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                             )}>
                                {isCorrect ? <Check className="mr-2"/> : <X className="mr-2"/>}
                                {isCorrect ? "¡Respuesta Correcta!" : timeLeft === 0 ? "¡Se acabó el tiempo!" : "Respuesta Incorrecta"}
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
                            disabled={selectedOption === null && !isVerified}
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
