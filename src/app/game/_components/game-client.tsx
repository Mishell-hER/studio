
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Trophy, Clock, Star } from 'lucide-react';
import { levels } from './levels';
import { useLocalAuth } from '@/hooks/use-local-auth';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const levelTitles = [
  "Novato Navegante", "Aprendiz Aterrizado", "Comerciante Curioso", "Exportador Ensayista",
  "Navegante Novato", "Vendedor Viajero", "Agente Agudo", "Comerciante Comedido",
  "Exportador Experimentado", "Tigre de Tráficas", "Piloto de Puertos", "Capitán de Carga",
  "Estratega de Exportación", "General de Aduanas", "Magnate Marítimo", "Maestro de Mercados",
  "Rey del Comercio", "Señor de la Logística", "Emperador Exportador", "Dios del Comercio Exterior",
];

const LOCAL_STORAGE_KEY = 'localGameProgress';

export function GameClient() {
  const { user } = useLocalAuth();
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimeUp, setTimeUp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highestLevelCompleted, setHighestLevelCompleted] = useState(-1);

  useEffect(() => {
    if (user) {
      const storedProgress = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.uid}`);
      if (storedProgress) {
        const progress = JSON.parse(storedProgress);
        setHighestLevelCompleted(progress.highestLevelCompleted);
        setCurrentLevel(progress.highestLevelCompleted + 1);
      } else {
        setHighestLevelCompleted(-1);
        setCurrentLevel(0);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!gameStarted || isTimeUp || showFeedback) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeUp(true);
    }
  }, [timeLeft, gameStarted, isTimeUp, showFeedback]);

  const saveProgress = (levelCompleted: number) => {
    if (user) {
      const newHighest = Math.max(highestLevelCompleted, levelCompleted);
      const progress = {
        highestLevelCompleted: newHighest,
        lastPlayed: new Date().toISOString(),
      };
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.uid}`, JSON.stringify(progress));
      setHighestLevelCompleted(newHighest);
       toast({
          title: "¡Progreso Guardado!",
          description: `Has alcanzado el nivel ${levelTitles[newHighest]}.`,
        });
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    setShowFeedback(true);
    const correctIndex = levels[currentLevel].questions[currentQuestionIndex].correctAnswer;
    if (selectedIndex === correctIndex) {
      setIsCorrect(true);
      setScore(score + 10 + Math.floor(timeLeft / 10)); // Bonus por tiempo
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(false);
      if (currentQuestionIndex < levels[currentLevel].questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        if (score + (selectedIndex === correctIndex ? 10 : 0) >= levels[currentLevel].passingScore) {
          saveProgress(currentLevel);
          if (currentLevel < levels.length - 1) {
             setCurrentLevel(currentLevel + 1);
             setCurrentQuestionIndex(0);
             setScore(0);
          }
        }
        setTimeUp(true); // Finaliza el nivel
      }
    }, 2000);
  };

  const startLevel = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(60);
    setTimeUp(false);
    setGameStarted(true);
  };

   const resetGame = () => {
    setGameStarted(false);
    startLevel();
  };

  if (!user) {
    return <p className="text-center text-muted-foreground">Debes iniciar sesión para jugar.</p>;
  }

  if (currentLevel >= levels.length) {
    return (
      <div className="text-center p-8">
        <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
        <h2 className="mt-4 text-2xl font-bold">¡Felicidades, {levelTitles[levelTitles.length -1]}!</h2>
        <p className="mt-2 text-muted-foreground">Has completado todos los niveles. ¡Eres un verdadero experto en logística!</p>
      </div>
    );
  }

  const level = levels[currentLevel];
  const question = level.questions[currentQuestionIndex];

  if (!gameStarted) {
    return (
      <div className="text-center p-4">
        <Card className='max-w-md mx-auto'>
            <CardHeader>
                <CardTitle>Nivel {currentLevel + 1}: {level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={startLevel}>Comenzar Nivel</Button>
                {highestLevelCompleted > -1 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Nivel más alto completado: {levelTitles[highestLevelCompleted]}
                  </p>
                )}
            </CardContent>
        </Card>
      </div>
    );
  }
  
  if (isTimeUp) {
    const passed = score >= level.passingScore;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                 <Card className="text-center max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>{passed ? `¡Nivel ${currentLevel + 1} Superado!` : 'Tiempo Agotado'}</CardTitle>
                        <CardDescription>
                            {passed ? `¡Felicidades! Has ganado el título de ${levelTitles[currentLevel]}.` : 'No has alcanzado la puntuación necesaria.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex justify-center items-center gap-2">
                           <Star className="h-6 w-6 text-yellow-400" />
                           <p className="text-2xl font-bold">{score}</p>
                           <span className="text-muted-foreground">Puntos</span>
                       </div>
                       <p className="text-sm text-muted-foreground">Puntuación para pasar: {level.passingScore}</p>
                       
                       <div className="flex justify-center gap-4 pt-4">
                        {passed && currentLevel < levels.length - 1 ? (
                            <Button onClick={() => {setGameStarted(false); setTimeUp(false);}}>Siguiente Nivel</Button>
                        ) : (
                             <Button onClick={resetGame}>Reintentar Nivel</Button>
                        )}
                        {!passed && <Button variant="outline" onClick={() => { setCurrentLevel(0); setGameStarted(false); setTimeUp(false);}}>Volver al Inicio</Button>}
                       </div>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    )
  }

  return (
    <div className="relative p-4 md:p-8 rounded-lg border bg-card/50">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                <div className="absolute top-4 right-4 flex gap-4 text-sm font-semibold">
                    <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary"/> Tiempo: {timeLeft}s</div>
                    <div className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-400"/> Puntos: {score}</div>
                </div>
                 <p className="text-sm font-medium text-primary mb-2">Nivel {currentLevel + 1}: {level.title}</p>
                 <Progress value={((currentQuestionIndex + 1) / level.questions.length) * 100} className="mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">{question.text}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="h-auto py-4 justify-start text-left whitespace-normal"
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                    >
                        <span className="font-bold mr-4">{String.fromCharCode(65 + index)}:</span>
                        {option}
                    </Button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>

        <AnimatePresence>
            {showFeedback && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                    <Alert className={`max-w-sm ${isCorrect ? 'border-green-500' : 'border-destructive'}`}>
                        {isCorrect ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-destructive" />}
                        <AlertTitle>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</AlertTitle>
                        <AlertDescription>
                           {question.feedback}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
