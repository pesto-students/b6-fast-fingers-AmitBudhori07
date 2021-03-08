const getCurrentWord = (currentWord, userText) => {
    const wordCharacters = currentWord.split('');
    const userInputCharacters = userText.toUpperCase().split('');
    return (
        <>
            <div className="new_word">
                {wordCharacters.map((char, i) => {
                    return (
                        <span key={i} className={i<userText.length ? char===userInputCharacters[i] ? "correct" : "incorrect":""}>
                            {char}
                        </span>
                    );
                })}
            </div>
            <style jsx>{`
                .new_word {
                    font-size: 2rem;
                    color: white;
                    font-weight: 800;
                  }
                  .correct {
                    color: #54ba18;
                }
                .incorrect{
                    color: #445298;
                }
            `}
            </style>
        </>
    );
};

export default getCurrentWord;