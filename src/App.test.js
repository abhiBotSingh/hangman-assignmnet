import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";
import axios from "axios";

jest.mock("axios");

const mockWord = "mock"
const testId = "hangman";

describe("Hangman game tests", () => {
    test("Hangman game is rendered properly", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: [mockWord] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            const { asFragment } = render(<App />);
            expect(asFragment()).toMatchSnapshot();
        });
        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    test("Hangman body parts appear one-by-one when an incorrect alphabet is pressed", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: [mockWord] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            render(<App />);
        });

        const heading = screen.getByTestId(`${testId}-heading`);
        expect(heading).toBeVisible;

        //Checking whether the head of man appears on 1st incorrect key press
        fireEvent.keyDown(heading,
            { key: 'a', keyCode: 65, code: "keyA" }
        );
        const hangmanHead = screen.getByTestId(`${testId}-head`);
        expect(hangmanHead).toBeVisible;

        //Checking whether the body of man appears on 2nd incorrect key press
        fireEvent.keyDown(heading,
            { key: 'b', keyCode: 66, code: "keyB" }
        );
        const hangmanBody = screen.getByTestId(`${testId}-body`);
        expect(hangmanBody).toBeVisible;
    });

    test("Success popup appears when the player wins the game", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: ["z"] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            render(<App />);
        });
        const heading = screen.getByTestId(`${testId}-heading`);

        fireEvent.keyDown(heading,
            { key: 'z', keyCode: 90, code: "keyZ" }
        );

        const successMessage = screen.queryByText("You won! Congratulations!");
        expect(successMessage).toHaveLength;
    });

    test("Play again button appears when the player wins the game", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: [mockWord] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            render(<App />);
        });
        const heading = screen.getByTestId(`${testId}-heading`);

        fireEvent.keyDown(heading,
            { key: 'z', keyCode: 90, code: "keyZ" }
        );

        const playAgainButton = screen.getByTestId(`${testId}-play-again`);
        expect(playAgainButton).toBeVisible;
    });

    test("A notification appears when an alphabet that has been pressed already, is pressed again", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: [mockWord] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            render(<App />);
        });
        const heading = screen.getByTestId(`${testId}-heading`);

        fireEvent.keyDown(heading,
            { key: 'z', keyCode: 90, code: "keyZ" }
        );

        const letterPressedAgain = screen.queryByText("You have already entered this letter");
        expect(letterPressedAgain).toHaveLength;
    });

    test("Player loses the game if they enter 6 incorrect alphabets", async () => {
        axios.get = jest
            .fn()
            .mockResolvedValueOnce({ data: [mockWord] })
            .mockResolvedValueOnce({
                data: [
                    {
                        "meanings": [{
                            "definitions": [{
                                "definition": "mock hint"
                            }]
                        }]
                    }
                ]
            });

        await act(async () => {
            render(<App />);
        });
        const heading = screen.getByTestId(`${testId}-heading`);

        //Entering 6 incorrect alphabets
        fireEvent.keyDown(heading,
            { key: 'a', keyCode: 65, code: "keyA" }
        );
        fireEvent.keyDown(heading,
            { key: 'b', keyCode: 66, code: "keyB" }
        );
        fireEvent.keyDown(heading,
            { key: 'c', keyCode: 67, code: "keyC" }
        );
        fireEvent.keyDown(heading,
            { key: 'd', keyCode: 68, code: "keyD" }
        );
        fireEvent.keyDown(heading,
            { key: 'e', keyCode: 69, code: "keyE" }
        );
        fireEvent.keyDown(heading,
            { key: 'f', keyCode: 70, code: "keyF" }
        );

        const gameLoseMessage = screen.queryByText(`...the word was: ${mockWord}`);
        expect(gameLoseMessage).toBeVisible;
    });
});