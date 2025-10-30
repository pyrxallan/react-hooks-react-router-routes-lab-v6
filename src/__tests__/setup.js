import { afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch';
import {Blob} from 'node:buffer';

// Mock data from db.json
const mockMovies = [
    {   id: 1,
        title: "Doctor Strange",
        time: 115,
        genres: ["Action", "Adventure", "Fantasy"]
    },
    {
        id: 2,
        title: "Trolls",
        time: 92,
        genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"]
    },
    {
        id: 3,
        title: "Jack Reacher: Never Go Back",
        time: 118,
        genres: ["Action", "Adventure", "Crime", "Mystery", "Thriller"]
    }
];

const mockActors = [
    {
        id: 1,
        name: "Benedict Cumberbatch",
        movies: ["Doctor Strange", "The Imitation Game", "Black Mass"]
    },
    {
        id: 2,
        name: "Justin Timberlake",
        movies: ["Trolls", "Friends with Benefits", "The Social Network"]
    },
    {
        id: 3,
        name: "Anna Kendrick",
        movies: ["Pitch Perfect", "Into The Wood"]
    },
    {
        id: 4,
        name: "Tom Cruise",
        movies: [
        "Jack Reacher: Never Go Back",
        "Mission Impossible 4",
        "War of the Worlds"
        ]
    }
];

const mockDirectors = [
    {
        id: 1,
        name: "Scott Derrickson",
        movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"]
    },
    {
        id: 2,
        name: "Mike Mitchell",
        movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"]
    },
    {
        id: 3,
        name: "Edward Zwick",
        movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"]
    }
];

// Mock fetch globally
beforeAll(() => {
    global.fetch = vi.fn((url) => {
        if (url.includes('/movies/')) {
            const id = parseInt(url.split('/').pop());
            const movie = mockMovies.find(m => m.id === id);
            return Promise.resolve({
                json: () => Promise.resolve(movie)
            });
        } else if (url.includes('/movies')) {
            return Promise.resolve({
                json: () => Promise.resolve(mockMovies)
            });
        } else if (url.includes('/actors')) {
            return Promise.resolve({
                json: () => Promise.resolve(mockActors)
            });
        } else if (url.includes('/directors')) {
            return Promise.resolve({
                json: () => Promise.resolve(mockDirectors)
            });
        }
        return Promise.reject(new Error('Unknown URL'));
    });
});

afterAll(() => {
    vi.restoreAllMocks();
});

afterEach(() => {
    cleanup();
})