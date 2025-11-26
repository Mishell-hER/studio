
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

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

// --- DATOS DEL JUEGO ---
const levels: Level[] = Array.from({ length: 20 }, (_, i) => ({
  level: i + 1,
  title: `Nivel ${i + 1}`,
  questions: (i < 10) ? 5 : (i < 15) ? 10 : (i < 18) ? 15 : (i < 19) ? 20 : 25,
  bgColor: 'bg-gray-100',
  textColor: 'text-gray-800'
}));

const questions: { [key: number]: Question[] } = {
    1: [
        {
            question: "¿Qué significa la sigla 'FOB' en los Incoterms?",
            options: ["Free On Board", "Fast Over Borders", "For Our Business", "Final Offer Bid"],
            correctAnswer: "Free On Board",
            explanation: "FOB (Free On Board) es un Incoterm que significa que el vendedor entrega la mercancía a bordo del buque designado por el comprador en el puerto de embarque."
        },
        {
            question: "¿Cuál es el documento principal que ampara el transporte marítimo de mercancías?",
            options: ["Factura Comercial", "Bill of Lading (B/L)", "Packing List", "Certificado de Origen"],
            correctAnswer: "Bill of Lading (B/L)",
            explanation: "El Bill of Lading (Conocimiento de Embarque) es el contrato de transporte marítimo y el título de propiedad de la mercancía."
        },
        {
            question: "¿Qué es la 'Declaración Única de Aduanas' (DUA)?",
            options: ["Un permiso de viaje", "Un documento para el seguro", "Un formulario para declarar la exportación/importación", "Una solicitud de crédito"],
            correctAnswer: "Un formulario para declarar la exportación/importación",
            explanation: "La DUA es el documento oficial que se presenta ante la aduana para declarar los detalles de una operación de comercio exterior."
        },
        {
            question: "¿Qué función cumple el 'Packing List' o Lista de Empaque?",
            options: ["Indicar el precio de los productos", "Detallar el contenido de cada bulto", "Servir como contrato de venta", "Calcular los impuestos"],
            correctAnswer: "Detallar el contenido de cada bulto",
            explanation: "La Lista de Empaque describe el contenido, peso y dimensiones de cada paquete, facilitando la inspección aduanera."
        },
        {
            question: "¿Cuál de estos NO es un modo de transporte principal en logística internacional?",
            options: ["Marítimo", "Aéreo", "Terrestre", "Subterráneo"],
            correctAnswer: "Subterráneo",
            explanation: "Los modos de transporte principales son marítimo, aéreo, terrestre y ferroviario. El transporte subterráneo no es una categoría estándar en logística comercial."
        }
    ],
    ...Array.from({ length: 19 }, (_, i) => i + 2).reduce((acc, level) => {
        acc[level] = Array.from({ length: levels[level-1].questions }, (_, qIndex) => ({
            question: `Pregunta ${qIndex + 1} del Nivel ${level}`,
            options: ["Opción A", "Opción B", "Opción C", "Opción D"],
            correctAnswer: "Opción A",
            explanation: `Explicación para la pregunta ${qIndex + 1} del Nivel ${level}.`
        }));
        return acc;
    }, {} as { [key: number]: Question[] })
};

const TIME_PER_QUESTION = 15;

// --- COMPONENTES DE AUDIO ---
const GameAudio: React.FC<{
  play: 'background' | 'lose' | 'none';
  isMuted: boolean;
}> = ({ play, isMuted }) => {
    const backgroundAudioRef = useRef<HTMLAudioElement>(null);
    const loseAudioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const backgroundAudio = backgroundAudioRef.current;
        const loseAudio = loseAudioRef.current;
        
        if (!backgroundAudio || !loseAudio) return;

        backgroundAudio.muted = isMuted;
        loseAudio.muted = isMuted;

        if (play === 'background') {
            loseAudio.pause();
            loseAudio.currentTime = 0;
            backgroundAudio.play().catch(e => console.error("Audio playback failed:", e));
        } else if (play === 'lose') {
            backgroundAudio.pause();
            loseAudio.play().catch(e => console.error("Audio playback failed:", e));
        } else {
            backgroundAudio.pause();
            loseAudio.pause();
        }
    }, [play, isMuted]);

    return (
        <>
            <audio ref={backgroundAudioRef} src="https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg" loop />
            <audio ref={loseAudioRef} src="https://actions.google.com/sounds/v1/cartoon/game_over.ogg" />
        </>
    );
};


// --- COMPONENTES DE PANTALLA ---

const GameComponent: React.FC<{ 
    onBackToMenu: () => void,
    onPlayAudio: (sound: 'background' | 'lose' | 'none') => void 
}> = ({ onBackToMenu, onPlayAudio }) => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
    const [timerKey, setTimerKey] = useState(0);

    useEffect(() => {
        onPlayAudio('background');
        return () => { onPlayAudio('none'); }; // Stop audio on component unmount
    }, [onPlayAudio]);

    const levelData = useMemo(() => levels.find(l => l.level === currentLevel)!, [currentLevel]);
    const questionData = useMemo(() => questions[currentLevel]?.[currentQuestionIndex], [currentLevel, currentQuestionIndex]);

    const progressPercentage = (currentQuestionIndex / (levelData?.questions || 1)) * 100;

    useEffect(() => {
        if (!questionData || isAnswered) return;
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleTimeOut();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timerKey, isAnswered, questionData]);

    const handleTimeOut = () => {
        onPlayAudio('lose');
        setIsAnswered(true);
        setIsCorrect(false);
        setSelectedAnswer(null);
    };
    
    const resetTimer = useCallback(() => {
        setTimeLeft(TIME_PER_QUESTION);
        setTimerKey(prevKey => prevKey + 1);
    }, []);

    const handleAnswerSelect = (option: string) => {
        if (isAnswered) return;
        setSelectedAnswer(option);
    };

    const handleVerify = () => {
        if (!selectedAnswer) return;
        const correct = selectedAnswer === questionData.correctAnswer;
        if(!correct) onPlayAudio('lose');

        setIsAnswered(true);
        setIsCorrect(correct);
        if (correct) setScore(prev => prev + 1);
    };
    
    const handleNextQuestion = async () => {
        onPlayAudio('background');
        const isLastQuestion = currentQuestionIndex === levelData.questions - 1;

        if (isLastQuestion) {
            alert(`Nivel ${currentLevel} completado! Puntuación: ${score + (isCorrect ? 1 : 0)}`);

            if(currentLevel < levels.length) {
                setCurrentLevel(prev => prev + 1);
            } else {
                alert("¡Felicidades, has completado todos los niveles!");
                onBackToMenu();
            }
            setCurrentQuestionIndex(0);
            setScore(0);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }

        setIsAnswered(false);
        setSelectedAnswer(null);
        resetTimer();
    };
    
    const getButtonClass = (option: string) => {
        if (!isAnswered) return selectedAnswer === option ? 'bg-primary/20 border-primary' : 'border-border';
        if (option === questionData.correctAnswer) return 'bg-green-500/20 border-green-500 text-green-800 dark:text-green-300';
        if (option === selectedAnswer && !isCorrect) return 'bg-red-500/20 border-red-500 text-red-800 dark:text-red-300';
        return 'border-border opacity-60';
    };
    
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
        <Card className="w-full max-w-2xl mx-auto bg-card/70 backdrop-blur-sm">
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
                    {isAnswered && (
                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("p-4 rounded-md", isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30')}>
                            <h4 className={cn("font-bold text-lg", isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200')}>
                                {timeLeft === 0 && !selectedAnswer ? "¡Se acabó el tiempo!" : (isCorrect ? "¡Correcto!" : "Incorrecto")}
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

const GameMenu: React.FC<{ onNavigate: (view: 'playing') => void }> = ({ onNavigate }) => {
    
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3">
                    ¿Sabes o Estás Perdido?
                </h1>
                <p className="text-lg text-muted-foreground">
                    Pon a prueba tus conocimientos de logística y comercio exterior.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MenuCard title="Jugar" description="Inicia una nueva partida y sube de nivel." icon={Play} onClick={() => onNavigate('playing')} bgColor="bg-green-500/10" textColor="text-green-500" />
            </div>
        </div>
    )
}

const LevelIntro: React.FC<{ level: number, onStart: () => void }> = ({ level, onStart }) => {
    useEffect(() => {
        const timer = setTimeout(onStart, 3000); // Muestra la pantalla por 3 segundos
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


// --- PÁGINA PRINCIPAL ---
export default function SuppliersPage() {
    const [gameState, setGameState] = useState<'menu' | 'intro' | 'playing'>('menu');
    const [audioState, setAudioState] = useState<'background' | 'lose' | 'none'>('none');
    const [isMuted, setIsMuted] = useState(false);
    
    // Hardcoded level for now
    const currentLevel = 1;


    const handleNavigate = (view: 'playing') => {
        if (view === 'playing') {
            setGameState('intro');
        } else {
            setGameState(view);
        }
    };

    const handleBackToMenu = () => {
        setGameState('menu');
    }

    const renderContent = () => {
        switch (gameState) {
            case 'intro':
                return <LevelIntro level={currentLevel} onStart={() => setGameState('playing')} />;
            case 'playing':
                return <GameComponent onBackToMenu={handleBackToMenu} onPlayAudio={setAudioState} />;
            case 'menu':
            default:
                return <GameMenu onNavigate={handleNavigate} />;
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
