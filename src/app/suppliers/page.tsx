
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
  questions: (i === 0) ? 20 : (i < 10) ? 5 : (i < 15) ? 10 : (i < 18) ? 15 : (i < 19) ? 20 : 25,
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

    

    