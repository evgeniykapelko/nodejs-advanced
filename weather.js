#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONATY } from "./services/storage.service.js";

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

const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
    }

    if (args.t) {
       saveToken(args.t);
    }

    getWeather('KIEV');
}

initCLI();