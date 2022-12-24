#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONATY } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('No token');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONATY.token, token);
        printSuccess('Token has beeen saved');
    } catch (error) {
        printError('Something went wrong. Please try again.');
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city) {
        printError('No city');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONATY.city, city);
        printSuccess('City has beeen saved');
    } catch (error) {
        printError('Something went wrong. Please try again.');
        printError(error.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONATY.city);
        const weather = await getWeather(city);
        printWeather(weather, weather.weather[0].icon);
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Incorrect place');
        } else if (e?.response?.status == 401) {
            printError('Incorrect token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    return getForcast();
}

initCLI();