import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../../redux/actions';

const Slider = () => {
    const dispatch = useDispatch();

    //Redux state
    const { characters, loading, error } = useSelector((state) => state);

    //Local state
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(1);

    useEffect(() => {
        dispatch(fetchCharacter(currentCharacterIndex));
    }, [dispatch, currentCharacterIndex]);

    
    const handleNext = () => {
        if (currentCharacterIndex < characters.length) {
            const newIndex = currentCharacterIndex + 1;
            setCurrentCharacterIndex(newIndex);
        }
    };

    const handlePrev = () => {
        if (currentCharacterIndex > 1) {
            const newIndex = currentCharacterIndex - 1;
            setCurrentCharacterIndex(newIndex);
        }
    };

    const characterImage = characters[currentCharacterIndex]?.image;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-4 w-96">
                {loading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 border-opacity-25 mx-auto"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="slider-content">
                        <img
                            src={characterImage + `?${new Date().getTime()}`}
                            alt={characters[currentCharacterIndex]?.name}
                            className="w-full h-auto"
                        />
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">
                                {characters[currentCharacterIndex]?.name}
                            </h2>
                            <p>Status: {characters[currentCharacterIndex]?.status}</p>
                            <p>Species: {characters[currentCharacterIndex]?.species}</p>
                        </div>
                    </div>
                )}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentCharacterIndex === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentCharacterIndex === characters.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
