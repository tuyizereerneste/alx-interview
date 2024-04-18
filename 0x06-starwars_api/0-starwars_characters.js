#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const filmEndPoint = 'https://swapi-api.hbtn.io/api/films/' + movieId;

const getCharacters = async () => {
  try {
    const filmResponse = await getRequest(filmEndPoint);
    const characters = filmResponse.characters;
    const names = await Promise.all(characters.map(getCharacterName));
    names.forEach((name, index) => {
      process.stdout.write(name);
      if (index !== names.length - 1) {
        process.stdout.write('\n');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || new Error(`Received status code ${response.statusCode}`));
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const getCharacterName = async (characterUrl) => {
  try {
    const characterResponse = await getRequest(characterUrl);
    return characterResponse.name;
  } catch (error) {
    console.error('Error:', error.message);
    return 'Unknown';
  }
};

getCharacters();
