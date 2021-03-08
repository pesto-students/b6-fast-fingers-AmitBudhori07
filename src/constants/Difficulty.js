export const DIFFICULTY_LEVEL = [
    { value: "easy", label: "EASY" },
    { value: "medium", label: "MEDIUM" },
    { value: "hard", label: "HARD" }
];

export const DIFFICULTY_FACTOR_INCREMENT = 0.01;

export function DifficultyFactor(level) {
    switch(level){
        case 'EASY': return 1
        case 'MEDIUM': return 1.5
        case 'HARD': return 2
        default: return 1
    }
}

export function setLevel(difficultyFactor){
    let level;
    if (difficultyFactor >= 2) level = 'HARD';
    else if (difficultyFactor < 1.5) level = 'EASY';
    else level = 'MEDIUM';
    localStorage.setItem("level",level);
    return level;
}

